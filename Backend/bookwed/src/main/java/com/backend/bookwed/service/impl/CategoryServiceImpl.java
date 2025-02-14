package com.backend.bookwed.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.backend.bookwed.entity.Category;
import com.backend.bookwed.entity.Product;
import com.backend.bookwed.exceptions.APIException;
import com.backend.bookwed.exceptions.ResourceNotFoundException;
import com.backend.bookwed.payloads.CategoryDTO;
import com.backend.bookwed.payloads.CategoryResponse;
import com.backend.bookwed.repository.CategoryRepo;
import com.backend.bookwed.service.CategoryService;
import com.backend.bookwed.service.ProductService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryDTO createCategory(Category category) {
        // Kiểm tra nếu danh mục đã tồn tại
        Category existingCategory = categoryRepo.findByCategoryName(category.getCategoryName());

        if (existingCategory != null) {
            throw new APIException("Category with the name '" + category.getCategoryName() + "' already exists !!!");
        }

        // Kiểm tra và thiết lập danh mục cha nếu có
        if (category.getParentCategory() != null) {
            Category parentCategory = categoryRepo.findById(category.getParentCategory().getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent Category", "categoryId", category.getParentCategory().getCategoryId()));
            category.setParentCategory(parentCategory);
        }

        // Lưu danh mục và trả về
        Category savedCategory = categoryRepo.save(category);
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        // Xử lý phân trang và sắp xếp
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Category> pageCategories = categoryRepo.findAll(pageDetails);
        List<Category> categories = pageCategories.getContent();

        if (categories.isEmpty()) {
            throw new APIException("No categories are created yet.");
        }

        // Chuyển đổi danh mục thành CategoryDTO
        List<CategoryDTO> categoryDTOs = categories.stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setContent(categoryDTOs);
        categoryResponse.setPageNumber(pageCategories.getNumber());
        categoryResponse.setPageSize(pageCategories.getSize());
        categoryResponse.setTotalElements(pageCategories.getTotalElements());
        categoryResponse.setTotalPages(pageCategories.getTotalPages());
        categoryResponse.setLastPage(pageCategories.isLast());

        return categoryResponse;
    }

    @Override
    public CategoryDTO updateCategory(Category category, Long categoryId) {
        // Kiểm tra nếu danh mục tồn tại
        Category savedCategory = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        // Cập nhật các thuộc tính của danh mục
        category.setCategoryId(categoryId);

        // Kiểm tra và thiết lập danh mục cha nếu có
        if (category.getParentCategory() != null) {
            Category parentCategory = categoryRepo.findById(category.getParentCategory().getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent Category", "categoryId", category.getParentCategory().getCategoryId()));
            category.setParentCategory(parentCategory);
        }

        // Lưu danh mục đã cập nhật và trả về
        savedCategory = categoryRepo.save(category);
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public String deleteCategory(Long categoryId) {
        // Kiểm tra nếu danh mục tồn tại
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        // Xử lý các sản phẩm thuộc danh mục cần xóa
        List<Product> products = category.getProducts();

        // Xóa từng sản phẩm
        products.forEach(product -> {
            productService.deleteProduct(product.getProductId());
        });

        // Xóa danh mục
        categoryRepo.delete(category);

        return "Category with categoryId: " + categoryId + " deleted successfully !!!";
    }

    @Override
    public CategoryDTO getCategoryById(Long categoryId) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
        return modelMapper.map(category, CategoryDTO.class);
    }
}
