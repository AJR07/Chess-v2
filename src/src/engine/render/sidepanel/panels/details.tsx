import { List, ListItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export default function DetailsPanel() {
    let [FENLog, setFENLog] = useState([]);

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
