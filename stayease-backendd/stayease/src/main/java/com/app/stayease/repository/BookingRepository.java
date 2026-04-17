package com.app.stayease.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.stayease.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUserId(int userId);

    @Query("SELECT COALESCE(SUM(COALESCE(b.roomsBooked, 0)), 0) FROM Booking b " +
    	       "WHERE b.roomId = :roomId " +
    	       "AND b.status = 'Booked' " +
    	       "AND b.checkIn < :checkOut " +
    	       "AND b.checkOut > :checkIn")
    Integer countBookedRoomsForDateRange(
            @Param("roomId") int roomId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );
}