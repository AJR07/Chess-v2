import { Grid } from '@mui/material';

export default function NavBar() {
    return (
        <Grid container>
            <Grid
                item
                id="navbar"
                sx={{
                    width: '10vw',
                    height: '90vh',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.light',
                    },
                }}
            ></Grid>
        </Grid>
    );
}
