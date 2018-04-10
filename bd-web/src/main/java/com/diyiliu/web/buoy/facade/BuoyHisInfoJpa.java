package com.diyiliu.web.buoy.facade;

import com.diyiliu.web.buoy.dto.BuoyHisInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

/**
 * Description: BuoyHisInfoJpa
 * Author: DIYILIU
 * Update: 2018-04-08 11:24
 */

public interface BuoyHisInfoJpa extends JpaRepository<BuoyHisInfo, Long>, JpaSpecificationExecutor<BuoyHisInfo> {

    List<BuoyHisInfo> findByBuoyIdAndGpsTimeBetweenOrderByGpsTimeDesc(long buoyId, Date d1, Date d2);

    @Query("select t from BuoyHisInfo t where t.gpsTime > :#{#sTime} and t.gpsTime < :#{#eTime} " +
            " group by t.gpsTime, t.buoyId order by  t.gpsTime desc")
    Page<BuoyHisInfo> findAllByGpsTime(@Param("sTime") Date sTime, @Param("eTime") Date eTime, Pageable pageable);

    @Query("select t from BuoyHisInfo t where t.gpsTime > ?1 and t.gpsTime < ?2 " +
            " and  t.buoyId = ?3 group by t.gpsTime, t.buoyId order by  t.gpsTime desc")
    Page<BuoyHisInfo> findAllByGpsTimeAndBuoyId(Date sTime, Date eTime, Long buoyId, Pageable pageable);
}
