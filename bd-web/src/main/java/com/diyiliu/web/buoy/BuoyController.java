package com.diyiliu.web.buoy;

import com.diyiliu.web.buoy.dto.*;
import com.diyiliu.web.buoy.facade.BuoyHisInfoJpa;
import com.diyiliu.web.buoy.facade.BuoyCurInfoJpa;
import com.diyiliu.web.buoy.facade.BuoyJpa;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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
}
