package com.diyiliu.web.account.dto;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Description: AccountJpa
 * Author: DIYILIU
 * Update: 2018-04-06 00:00
 */
public interface AccountJpa extends JpaRepository<Account, Long> {

    Account findByUsername(String username);
}
