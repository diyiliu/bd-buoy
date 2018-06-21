package com.diyiliu.model;

import lombok.Data;

/**
 * Description: RawData
 * Author: DIYILIU
 * Update: 2018-06-21 13:45
 */

@Data
public class RawData {
    private String id;

    private Long timestamp;

    private String type;

    private String data;
}
