package com.diyiliu.web.buoy.facade;

import com.diyiliu.web.buoy.dto.BuoyCurInfo;
import com.diyiliu.web.buoy.dto.BuoyInfo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Description: BuoyCurInfoJpa
 * Author: DIYILIU
 * Update: 2018-04-08 10:31
 */
public interface BuoyCurInfoJpa extends JpaRepository<BuoyCurInfo, Long> {

    BuoyCurInfo findByBuoyId(long buoyId);
}
