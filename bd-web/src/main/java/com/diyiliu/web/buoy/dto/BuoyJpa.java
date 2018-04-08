package com.diyiliu.web.buoy.dto;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Description: BuoyJpa
 * Author: DIYILIU
 * Update: 2018-04-06 21:13
 */
public interface BuoyJpa extends JpaRepository<Buoy, Long> {

    List<Buoy> findBuoysByTypeOrderByName(int type);
}
