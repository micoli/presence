import {useParams} from "react-router-dom";
import * as React from 'react';

import {usePersistingPreferences} from "../Context/PreferencesContext.tsx";
import Device from "./Device.tsx";

export default ()=> {
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
