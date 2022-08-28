import { Stack, Typography } from '@mui/material';
import { Component } from 'react';
import Move from '../board/move/move';
import MoveTypes from '../board/move/movetypes';
import { PieceShortNames } from '../board/piece/piecetype';

interface ChessPromotionProps {
    move: [null | Move, React.Dispatch<React.SetStateAction<null | Move>>];
}

interface ChessPromotionState {}

export default class ChessPromotionClass extends Component<
    ChessPromotionProps,
    ChessPromotionState
> {
    pieceSelected(pieceType: PieceShortNames) {}
    render() {
        if (
            this.props.move[0] &&
            this.props.move[0].moveType === MoveTypes.PromotionMove
        ) {
            return (
                <Stack
                    id="promotion-screen"
                    direction="column"
                    style={{
                        width: '40vw',
                        height: '40vw',
                        backgroundColor: 'rgb(0, 0, 0, 0.5)',
                        position: 'absolute',
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={1000}
                        className="horizontal-center"
                        sx={{
                            paddingTop: '2.5vw',
                            color: 'warning.light',
                        }}
                    >
                        Select the piece to be promoted to:
                    </Typography>
                    <Stack
                        direction="row"
                        style={{
                            backgroundColor: 'rgb(0, 0, 0, 0.5)',
                            borderRadius: '2vw',
                        }}
                    ></Stack>
                </Stack>
            );
        } else {
            return <div id="promotion-screen"></div>;
        }
    }
}
