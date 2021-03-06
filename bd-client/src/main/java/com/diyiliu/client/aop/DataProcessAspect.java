package com.diyiliu.client.aop;

import com.diyiliu.client.jpa.BuoyInfo;
import com.diyiliu.client.jpa.BuoyInfoJpa;
import com.diyiliu.client.util.KafkaUtil;
import com.diyiliu.gw.support.bean.DataInfo;
import com.diyiliu.plugin.util.JacksonUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Description: DataProcessAspect
 * Author: DIYILIU
 * Update: 2018-06-20 14:32
 */

@Aspect
@Component
public class DataProcessAspect {

    @Resource
    private KafkaUtil kafkaUtil;

    @Resource
    private BuoyInfoJpa buoyInfoJpa;

    @After("execution(* com.diyiliu.gw.support.client.ForwardWs.dataProcess(..))")
    public void doAfter(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();

        DataInfo dataInfo = (DataInfo) args[0];
        String type = String.valueOf(args[1]);
        dataInfo.setSysTime(new Date());

        // 更新当前数据
        updateInfo(dataInfo, type);

        // HBase 行健时间戳
        long timestamp = dataInfo.getGpsTime() == null ? System.currentTimeMillis()
                : dataInfo.getGpsTime().getTime();

        Map map = new HashMap();
        map.put("id", dataInfo.getSim());
        map.put("timestamp", timestamp);
        map.put("data", JacksonUtil.toJson(dataInfo));
        map.put("type", dataInfo.getGpsLocation() + "");

        // 写入kafka
        kafkaUtil.send(JacksonUtil.toJson(map));
    }

    private void updateInfo(DataInfo dataInfo, String type) {
        String sim = dataInfo.getSim();

        BuoyInfo buoyInfo = buoyInfoJpa.findBySim(sim);
        if (buoyInfo == null) {
            buoyInfo = new BuoyInfo();
            buoyInfo.setSim(sim);
            buoyInfo.setCreateTime(new Date());
        }

        buoyInfo.setType(type);
        buoyInfo.setGpsTime(dataInfo.getGpsTime());
        buoyInfo.setGpsLocation(dataInfo.getGpsLocation());
        // buoyInfo.setGpsSignal(dataInfo.getGpsSignal());
        buoyInfo.setGpsLat(dataInfo.getGpsLat());
        buoyInfo.setGpsLng(dataInfo.getGpsLng());
        buoyInfo.setSpeed(dataInfo.getSpeed());
        buoyInfo.setAltitude(dataInfo.getHeight());
        buoyInfo.setTemp(dataInfo.getTemp());
        buoyInfo.setVoltage(dataInfo.getVoltage());
        buoyInfo.setSysTime(dataInfo.getSysTime());

        buoyInfoJpa.save(buoyInfo);
    }
}
