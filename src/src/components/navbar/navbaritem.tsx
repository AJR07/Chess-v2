import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Props for each navbar item
 *
 * @interface NavBarItemProps
 * @typedef {NavBarItemProps}
 */
interface NavBarItemProps {
    title: string;
    redirect: string;
    icon: JSX.Element;
}

/**
 * Renderer for an item on the navbar
 *
 * @export
 * @param {NavBarItemProps} props
 * @returns {*}
 */
export default function NavBarItem(props: NavBarItemProps) {
    const navigate = useNavigate();
    return (
        <IconButton
            aria-label={props.title}
            onClick={() => {
                navigate(props.redirect);
            }}
            size='large'
        >
            {props.icon}
        </IconButton>
    );
}
