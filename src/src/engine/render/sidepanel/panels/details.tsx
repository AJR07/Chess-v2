import { List, ListItem, Stack, Typography } from '@mui/material';

/**
 * The side panel that includes the details of the board that is being displayed.
 * TODO: Include a log of the FEN Strings of every move, move notation for every move, and other information from the FEN String
 * @date 9/10/2022 - 8:44:29 PM
 *
 * @export
 * @returns {*}
 */
export default function DetailsPanel() {
    return (
        <Stack id="details" alignItems="center" justifyContent="center">
            <Typography variant="body1" fontWeight={1000}>
                FEN Log
            </Typography>
            <List>
                <ListItem>HELLO!</ListItem>
            </List>
        </Stack>
    );
}
