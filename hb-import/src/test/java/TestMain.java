import com.diyiliu.plugin.util.CommonUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.hadoop.hbase.util.Bytes;
import org.junit.Test;
import sun.security.provider.MD5;

/**
 * Description: TestMain
 * Author: DIYILIU
 * Update: 2018-06-21 14:25
 */
public class TestMain {


    @Test
    public void test(){

        String id = "371985";

        long time = System.currentTimeMillis();


        byte[] idBytes = Bytes.toBytes(StringUtils.reverse(id).hashCode());
        byte[] timeBytes = Bytes.toBytes(Long.MAX_VALUE - time);

        byte[] rowKey = Bytes.add(idBytes, timeBytes);

        System.out.println(CommonUtil.bytesToStr(rowKey));
    }
}
