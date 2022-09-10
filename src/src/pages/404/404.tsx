import { Stack, Typography } from '@mui/material';

/**
 * Renders the 404 page which is displayed if no other page is found at the route.
 *
 * @export
 * @returns {*}
 */
export default function PageNotFound() {
    return (
        <Stack>
            <Typography
                variant="h2"
                fontWeight={1000}
                className="horizontal-center"
                sx={{
                    color: 'secondary.light',
                    paddingTop: '5vh',
                    paddingBottom: '5vh',
                }}
            >
                This link does not exist.
            </Typography>
            <Typography
                className="horizontal-center"
                variant="h4"
                sx={{ color: 'warning.main' }}
            >
                Try using the navbar to navigate to the other pages :D
            </Typography>
        </Stack>
    );
}
