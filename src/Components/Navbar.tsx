import React from 'react';
import classes from '../Styles/Navbar.module.css';

import {Link, useLocation} from "react-router-dom";
import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
    IconHome2,
    IconMushroom,
    IconSettings,
} from '@tabler/icons-react';

import {usePersistingPreferences} from "../Context/PreferencesContext.tsx";

interface NavbarLinkProps {
    icon: typeof IconHome2|IconMushroom;
    path: string;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, path, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                <Link to={path}>
                    <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    {label}
                </Link>
            </UnstyledButton>
        </Tooltip>
    );
}

export function Navbar({closeMenu}:{closeMenu:()=>void}) {
    const { pathname } = useLocation()
    const {preferences, dispatchPersistingPreferences} = usePersistingPreferences();


    const links = preferences.hosts.map(({path,name}, index) => (
        <NavbarLink
            key={name}
            path={`/device/${name}`}
            icon={IconMushroom}
            label={name}
            active={pathname===`/device/${name}`}
            onClick={closeMenu}
        />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    <NavbarLink
                        icon={IconHome2}
                        label="Home"
                        path={"/"}
                        active={pathname==='/'}
                        onClick={closeMenu}
                    />
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <NavbarLink
                    icon={IconSettings}
                    label="Settings"
                    path={"/settings"}
                    active={pathname==='/settings'}
                    onClick={closeMenu}
                />
            </Stack>
        </nav>
    );
}
