package com.diyiliu.web.buoy.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Description: BuoyCurInfo
 * Author: DIYILIU
 * Update: 2018-04-08 13:34
 */

@Setter
@Getter
@Entity
@Table(name = "current")
public class BuoyCurInfo extends BuoyInfo {

    @Id
    @Column(name = "static_id")
    private Long buoyId;
}
