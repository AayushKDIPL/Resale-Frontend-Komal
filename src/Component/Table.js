import React, { useEffect, useState } from 'react';
import './Table.css'; // Import your CSS file for custom styling

const Table = () => {
  
  const [allData, setAllData] = useState([]);
  const [uniqueBedrooms, setUniqueBedrooms] = useState([]);
  const [uniqueCity, setUniqueCity] = useState([]);
  const [uniqueLocation, setUniqueLocation] = useState([]);
  const [uniqueProperty, setUniqueProperty] = useState([]);
  const [uniqueSale, setUniqueSale] = useState([]);
  const [uniqueBudget, setUniqueBudget] = useState([]);
  console.log(uniqueBudget);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/product/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setAllData(data.message); // Assuming data.message is an array
    } catch (e) {
      alert('An error occurred');
    }
  };

  useEffect(() => {
    if (allData.length > 0) {
      const bedRoomsSet = new Set();
      const bedCitySet = new Set();
      const bedLocationSet = new Set();
      const bedBudgetSet = new Set();
      const bedPropertySet = new Set();
      const bedSaleSet = new Set();
  
      for (let i = 0; i < allData.length; i++) {
        let storeBedroom = allData[i].bedrooms;
        let storeCity = allData[i].city;
        let storeLocation = allData[i].location;
        let storeProperty = allData[i].property_type;
        let storeBudget = allData[i].budget_range;
        let storeSale = allData[i].sale_rent;
        if (storeBedroom) {
          // Convert to uppercase
          storeBedroom = storeBedroom.toUpperCase();
  
          // Ensure one space after the number
          storeBedroom = storeBedroom.replace(/^(\d+)(\s*)/, '$1 ');
  
          // Add to the Set
          bedRoomsSet.add(storeBedroom);
        }
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
        if (storeProperty) {
          // Convert to uppercase
          storeProperty = storeProperty.toUpperCase();
  
          // Ensure one space after the number
          storeProperty = storeProperty.replace(/^(\d+)(\s*)/, '$1 ');
  
          // Add to the Set
          bedPropertySet.add(storeProperty);
        }
        if (storeSale) {
          // Convert to uppercase
          storeSale = storeSale.toUpperCase();
  
          // Ensure one space after the number
          storeSale = storeSale.replace(/^(\d+)(\s*)/, '$1 ');
  
          // Add to the Set
          bedSaleSet.add(storeSale);
        }
        if (storeBudget) {
          // Convert to uppercase
          storeBudget = storeBudget.toUpperCase();
  
          // Ensure one space after the number
          storeBudget = storeBudget.replace(/^(\d+)(\s*)/, '$1 ');
  
          // Add to the Set
          bedBudgetSet.add(storeBudget);
        }
      }
  
      setUniqueBedrooms(Array.from(bedRoomsSet));
      setUniqueCity(Array.from(bedCitySet));
      setUniqueLocation(Array.from(bedLocationSet));
      setUniqueProperty(Array.from(bedPropertySet));
      setUniqueSale(Array.from(bedSaleSet));
      setUniqueBudget(Array.from(bedBudgetSet));
    }
  }, [allData]);
  






// Compress data with filter

  // useEffect(() => {
  //   if (allData.length > 0) {
  //     const bedroomsSet = new Set();
  //     const bedroomsMap = new Map(); // To store original values with normalized mapping
  
  //     for (let i = 0; i < allData.length; i++) {
  //       let bedroom = allData[i].bedrooms;
  //       if (bedroom) {
  //         bedroom = bedroom.trim(); // Remove leading and trailing whitespace
  //         const normalized = bedroom.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); // Remove non-alphanumeric characters and convert to lowercase
  
  //         // Define a consistent format for display
  //         const formatted = `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`;
  
  //         if (!bedroomsSet.has(normalized)) {
  //           bedroomsSet.add(normalized);
  //           bedroomsMap.set(normalized, formatted); // Store the formatted value
  //         }
  //       }
  //     }
  
  //     setUniqueBedrooms(Array.from(bedroomsSet).map(normalized => bedroomsMap.get(normalized)));
  //   }
  // }, [allData]);
  
  
  
  








  return (
    <div className="table-responsive table-main">
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>For</th>
            <th>Type</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OneWave</td>
            <td>Sector 16</td>
            <td>Rent</td>
            <td>2BHK</td>
            <td>40K</td>
          </tr>
          <tr>
            <td>OneWave</td>
            <td>Sector 16</td>
            <td>Rent</td>
            <td>2BHK</td>
            <td>40K</td>
          </tr>
          <tr>
            <td>OneWave</td>
            <td>Sector 16</td>
            <td>Rent</td>
            <td>2BHK</td>
            <td>40K</td>
          </tr>
          <tr>
            <td>OneWave</td>
            <td>Sector 16</td>
            <td>Rent</td>
            <td>2BHK</td>
            <td>40K</td>
          </tr>
          <tr>
            <td>OneWave</td>
            <td>Sector 16</td>
            <td>Rent</td>
            <td>2BHK</td>
            <td>40K</td>
          </tr>
          <tr>
            <td>OneWave</td>
            <td>Sector 16</td>
            <td>Rent</td>
            <td>2BHK</td>
            <td>40K</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
