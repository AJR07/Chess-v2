import { List, ListItem, Stack, Typography } from '@mui/material';

function ListTitle(props: { text: string }) {
    return (
        <ListItem>
            <Typography> - {props.text} </Typography>
        </ListItem>
    );
}

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
                        id="made-with"
                        sx={{
                            backgroundColor: 'primary.dark',
                            borderRadius: '1vw',
                            padding: '1vw',
                        }}
                    >
                        <Typography variant="h6" fontWeight={1000}>
                            Made With:
                        </Typography>
                        <ListTitle text="ReactTS" />
                        <ListTitle text="Typescript" />
                        <ListTitle text="Firebase (Hosting)" />
                        <ListTitle text="Framer Motion (Animation)" />
                        <ListTitle text="Material UI (UI Library)" />
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
                    <Typography variant="caption" sx={{ color: '#000000' }}>
                        AJR07
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
