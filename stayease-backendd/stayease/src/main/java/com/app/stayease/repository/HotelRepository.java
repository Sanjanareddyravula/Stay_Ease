package com.app.stayease.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.stayease.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    List<Hotel> findByLocation(String location);
}