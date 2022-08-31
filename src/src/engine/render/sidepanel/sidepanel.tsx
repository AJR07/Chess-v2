import { Button, Stack, Typography } from '@mui/material';
import SidePanelDetails from './sidepaneldetails';
import ChatIcon from '@mui/icons-material/Chat';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState } from 'react';

export default function SidePanel() {
    let sections: SidePanelDetails[] = [
        new SidePanelDetails(<ChatIcon />, 'Chat', {}, () => {
            return (
                <Stack id="details" alignItems="center" justifyContent="center">
                    <Typography variant="body1" fontWeight={1000}>
                        Chat
                    </Typography>
                </Stack>
            );
        }),
        new SidePanelDetails(<FormatListBulletedIcon />, 'Details', {}, () => {
            return (
                <Stack id="details" alignItems="center" justifyContent="center">
                    <Typography variant="body1" fontWeight={1000}>
                        Details
                    </Typography>
                </Stack>
            );
        }),
    ];
    let [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
    let chooseSection: JSX.Element[] = [],
        MainSection = sections[selectedSectionIdx].component;

    for (let sectionIdx = 0; sectionIdx < sections.length; sectionIdx++) {
        let section = sections[sectionIdx];
        chooseSection.push(
            <Button
                color="primary"
                aria-label="chat"
                key={section.name}
                onClick={() => {
                    setSelectedSectionIdx(sectionIdx);
                }}
                fullWidth
            >
                <Stack direction="column">
                    <Typography variant="caption">{section.name}</Typography>
                    {section.icon}
                </Stack>
            </Button>
        );
    }
    return (
        <Stack
            id="side-panel"
            direction="column"
            sx={{
                width: '25vw',
                height: '50vh',
                backgroundColor: 'primary.dark',
                borderRadius: '1vw',
            }}
        >
            <Stack
                direction="row"
                sx={{
                    backgroundColor: 'secondary.dark',
                    borderTopLeftRadius: '1vw',
                    borderTopRightRadius: '1vw',
                }}
            >
                {chooseSection}
            </Stack>
            <div id="side-panel-main" style={{ padding: '1vw' }}>
                <MainSection />
            </div>
        </Stack>
    );
}
