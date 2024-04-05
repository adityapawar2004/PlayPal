import * as React from "react";
import { createRoot } from "react-dom/client";
import Menu from "./component/menu";
import ScreenShot from "./component/ScreenShot";

const root = createRoot(document.body);
root.render(
  <>
    <Menu />
    <ScreenShot />
  </>
);
