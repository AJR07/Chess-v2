import { PanInfo } from 'framer-motion';
import AlertDetails from '../../../components/alert/alertdetails';
import Pair from '../../../utils/pair';
import ChessEngine from '../../engine';
import FENDetails from '../../fen/details';
import HasCastled from '../castle/hascastled';
import Coordinates from '../coordinates/coordinates';
import CoordType from '../coordinates/coordtype';
import Colour from '../piece/colour';
import { Pieces, PieceShortNames } from '../piece/piecetype';
import Piece from '../piece/types/empty';
import Move from './move';
import MoveTypes from './movetypes';

/**
 * Move Engine that tracks the move as it is being made and validates it.
 *
 * @export
 * @class MoveEngine
 * @typedef {MoveEngine}
 */
export default class MoveEngine {
    /**
     * Function that allows the engine to reset any drag from the UI chess board.
     *
     * @private
     * @type {(newDrag: boolean) => void}
     */
    private resetDrag: (newDrag: boolean) => void;
    /**
     * Function that allows the engine to update the board
     *
     * @private
     * @type {(changesList: Pair<Coordinates, Pieces>[]) => void}
     */
    private updateBoard: (changesList: Pair<Coordinates, Pieces>[]) => void;
    /**
     * Function that allows the engine to update the current move that is tracked by the UI
     *
     * @private
     * @type {((newMove: Move | null) => void)}
     */
    private updateMove: (newMove: Move | null) => void;
    /**
     * Tracks the current move
     *
     * @type {(Move | null)}
     */
    move: Move | null;

    /**
     * Creates an instance of MoveEngine.
     * @date 9/10/2022 - 10:23:34 PM
     *
     * @constructor
     * @param {(Move | null)} move
     * @param {((newMove: Move | null) => void)} setMove
     * @param {(newDrag: boolean) => void} resetDrag
     * @param {(changesList: Pair<Coordinates, Pieces>[]) => void} updateBoard
     */
    constructor(
        move: Move | null,
        setMove: (newMove: Move | null) => void,
        resetDrag: (newDrag: boolean) => void,
        updateBoard: (changesList: Pair<Coordinates, Pieces>[]) => void
    ) {
        this.move = move;
        this.updateMove = setMove;
        this.resetDrag = resetDrag;
        this.updateBoard = updateBoard;
    }

    /**
     * Utility function to check the move type based on the different coordinates.
     *
     * @private
     * @param {Move} move
     * @param {Pieces[][]} board
     * @returns {MoveTypes}
     */
    private checkMoveType(move: Move, board: Pieces[][]): MoveTypes {
        if (
            board[move.startPosition.coords!.first][
                move.startPosition.coords!.second
            ].shortName === PieceShortNames.Pawn &&
            ((board[move.startPosition.coords!.first][
                move.startPosition.coords!.second
            ].colour === Colour.white &&
                move.endPosition.coords!.first === 0) ||
                (board[move.startPosition.coords!.first][
                    move.startPosition.coords!.second
                ].colour === Colour.black &&
                    move.endPosition.coords!.first === 7))
        )
            return MoveTypes.PromotionMoveStage1;
        if (
            board[move.endPosition.coords!.first][
                move.endPosition.coords!.second
            ].colour != Colour.none
        )
            return MoveTypes.CaptureMove;
        if (
            board[move.startPosition.coords!.first][
                move.startPosition.coords!.second
            ].shortName === PieceShortNames.King &&
            move.startPosition.coords!.first ==
                move.endPosition.coords!.first &&
            Math.abs(
                move.startPosition.coords!.second -
                    move.endPosition.coords!.second
            ) == 2
        )
            return MoveTypes.CastleMove;
        return MoveTypes.BaseMove;
    }

