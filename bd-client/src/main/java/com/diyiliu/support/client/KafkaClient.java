package com.diyiliu.support.client;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

/**
 * Description: KafkaClient
 * Author: DIYILIU
 * Update: 2018-06-20 16:57
 */

@Slf4j
public class KafkaClient {
    private String dataTopic;
    private KafkaProducer kafkaProducer;

    public KafkaClient(String dataTopic, KafkaProducer kafkaProducer) {
        this.dataTopic = dataTopic;
        this.kafkaProducer = kafkaProducer;
    }

    public void send(String key, String content) {
        log.info("写入kafka: [{}, {}]", key, content);

        ProducerRecord<String, String> record = new ProducerRecord(dataTopic, content);
        kafkaProducer.send(record);
    }
}
