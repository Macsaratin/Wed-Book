package com.backend.bookwed.service;

import java.util.List;

import com.backend.bookwed.entity.Address;
import com.backend.bookwed.payloads.AddressDTO;

public interface AddressService {

AddressDTO createAddress(AddressDTO addressDTO);

List<AddressDTO> getAddresses();

AddressDTO getAddress(Long addressId);

AddressDTO updateAddress(Long addressId, Address address);

String deleteAddress(Long addressId);

}