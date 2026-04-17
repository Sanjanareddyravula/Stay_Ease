import { useState } from "react";
import axios from "axios";

import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Search from "./Search";
import HotelCard from "./HotelCard";
import BookingCard from "./BookingCard";
import BookingModal from "./BookingModal";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [location, setLocation] = useState("");
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState({});
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [reviews, setReviews] = useState({});

const searchHotels = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/search?location=${location}`);
    setHotels(res.data);

    const roomData = {};
    const reviewData = {};

    for (const hotel of res.data) {
      const roomRes = await axios.get(`http://localhost:8080/rooms/${hotel.hotelId}`);
      roomData[hotel.hotelId] = roomRes.data;

      const reviewRes = await axios.get(`http://localhost:8080/reviews/${hotel.hotelId}`);
      reviewData[hotel.hotelId] = reviewRes.data;
    }

    setRooms(roomData);
    setReviews(reviewData);
    setShowBookings(false);
  } catch (error) {
    console.error(error);
    alert("Failed to load hotels");
  }
};
const loadBookings = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:8080/bookings/${userId}`);
    console.log("Bookings API response:", res.data);
    setBookings(res.data);
  } catch (error) {
    console.error("Bookings load error:", error);
    alert("Failed to load bookings");
  }
};

  const handleLoginSuccess = async (loggedInUser) => {
    setUser(loggedInUser);
    await loadBookings(loggedInUser.userId);
  };
  const openBookingModal = (room) => {
  setSelectedRoom(room);
};

  const bookRoom = async (roomId) => {
    try {
      const res = await axios.post("http://localhost:8080/book", {
        userId: user.userId,
        roomId: roomId
      });

      alert(res.data);
      await loadBookings(user.userId);
      if (location.trim() !== "") {
        await searchHotels();
      }
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const res = await axios.put(`http://localhost:8080/cancel/${bookingId}`);
      alert(res.data);
      await loadBookings(user.userId);
      if (location.trim() !== "") {
        await searchHotels();
      }
    } catch (error) {
      console.error(error);
      alert("Cancellation failed");
    }
  };

  const logout = () => {
    setUser(null);
    setHotels([]);
    setRooms({});
    setBookings([]);
    setLocation("");
    setShowBookings(false);
    setIsLogin(true);
  };

  if (!user) {
    return isLogin ? (
      <Login setUser={handleLoginSuccess} switchToSignup={() => setIsLogin(false)} />
    ) : (
      <Signup switchToLogin={() => setIsLogin(true)} />
    );
  }
console.log("Bookings state:", bookings);
console.log("Show bookings:", showBookings);
console.log("User:", user);
  return (
    <div className="page">
      <Navbar
        user={user}
        logout={logout}
        showBookings={showBookings}
        setShowBookings={setShowBookings}
      />

      <div className="hero">
        <div className="hero-overlay">
          <h1>Find nearby stays with ease</h1>
          <p>Search hotels, view room images, check vacancy, and manage bookings.</p>
        </div>
      </div>
     

      <div className="main-content">
        {!showBookings && (
          <>
            <Search
              location={location}
              setLocation={setLocation}
              searchHotels={searchHotels}
            />

            <h2 className="section-title">Hotels</h2>

            {hotels.length === 0 ? (
              <div className="empty-box" >
                Search a location to view hotels and room availability.
              </div>
            ) : (
              hotels.map((hotel) => (
                <HotelCard
  key={hotel.hotelId}
  hotel={hotel}
  rooms={rooms[hotel.hotelId] || []}
  reviews={reviews[hotel.hotelId] || []}
  openBookingModal={openBookingModal}
/>
              ))
            )}
          </>
        )}

        {showBookings && (
          <>
            <h2 className="section-title">My Bookings</h2>

            {bookings.length === 0 ? (
              <div className="empty-box">No bookings found.</div>
            ) : (
              bookings.map((booking) => (
                <BookingCard
                  key={booking.bookingId}
                  booking={booking}
                  cancelBooking={cancelBooking}
                />
              ))
            )}
          </>
        )}
        {selectedRoom && (
  <BookingModal
    room={selectedRoom}
    user={user}
    onClose={() => setSelectedRoom(null)}
    onBooked={async () => {
      await loadBookings(user.userId);
      if (location.trim() !== "") {
        await searchHotels();
      }
    }}
  />
)}
      </div>
    </div>
  );
}

export default App;