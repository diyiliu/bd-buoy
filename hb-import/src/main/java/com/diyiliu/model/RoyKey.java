package com.diyiliu.model;

import org.apache.commons.lang3.StringUtils;
import org.apache.hadoop.hbase.util.Bytes;

/**
 * Description: RoyKey
 * Author: DIYILIU
 * Update: 2018-06-21 14:25
 */
public class RoyKey {
    private String id;

    private Long timestamp;

    public RoyKey(String id, Long timestamp) {
        this.id = id;
        this.timestamp = timestamp;
    }

    /**
     *  行健
     *
     *  id反序 + (Long.max - 时间戳)
     *
     * @return
     */
    public byte[] toBytes(){
        byte[] prefix = Bytes.toBytes(StringUtils.reverse(id).hashCode());
        return Bytes.add(prefix, Bytes.toBytes(Long.MAX_VALUE - timestamp));
    }
}
