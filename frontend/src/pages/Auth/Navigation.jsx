import React from 'react'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUserAdd, AiOutlineShopping, AiOutlineLogin } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
    const [ dropdownOpen, setDropdownOpen ] = useState(false)
    const [ showSidebar, setShowSidebar ] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const closeSIdebar = () => {
        setShowSidebar(false)
    }

    
  return (
    <div 
      style={{zIndex: 999}} 
      className={`${showSidebar ? "hidden" : 'flex'} flex-col justify-between fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out w-16 hover:w-52 group shadow-lg`}
    >
      <div className="flex flex-col pt-8">
        <Link 
          to="/" 
          className="flex items-center px-4 py-4 hover:bg-gray-800 transition-colors duration-200"
        >
          <AiOutlineHome className="text-2xl min-w-[24px]" />
          <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">HOME</span>
        </Link>

        <Link 
          to="/shop" 
          className="flex items-center px-4 py-4 hover:bg-gray-800 transition-colors duration-200"
        >
          <AiOutlineShopping className="text-2xl min-w-[24px]" />
          <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">SHOP</span>
        </Link>

        <Link 
          to="/cart" 
          className="flex items-center px-4 py-4 hover:bg-gray-800 transition-colors duration-200"
        >
          <AiOutlineShoppingCart className="text-2xl min-w-[24px]" />
          <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">CART</span>
        </Link>

        <Link 
          to="/favorite" 
          className="flex items-center px-4 py-4 hover:bg-gray-800 transition-colors duration-200"
        >
          <FaHeart className="text-2xl min-w-[24px]" />
          <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Favourite</span>
        </Link>
      </div>

      <ul className="pb-8">
        <li>
            <Link 
              to="/login" 
              className="flex items-center px-4 py-4 hover:bg-gray-800 transition-colors duration-200"
            >
              <AiOutlineLogin className="text-2xl min-w-[24px]" />
              <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Login</span>
            </Link>
        </li>

         <li>
            <Link 
              to="/register" 
              className="flex items-center px-4 py-4 hover:bg-gray-800 transition-colors duration-200"
            >
              <AiOutlineUserAdd className="text-2xl min-w-[24px]" />
              <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Register</span>
            </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation