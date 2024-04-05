import React, { useState } from 'react'

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
              <li>
                <a href="#">
                  <span>Home</span>
                </a>
              </li>
              <li><a href="#"><span>Furniture</span></a></li>
              <li><a href="#"><span>Transport</span></a></li>
              <li><a href="#"><span>Gift</span></a></li>
              <li><a href="#"><span>Clothes</span></a></li>
              <li><a href="#"><span>Games</span></a></li>
             
            </ul>
          </div>
        </div>
      </div>
    );
  }


export default Menu
