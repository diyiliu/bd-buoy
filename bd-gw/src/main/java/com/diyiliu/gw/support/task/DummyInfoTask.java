package com.diyiliu.gw.support.task;

import com.diyiliu.gw.support.bean.DeviceInfo;
import com.diyiliu.gw.support.client.ForwardWs;
import com.diyiliu.gw.support.dao.DeviceInfoDao;
import com.diyiliu.plugin.model.Point;
import com.diyiliu.plugin.task.ITask;
import com.diyiliu.plugin.util.CommonUtil;
import com.diyiliu.plugin.util.DateUtil;
import com.diyiliu.plugin.util.GpsCorrectUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Description: DummyInfoTask
 * Author: DIYILIU
 * Update: 2018-05-21 14:22
 */

@Slf4j
public class DummyInfoTask implements ITask {
    private final static String _BAK_MAIL_PATH = "_bak/mails/";

    private DeviceInfoDao deviceDao;

    private String mailPath = "./IridiumMail/mails";

    private JdbcTemplate jdbcTemplate;

    private ForwardWs forwardWs;

    @Override
    public void execute() {
        List<DeviceInfo> list = deviceDao.selectDeviceInfo();

        // 假人数据
        Map<String, DeviceInfo> dummyMap = list.stream().filter(d -> d.getUser() == 3).collect(Collectors.toMap(DeviceInfo::getSim, d -> d));
        File file = new File(mailPath);
        if (file.exists() && file.listFiles().length > 0) {

            File[] files = file.listFiles();
            for (File f : files) {
                String name = f.getName();
                if (!dummyMap.containsKey(name)) {
                    continue;
                }

                File bakDir = new File(_BAK_MAIL_PATH + name);
                if (!bakDir.exists()) {
                    bakDir.mkdirs();
                }

                DeviceInfo deviceInfo = dummyMap.get(name);
                if (f.isDirectory()) {
                    File[] dataFile = f.listFiles();
                    try {
                        for (File data : dataFile) {
                            if (data.isFile()) {
                                byte[] bytes = FileCopyUtils.copyToByteArray(data);
                                if (data.getName().endsWith(".sbd")) {
                                    dealMail(deviceInfo, bytes);
                                }
                                // 备份文件
                                File bakFile = new File(bakDir.getAbsolutePath() + File.separator + data.getName());
                                FileCopyUtils.copy(bytes, new FileOutputStream(bakFile));
                                // 删除文件
                                data.delete();
                            }
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    private void dealMail(DeviceInfo deviceInfo, byte[] bytes) {
        String content = CommonUtil.bytesToStr(bytes);

        String year = 20 + content.substring(0, 2);
        String month = content.substring(2, 4);
        String day = content.substring(4, 6);
        String hour = content.substring(6, 8);
        String minute = content.substring(8, 10);
        String second = content.substring(10, 12);

        String gpsTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        Date gpsDate = DateUtil.stringToDate(gpsTime);

        double lat = dm2Double(content.substring(12, 14), content.substring(14, 20));
        char latDir = (char) Integer.parseInt(content.substring(20, 22), 16);
        if ('S' == latDir) {
            lat = -lat;
        }

        double lng = dm2Double(content.substring(22, 26), content.substring(26, 32));
        char lngDir = (char) Integer.parseInt(content.substring(32, 34), 16);
        if ('W' == lngDir) {
            lng = -lng;
        }

        // 经纬度偏移
        Point point = GpsCorrectUtil.transform(lat, lng);
        if (point != null) {
            lat = CommonUtil.keepDecimal(point.getLat(), 6);
            lng = CommonUtil.keepDecimal(point.getLng(), 6);
        }


        double temp = Integer.parseInt(content.substring(34, 36), 16) * 2 / 10 - 10;
        double voltage = Integer.parseInt(content.substring(36, 38), 16) / 10;
        int interval = Integer.parseInt(content.substring(38), 16);

        long id = deviceInfo.getId();
        String sim = deviceInfo.getSim();

        String sql = "INSERT INTO `data`(fwq_time, bd_dire, bd_length, bd_cmdid, bd_data)VALUES(?, ?, ?, ?, ?)";
        Object[] param = new Object[]{new Date(), 1, bytes.length, 2, content};

        // 插入原始数据
        int row = jdbcTemplate.update(sql, param);
        if (row > 0) {
            log.info("插入假人原始数据[{}, {}]...", id, sim);
        } else {
            log.error("插入假人原始数据失败!");
        }

        param = new Object[]{id, new Date(), gpsDate,
                0, 50, lng, lat, temp, voltage};
        String sqlItem = "(static_id, fwq_time, gps_time, " +
                "gps_positioning, gps_signal_intensity, gps_longitude, gps_latitude, sea_depth, cell_voltage)VALUES(?,?,?,?,?,?,?,?,?)";

        // 插入历史表
        sql = "INSERT INTO current_ls" + sqlItem;
        row = jdbcTemplate.update(sql, param);
        if (row > 0) {
            log.debug("插入假人历史数据[{}, {}]...", id, sim);
        } else {
            log.error("插入假人历史数据失败！");
        }

        // 插入更新当前表
        sql = "REPLACE INTO current" + sqlItem;
        row = jdbcTemplate.update(sql, param);
        if (row > 0) {
            log.debug("更新假人实时数据[{}, {}]...", id, sim);
        } else {
            log.error("更新假人实时数据失败！");
        }

        try {
            // 转发 Webservice
            String forwardStr = "PG" + sim + ";" + sim + ";" + lng + ";" + lat + ";"
                    + 0 + ";" + temp + ";" + gpsTime + ";" + voltage + ";" + 0;

            // 假人使用数字1，浮球使用数字3
            String resp = forwardWs.send(new String[]{"data", "style"}, new String[]{forwardStr, "1"});
            log.info("数据转发[{}], 响应结果[{}]", forwardStr, resp);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("数据转发失败[{}]!", e.getMessage());
        }

    }

    /**
     * 度分 转 double
     *
     * @param d
     * @param m
     * @return
     */
    private double dm2Double(String d, String m) {
        BigDecimal decimal = new BigDecimal(d).add(new BigDecimal(m).divide(new BigDecimal(600000), 6, RoundingMode.HALF_UP));

        return decimal.doubleValue();
    }

    public void setDeviceDao(DeviceInfoDao deviceDao) {
        this.deviceDao = deviceDao;
    }

    public void setMailPath(String mailPath) {
        this.mailPath = mailPath;
    }

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void setForwardWs(ForwardWs forwardWs) {
        this.forwardWs = forwardWs;
    }
}
