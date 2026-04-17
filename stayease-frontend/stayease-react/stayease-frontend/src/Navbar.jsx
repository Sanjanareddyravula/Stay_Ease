function Navbar({ user, logout, showBookings, setShowBookings }) {
  return (
    <div className="navbar">
      <div className="brand">
        <span className="brand-logo">🏨</span>
        <span className="brand-name">StayEase</span>
      </div>

      <div className="nav-right">
        <span className="welcome-text">Welcome, {user.firstName}</span>

        <button
          className="nav-link-btn"
          onClick={() => setShowBookings(!showBookings)}
        >
          My Bookings
        </button>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;