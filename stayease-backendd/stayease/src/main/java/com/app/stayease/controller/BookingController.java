package com.app.stayease.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.stayease.model.Booking;
import com.app.stayease.model.BookingDetails;
import com.app.stayease.model.Hotel;
import com.app.stayease.model.Room;
import com.app.stayease.repository.BookingRepository;
import com.app.stayease.repository.HotelRepository;
import com.app.stayease.repository.RoomRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    BookingRepository bookingRepo;

    @Autowired
    RoomRepository roomRepo;

    @Autowired
    HotelRepository hotelRepo;

    @PostMapping("/book")
    public String bookRoom(@RequestBody Booking booking) {
        Room room = roomRepo.findById(booking.getRoomId()).orElse(null);

        if (room == null) {
            return "Room not found";
        }

        if (booking.getCheckIn() == null || booking.getCheckOut() == null) {
            return "Check-in and check-out dates are required";
        }

        if (!booking.getCheckOut().isAfter(booking.getCheckIn())) {
            return "Check-out date must be after check-in date";
        }

        if (booking.getRoomsBooked() == null) {
            booking.setRoomsBooked(1);
        }

        if (booking.getMembers() == null) {
            booking.setMembers(1);
        }

        if (booking.getTotalAmount() == null) {
            booking.setTotalAmount(0.0);
        }

        int booked = bookingRepo.countBookedRoomsForDateRange(
                booking.getRoomId(),
                booking.getCheckIn(),
                booking.getCheckOut()
        );

        int available = room.getVacancy() - booked;
        int roomsRequested = booking.getRoomsBooked();

        if (available < roomsRequested) {
            return "No vacancy available for selected dates";
        }

        booking.setStatus("Booked");
        bookingRepo.save(booking);

        return "Booking Successful";
    }
    @GetMapping("/availability/{roomId}")
    public int checkAvailability(
            @PathVariable int roomId,
            @RequestParam String checkIn,
            @RequestParam String checkOut) {

        Room room = roomRepo.findById(roomId).orElse(null);
        if (room == null) {
            return 0;
        }

        int booked = bookingRepo.countBookedRoomsForDateRange(
                roomId,
                LocalDate.parse(checkIn),
                LocalDate.parse(checkOut)
        );

        return room.getVacancy() - booked;
    }

    @GetMapping("/bookings/{userId}")
    public List<BookingDetails> getBookingsByUser(@PathVariable int userId) {
        List<Booking> bookings = bookingRepo.findByUserId(userId);
        List<BookingDetails> result = new ArrayList<>();

        for (Booking booking : bookings) {
            Room room = roomRepo.findById(booking.getRoomId()).orElse(null);
            if (room == null) continue;

            Hotel hotel = hotelRepo.findById(room.getHotelId()).orElse(null);
            if (hotel == null) continue;

            BookingDetails details = new BookingDetails();

            details.setBookingId(booking.getBookingId());
            details.setUserId(booking.getUserId());
            details.setRoomId(booking.getRoomId());
            details.setStatus(booking.getStatus());

            details.setHotelId(hotel.getHotelId());
            details.setHotelName(hotel.getHotelName());
            details.setLocation(hotel.getLocation());
            details.setHotelImageUrl(hotel.getImageUrl());

            details.setRoomType(room.getRoomType());
            details.setPrice(room.getPrice());
            details.setVacancy(room.getVacancy());
            details.setRoomImageUrl(room.getRoomImageUrl());

            if (booking.getCheckIn() != null) {
                details.setCheckIn(booking.getCheckIn().toString());
            }

            if (booking.getCheckOut() != null) {
                details.setCheckOut(booking.getCheckOut().toString());
            }

            details.setMembers(booking.getMembers() != null ? booking.getMembers() : 1);
            details.setRoomsBooked(booking.getRoomsBooked() != null ? booking.getRoomsBooked() : 1);
            details.setTotalAmount(booking.getTotalAmount() != null ? booking.getTotalAmount() : 0.0);
            result.add(details);
        }

        return result;
    }

    @PutMapping("/cancel/{bookingId}")
    public String cancelBooking(@PathVariable int bookingId) {
        Booking booking = bookingRepo.findById(bookingId).orElse(null);

        if (booking == null) {
            return "Booking not found";
        }

        if ("Cancelled".equalsIgnoreCase(booking.getStatus())) {
            return "Booking already cancelled";
        }

        booking.setStatus("Cancelled");
        bookingRepo.save(booking);

        return "Booking Cancelled Successfully";
    }
}