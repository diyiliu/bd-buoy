package com.diyiliu.client.jpa;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * Description: BuoyInfo
 * Author: DIYILIU
 * Update: 2018-07-03 15:46
 */

@Data
@Entity
@Table(name = "buoy_info")
public class BuoyInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String sim;

    private String type;

    private Integer gpsLocation;

    private Double gpsSignal;

    private Double gpsLat;

    private Double gpsLng;

    private Double speed;

    private Double altitude;

    private Double temp;

    private Double voltage;

    private Date gpsTime;

    private Date sysTime;

    private Date createTime;
}
