package com.app.stayease.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.stayease.model.Review;
import com.app.stayease.repository.ReviewRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    ReviewRepository reviewRepo;

    @GetMapping("/reviews/{hotelId}")
    public List<Review> getReviewsByHotel(@PathVariable int hotelId) {
        return reviewRepo.findByHotelId(hotelId);
    }
}