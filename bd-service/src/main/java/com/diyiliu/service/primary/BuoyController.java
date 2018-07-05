package com.diyiliu.service.primary;

import com.diyiliu.plugin.util.DateUtil;
import com.diyiliu.service.model.DataInfo;
import com.diyiliu.service.primary.dto.BuoyInfo;
import com.diyiliu.service.primary.facade.BuoyInfoJpa;
import com.diyiliu.service.util.HBaseUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Description: BuoyController
 * Author: DIYILIU
 * Update: 2018-07-04 13:49
 */

@RestController
@RequestMapping("/buoy")
@Api(description = "数据查询接口")
public class BuoyController {

    @Resource
    private HBaseUtil hbaseUtil;

    @Resource
    private BuoyInfoJpa buoyInfoJpa;

    @GetMapping("/list/{sim}")
    @ApiOperation(value = "查询历史数据", notes = "查询浮球历史轨迹")
    public List<DataInfo> queryBuoy(@PathVariable("sim") String sim, @RequestParam("startTime") String startTime,
                                    @RequestParam("endTime") String endTime, @RequestParam(value = "location", required = false) Integer location) throws Exception {
        Date start = DateUtil.stringToDate(startTime);
        Date end = DateUtil.stringToDate(endTime);

        return hbaseUtil.scanBuoyList(sim, start, end, location);
    }


    @GetMapping("/list")
    @ApiOperation(value = "查询实时数据", notes = "查询浮球当前位置")
    public List<BuoyInfo> queryBuoy() {

        return buoyInfoJpa.findAll(Sort.by(Sort.Direction.DESC, "gpsTime"));
    }
}
