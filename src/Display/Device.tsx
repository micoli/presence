import React, {useState, useEffect} from 'react';

export default (props: { deviceName: string, hostIp: string }) => {
    const [state, setState] = useState("unknown");
    const [datas, setDatas] = useState({});
    const [engineeringModeDisplay, setEngineeringModeDisplay] = useState(false);
    const switchEngineeringMode = (value: boolean) => {
        fetch(`http://${props.hostIp}/switch/engineering_mode/${value ? 'turn_on' : 'turn_off'}`, {
            method: "POST",
            body: "true"
        });
    }
    useEffect(() => {
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
        evtSource.onopen = () => {
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
        <h1>{props.deviceName} ({props.hostIp})</h1>
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
