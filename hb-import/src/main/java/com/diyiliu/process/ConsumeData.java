package com.diyiliu.process;

import com.diyiliu.model.RawData;
import com.diyiliu.model.RoyKey;
import com.diyiliu.plugin.util.JacksonUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.Table;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.util.Arrays;

/**
 * Description: ConsumeData
 * Author: DIYILIU
 * Update: 2018-06-21 13:53
 */

@Slf4j
public class ConsumeData extends Thread {
    private final static byte[] CF = "0".getBytes();

    private String dataTopic;
    private KafkaConsumer kafkaConsumer;

    private Configuration config;
    private String hbTable;

    @Override
    public void run() {
        try (Connection connection = ConnectionFactory.createConnection(config)) {
            TableName tableName = TableName.valueOf(hbTable);
            Table table = connection.getTable(tableName);

            kafkaConsumer.subscribe(Arrays.asList(dataTopic));
            while (true) {
                ConsumerRecords<String, String> records = kafkaConsumer.poll(100);

                for (ConsumerRecord<String, String> record : records) {
                    String value = record.value();

                    RawData data = JacksonUtil.toObject(value, RawData.class);
                    RoyKey royKey = new RoyKey(data.getId(), data.getTimestamp());

                    Put p = new Put(royKey.toBytes());
                    p.addColumn(CF, Bytes.toBytes(data.getType()), Bytes.toBytes(data.getData()));
                    table.put(p);

                    log.info("消费Kafka写入HBase[{}] ...", data.toString());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setDataTopic(String dataTopic) {
        this.dataTopic = dataTopic;
    }

    public void setKafkaConsumer(KafkaConsumer kafkaConsumer) {
        this.kafkaConsumer = kafkaConsumer;
    }

    public void setConfig(Configuration config) {
        this.config = config;
    }

    public void setHbTable(String hbTable) {
        this.hbTable = hbTable;
    }
}
