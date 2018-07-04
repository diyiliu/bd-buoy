package com.diyiliu.client.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

/**
 * Description: KafkaUtil
 * Author: DIYILIU
 * Update: 2018-07-04 09:05
 */

@Slf4j
public class KafkaUtil {
    private String dataTopic;
    private KafkaProducer kafkaProducer;

    public KafkaUtil(String dataTopic, KafkaProducer kafkaProducer) {
        this.dataTopic = dataTopic;
        this.kafkaProducer = kafkaProducer;
    }

    public void send(String content) {
        ProducerRecord<String, String> record = new ProducerRecord(dataTopic, content);
        kafkaProducer.send(record);
    }
}
