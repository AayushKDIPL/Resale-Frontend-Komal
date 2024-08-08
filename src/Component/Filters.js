import React, { useEffect, useState } from 'react';

const Filter = () => {
    const [isOpenPropertyType, setIsOpenPropertyType] = useState(false);
    const [isOpenSaleRent, setIsOpenSaleRent] = useState(false);
    const [isOpenCity, setIsOpenCity] = useState(false);
    const [isOpenLocations, setIsOpenLocations] = useState(false);
    const [isOpenBedrooms, setIsOpenBedrooms] = useState(false);
    const [isOpenBudgetRange, setIsOpenBudgetRange] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(true); // Initially select all
    const [selectedOptions, setSelectedOptions] = useState([]); // Initially all options selected
    const options = ["Sector 62", "Sector 16", "Sector 121", "Sector 04", "Sector 15"];

    console.log(rows);

    useEffect(() => {
        getData();
    }, []);

    const toggleDropdown = (setter) => {
        setter(prev => !prev);
    };

    const handleSearchClick = () => {
        setShowResults(true);
    };

    const handleResetClick = () => {
        setShowResults(false);
        const updatedRows = rows.map(row => ({ ...row, isChecked: false }));
        setRows(updatedRows);
        setSelectedRows([]);
    };

    const handleCheckboxChange = (id) => {
        const updatedRows = rows.map(row => {
            if (row.id === id) {
                const updatedRow = { ...row, isChecked: !row.isChecked };
                if (updatedRow.isChecked) {
                    setSelectedRows(prevSelectedRows => [...prevSelectedRows, updatedRow]);
                } else {
                    setSelectedRows(prevSelectedRows => prevSelectedRows.filter(r => r.id !== id));
                }
                return updatedRow;
            }
            return row;
        });
        setRows(updatedRows);
    };

    const getData = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/product/", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            setRows(data.message);
        } catch (e) {
            alert("An error occurred");
        }
    };

    const toggleDropdownContainer = (filterType) => {
        switch (filterType) {
            case 'PropertyType':
                toggleDropdown(setIsOpenPropertyType);
                break;
            case 'SaleRent':
                toggleDropdown(setIsOpenSaleRent);
                break;
            case 'City':
                toggleDropdown(setIsOpenCity);
                break;
            case 'Locations':
                toggleDropdown(setIsOpenLocations);
                break;
            case 'Bedrooms':
                toggleDropdown(setIsOpenBedrooms);
                break;
            case 'BudgetRange':
                toggleDropdown(setIsOpenBudgetRange);
                break;
            default:
                break;
        }
    };

    const handleSelectAll = (event) => {
        const checked = event.target.checked;
        setSelectAllChecked(checked);
        if (checked) {
            setSelectedOptions([...options]);
        } else {
            setSelectedOptions([]);
        }
    };

    const handleOptionChange = (option) => {
        const index = selectedOptions.indexOf(option);
        if (index === -1) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            const updatedOptions = [...selectedOptions];
            updatedOptions.splice(index, 1);
            setSelectedOptions(updatedOptions);
        }
        setSelectAllChecked(selectedOptions.length === options.length);
    };

    const downloadCSV = () => {
        if (selectedRows.length === 0) {
            alert("No rows selected.");
            return;
        }

        const csvHeaders = [
            "Property Type", "Sale/Rent", "Builder Name", "Project Name", "Location", "City", "Property Size (Sqr ft)", 
            "Bedrooms", "Demand", "Registration Status", "Tower", "Floor", "Facing", "Furnishing Status", 
            "No. of Parking", "Construction Status", "Video Link", "Broker/Direct Inventory"
        ];

        const csvRows = selectedRows.map(row => [
            row.property_type, row.sale_rent, row.builder_name, row.project_name, row.location, row.city, 
            row.property_size, row.bedrooms, row.demand, row.registration_status, row.tower, row.floor, 
            row.facing, row.furnishing_status, row.no_of_parking, row.construction_status, row.video_link, 
            row.brokerDirectInventory
        ]);

        let csvContent = "data:text/csv;charset=utf-8," + [csvHeaders.join(","), ...csvRows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "selected_rows.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='filter-main'>
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdownContainer('PropertyType')} id='btn-main-filter'>
                    Property Type
                </button>
                {isOpenPropertyType && (
                    <div className="dropdown-content">
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>Commercial</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>Residential</label>
                        </div>
                    </div>
                )}
            </div>
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdownContainer('SaleRent')} id='btn-main-filter'>
                    Sale/Rent
                </button>
                {isOpenSaleRent && (
                    <div className="dropdown-content">
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>Sale</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>Rent</label>
                        </div>
                    </div>
                )}
            </div>
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdownContainer('City')} id='btn-main-filter'>
                    City
                </button>
                {isOpenCity && (
                    <div className="dropdown-content">
                        <div className="option-container" style={{ display: "flex", paddingLeft: "0.4rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>Noida</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "0.4rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>Delhi</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "0.4rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>Lucknow</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "0.4rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>Gurugram</label>
                        </div>
                    </div>
                )}
            </div>
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdownContainer('Locations')} id='btn-main-filter'>
                    Location
                </button>
                {isOpenLocations && (
                    <div className="dropdown-content">
                        <div className="select-all-container" style={{ display: "flex", paddingLeft: "0.4rem" }}>
                            <input
                                type="checkbox"
                                id="selectAll"
                                checked={selectAllChecked}
                                onChange={handleSelectAll}
                            />
                            <label htmlFor="selectAll" style={{ marginLeft: "0.2rem" }}>Select All</label>
                        </div>
                        {options.map(option => (
                            <div key={option} className="option-container" style={{ display: "flex", paddingLeft: "0.4rem" }}>
                                <input
                                    type="checkbox"
                                    id={option}
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleOptionChange(option)}
                                />
                                <label htmlFor={option} style={{ marginLeft: "0.2rem" }}>{option}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdownContainer('Bedrooms')} id='btn-main-filter'>
                    Bedrooms
                </button>
                {isOpenBedrooms && (
                    <div className="dropdown-content">
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>1BHK</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>2BHK</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>3BHK</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>4BHK</label>
                        </div>
                    </div>
                )}
            </div>
            <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdownContainer('BudgetRange')} id='btn-main-filter'>
                    Budget Range
                </button>
                {isOpenBudgetRange && (
                    <div className="dropdown-content">
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>₹10L-₹25L</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>₹26L-₹40L</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>₹41L-₹60L</label>
                        </div>
                        <div className="option-container" style={{ display: "flex", paddingLeft: "1rem" }}>
                            <input type="checkbox" />
                            <label style={{ marginLeft: "0.2rem" }}>₹61L-₹80L</label>
                        </div>
                    </div>
                )}
            </div>
            <div className="btn-container">
                <button onClick={handleSearchClick} className="search-btn">Search</button>
                <button onClick={handleResetClick} className="reset-btn">Reset</button>
            </div>
            {showResults && (
                <div className="results-section">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === rows.length}
                                        onChange={() => {
                                            if (selectedRows.length === rows.length) {
                                                setSelectedRows([]);
                                            } else {
                                                setSelectedRows(rows);
                                            }
                                        }}
                                    />
                                </th>
                                <th>Property Type</th>
                                <th>Sale/Rent</th>
                                <th>Builder Name</th>
                                <th>Project Name</th>
                                <th>Location</th>
                                <th>City</th>
                                <th>Property Size (Sqr ft)</th>
                                <th>Bedrooms</th>
                                <th>Demand</th>
                                <th>Registration Status</th>
                                <th>Tower</th>
                                <th>Floor</th>
                                <th>Facing</th>
                                <th>Furnishing Status</th>
                                <th>No. of Parking</th>
                                <th>Construction Status</th>
                                <th>Video Link</th>
                                <th>Broker/Direct Inventory</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    row={row}
                                    isChecked={selectedRows.some(r => r.id === row.id)}
                                    onCheckboxChange={() => handleCheckboxChange(row.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className="download-container">
                        <img
                            src="csv_icon.png" // Replace with the actual path to your CSV icon
                            alt="Download CSV"
                            className="csv-icon"
                            onClick={downloadCSV}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;


// TableRow Component
const TableRow = ({ row, onCheckboxChange }) => {
    const handleCheckboxToggle = () => {
        onCheckboxChange(row.id);
    };

    return (
        <>
            <tr>
                <td style={{ textAlign: "center", paddingLeft: "2rem" }}>
                    <label className="checkbox-label">
                        <input type="checkbox" checked={row.isChecked} onChange={handleCheckboxToggle} />
                    </label>
                </td>
                <td>{row.property_type}</td>
                <td>{row.sale_rent}</td>
                <td>{row.builder_name}</td>
                <td>{row.project_name}</td>
                <td>{row.location}</td>
                <td>{row.city}</td>
                <td>{row.property_size}</td>
                <td>{row.bedrooms}</td>
                <td>{row.demand}</td>
                <td>{row.registration_status}</td>
                <td>{row.tower}</td>
                <td>{row.floor}</td>
                <td>{row.facing}</td>
                <td>{row.furnishing_status}</td>
                <td>{row.no_of_parking}</td>
                <td>{row.construction_status}</td>
                <td>{row.video_link}</td>
                <td>{row.brokerDirectInventory}</td>
                <td>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${row.id}`}>View More</button>
                </td>
            </tr>

            {/* Modal Component */}
            <div className="modal fade" id={`modal-${row.id}`} tabIndex="-1" aria-labelledby={`modal-label-${row.id}`} aria-hidden="true">
                <div className="modal-dialog" style={{ marginTop: "10rem" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`modal-label-${row.id}`}>Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Inventory Content
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
