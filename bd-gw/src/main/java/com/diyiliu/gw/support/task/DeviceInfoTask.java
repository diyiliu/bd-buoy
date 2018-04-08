package com.diyiliu.gw.support.task;

import com.diyiliu.gw.support.bean.DeviceInfo;
import com.diyiliu.gw.support.dao.DeviceInfoDao;
import com.diyiliu.plugin.cache.ICache;
import com.diyiliu.plugin.task.ITask;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;

import java.util.*;

/**
 * Description: DeviceInfoTask
 * Author: DIYILIU
 * Update: 2018-04-04 14:12
 */

@Slf4j
public class DeviceInfoTask  implements ITask {
    private ICache deviceCache;

    private DeviceInfoDao deviceDao;

    public DeviceInfoTask(DeviceInfoDao deviceDao, ICache deviceCache) {
        this.deviceDao = deviceDao;
        this.deviceCache = deviceCache;
    }

    @Override
    public void execute() {
        log.info("刷新设备列表...");

        List<DeviceInfo> list = deviceDao.selectDeviceInfo();
        refresh(list, deviceCache);
    }

    private void refresh(List<DeviceInfo> deviceList, ICache deviceCache) {
        if (deviceList == null || deviceList.size() < 1){
            log.warn("无设备!");
            return;
        }

        Set oldKeys = deviceCache.getKeys();
        Set tempKeys = new HashSet(deviceList.size());

        for (DeviceInfo device : deviceList) {
            deviceCache.put(device.getSim(), device);
            tempKeys.add(device.getSim());
        }

        Collection subKeys = CollectionUtils.subtract(oldKeys, tempKeys);
        for (Iterator iterator = subKeys.iterator(); iterator.hasNext();){
            String key = (String) iterator.next();
            deviceCache.remove(key);
        }
    }
}
