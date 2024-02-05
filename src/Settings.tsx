import React from 'react';
import {useMemo, useState} from 'react';
import {PERSISTING_PREFERENCES_ACTIONS, usePersistingPreferences} from "./Context/Context.tsx";
import {Button, TextInput} from "@mantine/core";
import {
    IconLayoutGridAdd,
    IconTrash,
    IconDeviceFloppy,
} from '@tabler/icons-react';

const Settings = () => {
    const {preferences, dispatchPersistingPreferences} = usePersistingPreferences();
    const [hosts, setHosts] = useState(preferences.hosts)

    return <>
        <h1>Settings</h1>
        <Button onClick={
            () => {
                hosts.push({hostIp: '', name: ''})
                setHosts([...hosts])
            }
        }><IconLayoutGridAdd/></Button>
        <table>
            <thead>
            <tr>
                <td>
                    Host
                </td>
                <td>
                    Name
                </td>
                <td>
                    &nbsp;
                </td>
            </tr>
            </thead>
            <tbody>
            {hosts.map((host, index) =>
                <tr key={index}>
                    <td>
                        <TextInput
                            value={host.hostIp}
                            placeholder="192.168.X.X, 10.X.X.X"
                            onChange={(event) => {
                                hosts[index].hostIp=event.currentTarget.value;
                                setHosts([...hosts])
                            }}
                        />
                    </td>
                    <td>
                        <TextInput
                            value={host.name}
                            placeholder="bedroom1, kitchen"
                            onChange={(event) => {
                                hosts[index].name=event.currentTarget.value;
                                setHosts([...hosts])
                            }}
                        />
                    </td>
                    <td><Button onClick={
                        () => {
                            hosts.splice(index, 1)
                            setHosts([...hosts])
                        }
                    }><IconTrash/></Button></td>
                </tr>
            )}
            </tbody>
        </table>
        <Button onClick={
            () => {
                console.log('save', hosts)
                dispatchPersistingPreferences({type: PERSISTING_PREFERENCES_ACTIONS.SAVE_HOSTS, hosts})
            }
        }><IconDeviceFloppy /></Button>

    </>
}
export default Settings;
