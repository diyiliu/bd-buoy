package com.diyiliu.support.aop;

import com.diyiliu.gw.support.bean.DataInfo;
import com.diyiliu.plugin.util.JacksonUtil;
import com.diyiliu.support.client.KafkaClient;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

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
        kafkaClient.send(dataInfo.getSim(), JacksonUtil.toJson(dataInfo));
    }
}
