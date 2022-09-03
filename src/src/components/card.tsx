import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CustomisedCardProps {
    name: string;
    imageName: string;
    imageLink: string;
    description: string;
    webpageLink: string;
    shortenedWebpageLink: string;
}

export default function CustomisedCard(props: CustomisedCardProps) {
    let navigate = useNavigate();
    return (
        <motion.div
            id="card"
            drag
            dragElastic={0.2}
            dragConstraints={{ left: 10, top: 10, right: 10, bottom: 10 }}
            whileHover={{ scale: 1.05 }}
        >
            <Card
                sx={{
                    maxWidth: 345,
                    backgroundColor: 'primary.light',
                    boxShadow: '0vw 0vw 1.5vw #333333',
                }}
            >
                <CardMedia
                    component="img"
                    alt={props.imageName}
                    width="100vw"
                    height="200vh"
                    image={props.imageLink}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => {
                            navigator.clipboard.writeText(props.webpageLink);
                        }}
                        sx={{ color: 'primary.dark', fontWeight: '1000' }}
                    >
                        SHARE
                    </Button>
                    <Button
                        size="small"
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
