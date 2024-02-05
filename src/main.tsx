import './style.css'

import '@mantine/core/styles.css';
import * as React from 'react';

import {MantineProvider} from '@mantine/core';
import * as ReactDOM from "react-dom/client";
import {App} from "./App.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";
import {PersistingPreferencesProvider, usePersistingPreferences} from "./Context/Context.tsx";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import Settings from "./Settings.tsx";

function Home() {
    const {preferences, dispatchPersistingPreferences} = usePersistingPreferences();
    return <div>
        {preferences.hosts.map(({hostIp,name}) => <Device deviceName={name} hostIp={hostIp}/>)}
    </div>

}

function About() {
    return <h1>about</h1>
}

function DeviceByParam() {
    const params = useParams();
    const {preferences, dispatchPersistingPreferences} = usePersistingPreferences();
    const hosts = preferences.hosts
        .filter(({hostIp,name}) => params.deviceName===name)
        .map(({hostIp,name}) => <Device deviceName={name} hostIp={hostIp}/>)
    if(hosts.length===0){
        return <h1>Error, unknown hosts in preferences</h1>
    }
    return hosts[0];
}

function Device(props: { deviceName: string,hostIp: string}) {
    return <div>
        <h1>Capteur ({props.hostIp})</h1>
        <br/>
    </div>
    const [state, setState] = React.useState("unknown");
    const [datas, setDatas] = React.useState({});
    const [engineeringModeDisplay, setEngineeringModeDisplay] = React.useState(false);
    const switchEngineeringMode = (value: boolean) => {
        fetch(`http://${props.hostIp}/switch/engineering_mode/${value ? 'turn_on' : 'turn_off'}`, {
            method: "POST",
            body: true
        });
    }
    React.useEffect(() => {
        const evtSource = new EventSource(`http://${props.hostIp}/events`);
        setState('Opening connection');
        evtSource.addEventListener("state", (message) => {
            const rawData = JSON.parse(message.data);
            if (`${rawData.id}` === 'switch-engineering_mode') {
                setEngineeringModeDisplay(rawData.value)
                return;
            }
            if (!`${rawData.id}`.match(/^sensor-/)) {
                return;
            }
            datas[rawData.id.replace('sensor-', '').replace('_', ' ')] = rawData.value
            setDatas({...datas})
        });
        evtSource.onopen = (e) => {
            setState('Connection opened');
        }
        evtSource.onerror = (e) => {
            setState('ERROR!' + JSON.stringify(e));
        }
        return () => {
            evtSource.close();
        }
    }, []);
    return <div>
        <h1>Capteur ({props.hostIp})</h1>
        <div>
            <button onClick={() => {
                switchEngineeringMode(!engineeringModeDisplay)
            }}>
                Switch light Sensor {engineeringModeDisplay ? 'OFF' : 'ON'}
            </button>
        </div>

        <ul>
            {Object.keys(datas).map((key) => {
                const data = datas[key];
                return <li>{key}: {data}</li>
            })}
        </ul>
        <h3>{state}</h3>
    </div>;
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <ErrorBoundary>
                <PersistingPreferencesProvider>
                    <MantineProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<App/>}>
                                    <Route index element={<Home/>}/>
                                    <Route path="/device/:deviceName" element={<DeviceByParam/>}/>
                                    <Route path="settings" element={<Settings/>}/>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </MantineProvider>
                </PersistingPreferencesProvider>
            </ErrorBoundary>
        </React.StrictMode>
    );
