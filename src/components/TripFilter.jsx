const TripFilter = ({ onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="mb-3 d-flex gap-2">
      <label className="d-flex gap-2 align-items-center">
        <span>Time: </span>
        <input className="form-control" type="time" name="time" onChange={handleChange} />
      </label>
      <label className="d-flex gap-2 align-items-center">
        Fare: 
        <input className="form-control" type="number" name="fare" onChange={handleChange} />
      </label>
      <label className="d-flex gap-2 align-items-center">
        Distance: 
        <input className="form-control" type="number" name="distance" onChange={handleChange} />
      </label>
    </div>
  );
};

export default TripFilter;
