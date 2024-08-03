import React from 'react'
import './Header.css';
import Logo from "./iamge/logo1.png"

function Header() {
    return (
        <>
        <div className='login-btn'><a href="/login"><button>Login</button></a></div>
            <header className="header">
                <div className="logo">
                    <img src={Logo} alt='logo/image'/>
                </div>
            </header>
        </>
    )
}

export default Header
