import { Home } from '@mui/icons-material';
import { Grid, Stack } from '@mui/material';
import NavBarItem from './navbaritem';

export default function NavBar() {
    return (
        <Grid container>
            <Grid
                item
                id="navbar"
                className="vertical-center"
                sx={{
                    width: '7.5vw',
                    height: '85vh',
                    backgroundColor: 'primary.main',
                    borderRadius: 3,
                    '&:hover': {
                        backgroundColor: 'primary.light',
                    }
                }}
            >
                <Stack direction="column" alignItems="center" sx={{padding:"10%"}}>
                    <NavBarItem title="home" redirect='/' icon={<Home />} />
                </Stack>
            </Grid>
        </Grid>
    );
}