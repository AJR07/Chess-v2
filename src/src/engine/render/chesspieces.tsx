import { Stack } from '@mui/material';
import { Component } from 'react';
import CoordType from '../board/coordinates/coordtype';
import ChessEngine from '../engine';
import Square from '../board/square';
import { motion, PanInfo } from 'framer-motion';
import Pair from '../../utils/pair';
import Move from '../board/move/move';
import MoveEngine from '../board/move/moveengine';
import { Pieces } from '../board/piece/piecetype';
import Coordinates from '../board/coordinates/coordinates';
import ChessPromotionClass from './chesspromotion';
import AlertDetails from '../../components/alert/alertdetails';

/**
 * Props for the Chess Pieces Renderer
 *
 * @interface ChessPiecesProps
 * @typedef {ChessPiecesProps}
 */
interface ChessPiecesProps {
    move: [null | Move, React.Dispatch<React.SetStateAction<null | Move>>];
    reference: React.MutableRefObject<null>;
    addAlert: (alert: AlertDetails) => void;
}

/**
 * State that is managed by the Chess Pieces Renderer
 *
 * @interface ChessPiecesState
 * @typedef {ChessPiecesState}
 */
interface ChessPiecesState {
    resetDrag: boolean;
    board: Pieces[][];
}

/**
 * The main component of the chessboard which renders all the pieces in the typical 8 by 8 format.
 * Includes core functionality & interactivity such as dragging, recoiling the piece when its an illegal move etc
 *
 * @export
 * @class ChessPiecesClass
 * @typedef {ChessPiecesClass}
 * @extends {Component<ChessPiecesProps, ChessPiecesState>}
 */
export default class ChessPiecesClass extends Component<
    ChessPiecesProps,
    ChessPiecesState
> {
    /**
     * Engine that the UI uses to manage the state of the board.
     *
     * @private
     * @type {ChessEngine}
     */
    private engine: ChessEngine;
    /**
     * Engine that the UI uses to handle the moves being made and different states and types of moves.
     *
     * @private
     * @type {MoveEngine}
     */
    private moveEngine: MoveEngine;

    /**
     * Creates an instance of ChessPiecesClass.
     *
     * @constructor
     * @param {ChessPiecesProps} props
     */
    constructor(props: ChessPiecesProps) {
        super(props);
        this.engine = new ChessEngine();

        // move state
        this.updateMove = this.updateMove.bind(this);
        // reset drag state
        this.resetDrag = this.resetDrag.bind(this);
        // board state
        this.updateBoard = this.updateBoard.bind(this);
        this.state = {
            resetDrag: false,
            board: this.engine.getBoardData(),
        };

        this.moveEngine = new MoveEngine(
            this.props.move[0],
            this.updateMove,
            this.resetDrag,
            this.updateBoard
        );
    }

    /**
     * To be called when a move made is illegal (after being validated by the move engine).
     * Essentially resets all the positions of the pieces of the board to their original non-dragged position if the newDrag parameter is true.
     * Otherwise it allows the dragging of the pieces to occur.
     * The resetting of the positions only occurs when the state changes from false to true, and does not hinder dragging even if set to true.
     *
     * @private
     * @param {boolean} newDrag
     */
    private resetDrag(newDrag: boolean) {
        this.setState({ resetDrag: newDrag });
    }

    /**
     * To be called when a move/change of piece arrangement in the board is to be made.
     * The list of changes that is supposed to be made is to be passed in as a array of pairs, which suffices for now.
     * TODO: the parameters of this function to be a board instead
     *
     * @private
     * @param {Pair<Coordinates, Pieces>[]} changesList
     */
    private updateBoard(changesList: Pair<Coordinates, Pieces>[]) {
        // spreading the original board out using the spread notation
        // so that react understands it is a new board and re-renders
        let board: Pieces[][] = [...this.state.board];

        for (let change of changesList) {
            board[change.first.coords!.first][change.first.coords!.second] =
                change.second;
        }
        this.setState({ board: board });
    }

    /**
     * For the code in moveEngine to update different details of the move as the user drags the piece/plays a move.
     *
     * @private
     * @param {(Move | null)} newMove
     */
    private updateMove(newMove: Move | null) {
        this.props.move[1](newMove);
    }

    /**
     * Called by react for a render of the pieces component.
     *
     * @returns {*}
     */
    render() {
        let boardDisplay: JSX.Element[] = [];

        for (let i = 0; i < 8; i++) {
            let row: JSX.Element[] = [];
            for (let j = 0; j < 8; j++) {
                row.push(
                    <motion.div
                        key={`${this.state.board[i][j].name}${this.state.board[i][j].colour}${i}${j}`}
                        drag={true}
                        dragElastic={0}
                        onDragStart={(
                            event: MouseEvent | TouchEvent | PointerEvent,
                            info: PanInfo
                        ) =>
                            this.moveEngine.onStart(new Pair(i, j), event, info)
                        }
                        onDrag={(
                            event: MouseEvent | TouchEvent | PointerEvent,
                            info: PanInfo
                        ) =>
                            this.moveEngine.whenDragged(
                                new Pair(i, j),
                                event,
                                info
                            )
                        }
                        onDragEnd={(
                            event: MouseEvent | TouchEvent | PointerEvent,
                            info: PanInfo
                        ) =>
                            this.moveEngine.onEnd(
                                new Pair(i, j),
                                event,
                                info,
                                this.engine,
                                this.props.addAlert
                            )
                        }
                        dragConstraints={this.props.reference}
                        dragMomentum={false}
                        animate={this.state.resetDrag ? { x: 0, y: 0 } : {}}
                    >
                        <Square
                            coordinates={`${i}${j}`}
                            coordtype={CoordType.numericCoordinates}
                            piece={this.state.board[i][j]}
                        ></Square>
                    </motion.div>
                );
            }
            boardDisplay.push(
                <Stack direction='row' key={i}>
                    {row}
                </Stack>
            );
        }

        return (
            <motion.div
                className='horizontal-center'
                ref={this.props.reference}
                style={{ position: 'absolute' }}
                id='pieces-screen'
            >
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                >
                    <ChessPromotionClass
                        moveEngine={this.moveEngine}
                        board={this.state.board}
                        chessEngine={this.engine}
                    />
                    {boardDisplay}
                </Stack>
            </motion.div>
        );
    }
}
