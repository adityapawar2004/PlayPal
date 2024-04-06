import React, { useState } from 'react'
import { MdRecordVoiceOver } from "react-icons/md";
import { FaCameraRetro } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
const Menu= () => {
    const[menuOpen, setMenuOpen] = useState(false);
    const wrapper = document.getElementById("cn-wrapper");
    function toggleMenu()
    {
      setMenuOpen(!menuOpen); 
    }
    
    React.useEffect(()=>
    {
      if(wrapper) 
      {
        if(menuOpen)
          wrapper.classList.add("opened-nav");
        else
          wrapper.classList.remove("opened-nav");
      }
    },[menuOpen]);
    
    return (
      <div className="container csstransforms">
        <div className="component">
        
          <button className="cn-button" onClick={toggleMenu} id="cn-button">Menu</button>
          <div className="cn-wrapper" id="cn-wrapper">
            <ul>
             
              <li><a href="#"><span><FaCameraRetro /></span></a></li>
              <li><a href="#"><span><IoChatboxEllipses /></span></a></li>
              <li><a href="#"><span><MdRecordVoiceOver /></span></a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }


export default Menu