    /**
     * Utility function to evaluate if a castling move is legal
     *
     * @private
     * @param {Pieces} startPiece
     * @param {Pieces} endPiece
     * @param {FENDetails} oldFenDetails
     * @param {Pieces[][]} board
     * @returns {boolean}
     */
    private evaluateCastling(
        startPiece: Pieces,
        endPiece: Pieces,
        oldFenDetails: FENDetails,
        board: Pieces[][]
    ): boolean {
        // if the wrong colour is trying to castle (the other colour is supposed to play the move)
        if (oldFenDetails.activeColour !== startPiece.colour) return false;
        if (
            startPiece.colour === Colour.white &&
            this.move!.endPosition.coords!.first == 7
        ) {
            // !Evaluate castling for white
            if (
                this.move!.endPosition.coords!.second == 2 &&
                oldFenDetails.castlingRights.whiteCastle.queen &&
                board[7][1].colour === Colour.none &&
                board[7][3].colour === Colour.none
            ) {
                // !Check queen side white
                let changesList: Pair<Coordinates, Pieces>[] = [];

                // move the king
                board[7][2] = startPiece;
                changesList.push(new Pair(this.move!.startPosition, endPiece));

                board[7][4] = new Piece(Colour.none);
                changesList.push(new Pair(this.move!.endPosition, startPiece));

                // move the rook
                board[7][3] = board[7][0];
                changesList.push(
                    new Pair(
                        new Coordinates(
                            new Pair(7, 3),
                            CoordType.pairCoordinates
                        ),
                        board[7][3]
                    )
                );

                board[7][0] = new Piece(Colour.none);
                changesList.push(
                    new Pair(
                        new Coordinates(
                            new Pair(7, 0),
                            CoordType.pairCoordinates
                        ),
                        board[7][0]
                    )
                );

                this.updateBoard(changesList);
                return true;
            } else if (
                this.move!.endPosition.coords!.second == 6 &&
                oldFenDetails.castlingRights.whiteCastle.king &&
                board[7][5].colour === Colour.none
            ) {
                // !Check king side white
                let changesList: Pair<Coordinates, Pieces>[] = [];

                // move the king
                board[7][6] = startPiece;
                changesList.push(new Pair(this.move!.startPosition, endPiece));

                board[7][4] = new Piece(Colour.none);
                changesList.push(new Pair(this.move!.endPosition, startPiece));

                // move the rook
                board[7][5] = board[7][7];
                changesList.push(
                    new Pair(
                        new Coordinates(
                            new Pair(7, 5),
                            CoordType.pairCoordinates
                        ),
                        board[7][5]
                    )
                );

                board[7][7] = new Piece(Colour.none);
                changesList.push(
                    new Pair(
                        new Coordinates(
                            new Pair(7, 7),
                            CoordType.pairCoordinates
                        ),
                        board[7][7]
                    )
                );

                this.updateBoard(changesList);
                return true;
            }
        }

        // !Evaluate castling for black
        else if (
            startPiece.colour === Colour.black &&
            this.move!.endPosition.coords!.first == 0
        ) {
            if (
                this.move!.endPosition.coords!.second == 2 &&
                oldFenDetails.castlingRights.blackCastle.queen &&
                board[0][1].colour === Colour.none &&
                board[0][3].colour === Colour.none
            ) {
                // !Check for queen side black
                let changesList: Pair<Coordinates, Pieces>[] = [];

                // move the king
                board[0][2] = startPiece;
                changesList.push(new Pair(this.move!.startPosition, endPiece));

                board[0][4] = new Piece(Colour.none);
                changesList.push(new Pair(this.move!.endPosition, startPiece));

                // move the rook
                board[0][3] = board[0][0];
                changesList.push(
                    new Pair(
                        new Coordinates(
                            new Pair(0, 3),
                            CoordType.pairCoordinates
                        ),
                        board[0][3]
                    )
                );

                board[0][0] = new Piece(Colour.none);
                changesList.push(
                    new Pair(
                        new Coordinates(
                            new Pair(0, 0),
                            CoordType.pairCoordinates
                        ),
                        board[0][0]
                    )
                );

                this.updateBoard(changesList);
                return true;
            } else if (
                this.move!.endPosition.coords!.second == 6 &&
                oldFenDetails.castlingRights.blackCastle.king &&
                board[0][5].colour === Colour.none
            ) {
                // !Check king side black
                let changesList: Pair<Coordinates, Pieces>[] = [];

                // move the king
                board[0][6] = startPiece;
                changesList.push(new Pair(this.move!.startPosition, endPiece));

                board[0][4] = new Piece(Colour.none);
                changesList.push(new Pair(this.move!.endPosition, startPiece));

                // move the rook
                board[0][5] = board[0][7];
                changesList.push(
                    new Pair(
                        new Coordinates(
                            new Pair(0, 5),
                            CoordType.pairCoordinates
                        ),
                        board[0][5]
                    )
                );

                board[0][7] = new Piece(Colour.none);
                changesList.push(
                    new Pair(
                        new Coordinates(
                            new Pair(0, 7),
                            CoordType.pairCoordinates
                        ),
                        board[0][7]
                    )
                );

                this.updateBoard(changesList);
                return true;
            }
        }
        return false;
    }

