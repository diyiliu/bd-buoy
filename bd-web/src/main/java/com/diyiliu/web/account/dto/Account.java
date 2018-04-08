package com.diyiliu.web.account.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Description: Account
 * Author: DIYILIU
 * Update: 2018-04-05 23:55
 */

@Getter
@Setter
@Entity
@Table(name = "login")
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    private String username;

    private String password;

    private Integer power;
}
