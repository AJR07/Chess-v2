import { Home, Person } from '@mui/icons-material';
import { Grid, Stack } from '@mui/material';
import NavBarItem from './navbaritem';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import InfoIcon from '@mui/icons-material/Info';

/**
 * The navbar component that manages route switching.
 *
 * @export
 * @returns {*}
 */
export default function NavBar() {
    return (
        <Grid item id="navbar" sx={{ width: '7.5vw' }}>
            <Grid container sx={{ height: '85vh' }}>
                <Grid
                    item
                    className="vertical-center"
                    sx={{
                        width: '5vw',
                        height: '85vh',
                        backgroundColor: 'primary.main',
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25,
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    }}
                >
                    <Stack
                        direction="column"
                        alignItems="center"
                        sx={{ paddingTop: '10%' }}
                    >
                        <NavBarItem title="home" redirect="/" icon={<Home />} />
                        <NavBarItem
                            title="pass-and-play"
                            redirect="/pass-and-play"
                            icon={<Person />}
                        />
                        <NavBarItem
                            title="theme-selector"
                            redirect="/theme-selector"
                            icon={<ColorLensIcon />}
                        />
                        <NavBarItem
                            title="info"
                            redirect="/info"
                            icon={<InfoIcon />}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
}
