import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Window from './component/window';

const root = createRoot(document.body);
root.render(<>
    <Window />
</>);