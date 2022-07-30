import { Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavBarItemProps {
    title: string;
    redirect: string;
    icon: JSX.Element;
}

export default function NavBarItem(props: NavBarItemProps) {
    const navigate = useNavigate();
    return (
		<IconButton
            aria-label={props.title}
            onClick={() => {
                navigate(props.redirect);
			}}
			sx={{ marginLeft: "40%" }}
			size="large"
        >
            {props.icon}
        </IconButton>
    );
}
