package com.backend.bookwed.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.bookwed.entity.Banner;
import com.backend.bookwed.payloads.BannerDTO;

public interface BannerService {

BannerDTO createBanner(Banner banner);


List<BannerDTO> getBannerAll();

BannerDTO getBannerById(Long bannerId);

BannerDTO updateBanner(Long bannerId, Banner banner);

String deleteBanner(Long bannerId);

BannerDTO updateBannerImage(Long bannerId, MultipartFile image) throws IOException;

public InputStream getBannerImage(String fileName) throws FileNotFoundException;

}