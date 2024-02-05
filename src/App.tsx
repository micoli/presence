import React from 'react';
import {Outlet} from "react-router-dom";
import {AppShell, Burger, Group} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

import {Navbar} from "./Components/Navbar.tsx";

export default () => {
    const [opened, {toggle, close}] = useDisclosure();

    return (
        <AppShell
            header={{height: 60}}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: {mobile: !opened},
            }}
            padding="md"

        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                    Presence
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Navbar closeMenu={close}/>
            </AppShell.Navbar>
            <AppShell.Main p={"md"} style={{paddingTop:30}}>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}
