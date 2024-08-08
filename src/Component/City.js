import React, { useEffect, useState } from 'react';

const City = () => {
  const [getACity, setGetACity] = useState([]);
  const [getALocation, setGetALocation] = useState([]);

  useEffect(() => {
    getCity();
    getLocation();
  }, []);

  const [formData, setFormData] = useState({
    city: '',
    cityId: '',
  });

  const [locationy, setLocationy] = useState('');

  const getCity = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/city', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setGetACity(data.message);
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const getLocation = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/location', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setGetALocation(data.message);
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const selectedCity = getACity.find(city => city.city === e.target.value);
    setFormData({
      city: e.target.value,
      cityId: selectedCity?._id || '',
    });
  };

  const handleLocationChange = (e) => {
    setLocationy(e.target.value);
  };

  const addLocation = async () => {
    try {
      if (formData.city === '') {
        alert("Please Select City First");
      } else {
        const res = await fetch('http://localhost:8000/api/location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locationy, id: formData.cityId })
        });
        const data = await res.json();
        alert(data.message);
        getLocation();
      }
    } catch (e) {
      alert("Something went wrong");
    }
  };

  const delLocation = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/location/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getLocation();
    } catch (e) {
      alert("An error occurred");
    }
  };

  return (
    <>
      <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addLocationModal">Location</button>

      {/* Manual Add Location Modal */}
      <div className="modal fade" id="addLocationModal" tabIndex="-1" aria-labelledby="addLocationModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addLocationModalLabel">Add Location</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <select className="form-control" id="city" onChange={handleChange} value={formData.city}>
                      <option selected>Open this select menu</option>
                      {getACity.map((e) => (
                        <option key={e._id} value={e.city}>{e.city}</option>
                      ))}
                    </select>
                  </div>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="locations" className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        id="locations"
                        value={locationy}
                        onChange={handleLocationChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={addLocation}>Save</button>
                </div>
              </div>
              <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
                <h4>Locations</h4>
                <ul>
                  {getALocation.map((e) => (
                    <li key={e._id}>
                      {e.location} <span type="button" onClick={() => delLocation(e._id)} style={{ border: "none", marginLeft: "1rem" }}><i className="fa-solid fa-trash"></i></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default City;
