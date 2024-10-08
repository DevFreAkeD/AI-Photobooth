import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import home from '../../Assets/home_button.png'
import back from '../../Assets/back_button.png'
function Navbar() {
    const navigate=useNavigate()
    const handleClick = () => {
        navigate('/')
    }
    const handleBack = () => {
        navigate(-1)
    }
  return (
      <div className='navbar-container'>
          <div>
                <img
                    src={back}
                    alt="Back"
                    className="logo"
                    onClick={handleBack}
                    style={{ height: '12rem', width: '18rem' }} // Set height and width
                />
            </div>
            <div>
                <img
                    src={home}
                    alt="Home"
                    className="logo"
                    onClick={handleClick}
                    style={{ height: '10rem', width: '15rem' }} // Set height and width
                />
            </div>
    </div>
  )
}

export default Navbar