package com.diyiliu.support.config;

import com.diyiliu.gw.netty.server.BDServer;
import com.diyiliu.gw.support.client.ForwardWs;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.annotation.Resource;

/**
 * Description: BDConfig
 * Author: DIYILIU
 * Update: 2018-06-20 10:49
 */

@Configuration
@PropertySource(value = {"classpath:config/bd.properties"})
public class BDConfig {

    @Resource
    private Environment environment;

    @Bean
    public BDServer bdServer() {
        BDServer bdServer = new BDServer();
        bdServer.setPort(environment.getProperty("gw.port", Integer.class));
        bdServer.init();

        return bdServer;
    }

    @Bean
    public ForwardWs forwardWs() {
        ForwardWs forwardWs = new ForwardWs();
        forwardWs.setUrl(environment.getProperty("fw.url"));
        forwardWs.setNameSpace(environment.getProperty("fw.nameSpace"));
        forwardWs.setMethodName(environment.getProperty("fw.method"));

        return forwardWs;
    }
}
