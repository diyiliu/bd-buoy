package com.diyiliu.support.config;

import com.diyiliu.gw.netty.server.BDServer;
import com.diyiliu.gw.support.client.ForwardWs;
import com.diyiliu.support.client.KafkaClient;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.annotation.Resource;
import java.util.Properties;

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


    @Bean
    public KafkaClient kafkaClient(){
        String topic =  environment.getProperty("kafka.bd-topic");
        String brokerList = environment.getProperty("kafka.broker-list");

        Properties props = new Properties();
        // kafka broker 列表
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, brokerList);
        // 设置序列化类
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        KafkaProducer<String, String> producer = new KafkaProducer(props);

        return new KafkaClient(topic, producer);
    }
}
