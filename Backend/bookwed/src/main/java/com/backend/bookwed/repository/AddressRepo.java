package com.backend.bookwed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.bookwed.entity.Address;
import com.backend.bookwed.payloads.AddressDTO;

@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {

    Address findByCountryAndCityAndStreet(String country, String city, String street);

    Address save(AddressDTO address);

}
