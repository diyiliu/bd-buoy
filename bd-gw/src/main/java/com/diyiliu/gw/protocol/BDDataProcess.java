package com.diyiliu.gw.protocol;

import com.diyiliu.gw.support.bean.DeviceInfo;
import com.diyiliu.gw.support.bean.OriginalInfo;
import com.diyiliu.gw.support.client.ForwardWs;
import com.diyiliu.plugin.cache.ICache;
import com.diyiliu.plugin.model.Header;
import com.diyiliu.plugin.model.IDataProcess;
import com.diyiliu.plugin.model.Point;
import com.diyiliu.plugin.util.CommonUtil;
import com.diyiliu.plugin.util.DateUtil;
import com.diyiliu.plugin.util.GpsCorrectUtil;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;

/**
 * Description: BDDataProcess
 * Author: DIYILIU
 * Update: 2018-04-04 09:39
 */

@Slf4j
@Service
public class BDDataProcess implements IDataProcess {

    @Resource
    private JdbcTemplate jdbcTemplate;

    @Resource
    private ICache deviceCacheProvider;


    @Resource
    private ICache originalCacheProvider;


    @Resource
    private ForwardWs forwardWs;

    @Override
    public Header dealHeader(byte[] bytes) {
        return null;
    }

    @Override
    public void parse(byte[] content, Header header) {
        ByteBuf buf = Unpooled.copiedBuffer(content);

        // 消息头 + 长度
        buf.readInt();

        // 报文类型
        int cmd = buf.readUnsignedByte();

        // 应答标识
        int flag = buf.readUnsignedByte();
        if (flag == 0xFE) {
            switch (cmd) {
                case 0x02:
                    log.info("收到实时数据[{}]...", CommonUtil.bytesToStr(content));
                    parseData(content);
                    break;
                case 0x07:
                    log.info("收到心跳数据...");
                    break;
                default:
                    log.warn("收到[{}]数据...", String.format("%x", cmd));
            }
        }
    }

    @Override
    public byte[] pack(Header header, Object... argus) {
        return new byte[0];
    }

    @Override
    public void init() {

    }

