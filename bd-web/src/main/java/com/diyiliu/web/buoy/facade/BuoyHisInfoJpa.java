package com.diyiliu.web.buoy.facade;

import com.diyiliu.web.buoy.dto.BuoyHisInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

/**
 * Description: BuoyHisInfoJpa
 * Author: DIYILIU
 * Update: 2018-04-08 11:24
 */
public interface BuoyHisInfoJpa extends JpaRepository<BuoyHisInfo, Long> {

    List<BuoyHisInfo> findByBuoyIdAndGpsTimeBetweenOrderByGpsTimeDesc(long buoyId, Date d1, Date d2);
}
