import React,{useState} from "react";
import "./index.css"
import ScreenShot from "./component/ScreenShot";
import Menu from "./component/menu";
import SpeechtoText from "./component/speechtotext";
import { Input } from "postcss";

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

  return (
    <div style={{height:'100vh', display:'flex',alignItems:'center',justifyContent:'center',background:"#161616"}}>
<div style={{display:"flex",flexDirection:"column",gap:"40px",alignItems:'center',justifyContent:'center'}}>
    <div style={{padding:"5%",border:'1px solid white',borderRadius:"10px",width:"400px"}}>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Enter your search..."
        style={{outline:"none",border:"none",fontSize:"15px",color:"white",background:"none",width:"100%"}}
      /></div>
      <button className="custom-button" onClick={handleSaveClick}>{isSaved ? 'Saved' : 'Save'}</button>
    </div>
    </div>
  );
}

function TransparentComponents() {
  return <Menu />;
}

export default App;
