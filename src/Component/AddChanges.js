import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

import './Filter.css'; // Assuming you'll create a separate CSS file for styling

const AddChanges = () => {
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
    const [getAllBedrooms, setGetAllBedrooms]=useState([]);
    const [getAllBudget, setGetAllBudget]=useState([]);
    const [getAllSaleRent, setGetAllSaleRent]=useState([]);
    // console.log(getAllProperty);




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
    const [allCityData, setAllCityData] = useState([]);
    const [uniqueCity, setUniqueCity] = useState([]);
    const [uniqueLocation, setUniqueLocation] = useState([]);
  console.log(uniqueCity);

  useEffect(() => {
    fetchData();
    getFilterProperty();
    getFilterBedrooms();
    getFilterSaleRent();
    getFilterBudget();
  }, []);


  useEffect(() => {
    if (allCityData.length > 0) {
        const bedCitySet = new Set();

        for (let i = 0; i < allCityData.length; i++) {
            let storeCity = allCityData[i].city;

            if (storeCity) {
                // Convert to uppercase
                storeCity = storeCity.toUpperCase();

                // Ensure one space after the number
                storeCity = storeCity.replace(/^(\d+)(\s*)/, '$1 ');

                // Add to the Set with _id
                bedCitySet.add({storeCity });
            }
        }

        setUniqueCity(Array.from(bedCitySet));
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

    const handleCheckboxChangeForFilter = (filter, value) => {
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

    const fetchCityData = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/city/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
         // Initialize filteredRows with the fetched data
            setAllCityData(data.message);
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
                            if(a.property_type === 'Commercial') return -1
                            if(b.property_type === 'Commercial') return 1
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
                    {uniqueCity.map((e) => {
                      return (
                        <div
                          className="option-container d-flex ms-2"
                          key={e}
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <input
                            type="checkbox"
                            id={e}
                            checked={selectedCity.includes(e)}
                            onChange={() => handleCheckboxChangeForFilter("city", e)}
                          />
                          <label
                            htmlFor={e}
                            className="ms-2 location-size"
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                             id='div-small'
                          >
                            {e}
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
                        {uniqueLocation.map((e)=>{
                            return(
                                <div className="option-container d-flex ms-2" key={e} style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                  }}>
                                    <input
                                        type="checkbox"
                                        id={e}
                                        checked={selectedLocations.includes(e)}
                                        onChange={() => handleCheckboxChangeForFilter("locations", e)}
                                    />
                                    <label htmlFor={e} className='ms-2 location-size' style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }} id='div-small'>{e}</label>
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
                            <button type="button" className="btn btn-success me-1" onClick={shareOnWhatsApp} id='whatsapp'>Share on WhatsApp</button>
                            <button type="button" className="btn btn-primary" onClick={downloadCSV} id='csv'>Download CSV</button>
                            <div className="table-responsive mt-2">
                                <table className="table table-striped custom-table" style={{marginTop:"0%"}}>
                                    <thead className='head-table'>
                                        <tr>
                                            <th style={{ width: "4.4rem" }}>Action</th>
                                            <th>Property Type</th>
                                            <th>Sale/Rent</th>
                                            <th>Location</th>
                                            <th>City</th>
                                            <th>Bedrooms</th>
                                            <th>Budget Range</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRows.map((item) => (
                                            <tr key={item._id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedData.includes(item)}
                                                        onChange={(e) => handleCheckboxChange(e, item)}
                                                    />
                                                </td>
                                                <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{item.property_type}</td>
                                                <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{item.sale_rent}</td>
                                                <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{item.location}</td>
                                                <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{item.city}</td>
                                                <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{item.bedrooms}</td>
                                                <td style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{item.budget_range}</td>
                                                <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewInventoryModal" onClick={() => getSingleInventory(item._id)}>View More</button></td>
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
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Property Type : <span style={{color:"green"}}>{getSingleData.property_type}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Sale/Rent : <span style={{color:"green"}}>{getSingleData.sale_rent}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Builder Name : <span style={{color:"green"}}>{getSingleData.builder_name}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Project Name : <span style={{color:"green"}}>{getSingleData.project_name}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Location : <span style={{color:"green"}}>{getSingleData.location}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>City : <span style={{color:"green"}}>{getSingleData.city}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Property Size (Sqr ft) : <span style={{color:"green"}}>{getSingleData.property_size}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Bedrooms : <span style={{color:"green"}}>{getSingleData.bedrooms}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Demand : <span style={{color:"green"}}>{getSingleData.demand}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Registration Status : <span style={{color:"green"}}>{getSingleData.registration_status}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Tower : <span style={{color:"green"}}>{getSingleData.tower}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Floor : <span style={{color:"green"}}>{getSingleData.floor}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Facing : <span style={{color:"green"}}>{getSingleData.facing}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Furnishing Status : <span style={{color:"green"}}>{getSingleData.furnishing_status}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>No. Of Parking : <span style={{color:"green"}}>{getSingleData.no_of_parking}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Construction Status : <span style={{color:"green"}}>{getSingleData.construction_status}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Video Link : <span style={{color:"green"}}></span><a href={getSingleData.video_link}>{getSingleData.video_link}</a></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Broker/Direct Inventory : <span style={{color:"green"}}>{getSingleData.broker_direct_inventory}</span></h6>
            </div>
          </div>
        </div>
      </div>



        </>
    );
    
};
export default AddChanges;
