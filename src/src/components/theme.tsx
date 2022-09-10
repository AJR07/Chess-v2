import { ThemeOptions } from '@mui/material';

/**
 * A constant that contains all the themes available in the website.
 *
 * @type {{ [themeName: string]: ThemeOptions }}
 */
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
    green: {
        palette: {
            primary: {
                main: 'rgba(110,247,138,0.99)',
            },
            secondary: {
                main: '#9afb94',
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
    red: {
        palette: {
            primary: {
                main: 'rgba(255,169,129,0.99)',
            },
            secondary: {
                main: '#ffc963',
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
    purple: {
        palette: {
            primary: {
                main: 'rgba(177,36,255,0.99)',
            },
            secondary: {
                main: '#7a00d8',
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
