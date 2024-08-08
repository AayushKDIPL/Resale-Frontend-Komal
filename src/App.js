import logo from './logo.svg';
import './App.css';
import Inventory from './Component/Inventory';
import Excel from './Component/Excel';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from './Component/AdminHome';
import Login from './Component/Login';
import Responsive from './Component/Responsive';
import Table from './Component/Table';
import City from './Component/City';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<City />}/> */}
                <Route path="/" element={<AdminHome />}/>
                <Route path="/view" element={<Inventory />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
