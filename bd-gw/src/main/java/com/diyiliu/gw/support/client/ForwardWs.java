package com.diyiliu.gw.support.client;

import com.diyiliu.gw.support.bean.DataInfo;
import com.diyiliu.plugin.util.DateUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.axiom.om.OMAbstractFactory;
import org.apache.axiom.om.OMElement;
import org.apache.axiom.om.OMFactory;
import org.apache.axiom.om.OMNamespace;
import org.apache.axis2.addressing.EndpointReference;
import org.apache.axis2.client.Options;
import org.apache.axis2.client.ServiceClient;

import javax.xml.stream.XMLOutputFactory;
import java.io.StringWriter;

/**
 * 转发Webservice
 * Description: ForwardWs
 * Author: DIYILIU
 * Update: 2018-04-04 16:42
 */

@Slf4j
@Getter
@Setter
public class ForwardWs {
    private String url;
    private String nameSpace;
    private String methodName;

    /**
     * 数据转发
     *
     * @param dataInfo
     * @param type
     */
    public void dataProcess(DataInfo dataInfo, int type){
        try {
            // 转发 Webservice
            String forwardStr = "PG" + dataInfo.getSim() + ";" + dataInfo.getSim() + ";" + dataInfo.getGpsLng() + ";" + dataInfo.getGpsLat() + ";"
                    + dataInfo.getSpeed() + ";" + dataInfo.getSpeed() + ";" + DateUtil.dateToString(dataInfo.getGpsTime()) + ";" + dataInfo.getVoltage() + ";" + dataInfo.getGpsLocation();

            // 假人使用数字1，浮球使用数字3
            String resp = send(new String[]{"data", "style"}, new String[]{forwardStr, String.valueOf(type)});
            log.info("数据转发[{}], 响应结果[{}]", forwardStr, resp);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("数据转发失败[{}]!", e.getMessage());
        }
    }

    private String send(String[] param, String[] value) throws Exception {
        EndpointReference targetEPR = new EndpointReference(url);

        OMFactory factory = OMAbstractFactory.getOMFactory();
        OMNamespace omNs = factory.createOMNamespace(nameSpace, "");

        OMElement method = factory.createOMElement(methodName, omNs);

        if (param != null && value != null){
            for (int i = 0; i < param.length; i++){
                String p = param[i];
                String v= value[i];

                OMElement omElement = factory.createOMElement(p, omNs);
                omElement.addChild(factory.createOMText(omElement, v));
                method.addChild(omElement);
            }
        }

        Options options = new Options();
        options.setTo(targetEPR);
        //需要加上这条语句
        options.setAction(nameSpace + methodName);

        ServiceClient serviceClient = new ServiceClient();
        serviceClient.setOptions(options);

        OMElement result = serviceClient.sendReceive(method);
        StringWriter writer = new StringWriter();
        result.serialize(XMLOutputFactory.newInstance().createXMLStreamWriter(writer));
        writer.flush();

        return writer.toString();
    }
}
