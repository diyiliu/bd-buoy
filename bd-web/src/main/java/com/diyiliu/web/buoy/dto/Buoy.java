package com.diyiliu.web.buoy.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 *  浮标
 * Description: Buoy
 * Author: DIYILIU
 * Update: 2018-04-06 21:08
 */

@Getter
@Setter
@Entity
@Table(name = "static")
public class Buoy {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String sim;

    @Column(name = "user_id")
    private Integer type;

    private Date time;
}
