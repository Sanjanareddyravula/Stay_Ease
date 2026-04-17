package com.app.stayease.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.stayease.model.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    List<Room> findByHotelId(int hotelId);
}