package com.backend.bookwed.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.bookwed.entity.Banner;
import com.backend.bookwed.payloads.BannerDTO;
import com.backend.bookwed.service.BannerService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")

public class BannerController {
    @Autowired
    private BannerService bannerService;

    @PostMapping("/admin/banner")
    public ResponseEntity<BannerDTO> createBanner(@Valid @RequestBody Banner banner) {
        BannerDTO savedBannerDTO = bannerService.createBanner(banner);
        return new ResponseEntity<BannerDTO>(savedBannerDTO, HttpStatus.CREATED);
    }

    @GetMapping("/admin/banner")
    public ResponseEntity<List<BannerDTO>> getbanner() {
        final List<BannerDTO> bannerDTOs = bannerService.getBannerAll();
        return new ResponseEntity<List<BannerDTO>>(bannerDTOs, HttpStatus.FOUND);
    }

    @GetMapping("/admin/banner/{bannerId}")
    public ResponseEntity<BannerDTO> getBanner(@PathVariable Long bannerId) {
        BannerDTO bannerDTO = bannerService.getBannerById(bannerId);
        return new ResponseEntity<BannerDTO>(bannerDTO, HttpStatus.FOUND);
    }

    @PutMapping("/admin/banner/{bannerId}")
    public ResponseEntity<BannerDTO> updateBanner(@PathVariable Long bannerId, @RequestBody Banner banner) {
        BannerDTO bannerDTO = bannerService.updateBanner(bannerId, banner);
        return new ResponseEntity<BannerDTO>(bannerDTO, HttpStatus.OK);
    }

    @DeleteMapping("/admin/banner/{bannerId}")
    public ResponseEntity<String> deleteBanner(@PathVariable Long bannerId) {
        String status = bannerService.deleteBanner(bannerId);
        return new ResponseEntity<String>(status, HttpStatus.OK);
    }
    

    @PutMapping("/admin/banner/{bannerId}/image")
    public ResponseEntity<BannerDTO> updateBannerImage(@PathVariable Long bannerId,
        @RequestParam("image") MultipartFile image) throws IOException {
            BannerDTO updatedBanner = bannerService.updateBannerImage(bannerId, image);
            return new ResponseEntity<>(updatedBanner, HttpStatus.OK);
    }
    @GetMapping("/public/banners/image/{fileName}")
        public ResponseEntity<InputStreamResource> getBannerImage(@PathVariable String fileName) throws FileNotFoundException {
    // Gọi service để lấy ảnh của banner
    InputStream imageStream = bannerService.getBannerImage(fileName);
    
    // Thiết lập headers cho phản hồi HTTP
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.IMAGE_PNG);  // Có thể thay đổi loại media nếu không phải PNG
    headers.setContentDispositionFormData("inline", fileName);

    // Trả về phản hồi với ảnh của banner
    return new ResponseEntity<>(new InputStreamResource(imageStream), headers, HttpStatus.OK);
}


}
