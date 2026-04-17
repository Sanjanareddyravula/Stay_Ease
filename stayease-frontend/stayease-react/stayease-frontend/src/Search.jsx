function Search({ location, setLocation, searchHotels }) {
  return (
    <div className="search-wrapper">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search hotels by city or location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="primary-btn" onClick={searchHotels}>Search</button>
      </div>
    </div>
  );
}

export default Search;