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

import com.backend.bookwed.entity.Banner;
import com.backend.bookwed.entity.Category;
import com.backend.bookwed.entity.Product;
import com.backend.bookwed.exceptions.APIException;
import com.backend.bookwed.exceptions.ResourceNotFoundException;
import com.backend.bookwed.payloads.BannerDTO;
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
        if (categoryRepo.findByCategoryName(category.getCategoryName()) != null) {
            throw new APIException("Category with the name '" + category.getCategoryName() + "' already exists!");
        }

        // Lưu danh mục và trả về DTO
        Category savedCategory = categoryRepo.save(category);
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }
    @Override
    public List<CategoryDTO> getCategoryAll() {
        List<Category> categories = categoryRepo.findAll();
        return categories.stream()
            .map(category -> modelMapper.map(category, CategoryDTO.class))
            .collect(Collectors.toList());
    }
    @Override
    public CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        // Xử lý phân trang và sắp xếp
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Category> categoryPage = categoryRepo.findAll(pageable);
        if (categoryPage.isEmpty()) {
            throw new APIException("No categories are created yet.");
        }

        List<CategoryDTO> categoryDTOs = categoryPage.getContent().stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());

        return new CategoryResponse(categoryDTOs, categoryPage.getNumber(), categoryPage.getSize(),
                categoryPage.getTotalElements(), categoryPage.getTotalPages(), categoryPage.isLast());
    }

    @Override
    public CategoryDTO updateCategory(Category category, Long categoryId) {
        // Kiểm tra nếu danh mục tồn tại
        Category savedCategory = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        // Cập nhật các trường cần thiết
        savedCategory.setCategoryName(category.getCategoryName());

    

        // Lưu danh mục cập nhật
        savedCategory = categoryRepo.save(savedCategory);
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public String deleteCategory(Long categoryId) {
        // Kiểm tra nếu danh mục tồn tại
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        // Xóa tất cả sản phẩm thuộc danh mục này
        List<Product> products = category.getProducts();
        products.forEach(product -> productService.deleteProduct(product.getProductId()));

        // Xóa danh mục
        categoryRepo.delete(category);

        return "Category with categoryId: " + categoryId + " deleted successfully!";
    }

    @Override
    public CategoryDTO getCategoryById(Long categoryId) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
        return modelMapper.map(category, CategoryDTO.class);
    }
}
