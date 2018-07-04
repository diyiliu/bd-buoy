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

        Map map = new HashMap();
        map.put("id", dataInfo.getSim());
        map.put("timestamp", System.currentTimeMillis());
        map.put("data", JacksonUtil.toJson(dataInfo));
        map.put("type", type);

        // 写入kafka
        kafkaUtil.send(dataInfo.getSim(), JacksonUtil.toJson(map));

        // 更新当前数据
        updateInfo(dataInfo, type);
    }

    private void updateInfo(DataInfo dataInfo, String type){
        String sim = dataInfo.getSim();

        BuoyInfo buoyInfo = buoyInfoJpa.findBySim(sim);
        if (buoyInfo == null){
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
        buoyInfo.setSysTime(new Date());

        buoyInfoJpa.save(buoyInfo);
    }
}
