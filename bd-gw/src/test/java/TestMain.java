import com.diyiliu.plugin.model.Point;
import com.diyiliu.plugin.util.CommonUtil;
import com.diyiliu.plugin.util.GpsCorrectUtil;
import org.junit.Test;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Description: TestMain
 * Author: DIYILIU
 * Update: 2018-05-21 11:05
 */

public class TestMain {


    @Test
    public void test() throws Exception {

        File file = new File("F:\\临时\\北斗\\铱星数据\\5140_000293__20180314161143.sbd");

        byte[] bytes = FileCopyUtils.copyToByteArray(file);

        String content = CommonUtil.bytesToStr(bytes);

        System.out.println(content);

        String year = 20 + content.substring(0, 2);
        String month = content.substring(2, 4);
        String day = content.substring(4, 6);
        String hour = content.substring(6, 8);
        String minute = content.substring(8, 10);
        String second = content.substring(10, 12);

        String gpsTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

        System.out.println(gpsTime);

        double lat = dm2Double(content.substring(12, 14), content.substring(14, 20));
        char latDir = (char) Integer.parseInt(content.substring(20, 22), 16);

        double lng = dm2Double(content.substring(22, 26), content.substring(24, 32));
        char lngDir = (char) Integer.parseInt(content.substring(32, 34), 16);

        double temp = Integer.parseInt(content.substring(34, 36), 16) * 2 / 10 - 10;
        double voltage = Integer.parseInt(content.substring(36, 38), 16) / 10;
        int interval = Integer.parseInt(content.substring(38), 16);


        System.out.println(interval);
    }

    private double dm2Double(String d, String m) {

        BigDecimal decimal = new BigDecimal(d).add(new BigDecimal(m).divide(new BigDecimal(600000), 6, RoundingMode.HALF_UP));
        decimal.setScale(6, RoundingMode.HALF_UP);
        return decimal.doubleValue();
    }
}
