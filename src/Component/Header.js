import React from 'react'
import './Header.css';
import Logo from "./iamge/logo1.png"

function Header() {
    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src={Logo} alt='logo/image'/>
                </div>
            </header>
        </>
    )
}

export default Header
