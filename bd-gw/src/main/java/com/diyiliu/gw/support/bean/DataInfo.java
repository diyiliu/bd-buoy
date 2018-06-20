package com.diyiliu.gw.support.bean;

import lombok.Data;
import java.util.Date;

/**
 * Description: DataInfo
 * Author: DIYILIU
 * Update: 2018-06-20 15:03
 */

@Data
public class DataInfo {

    private String sim;

    private Date gpsTime;

    private Integer bdLocation;

    private Integer bdSignal;

    private Double bdLng;

    private Double bdLat;

    private Integer gpsLocation;

    private Integer gpsSignal;

    private Double gpsLng;

    private Double gpsLat;

    private Double speed;

    private Double height;

    private Double temp;

    private Double voltage;
}
