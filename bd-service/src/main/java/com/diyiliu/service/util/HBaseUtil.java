package com.diyiliu.service.util;

import com.diyiliu.plugin.util.JacksonUtil;
import com.diyiliu.service.model.DataInfo;
import org.apache.commons.lang.StringUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.filter.BinaryComparator;
import org.apache.hadoop.hbase.filter.CompareFilter;
import org.apache.hadoop.hbase.filter.FilterList;
import org.apache.hadoop.hbase.filter.QualifierFilter;
import org.apache.hadoop.hbase.util.Bytes;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Description: HBaseUtil
 * Author: DIYILIU
 * Update: 2018-07-04 16:13
 */

public class HBaseUtil {
    private final static byte[] FAMILY = "0".getBytes();

    private Configuration config;
    private String table;

    /**
     *  查询浮球信息
     *
     * @param sim
     * @param start
     * @param end
     * @param location 定位状态
     * @return
     * @throws Exception
     */
    public List<DataInfo> scanBuoyList(String sim, Date start, Date end, Integer location) throws Exception {
        byte[] prefix = Bytes.toBytes(StringUtils.reverse(sim).hashCode());
        byte[] startBytes = Bytes.add(prefix, Bytes.toBytes(Long.MAX_VALUE - end.getTime()));
        byte[] endBytes = Bytes.add(prefix, Bytes.toBytes(Long.MAX_VALUE - start.getTime()));

        List<DataInfo> list = new ArrayList();
        // 时间倒序
        byte[] startRow = startBytes;
        byte[] stopRow = endBytes;
        try (Connection connection = ConnectionFactory.createConnection(config)) {
            TableName tableName = TableName.valueOf(table);
            Table table = connection.getTable(tableName);

            Scan scan = new Scan(startRow, stopRow);
            scan.addFamily(FAMILY);

            byte[] statusBytes = Bytes.toBytes(location + "");
            FilterList qualifierFilters = new FilterList(FilterList.Operator.MUST_PASS_ONE);
            qualifierFilters.addFilter(new QualifierFilter(CompareFilter.CompareOp.EQUAL, new BinaryComparator(statusBytes)));
            scan.setFilter(qualifierFilters);

            ResultScanner rs = table.getScanner(scan);
            try {
                for (Result r = rs.next(); r != null; r = rs.next()) {

                    if (r.containsNonEmptyColumn(FAMILY, statusBytes)) {
                        String value = Bytes.toString(r.getValue(FAMILY, statusBytes));

                        DataInfo dataInfo = JacksonUtil.toObject(value, DataInfo.class);
                        list.add(dataInfo);
                    }
                }
            } finally {
                rs.close();
            }
        }

        return list;
    }

    public void setConfig(Configuration config) {
        this.config = config;
    }

    public void setTable(String table) {
        this.table = table;
    }
}
