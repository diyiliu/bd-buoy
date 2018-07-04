package com.diyiliu.client.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Description: BuoyInfoJpa
 * Author: DIYILIU
 * Update: 2018-07-03 15:49
 */
public interface BuoyInfoJpa extends JpaRepository<BuoyInfo, Long> {

    BuoyInfo findBySim(String sim);
}
