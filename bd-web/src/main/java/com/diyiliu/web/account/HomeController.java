package com.diyiliu.web.account;

import com.diyiliu.web.account.dto.Account;
import com.diyiliu.web.account.dto.AccountJpa;
import com.diyiliu.web.buoy.dto.Buoy;
import com.diyiliu.web.buoy.dto.BuoyJpa;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Description: HomeController
 * Author: DIYILIU
 * Update: 2018-04-05 22:50
 */

@Controller
public class HomeController {

    @Resource
    private AccountJpa accountJpa;

    @Resource
    private BuoyJpa buoyJpa;

    @GetMapping("/")
    public String index() {


        return "login";
    }

    @PostMapping("/login")
    @ResponseBody
    public Account login(@RequestParam String username, @RequestParam String password,
                         HttpSession session) {
        Account account = accountJpa.findByUsername(username);
        if (account == null || !password.equals(account.getPassword())) {

            return null;
        }
        session.setAttribute("us", account);

        return account;
    }

    @GetMapping("/home")
    public String home(HttpSession session, Model model) {
        Account account = (Account) session.getAttribute("us");
        if (account == null) {

            return "login";
        }

        // 浮球
        List<Buoy> buoys = buoyJpa.findBuoysByTypeOrderByName(1);
        // 假人
        List<Buoy> dummys = buoyJpa.findBuoysByTypeOrderByName(3);

        model.addAttribute("buoys", buoys);
        model.addAttribute("dummys", dummys);

        return "index";
    }
}
