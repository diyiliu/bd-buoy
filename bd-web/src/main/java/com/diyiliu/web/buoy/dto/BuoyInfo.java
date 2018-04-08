package com.diyiliu.web.buoy.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * Description: BuoyInfo
 * Author: DIYILIU
 * Update: 2018-04-08 10:15
 */

@Getter
@Setter
@MappedSuperclass
public class BuoyInfo {

    @Column(name = "fwq_time")
    private Date datetime;

    @Column(name = "gps_time")
    private Date gpsTime;

    // 北斗(BD)定位状态
    @Column(name = "bd_Positioning")
    private Integer bdLocation;

    // BD信号强度
    @Column(name = "bd_signal_intensity")
    private Integer bdSignal;

    // BD经度
    @Column(name = "bd_longitude")
    private Double bdLng;

    // BD纬度
    @Column(name = "bd_latitude")
    private Double bdLat;

    // GPS定位状态
    @Column(name = "gps_Positioning")
    private Integer gpsLocation;

    // GPS信号强度
    @Column(name = "gps_signal_intensity")
    private Integer gpsSignal;

    // GPS经度
    @Column(name = "gps_longitude")
    private Double gpsLng;

    // GPS纬度
    @Column(name = "gps_latitude")
    private Double gpsLat;

    // 海面速率
    @Column(name = "sea_speed")
    private Integer speed;

    // 浮标海拔高度
    @Column(name = "Buoy_elevation")
    private Double height;

    // 海水温度
    @Column(name = "sea_depth")
    private Double temp;

    // 电池电压
    @Column(name = "Cell_voltage")
    private Integer voltage;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "static_id")
    private Buoy buoy;
}
