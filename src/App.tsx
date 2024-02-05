import React from 'react';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {Navbar} from "./Navbar.tsx";
import {Outlet} from "react-router-dom";

export function App() {
    const [opened, { toggle,close }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"

        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    Presence
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Navbar closeMenu={close}/>
            </AppShell.Navbar>
            <AppShell.Main p={"md"}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
