import { List, ListItem, Stack, Typography } from '@mui/material';

export default function Info() {
    return (
        <Stack sx={{ marginRight: '3vw' }}>
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
                Info About this Site
            </Typography>
            <Stack spacing={5}>
                <Stack sx={{ color: '#000000' }}>
                    <List
                        id="made with"
                        sx={{
                            backgroundColor: 'primary.dark',
                            borderRadius: '1vw',
                            padding: '1vw',
                        }}
                    >
                        <Typography variant="h6" fontWeight={1000}>
                            Made With
                        </Typography>
                        <ListItem>
                            <Typography>ReactTS</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Typescript</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Firebase (Hosting)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Framer Motion (Animation)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Material UI (UI Library)</Typography>
                        </ListItem>
                    </List>
                </Stack>
                <Stack
                    sx={{
                        color: '#000000',
                        backgroundColor: 'primary.dark',
                        borderRadius: '1vw',
                        padding: '1vw',
                    }}
                >
                    <Typography variant="h6" fontWeight={1000}>
                        Made By:
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: 'primary.light' }}
                    >
                        AJR07
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
