package com.diyiliu.gw.support.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * Description: OriginalInfo
 * Author: DIYILIU
 * Update: 2018-04-09 10:53
 */

@Setter
@Getter
public class OriginalInfo {

    public OriginalInfo() {

    }

    public OriginalInfo(String sim, Long gpsTime, byte[] bytes, Date dateTime) {
        this.sim = sim;
        this.gpsTime = gpsTime;
        this.bytes = bytes;
        this.dateTime = dateTime;
    }

    private String sim;

    private Long gpsTime;

    private byte[] bytes;

    private Date dateTime;
}
