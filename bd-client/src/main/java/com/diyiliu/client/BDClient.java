package com.diyiliu.client;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Description: BDClient
 * Author: DIYILIU
 * Update: 2018-06-20 10:47
 */

@SpringBootApplication
@ComponentScan({"com.diyiliu.client","com.diyiliu.gw"})
public class BDClient {

    public static void main(String[] args) {

        SpringApplication.run(BDClient.class, args);
    }
}
