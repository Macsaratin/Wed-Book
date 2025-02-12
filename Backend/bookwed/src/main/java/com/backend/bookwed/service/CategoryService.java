package com.backend.bookwed.service;

import com.backend.bookwed.entity.Category;
import com.backend.bookwed.payloads.CategoryDTO;
import com.backend.bookwed.payloads.CategoryResponse;

public interface CategoryService {
    CategoryDTO createCategory(Category category);

    CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    CategoryDTO updateCategory(Category category, Long categoryId);

    String deleteCategory(Long categoryId);

    CategoryDTO getCategoryById(Long categoryId);
}