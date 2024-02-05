import * as React from 'react';

import {usePersistingPreferences} from "../Context/PreferencesContext.tsx";
import Device from "./Presence/Device.tsx";
import {Grid} from "@mantine/core";
import {Link} from "react-router-dom";

export default () => {
    const {preferences} = usePersistingPreferences();

    return <Grid>
        {preferences.hosts.map(({hostIp, name}) => <Grid.Col span={6}>
            <>
                <Link to={`/device/${name}`}>Detail</Link>
                <Device displayMode={'compact'} deviceName={name} hostIp={hostIp}/>
            </>
            </Grid.Col>
        )}
    </Grid>
}
