package com.backend.bookwed.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BannerDTO {

    private Long bannerId;
    private String bannerName;
    private String image;

}
