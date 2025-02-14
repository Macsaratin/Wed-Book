package com.backend.bookwed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.bookwed.entity.Category;
import com.backend.bookwed.payloads.CategoryDTO;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    Category findByCategoryName(String categoryName);

    Category save(CategoryDTO category);
}