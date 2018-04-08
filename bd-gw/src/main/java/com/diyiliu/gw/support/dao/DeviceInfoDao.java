package com.diyiliu.gw.support.dao;

import com.diyiliu.gw.support.bean.DeviceInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.util.List;

/**
 * Description: DeviceInfoDao
 * Author: DIYILIU
 * Update: 2018-04-04 14:17
 */

@Component
public class DeviceInfoDao {

    @Resource
    private JdbcTemplate jdbcTemplate;


    public List<DeviceInfo> selectDeviceInfo(){
        String sql = "SELECT t.id, t.`name`, t.sim, t.user_id user FROM static t";
        
        return jdbcTemplate.query(sql, (ResultSet rs, int rowNum) -> {
            DeviceInfo deviceInfo = new DeviceInfo();
            deviceInfo.setId(rs.getLong("id"));
            deviceInfo.setName(rs.getString("name"));
            deviceInfo.setSim(rs.getString("sim"));
            deviceInfo.setUser(rs.getInt("user"));

            return deviceInfo;
        });
    }

}
