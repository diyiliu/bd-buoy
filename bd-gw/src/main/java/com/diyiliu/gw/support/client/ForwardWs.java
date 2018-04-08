package com.diyiliu.gw.support.client;

import lombok.Getter;
import lombok.Setter;
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

@Getter
@Setter
public class ForwardWs {
    private String url;
    private String nameSpace;
    private String methodName;

    public String send(String[] param, String[] value) throws Exception {
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
