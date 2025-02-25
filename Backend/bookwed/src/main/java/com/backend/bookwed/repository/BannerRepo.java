package com.backend.bookwed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.bookwed.entity.Banner;
import com.backend.bookwed.payloads.BannerDTO;

@Repository
public interface BannerRepo extends JpaRepository<Banner, Long> {
    Banner findByBannerName(String bannerName);

    Banner save(BannerDTO banner);
}