import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

import './Filter.css'; // Assuming you'll create a separate CSS file for styling

const Filter = () => {
    // Dropdown states
    const [isOpenPropertyType, setIsOpenPropertyType] = useState(false);
    const [isOpenSaleRent, setIsOpenSaleRent] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [isOpenLocations, setIsOpenLocations] = useState(false);
    const [isOpenBedrooms, setIsOpenBedrooms] = useState(false);
    const [isOpenBudgetRange, setIsOpenBudgetRange] = useState(false);

    // Filter states
    const [selectedPropertyType, setSelectedPropertyType] = useState([]);
    const [selectedSaleRent, setSelectedSaleRent] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedBedrooms, setSelectedBedrooms] = useState([]);
    const [selectedBudgetRange, setSelectedBudgetRange] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [getSingleData, setGetsingleData] = useState({});




// Filters
    const [getAllProperty, setGetAllProperty]=useState([]);
    const [getAllLocation, setGetAllLocation]=useState([]);
    const [getAllBedrooms, setGetAllBedrooms]=useState([]);
    const [getAllBudget, setGetAllBudget]=useState([]);
    const [getAllSaleRent, setGetAllSaleRent]=useState([]);
    const [getClickLocation, setGetClickLocation]=useState([]);
    console.log(getClickLocation);




    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);

    const getSingleInventory = async (id) => {
        try {
            const res = await fetch("http://localhost:8000/api/product/" + id, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            setGetsingleData(data.message); // Set the edit state to the current data for editing
        } catch (e) {
            alert("An error occurred");
        }
    };

    const [selectedData, setSelectedData] = useState([]);









    const [allData, setAllData] = useState([]);
    const [uniqueCity, setUniqueCity] = useState([]);
    const [uniqueLocation, setUniqueLocation] = useState([]);
//   console.log(uniqueProperty);

  useEffect(() => {
    fetchData();
    getFilterProperty();
    getFilterLocation();
    getFilterBedrooms();
    getFilterSaleRent();
    getFilterBudget();
  }, []);


  useEffect(() => {
    if (allData.length > 0) {
      const bedCitySet = new Set();
      const bedLocationSet = new Set();
  
      for (let i = 0; i < allData.length; i++) {
        let storeCity = allData[i].city;
        let storeLocation = allData[i].location;
        if (storeCity) {
          // Convert to uppercase
          storeCity = storeCity.toUpperCase();
  
          // Ensure one space after the number
          storeCity = storeCity.replace(/^(\d+)(\s*)/, '$1 ');
  
          // Add to the Set
          bedCitySet.add(storeCity);
        }
        if (storeLocation) {
          // Convert to uppercase
          storeLocation = storeLocation.toUpperCase();
  
          // Ensure one space after the number
          storeLocation = storeLocation.replace(/^(\d+)(\s*)/, '$1 ');
  
          // Add to the Set
          bedLocationSet.add(storeLocation);
        }
      }
  
      setUniqueCity(Array.from(bedCitySet));
      setUniqueLocation(Array.from(bedLocationSet));
    }
  }, [allData]);





  // Filters Button

  const getFilterProperty=async()=>{
    try{
        const res=await fetch('http://localhost:8000/api/propertyType',{
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        });
        const data=await res.json();
        setGetAllProperty(data.message);
    }catch(e){
        console.log("Something Went Wrong");
    }
  }




  const getFilterLocation=async()=>{
    try{
        const res=await fetch('http://localhost:8000/api/location',{
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        });
        const data=await res.json();
        setGetAllLocation(data.message);
    }catch(e){
        console.log("Something Went Wrong");
    }
  }






  const getFilterBedrooms=async()=>{
    try{
        const res=await fetch('http://localhost:8000/api/bedrooms',{
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        });
        const data=await res.json();
        setGetAllBedrooms(data.message);
    }catch(e){
        console.log("Something Went Wrong");
    }
  }

  const getFilterSaleRent=async()=>{
    try{
        const res=await fetch('http://localhost:8000/api/saleRent',{
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        });
        const data=await res.json();
        setGetAllSaleRent(data.message);
    }catch(e){
        console.log("Something Went Wrong");
    }
  }

  const getFilterBudget=async()=>{
    try{
        const res=await fetch('http://localhost:8000/api/budget',{
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        });
        const data=await res.json();
        setGetAllBudget(data.message);
    }catch(e){
        console.log("Something Went Wrong");
    }
  }







    const handleCheckboxChange = (e, item) => {
        const isChecked = e.target.checked;
        setSelectedData((prevSelectedData) => {
            if (isChecked) {
                return [...prevSelectedData, item];
            } else {
                return prevSelectedData.filter((data) => data._id !== item._id);
            }
        });
    };

    const checkIfSelected = () => {
        if (selectedData.length === 0) {
            alert("Please select at least one checkbox.");
            return false;
        }
        return true;
    };

    const shareOnWhatsApp = () => {
        if (!checkIfSelected()) return;
        const message = selectedData.map((item) => {
            return `
            Registration Status: ${item.registration_status}
            Facing: ${item.facing}
            Furnishing Status: ${item.furnishing_status}
            No. of Parking: ${item.no_of_parking}
            Construction Status: ${item.construction_status}
            Property Type: ${item.property_type}
            Sale/Rent: ${item.sale_rent}
            Location: ${item.location}
            City: ${item.city}
            Bedrooms: ${item.bedrooms}
            Builder Name: ${item.builder_name}
            Project Name: ${item.project_name}
            Property Size (Sqr ft): ${item.property_size}
            Demand: ${item.demand}
            Tower: ${item.tower}
            Floor: ${item.floor}
            Video Link: ${item.video_link}
            `;
        }).join('\n\n');

        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const downloadCSV = () => {
        if (!checkIfSelected()) return;
        const csvData = selectedData.map((item) => ({
            "Registration Status": item.registration_status,
            "Facing": item.facing,
            "Furnishing Status": item.furnishing_status,
            "No. of Parking": item.no_of_parking,
            "Construction Status": item.construction_status,
            "Property Type": item.property_type,
            "Sale/Rent": item.sale_rent,
            "Location": item.location,
            "City": item.city,
            "Bedrooms": item.bedrooms,
            "Builder Name": item.builder_name,
            "Project Name": item.project_name,
            "Property Size (Sqr ft)": item.property_size,
            "Demand": item.demand,
            "Tower": item.tower,
            "Floor": item.floor,
            "Video Link": item.video_link
        }));

        const csv = Papa.unparse(csvData);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "selected_inventory.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch initial data
    }, []);

    const toggleDropdown = (setter) => {
        setter(prev => !prev);
    };

    const handleSearchClick = () => {
        filterData();
        setShowResults(true);
    };

    const handleResetClick = () => {
        // Reset all filter states
        setSelectedPropertyType([]);
        setSelectedSaleRent([]);
        setSelectedCity([]);
        setSelectedLocations([]);
        setSelectedBedrooms([]);
        setSelectedBudgetRange([]);
        setShowResults(false);
        setFilteredRows(rows); // Reset the filtered data
    };

    const handleCheckboxChangeForFilter = async(filter, value, id) => {
        const setterMap = {
            property_type: setSelectedPropertyType,
            sale_rent: setSelectedSaleRent,
            city: setSelectedCity,
            locations: setSelectedLocations,
            bedrooms: setSelectedBedrooms,
            budgetRange: setSelectedBudgetRange
        };
        setterMap[filter](prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };






    const handleCheckboxFilterChangeForFilter = async(filter, value, id) => {
        const res=await fetch('http://localhost:8000/api/location',{
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        });
        const data=await res.json();
        // Ensure data.message is an array
        const locationsArray = Array.isArray(data.message) ? data.message : [];

        // Filter locations that match the city ID and set the state
        const matchingLocations = locationsArray.filter(
        (location) => location.city._id === id
        );

        // Set the matching locations in the state
        setGetClickLocation(matchingLocations);
        const setterMap = {
            property_type: setSelectedPropertyType,
            sale_rent: setSelectedSaleRent,
            city: setSelectedCity,
            locations: setSelectedLocations,
            bedrooms: setSelectedBedrooms,
            budgetRange: setSelectedBudgetRange
        };
        setterMap[filter](prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };















    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/product/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            setRows(data.message);
            setFilteredRows(data.message); // Initialize filteredRows with the fetched data
            setAllData(data.message);
        } catch (e) {
            alert("An error occurred");
        }
    };

    const filterData = () => {
        let filtered = [...rows]; // Start with all data and then apply filters
        
        // Helper function to handle undefined or null strings
        const safeToLower = (str) => (typeof str === 'string' ? str.toLowerCase().trim() : '');
    
        if (selectedPropertyType.length > 0) {
            filtered = filtered.filter(row => 
                selectedPropertyType.some(type => 
                    safeToLower(row.property_type) === safeToLower(type)
                )
            );
        }
    
        if (selectedSaleRent.length > 0) {
            filtered = filtered.filter(row => 
                selectedSaleRent.some(saleRent => 
                    safeToLower(row.sale_rent).includes(safeToLower(saleRent))
                )
            );
        }
    
        if (selectedCity.length > 0) {
            filtered = filtered.filter(row => 
                selectedCity.some(city => 
                    safeToLower(row.city).includes(safeToLower(city))
                )
            );
        }
    
        if (selectedLocations.length > 0) {
            filtered = filtered.filter(row => 
                selectedLocations.some(location => 
                    safeToLower(row.location).includes(safeToLower(location))
                )
            );
        }
    
        if (selectedBedrooms.length > 0) {
            filtered = filtered.filter(row => 
                selectedBedrooms.some(bedroom => 
                    safeToLower(row.bedrooms).includes(safeToLower(bedroom))
                )
            );
        }
    
        if (selectedBudgetRange.length > 0) {
            filtered = filtered.filter(row => 
                selectedBudgetRange.some(budget => 
                    safeToLower(row.budget_range).includes(safeToLower(budget))
                )
            );
        }
    
        setFilteredRows(filtered);
    };








    const uniqueLocations = getAllLocation.reduce((acc, current) => {
        const x = acc.find(item => item.city.city === current.city.city);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
    
    
    
    

    const options = ["Sector 62", "Sector 16", "Sector 121", "Sector 04", "Sector 15"];

    return (
        <>
        <div className='filter-main'>
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdown(setIsOpenPropertyType)} id='btn-main-filter'>
                    Property Type
                </button>
                {isOpenPropertyType && (
                    <div className="dropdown-content">
                        {getAllProperty.sort((a, b)=>{
                            if(a.property_type === 'Residential') return -1
                            if(b.property_type === 'Residential') return 1
                            return 0
                        }).map((e)=>{
                            return(
                                <div className="option-container d-flex ms-2" key={e.property_type}>
                                    <input
                                        type="checkbox"
                                        id={e.property_type}
                                        checked={selectedPropertyType.includes(e.property_type)}
                                        onChange={() => handleCheckboxChangeForFilter("property_type", e.property_type)}
                                    />
                                    <label htmlFor={e.property_type} className='ms-2' id='div-small'>{e.property_type}</label>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
    
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdown(setIsOpenSaleRent)} id='btn-main-filter'>
                    Sale/Rent
                </button>
                {isOpenSaleRent && (
                    <div className="dropdown-content">
                        {getAllSaleRent.sort((a, b)=>{
                            if(a.sale_rent === 'Sale') return -1
                            if(b.sale_rent === 'Sale') return 1
                            return 0
                        }).map((e)=>{
                            return(
                                <div className="option-container d-flex ms-2" key={e.sale_rent}>
                                    <input
                                        type="checkbox"
                                        id={e.sale_rent}
                                        checked={selectedSaleRent.includes(e.sale_rent)}
                                        onChange={() => handleCheckboxChangeForFilter("sale_rent", e.sale_rent)}
                                    />
                                    <label htmlFor={e.sale_rent} className='ms-2' id='div-small'>{e.sale_rent}</label>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
    
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdown(setIsOpenCity)} id='btn-main-filter'>
                    City
                </button>
                {isOpenCity && (
                    <div className="dropdown-content">
                    {uniqueLocations.map((e) => {
                      return (
                        <div
                          className="option-container d-flex ms-2"
                          key={e.city.city}
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <input
                            type="checkbox"
                            id={e.city.city}
                            checked={selectedCity.includes(e.city.city)}
                            onChange={() => handleCheckboxFilterChangeForFilter("city", e.city.city, e.city._id)}
                          />
                          <label
                            htmlFor={e.city.city}
                            className="ms-2 location-size"
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                             id='div-small'
                          >
                            {e.city.city}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  
                )}
            </div>
    
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdown(setIsOpenLocations)} id='btn-main-filter'>
                    Locations
                </button>
                {isOpenLocations && (
                    <div className="dropdown-content">
                        {getClickLocation.map((e)=>{
                            return(
                                <div className="option-container d-flex ms-2" key={e.location} style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                  }}>
                                    <input
                                        type="checkbox"
                                        id={e.location}
                                        checked={selectedLocations.includes(e.location)}
                                        onChange={() => handleCheckboxChangeForFilter("locations", e.location)}
                                    />
                                    <label htmlFor={e.location} className='ms-2 location-size' style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }} id='div-small'>{e.location}</label>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
    
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdown(setIsOpenBedrooms)} id='btn-main-filter'>
                    Bedrooms
                </button>
                {isOpenBedrooms && (
                    <div className="dropdown-content">
                        {getAllBedrooms.map((e)=>{
                            return(
                                <div className="option-container d-flex ms-2" key={e.bedrooms} style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                  }}>
                                    <input
                                        type="checkbox"
                                        id={e.bedrooms}
                                        checked={selectedBedrooms.includes(e.bedrooms)}
                                        onChange={() => handleCheckboxChangeForFilter("bedrooms", e.bedrooms)}
                                    />
                                    <label htmlFor={e.bedrooms} className='ms-2' id='div-small' style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}>{e.bedrooms}</label>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
    
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdown(setIsOpenBudgetRange)} id='btn-main-filter'>
                    Budget Range
                </button>
                {isOpenBudgetRange && (
                    <div className="dropdown-content">
                        {getAllBudget.map((e)=>{
                            return(
                                <div className="option-container d-flex ms-2" key={e.budget}>
                                    <input
                                        type="checkbox"
                                        id={e.budget}
                                        checked={selectedBudgetRange.includes(e.budget)}
                                        onChange={() => handleCheckboxChangeForFilter("budgetRange", e.budget)}
                                    />
                                    <label htmlFor={e.budget} className='ms-2' id='div-small'>{e.budget}</label>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
    
            <div className="button-container m-4">
                <button onClick={handleSearchClick} id='btn-search'>Search</button>
                <button onClick={handleResetClick} id='btn-reset'>Reset</button>
            </div>
    
            {showResults && (
                <div>
                    {filteredRows.length > 0 ? (
                        <div>
                            <div id='btn-div-icon'>
                                <button type="button" className="btn btn-success me-1" onClick={shareOnWhatsApp} id='whatsapp'>Share on WhatsApp</button>
                                <button type="button" className="btn btn-primary" onClick={downloadCSV} id='csv'>Download CSV</button>
                            </div>
                            <div className="table-responsive mt-2">
                                <table className="table table-striped custom-table" style={{marginTop:"0%"}}>
                                    <thead className='head-table'>
                                        <tr>
                                            <th style={{ width: "4.4rem" }}>Action</th>
                                            <th id='type-project'>Project Name</th>
                                            <th id='type-city'>Location/City</th>
                                            <th id='type-floor'>Type/Floor</th>
                                            <th id='type-size'>Size</th>
                                            <th id='type-demand'>Demand</th>
                                            <th id='type-detail'>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {filteredRows
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Replace 'date' with your date field
                                        .map((item) => (
                                            <tr key={item._id}>
                                            <td>
                                                <input
                                                type="checkbox"
                                                checked={selectedData.includes(item)}
                                                onChange={(e) => handleCheckboxChange(e, item)}
                                                />
                                            </td>
                                            <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} id='type-project-1'>
                                                {item.project_name}
                                            </td>
                                            <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} id='type-project-1'>
                                                {item.location} / {item.city}
                                            </td>
                                            <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} id='type-floor-1'>
                                                {item.bedrooms} / {item.floor}
                                            </td>
                                            <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                                {item.property_size}
                                            </td>
                                            <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                                {item.demand}
                                            </td>
                                            <td>
                                                <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#viewInventoryModal"
                                                onClick={() => getSingleInventory(item._id)}
                                                >
                                                View More
                                                </button>
                                            </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            )}
        </div>






{/*View More Model */}


<div className="modal fade" id="viewInventoryModal" tabIndex="-1" aria-labelledby="viewInventoryModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ marginTop: "4rem"}}>
          <div className="modal-content" >
            <div className="modal-header">
              <h5 className="modal-title" id="manualAddModalLabel">Inventory Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="details-table">
                    <div className="details-row">
                    <div className="details-key">Property Type</div>
                    <div className="details-value">{getSingleData.property_type}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Sale/Rent</div>
                    <div className="details-value">{getSingleData.sale_rent}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Builder Name</div>
                    <div className="details-value">{getSingleData.builder_name}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Project Name</div>
                    <div className="details-value">{getSingleData.project_name}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Location</div>
                    <div className="details-value">{getSingleData.location}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">City</div>
                    <div className="details-value">{getSingleData.city}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Property Size (Sqr ft)</div>
                    <div className="details-value">{getSingleData.property_size}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Bedrooms</div>
                    <div className="details-value">{getSingleData.bedrooms}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Demand</div>
                    <div className="details-value">{getSingleData.demand}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Registration Status</div>
                    <div className="details-value">{getSingleData.registration_status}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Tower</div>
                    <div className="details-value">{getSingleData.tower}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Floor</div>
                    <div className="details-value">{getSingleData.floor}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Facing</div>
                    <div className="details-value">{getSingleData.facing}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Furnishing Status</div>
                    <div className="details-value">{getSingleData.furnishing_status}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">No. Of Parking</div>
                    <div className="details-value">{getSingleData.no_of_parking}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Construction Status</div>
                    <div className="details-value">{getSingleData.construction_status}</div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Video Link</div>
                    <div className="details-value"><a href={getSingleData.video_link} className="details-link">{getSingleData.video_link}</a></div>
                    </div>
                    <div className="details-row">
                    <div className="details-key">Broker/Direct Inventory</div>
                    <div className="details-value">{getSingleData.broker_direct_inventory}</div>
                    </div>
                </div>
                </div>
          </div>
        </div>
      </div>



        </>
    );
    
};
export default Filter;
