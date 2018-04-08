package com.diyiliu.gw.support.config;

import com.diyiliu.gw.support.dao.DeviceInfoDao;
import com.diyiliu.gw.support.task.DeviceInfoTask;
import com.diyiliu.plugin.cache.ICache;
import com.diyiliu.plugin.task.ITask;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import javax.annotation.Resource;

/**
 * Description: SpringQuartz
 * Author: DIYILIU
 * Update: 2018-04-04 14:30
 */

@Configuration
@EnableScheduling
public class SpringQuartz {

    @Resource
    private DeviceInfoDao deviceInfoDao;

    @Resource
    private ICache deviceCacheProvider;

    /**
     * 刷新设备列表
     */
    @Scheduled(fixedDelay = 10 * 60 * 1000, initialDelay = 3 * 1000)
    public void refreshTaskDeviceInfo() {

        ITask task = new DeviceInfoTask(deviceInfoDao, deviceCacheProvider);
        task.execute();
    }
}
