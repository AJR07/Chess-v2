import { ThemeOptions } from '@mui/material';

export const themeOptions: { [themeName: string]: ThemeOptions } = {
    blue: {
        palette: {
            primary: {
                main: 'rgba(63,119,181,0.99)',
            },
            secondary: {
                main: '#0063f5',
            },
            warning: {
                main: '#ff9800',
            },
            error: {
                main: '#f43636',
            },
            info: {
                main: '#2196f3',
            },
            background: {
                default: '#bbdefb',
            },
        },
        typography: {
            fontFamily: 'Helvetica',
        },
        spacing: 8,
    },
    yellow: {
        palette: {
            primary: {
                main: 'rgba(192,210,31,0.99)',
            },
            secondary: {
                main: '#bb9f11',
            },
            error: {
                main: '#f43636',
            },
            info: {
                main: '#2196f3',
            },
            background: {
                default: '#bbdefb',
            },
            warning: {
                main: '#ff9800',
            },
        },
        typography: {
            fontFamily: 'Helvetica',
        },
        spacing: 8,
    },
};
