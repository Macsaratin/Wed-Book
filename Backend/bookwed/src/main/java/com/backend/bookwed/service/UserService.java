package com.backend.bookwed.service;
import java.util.List;

import com.backend.bookwed.payloads.UserDTO;
import com.backend.bookwed.payloads.UserResponse;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO);

    UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    // UserResponse getAllUsers();
    UserDTO getUserById(Long userId);

    List<UserDTO> getAllUsersWithoutPagination();

    UserDTO updateUser(Long userId, UserDTO userDTO);

    String deleteUser(Long userId);
    
    UserDTO getUserByEmail(String email);


}