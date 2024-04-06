import React, { useState } from "react";
import "./index.css";
import Menu from "./component/menu";

function App() {
  const params = new URLSearchParams(window.location.search);
  const windowType = params.get("window");

  return (
    <div>
      {windowType === "main" ? <MainComponents /> : <TransparentComponents />}
    </div>
  );
}

function MainComponents() {
  const [apiValue, setApiValue] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isApiSaved, setIsApiSaved] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setIsSaved(false); 
  };

  const handleSaveClick = () => {

    console.log('Saved:', searchValue);

    setIsSaved(true); 

    setTimeout(() => {
      setIsSaved(false);
      setSearchValue('');
    }, 1000);
  };
  const handleInputApi = (event) => {
    setApiValue(event.target.value);
    setIsApiSaved(false);
  };

  const handleSaveApi = () => {
    console.log('Saved:', apiValue);
    setApiKey(apiValue);
    setIsApiSaved(true);
  };
 


  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "#161616" }}>
      {!isApiSaved && (
          <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: "5%", border: '1px solid white', borderRadius: "10px", width: "400px" }}>
            <input
              type="text"
              value={apiValue}
              onChange={handleInputApi}
              placeholder="Enter your API key..."
              style={{ outline: "none", border: "none", fontSize: "15px", color: "white", background: "none", width: "100%" }}
            />
          </div>
          <button className="custom-button" onClick={handleSaveApi} >Save the Key</button> {/* Step 3: Control button disabled state */}
        </div>
      )}
      {isApiSaved && (
        <div style={{ display: "flex", flexDirection: "column", gap: "120px", alignItems: 'center', }}>
          <div style={{ padding: "5%",  borderRadius: "10px", width: "400px" }}>
            <input
              type="text"
              value={`API key: ${apiKey}`}
              readOnly
              style={{ outline: "none", border: "none", fontSize: "25px", color: "white", background: "none", width: "100%",marginLeft:"50px" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ padding: "5%", border: '1px solid white', borderRadius: "10px", width: "400px" }}>
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Enter your search..."
                style={{ outline: "none", border: "none", fontSize: "15px", color: "white", background: "none", width: "100%" }}
              />
            </div>
            <button className="custom-button" onClick={handleSaveClick}>{isSaved ? 'Saved' : 'Save'}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function TransparentComponents() {
  return <Menu />;
}

export default App;
