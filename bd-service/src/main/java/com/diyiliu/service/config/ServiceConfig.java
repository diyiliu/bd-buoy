package com.diyiliu.service.config;

import com.diyiliu.process.DataConsumer;
import com.diyiliu.service.util.HBaseUtil;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.annotation.Resource;
import java.util.Properties;

/**
 * Description: ServiceConfig
 * Author: DIYILIU
 * Update: 2018-07-04 15:49
 */

@Configuration
public class ServiceConfig {

    @Resource
    private Environment environment;


    @Bean
    public org.apache.hadoop.conf.Configuration hbConfig(){
        // HBase 配置
        org.apache.hadoop.conf.Configuration config = HBaseConfiguration.create();
        config.set("hbase.zookeeper.property.clientPort", "2181");
        config.set("hbase.zookeeper.session.timeout", "180000");
        config.set("hbase.zookeeper.quorum", environment.getProperty("hbase.zk-quorum"));

        return config;
    }

    @Bean
    public DataConsumer dataConsumer(){
        // kafka 配置
        Properties props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, environment.getProperty("kafka.broker-list"));
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "g1");
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
        props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, 1000);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        // latest 表示消费最新消息,earliest 表示从头开始消费,none表示抛出异常,默认latest
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        KafkaConsumer kafkaConsumer = new KafkaConsumer(props);


        // 消费topic 写入HBase
        DataConsumer consumer = new DataConsumer();
        consumer.setConfig(hbConfig());
        consumer.setDataTopic(environment.getProperty("kafka.raw-topic"));
        consumer.setHbTable(environment.getProperty("hbase.data-table"));
        consumer.setKafkaConsumer(kafkaConsumer);
        consumer.start();

        return consumer;
    }

    @Bean
    public HBaseUtil hbaseUtil(){
        HBaseUtil hbaseUtil = new HBaseUtil();
        hbaseUtil.setConfig(hbConfig());
        hbaseUtil.setTable(environment.getProperty("hbase.data-table"));

        return hbaseUtil;
    }
}