    /**
     * Run through validation and updating code when the user lets go of the drag (when they make the move).
     *
     * @param {Pair<number, number>} dragged
     * @param {(MouseEvent | TouchEvent | PointerEvent)} event
     * @param {PanInfo} info
     * @param {ChessEngine} engine
     */
    onEnd(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
        engine: ChessEngine,
        addAlert: (alert: AlertDetails) => void
    ) {
        // get some information about the new move
        this.whenDragged(dragged, event, info);

        let board = engine.getBoardData();

        // updating the moves with the relevant new information
        this.move!.endPieceColour =
            board[this.move!.endPosition.coords!.first][
                this.move!.endPosition.coords!.second
            ].colour;
        this.move!.startPieceColour =
            board[this.move!.startPosition.coords!.first][
                this.move!.startPosition.coords!.second
            ].colour;
        this.move!.currentFenDetails = engine.fenManager.data;
        this.move!.moveType = this.checkMoveType(this.move!, board);

        // store if the move is evaluated to be legal in the end
        let legal = false;

        let startPiece =
                board[this.move!.startPosition.coords!.first][
                    this.move!.startPosition.coords!.second
                ],
            endPiece =
                board[this.move!.endPosition.coords!.first][
                    this.move!.endPosition.coords!.second
                ];

        // check if its legal for most move types
        if (
            (this.move!.moveType == MoveTypes.BaseMove ||
                this.move!.moveType === MoveTypes.CaptureMove ||
                this.move!.moveType === MoveTypes.EnPassantMove ||
                this.move!.moveType === MoveTypes.PromotionMoveStage1) &&
            startPiece.canBeMovedTo(this.move!, board)
        ) {
            let changesList: Pair<Coordinates, Pieces>[] = [];

            board[this.move!.endPosition.coords!.first][
                this.move!.endPosition.coords!.second
            ] = startPiece;
            changesList.push(new Pair(this.move!.endPosition, startPiece));

            board[this.move!.startPosition.coords!.first][
                this.move!.startPosition.coords!.second
            ] = new Piece(Colour.none);
            changesList.push(
                new Pair(
                    this.move!.startPosition,
                    board[this.move!.startPosition.coords!.first][
                        this.move!.startPosition.coords!.second
                    ]
                )
            );

            // for en passant
            if (this.move!.moveType === MoveTypes.EnPassantMove) {
                board[this.move!.startPosition.coords!.first][
                    this.move!.endPosition.coords!.second
                ] = new Piece(Colour.none);
                changesList.push(
                    new Pair(
                        new Coordinates(
                            new Pair(
                                this.move!.startPosition.coords!.first,
                                this.move!.endPosition.coords!.second
                            ),
                            CoordType.pairCoordinates
                        ),
                        board[this.move!.startPosition.coords!.first][
                            this.move!.endPosition.coords!.second
                        ]
                    )
                );
            }

            this.updateBoard(changesList);
            legal = true;
        } else if (this.move!.moveType == MoveTypes.CastleMove) {
            // check if its legal if the player played a castling move
            let oldFenDetails = engine.fenManager.data;
            legal = this.evaluateCastling(
                startPiece,
                endPiece,
                oldFenDetails,
                board
            );
        }

        // update FEN Details
        if (legal && this.move!.moveType !== MoveTypes.PromotionMoveStage1) {
            let oldFenDetails = engine.fenManager.data;

            // if its a rook moved from original position, update FEN for castling
            if (startPiece.shortName === PieceShortNames.Rook) {
                if (startPiece.colour === Colour.white) {
                    if (
                        this.move!.startPosition.coords!.first == 7 &&
                        this.move!.startPosition.coords!.second == 0
                    )
                        oldFenDetails.castlingRights.whiteCastle.queen = false;
                    else if (
                        this.move!.startPosition.coords!.first == 7 &&
                        this.move!.startPosition.coords!.second == 7
                    )
                        oldFenDetails.castlingRights.whiteCastle.king = false;
                } else if (startPiece.colour === Colour.black) {
                    if (
                        this.move!.startPosition.coords!.first == 0 &&
                        this.move!.startPosition.coords!.second == 0
                    )
                        oldFenDetails.castlingRights.blackCastle.queen = false;
                    else if (
                        this.move!.startPosition.coords!.first == 0 &&
                        this.move!.startPosition.coords!.second == 7
                    )
                        oldFenDetails.castlingRights.blackCastle.king = false;
                }
            }

            // if its a king moved from original position
            if (startPiece.shortName === PieceShortNames.King) {
                if (startPiece.colour === Colour.white) {
                    oldFenDetails.castlingRights.whiteCastle = new HasCastled(
                        false,
                        false
                    );
                } else if (startPiece.colour === Colour.black) {
                    oldFenDetails.castlingRights.blackCastle = new HasCastled(
                        false,
                        false
                    );
                }
            }

            // update th efen string with all the new details
            engine.fenManager.regenerateFen(
                new FENDetails(
                    board,
                    startPiece.colour === Colour.white
                        ? Colour.black
                        : Colour.white,
                    oldFenDetails.castlingRights,
                    startPiece.shortName === PieceShortNames.Pawn &&
                    Math.abs(
                        this.move!.startPosition.coords!.first -
                            this.move!.endPosition.coords!.first
                    ) === 2
                        ? this.move!.endPosition
                        : null,
                    startPiece.colour === Colour.black
                        ? oldFenDetails.fullMoveClock + 1
                        : oldFenDetails.fullMoveClock,
                    startPiece.shortName === 'p' ||
                    this.move!.moveType === MoveTypes.CaptureMove
                        ? 0
                        : oldFenDetails.halfMoveClock + 1
                )
            );
        } else if (!legal) {
            // if its illegal, spit out a warning
            addAlert(new AlertDetails('Illegal Move', 'warning'));
        }

        if (this.move!.moveType === MoveTypes.PromotionMoveStage1 && legal) {
            // update the move to the new state
            this.updateMove(JSON.parse(JSON.stringify(this.move)));
        } else {
            // reset the move since the move is done
            this.move = null;
            this.updateMove(this.move);
            this.resetDrag(true);
        }
    }

