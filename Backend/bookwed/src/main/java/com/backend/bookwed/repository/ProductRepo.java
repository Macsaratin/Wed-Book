package com.backend.bookwed.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.bookwed.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    // Tìm kiếm theo tên sản phẩm với chuỗi ký tự bất kỳ
    Page<Product> findByProductNameContaining(String keyword, Pageable pageDetails);

    // Tìm kiếm sản phẩm theo categoryId
    Page<Product> findByCategoryCategoryId(Long categoryId, Pageable pageable);
}