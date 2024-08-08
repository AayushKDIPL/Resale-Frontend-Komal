import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const Excel = () => {
  const [excelData, setExcelData] = useState([]);
  const [getExcelData, setGetExcelData] = useState([]);
  const [getSingleData, setGetsingleData] = useState({});
  const [edit, setEdit] = useState({});
  console.log(edit);

  useEffect(() => {
    getData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log('Parsed JSON Data:', jsonData);
        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setEdit(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const uploadData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/product/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: excelData })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        alert("Upload Successful");
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      alert("An error occurred");
    }
  };

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/product/", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setGetExcelData(data.message);
    } catch (e) {
      alert("An error occurred");
    }
  };

  const getSingleInventory = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/product/" + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setGetsingleData(data.message);
      setEdit(data.message);  // Set the edit state to the current data for editing
    } catch (e) {
      alert("An error occurred");
    }
  };

  const editInventory = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/product/" + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(edit)  // Send the edit state data
      });
      const data = await res.json();
      if (data.status === 'ok') {
        alert("Update Successful");
        getData();
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      alert("An error occurred");
    }
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
      <div>
        <h3>Parsed Data:</h3>
        <pre>{JSON.stringify(excelData, null, 2)}</pre>
      </div>
      <button onClick={uploadData}>Upload Data</button>
      <div>
        {getExcelData.map((e) => (
          <div key={e._id}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getSingleInventory(e._id)}>Edit</button>
            <h4>{e.builder_name}</h4>
          </div>
        ))}
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ marginTop: "10rem" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Inventory</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h2>Edit Inventory</h2>
              <input
                type='text'
                name='builder_name'
                value={edit.builder_name || ''}
                onChange={handleUpdate}
              />
              <button type="button" className="btn btn-primary" onClick={() => editInventory(getSingleData._id)}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Excel;
