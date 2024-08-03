import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import "./Search.css";

function Search() {
  const [excelData, setExcelData] = useState([]);
  const [getExcelData, setGetExcelData] = useState([]);
  const [getSingleData, setGetsingleData] = useState({});
  const [inventory, setInventory] = useState([]);
  const [edit, setEdit] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [isOpenPropertyType, setIsOpenPropertyType] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [broker, setBroker] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [saleRent, setSale] = useState('');
  const [getACity, setGetACity] = useState([]);
  const [getABudget, setGetABudget] = useState([]);
  const [getALocation, setGetALocation] = useState([]);
  const [getABed, setGetABed] = useState([]);
  const [getABroker, setGetABroker] = useState([]);
  const [getASale, setGetASale] = useState([]);
  const [getAPro, setGetAPro] = useState([]);
  const [getAProjectName, setgetAProjectName] = useState([]);
  const [getABuilderName, setGetABuilderName] = useState([]);
  const [getAConstructionStatus, setGetAConstructionStatus] = useState([]);
  const [getAFurnishingStatus, setGetAFurnishingStatus] = useState([]);
  const [getARegistrationStatus, setGetARegistrationStatus] = useState([]);
  const [getADealThrough, setGetADealThrough] = useState([]);
  const [getAEmployeeName, setGetAEmployeeName] = useState([]);

  // console.log(getACity);
  // console.log(getABed);
  // console.log(getABroker);
  // console.log(getAPro);
  // console.log(getASale);
  // console.log(getALocation);

const jumps=useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);





  const [selectedData, setSelectedData] = useState([]);
  console.log(selectedData);

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









  const [formData, setFormData] = useState({
    customerName: '',
    cityId: '',
    mobileNo: '',
    empName: '',
    budgetRange: '',
    propertyType: '',
    saleRent: '',
    builderName: '',
    projectName: '',
    location: '',
    city: '',
    propertySize: '',
    bedrooms: '',
    demand: '',
    registrationStatus: '',
    unitNo: '',
    tower: '',
    floor: '',
    facing: '',
    furnishingStatus: '',
    noOfParking: '',
    constructionStatus: '',
    videoLink: '',
    brokerDirectInventory: '',
  });



  const checkIfSelected = () => {
    if (selectedData.length === 0) {
        alert("Please select at least one checkbox.");
        return false;
    }
    return true;
};

  useEffect(()=>{
    getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
  },[]);


  {/*Models Additional */}


  const [broker_direct, setBrokerDirect] = useState('');

    const handleBrokerChange = (e) => {
        setBrokerDirect(e.target.value);
    };

    const addBrokerDirect = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/brokerDirect',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({broker_direct})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };



    const [property_type, setPropertyType] = useState('');

    const handlePropertyTypeChange = (e) => {
        setPropertyType(e.target.value);
    };

    const addPropertyType = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/propertyType',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({property_type})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };





































    const [project_name, setProjectName] = useState('');

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    };

    const addProjectName = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/projectName',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({project_name})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
      }catch(e){
        alert("Something went");
      }
    };




    const [builder_name, setBuilderName] = useState('');

    const handleBuilderNameChange = (e) => {
        setBuilderName(e.target.value);
    };

    const addBuilderName = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/builderName',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({builder_name})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };


    const [construction_status, setConstructionStatus] = useState('');

    const handleConstructionStatusChange = (e) => {
        setConstructionStatus(e.target.value);
    };

    const addConstructionStatus = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/construction',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({construction_status})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };



    const [furnishing_status, setFurnishingStatus] = useState('');

    const handleFurnishingStatusChange = (e) => {
        setFurnishingStatus(e.target.value);
    };

    const addFurnishingStatus = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/furnishing',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({furnishing_status})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };



    const [registration_status, setRegistrationStatus] = useState('');

    const handleRegistrationStatusChange = (e) => {
        setRegistrationStatus(e.target.value);
    };

    const addRegistrationStatus = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/registration',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({registration_status})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };



    const [deal_through, setDealThrough] = useState('');

    const handleDealThroughChange = (e) => {
        setDealThrough(e.target.value);
    };

    const addDealThrough = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/dealThrough',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({deal_through})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };


    const [employee_name, setEmployeeName] = useState('');

    const handleEmployeeNameChange = (e) => {
        setEmployeeName(e.target.value);
    };

    const addEmployeeName = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/employeeName',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({employee_name})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };





































































    const handleCityUpdateChange = (e) => {
      const selectedCity = getACity.find(city => city.city === e.target.value);
      setFormData({
        city: e.target.value,
        cityId: selectedCity?._id || '',
      });
    };
























    const [sale_rent, setSaleRent] = useState('');

    const handleSaleRentChange = (e) => {
        setSaleRent(e.target.value);
    };

    const addSaleRent = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/saleRent',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({sale_rent})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };



    const [cityy, setCityy] = useState('');

    const handleCityChange = (e) => {
        setCityy(e.target.value);
    };

    const addCity = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/city',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({cityy})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };




    const [locationy, setLocationy] = useState('');

    const handleLocationChange = (e) => {
      setLocationy(e.target.value);
    };





    const addLocation = async () => {
      try {
        if (formData.city === '') {
          alert("Please Select City First");
        }
        else if(locationy === ''){
          alert("Please Add Location First");
        }else {
          const res = await fetch('http://localhost:8000/api/location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ locationy, id: formData.cityId })
          });
          const data = await res.json();
          alert(data.message);
          getData();
          getBed();
          getBroker();
          getCity();
          getBudget();
          getLocation();
          getpro();
          getSaleRent();
          getProject();
          getBuilder();
          getConstruction();
          getFurnishing();
          getRegistration();
          getDeal();
          getEmployee();
        }
      } catch (e) {
        alert("Something went wrong");
      }
    };






    const [budgets, setBudgets] = useState('');

    const handleBudgetChange = (e) => {
      setBudgets(e.target.value);
    };

    const addBudget = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/budget',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({budgets})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
    getBroker();
    getCity();
    getBudget();
    getLocation();
    getpro();
    getSaleRent();
    getProject();
    getBuilder();
    getConstruction();
    getFurnishing();
    getRegistration();
    getDeal();
    getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };








    const [bed, setBed] = useState('');

    const handleBed = (e) => {
      setBed(e.target.value);
    };

    const addBed = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/bedrooms',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({bed})
        })
        const data=await res.json();
        alert(data.message);
        getData();
        getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
      }catch(e){
        alert("Something went wrong");
      }
    };



    {/*get Additional*/}

    const getCity = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/city',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetACity(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };



    const getBudget = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/budget',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetABudget(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };



    const getLocation = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/location',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetALocation(data.message);
        console.log(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

    const getSaleRent = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/saleRent',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetASale(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

    const getBroker = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/brokerDirect',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetABroker(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

    const getBed = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/bedrooms',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetABed(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

    const getpro = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/propertyType',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetAPro(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };




    const getProject = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/projectName',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setgetAProjectName(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

    const getBuilder = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/builderName',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetABuilderName(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };



    const getConstruction = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/construction',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetAConstructionStatus(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

    const getFurnishing = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/furnishing',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetAFurnishingStatus(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

    const getRegistration = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/registration',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetARegistrationStatus(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

    const getDeal = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/dealThrough',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetADealThrough(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

    const getEmployee = async() => {
      try{
        const res=await fetch('http://localhost:8000/api/EmployeeName',{
          method:'GET',
          headers: {'Content-Type':'application/json'}
        })
        const data=await res.json();
        setGetAEmployeeName(data.message);
      }catch(e){
        console.log("Something went wrong");
      }
    };

















    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
        } else {
            navigate('/login');
        }
    }, [navigate]);


    






  const shareOnWhatsApp = () => {
    if (!checkIfSelected()) return;
    const message = selectedData.map((item) => {
      return `
      Customer Name: ${item.customer_name}
      Emp Name: ${item.empName}
      Customer Number: ${item.customer_mobile}
      Registration Status: ${item.registration_status}
      Unit No.: ${item.unit_no}
      Facing: ${item.facing}
      Furnishing Status: ${item.furnishing_status}
      No. of Parking: ${item.no_of_parking}
      Construction Status: ${item.construction_status}
      Property Type: ${item.property_type}
      Sale/Rent: ${item.sale_rent}
      Location: ${item.location}
      City: ${item.city}
      Bedrooms: ${item.bedrooms}
      Budget Range: ${item.budget_range}
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
      "Customer Name": item.customer_name,
      "Emp Name": item.empName,
      "Customer Number": item.customer_mobile,
      "Registration Status": item.registration_status,
      "Unit No.": item.unit_no,
      "Facing": item.facing,
      "Furnishing Status": item.furnishing_status,
      "No. of Parking": item.no_of_parking,
      "Construction Status": item.construction_status,
      "Property Type": item.property_type,
      "Sale/Rent": item.sale_rent,
      "Location": item.location,
      "City": item.city,
      "Bedrooms": item.bedrooms,
      "Budget Range": item.budget_range,
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
      link.setAttribute("download", "ResaleInventory.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };












  useEffect(() => {
    getData();
  }, []);




  

  const [editFormData, setEditFormData] = useState({
    customerName: '',
    mobileNo: '',
    empName: '',
    budgetRange: '',
    propertyType: '',
    saleRent: '',
    builderName: '',
    projectName: '',
    location: '',
    city: '',
    propertySize: '',
    bedrooms: '',
    demand: '',
    registrationStatus: '',
    unitNo: '',
    tower: '',
    floor: '',
    facing: '',
    furnishingStatus: '',
    noOfParking: '',
    constructionStatus: '',
    videoLink: '',
    brokerDirectInventory: '',
  });



  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };



  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditFormData((prevStates) => ({
      ...prevStates,
      [id]: value,
    }));
  };



  const addInventory = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch('http://localhost:8000/api/product/single',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({data: formData})
      });
      const data=await response.json();
        alert(data.message);
    } catch (error) {
      // alert('There was an error!', error);
      // Handle error response
    }
  };



  const editYourInventory = async (id) => {
    try {
      const response = await fetch('http://localhost:8000/api/product/'+id,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({data: formData, _id: id})
      });
      const data=await response.json();
        alert(data.message);
    } catch (error) {
      // alert('There was an error!', error);
      // Handle error response
    }
  };






  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        // console.log('Parsed JSON Data:', jsonData);
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
      console.log(e);
    }
  };

  const getSingleInventory = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/product/" + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setGetsingleData(data.message); // Set the edit state to the current data for editing
      setEditFormData(data.message); // Set the edit state to the current data for editing
    } catch (e) {
      alert("An error occurred");
    }
  };


  const deleteSingleInventory = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/product/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      fetchData();
    } catch (e) {
      alert("An error occurred");
    }
  };

  const delProperty = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/propertyType/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };








// Dell Properties


  const delProjectName = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/projectName/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };

  const delBuilderName = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/builderName/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };

  const delConstructionStatus = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/construction/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };

  const delFurnishingStatus = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/furnishing/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };


  const delRegistrationStatus = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/registration/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };


  const delDealThrough = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/dealThrough/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };


  const delEmployeeNameh = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/employeeName/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };














  const delBedrooms = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/bedrooms/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };

  const delBroker = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/brokerDirect/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };

  const delCity = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/city/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };



  const delBudget = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/budget/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
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
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
    } catch (e) {
      alert("An error occurred");
    }
  };

  const delSaleRent = async (id) => {
    try {
      const res = await fetch("http://localhost:8000/api/saleRent/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      alert(data.message);
      getData();
      getBed();
        getBroker();
        getCity();
        getBudget();
        getLocation();
        getpro();
        getSaleRent();
        getProject();
        getBuilder();
        getConstruction();
        getFurnishing();
        getRegistration();
        getDeal();
        getEmployee();
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

  const fetchData = async () => {
    try {
        const res = await fetch('http://localhost:8000/api/product/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json(); // Initialize filteredRows with the fetched data
        setInventory(data.message);
    } catch (e) {
        alert("An error occurred");
    }
  };

  const handleViewInventoryClick = () => {
    fetchData();
    setShowTable(prevState => !prevState);
  };
  


  const toggleDropdown = (setter) => {
    setter(prev => !prev);
};



useEffect(() => {
  if (searchTerm.trim() === '') {
    setFilteredData(inventory);
  } else {
    setFilteredData(
      inventory.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
}, [searchTerm, inventory]);












  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };





  const [isFirstDivVisible, setIsFirstDivVisible] = useState(true);

    const toggleDivs = () => {
        setIsFirstDivVisible(!isFirstDivVisible);
    };



    const logoutAdmin=async()=>{
      try{
        const token = localStorage.getItem('accessToken');
        const rec=await fetch('http://localhost:8000/api/auth/logout',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `${token}`
        }
        });
        const data=await rec.json();
        if(data.message == "Signout success"){
          localStorage.removeItem('accessToken');
          alert(data.message);
          jumps("./login");
        }else{
          alert(data.message);
        }
      }catch(e){
        alert("Something went wrong");
      }
    }





  return (
    <>
      <div className='text-center main'>
        <div className="wrap d-flex">
          <div className="search">
            <input type="text" className="searchTerm" placeholder="Search here" id="search" value={searchTerm} onChange={handleSearchChange}/>
            <button className="search-button search-btn" onClick={toggleDivs}>Search</button>
          </div>
          <div>
              {isLoggedIn && <button id='logout' onClick={logoutAdmin}>Logout</button>}
          </div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addInventoryModal">Add Inventory</button>
          <button className="get-button search-btn" onClick={handleViewInventoryClick}>
            {showTable ? 'Hide Inventory' : 'View Inventory'}
          </button>
          <div className="dropdown">
                <button className="dropdown-btn dropdown-toggle" onClick={() => toggleDropdown(setIsOpenPropertyType)} id='btn-main-filter' style={{width:"12.2rem"}}>
                    Add Additional Details
                </button>
                {isOpenPropertyType && (
                    <div className="dropdown-content">
                        <div className="option-container">
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addPropertyTypeModal">Property Type</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addSaleRentModal">Sale/Rent</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addLocationModal">Location</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addBedroomsModal">Bedrooms</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addBrokerDirectModal">Broker/Direct</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addCityModal">City</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addBudgetModal">Budget Range</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addProjectNameModal">Project Name</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addBuilderNameModal">Builder Name</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addConstructionModal">Construction Status</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addFurnishingModal">Furnishing Status</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addRegistrationModal">Registration Status</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addDealModal">Deal Through</button>
                          <button className="create-button search-btn" type="button" data-bs-toggle="modal" data-bs-target="#addEmployeeNameModal">Employee Name</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {showTable && (
        <div>
        <button type="button" className="btn btn-success me-1" onClick={shareOnWhatsApp}>Share on WhatsApp</button>
        <button type="button" className="btn btn-primary" onClick={downloadCSV}>Download CSV</button>
        <div className="table-responsive mt-2">
          <table className="table table-striped custom-table" id='custom-table' style={{marginTop:"0%"}}>
            <thead className='head-table'>
              <tr style={{marginBottom:"4rem"}}>
                <th style={{ width: "4.4rem" }}>Action</th>
                <th>Project Name</th>
                <th>Location/City</th>
                <th>Type/Floor</th>
                <th>Size</th>
                <th>Demand</th>
                <th style={{width:"12rem"}}>Details</th>
              </tr>
            </thead>


            {isFirstDivVisible ? (
            <tbody>

                {inventory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((e) => {
                  return (
                    <tr key={e._id}>
                    <td id='bkb' style={{ textAlign: "center", paddingLeft: "2rem" }}>
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={selectedData.some((data) => data._id === e._id)}
                          onChange={(event) => handleCheckboxChange(event, e)} 
                        />
                      </label>
                    </td>
                      <td id='bkc' style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{e.project_name}</td>
                      <td id='bk' style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{e.location} / {e.city}</td>
                      <td id='b' style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{e.bedrooms} / {e.floor}</td>
                      <td id='bkfs' style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{e.property_size}</td>
                      <td id='bkgh' style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{e.demand}</td>
                      <td style={{display:"flex"}}>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewInventoryModal" onClick={() => getSingleInventory(e._id)}>View More</button>
                        <div type="button" onClick={() => deleteSingleInventory(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></div>
                      </td>
                    </tr>
                  );
                })}
        </tbody>

            ) : (
            <tbody>

              {filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((e) => {
                return (
                  <tr key={e._id}>
                  <td id='bkb' style={{ textAlign: "center", paddingLeft: "2rem" }}>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={selectedData.some((data) => data._id === e._id)}
                        onChange={(event) => handleCheckboxChange(event, e)} 
                      />
                    </label>
                  </td>
                    <td id='bkc'>{e.project_name}</td>
                    <td id='bk'>{e.location} / {e.city}</td>
                    <td id='b'>{e.bedrooms} / {e.floor}</td>
                    <td id='bkfs'>{e.property_size}</td>
                    <td id='bkgh'>{e.demand}</td>
                    <td id='bkbbb' style={{display:"flex"}}>
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewInventoryModal" onClick={() => getSingleInventory(e._id)}>View More</button>
                      <div type="button" onClick={() => deleteSingleInventory(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></div>
                    </td>
                  </tr>
                );
              })}
        </tbody>

            )}

   
          </table>
        </div>
      </div>
      )}

      {/* Add Inventory Modal */}
      <div className="modal fade" id="addInventoryModal" tabIndex="-1" aria-labelledby="addInventoryModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ marginTop: "22.4rem", marginRight: "40rem", width: "16rem" }}>
          <div className="modal-content">
            <div className="modal-body">
              <button className='create-button' type="button" data-bs-toggle="modal" data-bs-target="#manualAddModal">Add Manually</button>
              <button className='get-button' onClick={uploadData}>Upload Excel</button>
              <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
            </div>
          </div>
        </div>
      </div>





      <div className="modal fade" id="viewInventoryModal" tabIndex="-1" aria-labelledby="viewInventoryModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ marginTop: "4rem"}}>
          <div className="modal-content" >
            <div className="modal-header">
              <h5 className="modal-title" id="manualAddModalLabel">Inventory Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Customer Name : <span style={{color:"green"}}>{getSingleData.customer_name}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Mobile No. : <span style={{color:"green"}}>{getSingleData.customer_mobile}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Emp Name : <span style={{color:"green"}}>{getSingleData.empName}</span></h6>
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Budget Range : <span style={{color:"green"}}>{getSingleData.budget_range}</span></h6>
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
                <h6 style={{fontWeight:"400",fontSize:"20px"}}>Unit No. : <span style={{color:"green"}}>{getSingleData.unit_no}</span></h6>
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






      {/* Manual Add Inventory Modal */}
      <div className="modal fade" id="manualAddModal" tabIndex="-1" aria-labelledby="manualAddModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="manualAddModalLabel">Add Inventory Manually</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-label">Customer Name</label>
                  <input type="text" className="form-control" id="customerName" onChange={handleChange} value={formData.customerName} />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNo" className="form-label">Mobile No.</label>
                  <input type="text" className="form-control" id="mobileNo" onChange={handleChange} value={formData.mobileNo} />
                </div>
                <div className="mb-3">
                  <label htmlFor="empName" className="form-label">Emp Name</label>
                  <select className="form-control" id="empName" onChange={handleChange} value={formData.empName}>
                  <option selected>Open this select menu</option>
                    {getAEmployeeName.map((e)=>{
                      return(
                        <option>{e.employee}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="budgetRange" className="form-label">Budget Range</label>
                  <select className="form-control" id="budgetRange" onChange={handleChange} value={formData.budget}>
                  <option selected>Open this select menu</option>
                    {getABudget.map((e)=>{
                      return(
                        <option>{e.budget}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="propertyType" className="form-label">Property Type</label>
                  <select className="form-control" id="propertyType" onChange={handleChange} value={formData.propertyType}>
                  <option selected>Open this select menu</option>
                    {getAPro.map((e)=>{
                      return(
                        <option>{e.property_type}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="saleRent" className="form-label">Sale/Rent</label>
                  <select className="form-control" id="saleRent" onChange={handleChange} value={formData.saleRent}>
                  <option selected>Open this select menu</option>
                    {getASale.map((e)=>{
                      return(
                        <option>{e.sale_rent}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="builderName" className="form-label">Builder Name</label>
                  <select className="form-control" id="builderName" onChange={handleChange} value={formData.builderName}>
                  <option selected>Open this select menu</option>
                    {getABuilderName.map((e)=>{
                      return(
                        <option>{e.builder}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="projectName" className="form-label">Project Name</label>
                  <select className="form-control" id="projectName" onChange={handleChange} value={formData.projectName}>
                  <option selected>Open this select menu</option>
                    {getAProjectName.map((e)=>{
                      return(
                        <option>{e.project}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <select className="form-control" id="location" onChange={handleChange} value={formData.location}>
                  <option selected>Open this select menu</option>
                    {getALocation.map((e)=>{
                      return(
                        <option>{e.location}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <select className="form-control" id="city" onChange={handleChange} value={formData.city}>
                  <option selected>Open this select menu</option>
                  {getACity.map((e)=>{
                      return(
                        <option>{e.city}</option>
                      )
                    })}
                    {/* Add more cities as needed */}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="propertySize" className="form-label">Property Size</label>
                  <input type="text" className="form-control" id="propertySize" onChange={handleChange} value={formData.propertySize} />
                </div>
                <div className="mb-3">
                  <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                  <select className="form-control" id="bedrooms" onChange={handleChange} value={formData.bedrooms}>
                  <option selected>Open this select menu</option>
                  {getABed.map((e)=>{
                      return(
                        <option>{e.bedrooms}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="demand" className="form-label">Demand</label>
                  <input type="text" className="form-control" id="demand" onChange={handleChange} value={formData.demand} />
                </div>
                <div className="mb-3">
                  <label htmlFor="registrationStatus" className="form-label">Registration Status</label>
                  <select className="form-control" id="registrationStatus" onChange={handleChange} value={formData.registrationStatus}>
                  <option selected>Open this select menu</option>
                  {getARegistrationStatus.map((e)=>{
                      return(
                        <option>{e.registration}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="unitNo" className="form-label">Unit No</label>
                  <input type="text" className="form-control" id="unitNo" onChange={handleChange} value={formData.unitNo} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tower" className="form-label">Tower</label>
                  <input type="text" className="form-control" id="tower" onChange={handleChange} value={formData.tower} />
                </div>
                <div className="mb-3">
                  <label htmlFor="floor" className="form-label">Floor</label>
                  <input type="text" className="form-control" id="floor" onChange={handleChange} value={formData.floor} />
                </div>
                <div className="mb-3">
                  <label htmlFor="facing" className="form-label">Facing</label>
                  <input type="text" className="form-control" id="facing" onChange={handleChange} value={formData.facing} />
                </div>
                <div className="mb-3">
                  <label htmlFor="furnishingStatus" className="form-label">Furnishing Status</label>
                  <select className="form-control" id="furnishingStatus" onChange={handleChange} value={formData.furnishingStatus}>
                  <option selected>Open this select menu</option>
                  {getAFurnishingStatus.map((e)=>{
                      return(
                        <option>{e.furnishing}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="noOfParking" className="form-label">No. of Parking</label>
                  <input type="text" className="form-control" id="noOfParking" onChange={handleChange} value={formData.noOfParking} />
                </div>
                <div className="mb-3">
                  <label htmlFor="constructionStatus" className="form-label">Construction Status</label>
                  <select className="form-control" id="constructionStatus" onChange={handleChange} value={formData.constructionStatus}>
                  <option selected>Open this select menu</option>
                  {getAConstructionStatus.map((e)=>{
                      return(
                        <option>{e.construction}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="videoLink" className="form-label">Video Link</label>
                  <input type="text" className="form-control" id="videoLink" onChange={handleChange} value={formData.videoLink} />
                </div>
                <div className="mb-3">
                  <label htmlFor="brokerDirectInventory" className="form-label">Broker/Direct Inventory</label>
                  <select className="form-control" id="brokerDirectInventory" onChange={handleChange} value={formData.brokerDirectInventory}>
                  <option selected>Open this select menu</option>
                  {getABroker.map((e)=>{
                      return(
                        <option>{e.Broker_Direct}</option>
                      )
                    })}
                  </select>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={addInventory} >Add Inventory</button>
            </div>
          </div>
        </div>
      </div>











{/* Edit Model */}

<div className="modal fade" id="manualAddEditModal" tabIndex="-1" aria-labelledby="manualAddEditModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="manualAddEditModalLabel">Update Inventory</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-label">Customer Name</label>
                  <input type="text" className="form-control" id="customerName" onChange={handleEditChange} value={editFormData.customer_name} />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNo" className="form-label">Mobile No.</label>
                  <input type="text" className="form-control" id="mobileNo" onChange={handleEditChange} value={editFormData.customer_mobile} />
                </div>
                <div className="mb-3">
                  <label htmlFor="empName" className="form-label">Emp Name</label>
                  <input type="text" className="form-control" id="empName" onChange={handleEditChange} value={editFormData.emp_name} />
                </div>
                <div className="mb-3">
                  <label htmlFor="budgetRange" className="form-label">Budget Range</label>
                  <input type="text" className="form-control" id="budgetRange" onChange={handleEditChange} value={editFormData.budget_range} />
                </div>
                <div className="mb-3">
                  <label htmlFor="propertyType" className="form-label">Property Type</label>
                  <input type="text" className="form-control" id="propertyType" onChange={handleEditChange} value={editFormData.property_type} />
                </div>
                <div className="mb-3">
                  <label htmlFor="saleRent" className="form-label">Sale/Rent</label>
                  <input type="text" className="form-control" id="saleRent" onChange={handleEditChange} value={editFormData.sale_rent} />
                </div>
                <div className="mb-3">
                  <label htmlFor="builderName" className="form-label">Builder Name</label>
                  <input type="text" className="form-control" id="builderName" onChange={handleEditChange} value={editFormData.builder_name} />
                </div>
                <div className="mb-3">
                  <label htmlFor="projectName" className="form-label">Project Name</label>
                  <input type="text" className="form-control" id="projectName" onChange={handleEditChange} value={editFormData.project_name} />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <select className="form-control" id="location" onChange={handleEditChange} value={editFormData.location}>
                    <option>Sector 16</option>
                    <option>Sector 15</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <select className="form-control" id="city" onChange={handleEditChange} value={editFormData.city}>
                    <option>City 1</option>
                    <option>City 2</option>
                    {/* Add more cities as needed */}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="propertySize" className="form-label">Property Size</label>
                  <input type="text" className="form-control" id="propertySize" onChange={handleEditChange} value={editFormData.property_size} />
                </div>
                <div className="mb-3">
                  <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                  <select className="form-control" id="bedrooms" onChange={handleEditChange} value={editFormData.bedrooms}>
                    <option>2BHK</option>
                    <option>3BHK</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="demand" className="form-label">Demand</label>
                  <input type="text" className="form-control" id="demand" onChange={handleEditChange} value={editFormData.demand} />
                </div>
                <div className="mb-3">
                  <label htmlFor="registrationStatus" className="form-label">Registration Status</label>
                  <input type="text" className="form-control" id="registrationStatus" onChange={handleEditChange} value={editFormData.registration_status} />
                </div>
                <div className="mb-3">
                  <label htmlFor="unitNo" className="form-label">Unit No</label>
                  <input type="text" className="form-control" id="unitNo" onChange={handleEditChange} value={editFormData.unitNo} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tower" className="form-label">Tower</label>
                  <input type="text" className="form-control" id="tower" onChange={handleEditChange} value={editFormData.tower} />
                </div>
                <div className="mb-3">
                  <label htmlFor="floor" className="form-label">Floor</label>
                  <input type="text" className="form-control" id="floor" onChange={handleEditChange} value={editFormData.floor} />
                </div>
                <div className="mb-3">
                  <label htmlFor="facing" className="form-label">Facing</label>
                  <input type="text" className="form-control" id="facing" onChange={handleEditChange} value={editFormData.facing} />
                </div>
                <div className="mb-3">
                  <label htmlFor="furnishingStatus" className="form-label">Furnishing Status</label>
                  <input type="text" className="form-control" id="furnishingStatus" onChange={handleEditChange} value={editFormData.furnishing_status} />
                </div>
                <div className="mb-3">
                  <label htmlFor="noOfParking" className="form-label">No. of Parking</label>
                  <input type="text" className="form-control" id="noOfParking" onChange={handleEditChange} value={editFormData.no_of_parking} />
                </div>
                <div className="mb-3">
                  <label htmlFor="constructionStatus" className="form-label">Construction Status</label>
                  <input type="text" className="form-control" id="constructionStatus" onChange={handleEditChange} value={editFormData.construction_status} />
                </div>
                <div className="mb-3">
                  <label htmlFor="videoLink" className="form-label">Video Link</label>
                  <input type="text" className="form-control" id="videoLink" onChange={handleEditChange} value={editFormData.video_link} />
                </div>
                <div className="mb-3">
                  <label htmlFor="brokerDirectInventory" className="form-label">Broker/Direct Inventory</label>
                  <input type="text" className="form-control" id="brokerDirectInventory" onChange={handleEditChange} value={editFormData.brokerDirectInventory} />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={()=> editYourInventory(editFormData._id)} >Update Inventory</button>
            </div>
          </div>
        </div>
      </div>














{/* Manual Add Property Modal */}
<div className="modal fade" id="addPropertyTypeModal" tabIndex="-1" aria-labelledby="addPropertyTypeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPropertyTypeModalLabel">Add Property</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
              <div>
              <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="properties" className="form-label">Property Type</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="properties"
                                      value={property_type}
                                      onChange={handlePropertyTypeChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addPropertyType}>Save</button>
                      </div>
              </div>
              <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Property Types</h4>
                    <ul>
                      {getAPro.map((e)=>{
                        return(
                         <li>{e.property_type}<span type="button" onClick={() => delProperty(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>








      {/* Manual Add Project Name Modal */}
<div className="modal fade" id="addProjectNameModal" tabIndex="-1" aria-labelledby="addProjectNameModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectNameModalLabel">Add Project Name</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
              <div>
              <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="projectname" className="form-label">Project Name</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="projectname"
                                      value={project_name}
                                      onChange={handleProjectNameChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addProjectName}>Save</button>
                      </div>
              </div>
              <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Project Name</h4>
                    <ul>
                      {getAProjectName.map((e)=>{
                        return(
                         <li>{e.project}<span type="button" onClick={() => delProjectName(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>









      
      {/* Manual Add Builder Name Modal */}
<div className="modal fade" id="addBuilderNameModal" tabIndex="-1" aria-labelledby="addBuilderNameModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addBuilderNameModalLabel">Add Builder Name</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
              <div>
              <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="buildername" className="form-label">Builder Name</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="buildername"
                                      value={builder_name}
                                      onChange={handleBuilderNameChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addBuilderName}>Save</button>
                      </div>
              </div>
              <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Builder Name</h4>
                    <ul>
                      {getABuilderName.map((e)=>{
                        return(
                         <li>{e.builder}<span type="button" onClick={() => delBuilderName(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>









            {/* Manual Add Construction Status Modal */}
<div className="modal fade" id="addConstructionModal" tabIndex="-1" aria-labelledby="addConstructionModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addConstructionModalLabel">Add Construction Status</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
              <div>
              <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="constructionstatus" className="form-label">Construction Status</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="constructionstatus"
                                      value={construction_status}
                                      onChange={handleConstructionStatusChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addConstructionStatus}>Save</button>
                      </div>
              </div>
              <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Construction Status</h4>
                    <ul>
                      {getAConstructionStatus.map((e)=>{
                        return(
                         <li>{e.construction}<span type="button" onClick={() => delConstructionStatus(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>






            {/* Manual Add Furnishing Status Modal */}
            <div className="modal fade" id="addFurnishingModal" tabIndex="-1" aria-labelledby="addFurnishingModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addFurnishingModalLabel">Add Furnishing Status</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
              <div>
              <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="furnishingstatus" className="form-label">Furnishing Status</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="furnishingstatus"
                                      value={furnishing_status}
                                      onChange={handleFurnishingStatusChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addFurnishingStatus}>Save</button>
                      </div>
              </div>
              <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Furnishing Status</h4>
                    <ul>
                      {getAFurnishingStatus.map((e)=>{
                        return(
                         <li>{e.furnishing}<span type="button" onClick={() => delFurnishingStatus(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>











      {/* Manual Add Registration Status Modal */}
      <div className="modal fade" id="addRegistrationModal" tabIndex="-1" aria-labelledby="addRegistrationModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRegistrationModalLabel">Add Registration Status</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
              <div>
              <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="registrationstatus" className="form-label">Registration Status</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="registrationstatus"
                                      value={registration_status}
                                      onChange={handleRegistrationStatusChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addRegistrationStatus}>Save</button>
                      </div>
              </div>
              <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Registration Status</h4>
                    <ul>
                      {getARegistrationStatus.map((e)=>{
                        return(
                         <li>{e.registration}<span type="button" onClick={() => delRegistrationStatus(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>












      {/* Manual Add Deal Through Modal */}
      <div className="modal fade" id="addDealModal" tabIndex="-1" aria-labelledby="addDealModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addDealModalLabel">Add Deal Through</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
              <div>
              <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="dealthrough" className="form-label">Deal Through</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="dealthrough"
                                      value={deal_through}
                                      onChange={handleDealThroughChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addDealThrough}>Save</button>
                      </div>
              </div>
              <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Deal Through</h4>
                    <ul>
                      {getADealThrough.map((e)=>{
                        return(
                         <li>{e.deal}<span type="button" onClick={() => delDealThrough(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>









{/* Manual Add Employee Name Modal */}
<div className="modal fade" id="addEmployeeNameModal" tabIndex="-1" aria-labelledby="addEmployeeNameModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addEmployeeNameModalLabel">Add Employee Name</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
              <div>
              <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="employeename" className="form-label">Employee Name</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="employeename"
                                      value={employee_name}
                                      onChange={handleEmployeeNameChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addEmployeeName}>Save</button>
                      </div>
              </div>
              <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Employee Name</h4>
                    <ul>
                      {getAEmployeeName.map((e)=>{
                        return(
                         <li>{e.employee}<span type="button" onClick={() => delEmployeeNameh(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>















      {/* Manual Add Sale/Rent Modal */}
<div className="modal fade" id="addSaleRentModal" tabIndex="-1" aria-labelledby="addSaleRentModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addSaleRentModalLabel">Add Sale/Rent</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
                  <div>
                    <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="broker" className="form-label">Sale/Rent</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="salerent"
                                      value={sale_rent}
                                      onChange={handleSaleRentChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addSaleRent}>Save</button>
                      </div>
                  </div>
                  <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Sale/Rent</h4>
                    <ul>
                      {getASale.map((e)=>{
                        return(
                          <li>{e.sale_rent} <span type="button" onClick={() => delSaleRent(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>










      {/* Manual Add Bedrooms Modal */}
<div className="modal fade" id="addBedroomsModal" tabIndex="-1" aria-labelledby="addBedroomsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addBedroomsModalLabel">Add Bedrooms</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
                  <div>
                    <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="beds" className="form-label">Bedrooms</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="beds"
                                      value={bed}
                                      onChange={handleBed}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addBed}>Save</button>
                      </div>
                  </div>
                  <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Bedrooms</h4>
                    <ul>
                      {getABed.map((e)=>{
                        return(
                          <li>{e.bedrooms} <span type="button" onClick={() => delBedrooms(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>











      {/* Manual Add Location Modal */}
<div className="modal fade" id="addLocationModal" tabIndex="-1" aria-labelledby="addLocationModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addLocationModalLabel">Add Location</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
                  <div>
                    <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <select className="form-control" id="city" onChange={handleCityUpdateChange} value={formData.city}>
                          <option selected>Open this select menu</option>
                          {getACity.map((e) => (
                            <option key={e._id} value={e.city}>{e.city}</option>
                          ))}
                        </select>`
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
                  <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Locations</h4>
                    <ul>
                      {getALocation.map((e)=>{
                        return(
                          <li>{e.location} <span type="button" onClick={() => delLocation(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
















      {/* Manual Add City Modal */}
<div className="modal fade" id="addCityModal" tabIndex="-1" aria-labelledby="addCityModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCityModalLabel">Add City</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
                  <div>
                    <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="cities" className="form-label">City</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="cities"
                                      value={cityy}
                                      onChange={handleCityChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addCity}>Save</button>
                      </div>
                  </div>
                  <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Cities</h4>
                    <ul>
                      {getACity.map((e)=>{
                        return(
                          <li>{e.city} <span type="button" onClick={() => delCity(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>












            {/* Manual Add Budget Modal */}
<div className="modal fade" id="addBudgetModal" tabIndex="-1" aria-labelledby="addBudgetModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addBudgetModalLabel">Add Budget Range</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div style={{display:"flex"}}>
                  <div>
                    <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="budgets" className="form-label">Budget Range</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="budgets"
                                      value={budgets}
                                      onChange={handleBudgetChange}
                                  />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={addBudget}>Save</button>
                      </div>
                  </div>
                  <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                    <h4>Budget Range</h4>
                    <ul>
                      {getABudget.map((e)=>{
                        return(
                          <li>{e.budget} <span type="button" onClick={() => delBudget(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                        )
                      })}
                    </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

















      {/* Manual Add Broker/Direct Modal */}
      <div className="modal fade" id="addBrokerDirectModal" tabIndex="-1" aria-labelledby="addBrokerDirectModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addBrokerDirectModalLabel">Broker/Direct</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div style={{display:"flex"}}>
                        <div>
                            <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="broker" className="form-label">Broker/Direct</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="broker"
                                        value={broker_direct}
                                        onChange={handleBrokerChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={addBrokerDirect}>Save</button>
                        </div>
                        </div>
                        <div style={{marginLeft:"1rem", marginTop:"1rem"}}>
                          <h4>Broker/Direct</h4>
                          <ul>
                            {getABroker.map((e)=>{
                              return(
                                <li>{e.Broker_Direct} <span type="button" onClick={() => delBroker(e._id)} style={{border:"none",marginLeft:"1rem"}}><i class="fa-solid fa-trash"></i></span></li>
                              )
                            })}
                          </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>




    </>
  )
}

export default Search;
