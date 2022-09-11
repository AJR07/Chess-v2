import { Stack, Typography } from '@mui/material';
import { Component } from 'react';
import CoordType from '../board/coordinates/coordtype';
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

/**
 * Represents the UI selection and functionality that the pawn can be promoted to
 * In this case, it is set to Knight, Bishop, Rook and Queen as seen in the switch
 * @param {{
    index: number;
    colour: Colour;
    onClick: (pieceType: Pieces) => void;
}} props
 * @returns {void; }) => any}
 */
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

/**
 * Props for the chess promotion component
 * @interface ChessPromotionProps
 * @typedef {ChessPromotionProps}
 */
interface ChessPromotionProps {
    chessEngine: ChessEngine;
    moveEngine: MoveEngine;
    board: Pieces[][];
}

/**
 * The UI which appears when the user has to select what piece needs to be promoted.
 * Shows a bar with each piece and gets the user to click on the one
 *
 * @export
 * @class ChessPromotionClass
 * @typedef {ChessPromotionClass}
 * @extends {Component<ChessPromotionProps, {}>}
 */
export default class ChessPromotionClass extends Component<
    ChessPromotionProps,
    {}
> {
    /**
     * Creates an instance of ChessPromotionClass
     *
     * @constructor
     * @param {ChessPromotionProps} props
     */
    constructor(props: ChessPromotionProps) {
        super(props);
        this.pieceSelected = this.pieceSelected.bind(this);
    }

    /**
     * Run logic in the move engine for when a piece is selected in the UI
     * Passes the piece that was selected into the move engine for it to update the relevant details
     *
     * @private
     * @param {Pieces} pieceType
     */
    private pieceSelected(pieceType: Pieces) {
        this.props.moveEngine.onPromotionEnd(
            pieceType,
            this.props.board,
            this.props.chessEngine
        );
    }

    /**
     * Function that is called by react when rendering the component
     *
     * @returns {*}
     */
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
                    id='promotion-screen'
                    direction='column'
                    style={{
                        width: '40vw',
                        height: '40vw',
                        backgroundColor: 'rgb(0, 0, 0, 0.5)',
                        position: 'absolute',
                    }}
                >
                    <Typography
                        variant='h4'
                        fontWeight={1000}
                        className='horizontal-center'
                        sx={{
                            paddingTop: '2.5vw',
                            color: 'warning.light',
                        }}
                    >
                        Select the piece to be promoted to:
                    </Typography>
                    <div
                        id='style-selection-panel'
                        style={{
                            padding: '1vw',
                            margin: '1vw',
                            backgroundColor: 'rgb(0, 0, 0, 0.25)',
                            borderRadius: '1vw',
                        }}
                    >
                        <Stack
                            direction='row'
                            alignItems='center'
                            justifyContent='center'
                        >
                            {selection}
                        </Stack>
                    </div>
                </Stack>
            );
        } else {
            return <div id='promotion-screen'></div>;
        }
    }
}
