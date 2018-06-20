package com.diyiliu.controller;

import com.diyiliu.service.ServiceHi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Description: HiController
 * Author: DIYILIU
 * Update: 2018-06-20 09:58
 */

@RestController
public class HiController {

    @Autowired
    private ServiceHi serviceHi;

    @RequestMapping(value = "/hi", method = RequestMethod.GET)
    public String sayHi(@RequestParam String name) {

        return serviceHi.sayHiFromClientOne(name);
    }
}
