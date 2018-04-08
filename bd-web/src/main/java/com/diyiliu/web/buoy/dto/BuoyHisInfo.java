package com.diyiliu.web.buoy.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Description: BuoyHisInfo
 * Author: DIYILIU
 * Update: 2018-04-08 11:23
 */

@Setter
@Getter
@Entity
@Table(name = "current_ls")
public class BuoyHisInfo extends BuoyInfo {

    @Id
    private Long id;

    @Column(name = "static_id", insertable = false, updatable = false)
    private Long buoyId;
}
