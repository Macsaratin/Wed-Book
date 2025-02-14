package com.backend.bookwed.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.backend.bookwed.entity.Category;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long categoryId;
    private String categoryName;

    private CategoryDTO parentCategory;

    private List<CategoryDTO> subCategories;

    public void setParentCategory(Category parentCategory2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setParentCategory'");
    }
    
}