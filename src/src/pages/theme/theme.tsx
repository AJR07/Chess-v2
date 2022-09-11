import { Button, Stack, Typography } from '@mui/material';
import { themeOptions } from '../../components/theme';

/**
 * Props for the theme selector.
 *
 * @interface ThemeSelectorProps
 * @typedef {ThemeSelectorProps}
 */
interface ThemeSelectorProps {
    themeName: string;
    setThemeName: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Renders the page where you can select which theme you would like to use.
 *
 * @export
 * @param {ThemeSelectorProps} props
 * @returns {*}
 */
export default function ThemeSelector(props: ThemeSelectorProps) {
    let themesSelectButtons: JSX.Element[] = [];
    for (let themeName in themeOptions) {
        let mainTextColour = (
            themeOptions[themeName].palette!.primary! as { main: string }
        ).main as string;
        themesSelectButtons.push(
            <Button
                onClick={() => {
                    props.setThemeName(themeName);
                }}
                key={themeName}
                style={{
                    width: '10vw',
                    backgroundColor: mainTextColour,
                    color: '#000000',
                    boxShadow:
                        themeName !== props.themeName
                            ? ''
                            : `0vw 0vw 2vw ${mainTextColour}`,
                }}
            >
                {themeName}
            </Button>
        );
    }
    return (
        <Stack id='theme-selector' direction='column'>
            <Typography
                variant='h2'
                fontWeight={1000}
                className='horizontal-center'
                sx={{
                    color: 'secondary.light',
                    paddingTop: '5vh',
                    paddingBottom: '5vh',
                }}
            >
                Theme Selector
            </Typography>
            <Stack
                direction='column'
                id='colour-selector'
                justifyContent='center'
                alignItems='center'
            >
                <Typography
                    variant='h4'
                    fontWeight={1000}
                    className='horizontal-center'
                    sx={{
                        color: 'primary.light',
                        paddingBottom: '1vw',
                    }}
                >
                    Colour Theme
                </Typography>
                <Stack direction='row' spacing={5}>
                    {themesSelectButtons}
                </Stack>
            </Stack>
        </Stack>
    );
}
