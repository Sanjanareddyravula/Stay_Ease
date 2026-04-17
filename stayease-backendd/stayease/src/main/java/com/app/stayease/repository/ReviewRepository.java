package com.app.stayease.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.stayease.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByHotelId(int hotelId);
}