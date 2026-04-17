function BookingCard({ booking, cancelBooking }) {
  const isCancelled = booking.status === "Cancelled";

  return (
    <div className="booking-card">
      <img
        src={booking.hotelImageUrl}
        alt={booking.hotelName}
        className="booking-hotel-image"
      />

      <div className="booking-content">
        <div className="booking-top">
          <div>
            <h4>{booking.hotelName}</h4>
            <p>{booking.location}</p>
            <p>Room: {booking.roomType}</p>
            <p>Check-in: {booking.checkIn}</p>
            <p>Check-out: {booking.checkOut}</p>
            <p>Members: {booking.members}</p>
            <p>Rooms Booked: {booking.roomsBooked}</p>
            <p>Total Amount: ₹{booking.totalAmount}</p>
            <p>Booking ID: {booking.bookingId}</p>
          </div>

          <span className={isCancelled ? "status cancelled" : "status booked"}>
            {booking.status}
          </span>
        </div>

        <div className="booking-room-preview">
          <img
            src={booking.roomImageUrl}
            alt={booking.roomType}
            className="booking-room-image"
          />
          <div className="room-meta-block">
            <p>Room Price: ₹{booking.price}</p>
            <p>Current Vacancy: {booking.vacancy}</p>
          </div>
        </div>

        {!isCancelled && (
          <button
            className="cancel-btn"
            onClick={() => cancelBooking(booking.bookingId)}
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingCard;