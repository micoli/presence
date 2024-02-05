import * as React from 'react';

import {usePersistingPreferences} from "../Context/PreferencesContext.tsx";
import Device from "./Device.tsx";

export default () => {
    const {preferences} = usePersistingPreferences();
    return <div>
        {preferences.hosts.map(({hostIp, name}) => <Device deviceName={name} hostIp={hostIp}/>)}
    </div>

}
