package com.backend.bookwed.payloads;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long productId;
    private String productName;
    private String image;
    private String description;
    private Integer quantity;
    private double price;
    private double discount;
    private CategoryDTO category; // Danh mục cha
    private LocalDate releaseDate; // Ngày phát hành
    private String bookCondition; // Tình trạng sách
    private String publisher; // Nhà xuất bản
}
