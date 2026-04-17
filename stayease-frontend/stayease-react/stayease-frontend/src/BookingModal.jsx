import { useEffect, useState } from "react";
import axios from "axios";

function BookingModal({ room, user, onClose, onBooked }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [members, setMembers] = useState(1);
  const [roomsBooked, setRoomsBooked] = useState(1);
  const [available, setAvailable] = useState(null);

  const calculateDays = () => {
    if (!checkIn || !checkOut) return 0;

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateDays();
  const totalAmount = totalDays * room.price * roomsBooked;

  useEffect(() => {
    const fetchAvailability = async () => {
      if (checkIn && checkOut) {
        try {
          const res = await axios.get(
            `http://localhost:8080/availability/${room.roomId}?checkIn=${checkIn}&checkOut=${checkOut}`
          );
          setAvailable(res.data);
        } catch (error) {
          console.error(error);
          setAvailable(null);
        }
      }
    };

    fetchAvailability();
  }, [checkIn, checkOut, room.roomId]);

  const handleBook = async () => {
    try {
      const res = await axios.post("http://localhost:8080/book", {
        userId: user.userId,
        roomId: room.roomId,
        checkIn,
        checkOut,
        members,
        roomsBooked,
        totalAmount
      });

      alert(res.data);

      if (res.data === "Booking Successful") {
        onBooked();
        onClose();
      }
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Book {room.roomType}</h2>

        <label>Check-in Date</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label>Check-out Date</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        <label>Number of Days</label>
        <input type="text" value={totalDays} readOnly />

        <label>Members</label>
        <input
          type="number"
          min="1"
          value={members}
          onChange={(e) => setMembers(Number(e.target.value))}
        />

        <label>Rooms to Book</label>
        <input
          type="number"
          min="1"
          value={roomsBooked}
          onChange={(e) => setRoomsBooked(Number(e.target.value))}
        />

        {available !== null && (
          <p className="availability-text">
            Available rooms for selected dates: <strong>{available}</strong>
          </p>
        )}

        <div className="price-summary">
          <p><strong>Price per room:</strong> ₹{room.price}</p>
          <p><strong>Total days:</strong> {totalDays}</p>
          <p><strong>Rooms booked:</strong> {roomsBooked}</p>
          <p className="total-amount"><strong>Total Amount:</strong> ₹{totalAmount}</p>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Close</button>
          <button
            className="book-btn"
            onClick={handleBook}
            disabled={!checkIn || !checkOut || totalDays <= 0}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;