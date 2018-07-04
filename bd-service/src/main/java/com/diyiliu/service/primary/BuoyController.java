package com.diyiliu.service.primary;

import com.diyiliu.service.model.DataInfo;
import com.diyiliu.service.primary.dto.BuoyInfo;
import com.diyiliu.service.util.HBaseUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Description: BuoyController
 * Author: DIYILIU
 * Update: 2018-07-04 13:49
 */

@RestController
@RequestMapping("/buoy")
@Api(description = "设备指令下发接口")
public class BuoyController {

    @Resource
    private HBaseUtil hbaseUtil;

    @GetMapping("/list/{sim}")
    @ApiOperation(value = "查询历史数据", notes = "查询浮球历史轨迹")
    public List<BuoyInfo> queryBuoy(@PathVariable("sim") String sim) throws Exception{

        Date end = new Date();

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, -1);

        Date start = calendar.getTime();


        List<DataInfo> dataInfos = hbaseUtil.scanBuoyList(sim, start, end, 0);


        return null;
    }
}
