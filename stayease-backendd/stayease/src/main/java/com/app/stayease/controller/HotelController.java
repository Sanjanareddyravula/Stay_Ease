package com.app.stayease.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.stayease.model.Hotel;
import com.app.stayease.model.Room;
import com.app.stayease.repository.HotelRepository;
import com.app.stayease.repository.RoomRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {

    @Autowired
    HotelRepository hotelRepo;

    @Autowired
    RoomRepository roomRepo;

    @GetMapping("/search")
    public List<Hotel> searchHotels(@RequestParam String location) {
        return hotelRepo.findByLocation(location);
    }

    @GetMapping("/rooms/{hotelId}")
    public List<Room> getRoomsByHotel(@PathVariable int hotelId) {
        return roomRepo.findByHotelId(hotelId);
    }
}