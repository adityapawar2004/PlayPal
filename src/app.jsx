import React from "react";
import ScreenShot from "./component/ScreenShot";
import Menu from "./component/menu";
import SpeechtoText from "./component/speechtotext";

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
  return (
    <div>
      <ScreenShot />
      <SpeechtoText/>
    </div>
  );
}

function TransparentComponents() {
  return <Menu />;
}

export default App;
