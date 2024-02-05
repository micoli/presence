import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Settings from "./Display/Settings.tsx";
import Home from "./Display/Home.tsx";
import App from "./App.tsx";
import DeviceByParam from "./Display/DeviceByParam.tsx";

export default () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<Home/>}/>
                <Route path="/presence/" element={<Home/>}/>
                <Route path="/presence/device/:deviceName" element={<DeviceByParam/>}/>
                <Route path="/presence/settings" element={<Settings/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
};
