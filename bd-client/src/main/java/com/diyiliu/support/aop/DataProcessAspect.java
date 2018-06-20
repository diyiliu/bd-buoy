package com.diyiliu.support.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * Description: DataProcessAspect
 * Author: DIYILIU
 * Update: 2018-06-20 14:32
 *
 */

@Aspect
@Component
public class DataProcessAspect {

    @After("execution(* com.diyiliu.gw.support.client.ForwardWs.dataProcess(..))")
    public void doAfter(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();

        System.out.println(args);
    }
}
