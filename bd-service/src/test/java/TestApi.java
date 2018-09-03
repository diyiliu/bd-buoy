import org.junit.Test;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

/**
 * Description: TestApi
 * Author: DIYILIU
 * Update: 2018-08-17 10:26
 */
public class TestApi {

    @Test
    public void testPost(){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange("http://192.168.1.132:9008/buoy/list", HttpMethod.GET, HttpEntity.EMPTY, String.class);

        System.out.println(responseEntity.getStatusCode());
    }
}
