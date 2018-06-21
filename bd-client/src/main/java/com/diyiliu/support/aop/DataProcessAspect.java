package com.diyiliu.support.aop;

import com.diyiliu.gw.support.bean.DataInfo;
import com.diyiliu.plugin.util.JacksonUtil;
import com.diyiliu.support.client.KafkaClient;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * Description: DataProcessAspect
 * Author: DIYILIU
 * Update: 2018-06-20 14:32
 *
 */

@Aspect
@Component
public class DataProcessAspect {

    @Resource
    private KafkaClient kafkaClient;

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
        kafkaClient.send(dataInfo.getSim(), JacksonUtil.toJson(map));
    }
}
