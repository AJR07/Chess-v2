import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './alert/alert';
import AlertDetails from './alert/alertdetails';

/**
 * The props for the customised card renderer.
 *
 * @interface CustomisedCardProps
 * @typedef {CustomisedCardProps}
 */
interface CustomisedCardProps {
    name: string;
    imageName: string;
    imageLink: string;
    description: string;
    webpageLink: string;
    shortenedWebpageLink: string;
}

/**
 * Customised card UI for the home page, where details of the card can be passed in for it to be rendered.
 *
 * @export
 * @param {CustomisedCardProps} props
 * @returns {*}
 */
export default function CustomisedCard(props: CustomisedCardProps) {
    let navigate = useNavigate();
    let addAlert = useContext(AlertContext);
    return (
        <motion.div
            id='card'
            drag
            dragElastic={0.2}
            dragConstraints={{ left: 10, top: 10, right: 10, bottom: 10 }}
            whileHover={{ scale: 1.05 }}
        >
            <Card
                sx={{
                    maxWidth: 345,
                    backgroundColor: 'primary.light',
                    boxShadow: '0vw 0vw 2vw #444444',
                }}
            >
                <CardMedia
                    component='img'
                    alt={props.imageName}
                    width='100vw'
                    height='200vh'
                    image={props.imageLink}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {props.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size='small'
                        onClick={() => {
                            navigator.clipboard.writeText(props.webpageLink);
                            addAlert(new AlertDetails('Copied to Clipboard!'));
                        }}
                        sx={{ color: 'primary.dark', fontWeight: '1000' }}
                    >
                        SHARE
                    </Button>
                    <Button
                        size='small'
                        sx={{ color: 'success.dark', fontWeight: '1000' }}
                        onClick={() => {
                            navigate(props.shortenedWebpageLink);
                        }}
                    >
                        VISIT
                    </Button>
                </CardActions>
            </Card>
        </motion.div>
    );
}
