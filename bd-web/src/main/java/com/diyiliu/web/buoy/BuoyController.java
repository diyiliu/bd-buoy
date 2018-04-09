package com.diyiliu.web.buoy;

import com.diyiliu.plugin.util.DateUtil;
import com.diyiliu.web.buoy.dto.Buoy;
import com.diyiliu.web.buoy.dto.BuoyHisInfo;
import com.diyiliu.web.buoy.dto.BuoyInfo;
import com.diyiliu.web.buoy.facade.BuoyCurInfoJpa;
import com.diyiliu.web.buoy.facade.BuoyHisInfoJpa;
import com.diyiliu.web.buoy.facade.BuoyJpa;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Description: BuoyController
 * Author: DIYILIU
 * Update: 2018-04-06 21:08
 */

@RestController
@RequestMapping("/buoy")
public class BuoyController {
    private final static Integer PAGE_SIZE = 15;

    @Resource
    private BuoyJpa buoyJpa;

    @Resource
    private BuoyCurInfoJpa buoyCurInfoJpa;

    @Resource
    private BuoyHisInfoJpa buoyHisInfoJpa;


    @PostMapping("/queryBuoy")
    public List queryBuoy(@RequestParam String fbmc) {
        Buoy buoy = buoyJpa.findBuoyByName(fbmc);

        long buoyId = buoy.getId();
        BuoyInfo buoyInfo = buoyCurInfoJpa.findByBuoyId(buoyId);

        List list = new ArrayList();
        list.add(new ArrayList() {
            {
                this.add(buoy.getName());
                this.add(buoy.getSim());
            }
        });

        if (buoyInfo == null || buoyInfo.getGpsTime() == null) {
            list.add(new ArrayList() {
                {
                    this.add(buoyInfo);
                }
            });

            return list;
        }

        Date gpsTime = buoyInfo.getGpsTime();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(gpsTime);
        calendar.add(Calendar.DAY_OF_MONTH, -1);

        Date hisDate = calendar.getTime();
        List hisList = buoyHisInfoJpa.findByBuoyIdAndGpsTimeBetweenOrderByGpsTimeDesc(buoyId, hisDate, gpsTime);
        list.add(hisList);

        return list;
    }


    @PostMapping("/queryHisInfo")
    public List queryHisInfo(@RequestParam(required = false) String fbmc, @RequestParam String time, @RequestParam int page) {
        String starTime = time.substring(0, 19);
        String endTime = time.substring(22, 41);
        Date sTime = DateUtil.stringToDate(starTime);
        Date eTime = DateUtil.stringToDate(endTime);

        Pageable pageable = PageRequest.of(page, PAGE_SIZE, Sort.by(Sort.Direction.DESC, "gpsTime"));
        Page<BuoyHisInfo> buoyHisInfoPage = buoyHisInfoJpa.findAll(
                (Root<BuoyHisInfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
                    Path<Date> gpsTimeExp = root.get("gpsTime");
                    Buoy buoy = null;
                    if (StringUtils.isNotBlank(fbmc)) {
                        buoy = buoyJpa.findBuoyByName(fbmc);
                    }

                    /*
                    query.select(cb.countDistinct(gpsTimeExp));
                    query.select(cb.countDistinct(gpsTimeExp));
                    */

                    if (buoy == null) {

                        return cb.and(new Predicate[]{cb.greaterThan(gpsTimeExp, sTime), cb.lessThan(gpsTimeExp, eTime)});
                    } else {
                        Path<String> buoyIdExp = root.get("buoyId");

                        return cb.and(new Predicate[]{cb.between(gpsTimeExp, sTime, eTime), cb.equal(buoyIdExp, buoy.getId())});
                    }
                }, pageable);

        List list = new ArrayList();
        list.add(buoyHisInfoPage.getTotalElements());
        list.add(buoyHisInfoPage.getContent());


        return list;
    }

}
