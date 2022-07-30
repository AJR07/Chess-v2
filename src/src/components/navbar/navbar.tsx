import { Home } from '@mui/icons-material';
import { Grid, Stack } from '@mui/material';
import NavBarItem from './navbaritem';

export default function NavBar() {
    return (
        <Grid item id="navbar" sx={{ width: '7.5vw' }}>
            <Grid container sx={{height: '85vh'}}>
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
                            backgroundColor: 'primary.light',
                        },
                    }}
                >
                    <Stack
                        direction="column"
                        alignItems="center"
                        sx={{ paddingTop: '10%' }}
                    >
                        <NavBarItem title="home" redirect="/" icon={<Home />} />
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
}
