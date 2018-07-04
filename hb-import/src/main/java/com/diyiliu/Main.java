package com.diyiliu;

import com.diyiliu.process.DataConsumer;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;

import java.util.Properties;

/**
 * Description: Main
 * Author: DIYILIU
 * Update: 2018-06-21 11:41
 */

public class Main {

    public static void main(String[] args) {
        String ZK_QUORUM = "dyl-171,dyl-172,dyl-173";

        Configuration config = HBaseConfiguration.create();
        config.set("hbase.zookeeper.property.clientPort", "2181");
        config.set("hbase.zookeeper.session.timeout", "180000");
        config.set("hbase.zookeeper.quorum", ZK_QUORUM);

        String BROKER_LIST = "dyl-171:9092,dyl-172:9092,dyl-173:9092";
        Properties props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BROKER_LIST);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "t1");
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
        props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, 1000);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);

        // latest 表示消费最新消息,earliest 表示从头开始消费,none表示抛出异常,默认latest
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        KafkaConsumer kafkaConsumer = new KafkaConsumer(props);

        DataConsumer consumer = new DataConsumer();
        consumer.setConfig(config);
        consumer.setDataTopic("bd_buoy");
        consumer.setHbTable("dyl:bd_buoy");
        consumer.setKafkaConsumer(kafkaConsumer);
        consumer.start();
    }
}
