import { useState } from "react";

function HotelCard({ hotel, rooms, reviews, openBookingModal }) {
  const [showRooms, setShowRooms] = useState(false);

  return (
    <div className="hotel-card">
      <div className="hotel-image-wrap" onClick={() => setShowRooms(!showRooms)}>
        <img
          src={hotel.imageUrl}
          alt={hotel.hotelName}
          className="hotel-image"
        />
      </div>

      <div className="hotel-header" onClick={() => setShowRooms(!showRooms)}>
        <div>
          <h3>{hotel.hotelName}</h3>
          <p className="hotel-location">{hotel.location}</p>
        </div>
        <span className="hotel-badge">
          {showRooms ? "Hide Rooms" : "View Rooms"}
        </span>
      </div>

      <div className="reviews-section">
        <h4>Reviews</h4>
        {reviews.length === 0 ? (
          <p className="muted-text">No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review.reviewId} className="review-card">
              <p><strong>{review.userName}</strong> - ⭐ {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {showRooms && (
        <div className="rooms-list">
          {rooms.length === 0 ? (
            <p className="muted-text">No rooms available</p>
          ) : (
            rooms.map((room) => (
              <div className="room-card" key={room.roomId}>
                <img
                  src={room.roomImageUrl}
                  alt={room.roomType}
                  className="room-image"
                />

                <div className="room-details">
                  <div className="room-type">{room.roomType}</div>
                  <div className="room-meta">₹{room.price} per night</div>
                  <div className="room-meta">Total Rooms: {room.vacancy}</div>
                </div>

                <button
                  className="book-btn"
                  onClick={() => openBookingModal(room)}
                >
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default HotelCard;