import { Stack, Typography } from '@mui/material';
import { Component } from 'react';
import CoordType from '../board/coordinates/coordtype';
import Move from '../board/move/move';
import MoveTypes from '../board/move/movetypes';
import Colour from '../board/piece/colour';
import { Pieces } from '../board/piece/piecetype';
import Bishop from '../board/piece/types/bishop';
import Knight from '../board/piece/types/knight';
import Queen from '../board/piece/types/queen';
import Rook from '../board/piece/types/rook';
import Square from '../board/square';
import { motion } from 'framer-motion';
import MoveEngine from '../board/move/moveengine';
import ChessEngine from '../engine';

function ChessSelectionPiece(props: {
    index: number;
    colour: Colour;
    onClick: (pieceType: Pieces) => void;
}) {
    let piece: Pieces;
    switch (props.index) {
        case 1:
            piece = new Knight(props.colour);
            break;
        case 2:
            piece = new Bishop(props.colour);
            break;
        case 3:
            piece = new Rook(props.colour);
            break;
        default:
            piece = new Queen(props.colour);
            break;
    }
    return (
        <motion.div
            whileHover={{
                scale: 1.2,
                backgroundColor: 'rgb(200, 200, 255, 0.5)',
                transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.9, transition: { duration: 0.75 } }}
            onClick={() => {
                props.onClick(piece);
            }}
            style={{ borderRadius: '1vw' }}
        >
            <Square
                coordinates={`0${props.index}`}
                coordtype={CoordType.numericCoordinates}
                piece={piece}
            />
        </motion.div>
    );
}

interface ChessPromotionProps {
    chessEngine: ChessEngine;
    moveEngine: MoveEngine;
    board: Pieces[][];
}

export default class ChessPromotionClass extends Component<
    ChessPromotionProps,
    {}
> {
    constructor(props: ChessPromotionProps) {
        super(props);
        this.pieceSelected = this.pieceSelected.bind(this);
    }

    private pieceSelected(pieceType: Pieces) {
        this.props.moveEngine.onPromotionEnd(
            pieceType,
            this.props.board,
            this.props.chessEngine
        );
    }

    render() {
        if (
            this.props.moveEngine.move &&
            this.props.moveEngine.move.moveType ===
                MoveTypes.PromotionMoveStage1
        ) {
            let selection: JSX.Element[] = [];
            for (let i = 1; i <= 4; i++) {
                selection.push(
                    <ChessSelectionPiece
                        key={i}
                        index={i}
                        colour={this.props.moveEngine.move.startPieceColour!}
                        onClick={this.pieceSelected}
                    />
                );
            }
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
                    <div
                        id="style-selection-panel"
                        style={{
                            padding: '1vw',
                            margin: '1vw',
                            backgroundColor: 'rgb(0, 0, 0, 0.25)',
                            borderRadius: '1vw',
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {selection}
                        </Stack>
                    </div>
                </Stack>
            );
        } else {
            return <div id="promotion-screen"></div>;
        }
    }
}