    /**
     * Called when the user selects which piece the pawn is to be promoted to, includes updating and registering the new board.
     *
     * @param {Pieces} pieceSelected
     * @param {Pieces[][]} board
     * @param {ChessEngine} engine
     */
    onPromotionEnd(
        pieceSelected: Pieces,
        board: Pieces[][],
        engine: ChessEngine
    ) {
        // update the board
        let changesList: Pair<Coordinates, Pieces>[] = [];
        board[this.move!.endPosition.coords!.first][
            this.move!.endPosition.coords!.second
        ] = pieceSelected;
        changesList.push(new Pair(this.move!.endPosition, pieceSelected));
        this.updateBoard(changesList);

        // update fen
        let oldFenDetails = engine.fenManager.data;
        engine.fenManager.regenerateFen(
            new FENDetails(
                board,
                pieceSelected.colour === Colour.white
                    ? Colour.black
                    : Colour.white,
                oldFenDetails.castlingRights,
                pieceSelected.shortName === PieceShortNames.Pawn &&
                Math.abs(
                    this.move!.startPosition.coords!.first -
                        this.move!.endPosition.coords!.first
                ) === 2
                    ? this.move!.endPosition
                    : null,
                pieceSelected.colour === Colour.black
                    ? oldFenDetails.fullMoveClock + 1
                    : oldFenDetails.fullMoveClock,
                pieceSelected.shortName === 'p' ||
                this.move!.moveType === MoveTypes.CaptureMove
                    ? 0
                    : oldFenDetails.halfMoveClock + 1
            )
        );

        this.move = null;
        this.updateMove(this.move);
    }

    /**
     * Called when the user begins dragging, includes initialising the new Move
     *
     * @param {Pair<number, number>} dragged
     * @param {(MouseEvent | TouchEvent | PointerEvent)} event
     * @param {PanInfo} info
     */
    onStart(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) {
        this.move = new Move(
            new Coordinates(dragged, CoordType.pairCoordinates),
            null,
            null
        );
        this.updateMove(this.move);
        this.resetDrag(false);
    }

    /**
     * Called when the user is dragging (every frame). This is responsible for changing the display of the start and end moves in the board's UI background.
     *
     * @param {Pair<number, number>} dragged
     * @param {(MouseEvent | TouchEvent | PointerEvent)} event
     * @param {PanInfo} info
     * @returns {Pair<number, number>}
     */
    whenDragged(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) {
        function resolveHalfSquare(num: number) {
            // utility function to resolve the half square (since the piece is in the middle, the coordinates would be 0.5, 0.5)
            if (num < 0) return num - 0.5;
            else return num + 0.5;
        }
        let offset = new Pair(
            Math.trunc(
                resolveHalfSquare(
                    info.offset.x / ((window.outerWidth / 100) * 5)
                )
            ),
            Math.trunc(
                resolveHalfSquare(
                    info.offset.y / ((window.outerWidth / 100) * 5)
                )
            )
        );

        dragged.first += offset.second;
        dragged.second += offset.first;

        // clamp it to within the 4 walls of the chessboard
        dragged.first =
            dragged.first < 0 ? 0 : dragged.first > 7 ? 7 : dragged.first;
        dragged.second =
            dragged.second < 0 ? 0 : dragged.second > 7 ? 7 : dragged.second;

        if (!this.move!.endPosition.comparingWith(dragged)) {
            this.move!.endPosition = new Coordinates(
                dragged,
                CoordType.pairCoordinates
            );
            let newMove = JSON.parse(JSON.stringify(this.move));
            this.updateMove(newMove);
        }

        return dragged;
    }
}