    /**
     * 处理实时数据
     *
     * @param bytes
     */
    public void parseData(byte[] bytes) {
        ByteBuf buf = Unpooled.copiedBuffer(bytes);

        // 消息头 + 长度
        buf.readInt();

        // 报文类型
        int cmd = buf.readUnsignedByte();

        // 应答标识
        buf.readUnsignedByte();

        // sim卡号
        byte[] simArr = new byte[3];
        buf.readBytes(simArr);
        String sim = CommonUtil.parseSIM(simArr);

        int year = buf.readUnsignedShort();
        int month = buf.readByte();
        int day = buf.readByte();

        int hour = buf.readByte();
        int minute = buf.readByte();
        int second = buf.readByte();

        // BD定位状态
        int bdLocation = buf.readUnsignedByte();
        // BD信号强度
        int bdSignal = buf.readUnsignedByte();
        // BD经度
        double bdLng = CommonUtil.keepDecimal(buf.readUnsignedInt() * 0.000001, 6);
        // BD纬度
        double bdLat = CommonUtil.keepDecimal(buf.readUnsignedInt() * 0.000001, 6);

        // GPS定位状态
        int gpsLocation = buf.readUnsignedByte();
        // GPS信号强度
        int gpsSignal = buf.readUnsignedByte();
        // GPS经度
        double gpsLng = buf.readUnsignedInt() * 0.000001;
        // GPS纬度
        double gpsLat = buf.readUnsignedInt() * 0.000001;

        double enGpsLng = gpsLng;
        double enGpsLat = gpsLat;
        // 经纬度偏移
        Point point = GpsCorrectUtil.transform(gpsLat, gpsLng);
        if (point != null) {
            enGpsLng = CommonUtil.keepDecimal(point.getLng(), 6);
            enGpsLat = CommonUtil.keepDecimal(point.getLat(), 6);
        }

        // 海面速率
        int speed = buf.readUnsignedShort();
        // 浮标海拔高度
        int h = buf.readUnsignedShort();
        double height = h;
        if (h != 0xFFFF & h != 0xFFFE) {
            height = CommonUtil.keepDecimal(h * 0.1 - 1000, 1);
        }else {
            height *= 0.1;
        }

        // 海水温度 (有符号整数)
        int tp = buf.getUnsignedShort(buf.readerIndex());
        double temp = tp;

        int t = buf.readShort();
        if (tp != 0xFFFF & tp != 0xFFFE) {
            temp = CommonUtil.keepDecimal(t * 0.01, 2) - 100;
        }else {
            temp *= 0.01;
        }

        // 电池电压
        int voltage = buf.readUnsignedShort();

        if (!deviceCacheProvider.containsKey(sim)) {
            log.warn("不存在设备[{}]!", sim);
            return;
        }
        DeviceInfo deviceInfo = (DeviceInfo) deviceCacheProvider.get(sim);
        long id = deviceInfo.getId();

        String sql = "INSERT INTO `data`(fwq_time, bd_dire, bd_length, bd_cmdid, bd_data)VALUES(?, ?, ?, ?, ?)";
        Object[] param = new Object[]{new Date(), 1, bytes.length, cmd, CommonUtil.bytesToStr(bytes)};

        // 插入原始数据
        int row = jdbcTemplate.update(sql, param);
        if (row > 0) {
            log.info("插入原始数据[{}, {}]...", id, sim);
        } else {
            log.error("插入原始数据失败!");
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date(0));
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month - 1);
        calendar.set(Calendar.DAY_OF_MONTH, day);
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, second);
        Date gpsTime = calendar.getTime();

        // 过滤重复数据
        if (originalCacheProvider.containsKey(sim)) {
            OriginalInfo originalInfo = (OriginalInfo) originalCacheProvider.get(sim);

            if (originalInfo.getGpsTime() == gpsTime.getTime()) {

                log.info("过滤重复[{}, {}]数据[{}]", sim, DateUtil.dateToString(gpsTime), CommonUtil.bytesToStr(bytes));
                return;
            }
        }
        OriginalInfo originalInfo = new OriginalInfo(sim, gpsTime.getTime(), bytes, new Date());
        originalCacheProvider.put(sim, originalInfo);


        param = new Object[]{id, new Date(), gpsTime,
                bdLocation, bdSignal, bdLng, bdLat,
                gpsLocation, gpsSignal, enGpsLng, enGpsLat,
                speed, height, temp, voltage};
        String sqlItem = "(static_id, fwq_time, gps_time, " +
                "bd_positioning, bd_signal_intensity, bd_longitude, bd_latitude, " +
                "gps_positioning, gps_signal_intensity, gps_longitude, gps_latitude, " +
                "sea_speed, buoy_elevation, sea_depth, cell_voltage)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        // 插入历史表
        sql = "INSERT INTO current_ls" + sqlItem;
        row = jdbcTemplate.update(sql, param);
        if (row > 0) {
            log.debug("插入历史数据[{}, {}]...", id, sim);
        } else {
            log.error("插入历史数据失败！");
        }

        // 插入更新当前表
        sql = "REPLACE INTO current" + sqlItem;
        row = jdbcTemplate.update(sql, param);
        if (row > 0) {
            log.debug("更新实时数据[{}, {}]...", id, sim);
        } else {
            log.error("更新实时数据失败！");
        }

        try {
            // 转发 Webservice
            String forwardStr = "PG" + sim + ";" + sim + ";" + enGpsLng + ";" + enGpsLat + ";"
                    + speed + ";" + temp + ";" + DateUtil.dateToString(calendar.getTime()) + ";" + voltage + ";" + gpsLocation;

            // 假人使用数字1，浮球使用数字3
            String resp = forwardWs.send(new String[]{"data", "style"}, new String[]{forwardStr, "3"});
            log.info("数据转发[{}], 响应结果[{}]", forwardStr, resp);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("数据转发失败[{}]!", e.getMessage());
        }
    }
}
