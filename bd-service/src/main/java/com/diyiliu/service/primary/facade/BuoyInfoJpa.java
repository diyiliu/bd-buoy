package com.diyiliu.service.primary.facade;

import com.diyiliu.service.primary.dto.BuoyInfo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Description: BuoyInfoJpa
 * Author: DIYILIU
 * Update: 2018-07-03 15:49
 */
public interface BuoyInfoJpa extends JpaRepository<BuoyInfo, Long> {

    BuoyInfo findBySim(String sim);
}
