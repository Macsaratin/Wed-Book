package com.backend.bookwed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.bookwed.entity.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

}