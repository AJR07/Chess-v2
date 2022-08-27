import { PanInfo } from 'framer-motion';
import Pair from '../../../utils/pair';
import ChessEngine from '../../engine';
import FENDetails from '../../fen/details';
import HasCastled from '../castle/hasCastled';
import Coordinates from '../coordinates/coordinates';
import CoordType from '../coordinates/coordtype';
import Colour from '../piece/colour';
import { Pieces, PieceShortNames } from '../piece/piecetype';
import Piece from '../piece/types/empty';
import Move from './move';
import MoveTypes from './movetypes';

export default class MoveEngine {
    move: Move | null;
    updateMove: (newMove: Move | null) => void;
    resetDrag: (newDrag: boolean) => void;
    updateBoard: (changesList: Pair<Coordinates, Pieces>[]) => void;

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

    whenDragged(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) {
        function resolveHalfSquare(num: number) {
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

        //clamp it
        dragged.first =
            dragged.first < 0 ? 0 : dragged.first > 7 ? 7 : dragged.first;
        dragged.second =
            dragged.second < 0 ? 0 : dragged.second > 7 ? 7 : dragged.second;

        if (!this.move?.endPosition.comparingWith(dragged)) {
            this.move?.updateMove(
                new Coordinates(dragged, CoordType.pairCoordinates)
            );
            this.updateMove(this.move);
        }

        return dragged;
    }

    checkMoveType(move: Move, board: Pieces[][]): MoveTypes {
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
            return MoveTypes.PromotionMove;
        return MoveTypes.BaseMove;
    }

    evaluateCastling(
        startPiece: Pieces,
        endPiece: Pieces,
        oldFenDetails: FENDetails,
        board: Pieces[][]
    ): boolean {
        if (oldFenDetails.activeColour !== startPiece.colour) return false;
        if (
            startPiece.colour === Colour.white &&
            this.move!.endPosition.coords!.first == 7
        ) {
            // !white
            if (
                this.move!.endPosition.coords!.second == 2 &&
                oldFenDetails.castlingRights.whiteCastle.queen &&
                board[7][1].colour === Colour.none &&
                board[7][3].colour === Colour.none
            ) {
                // !queen side white
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
                // !king side white
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

        // black
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
                // !queen side black
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
                // !king side black
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

    onEnd(
        dragged: Pair<number, number>,
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
        engine: ChessEngine
    ) {
        this.whenDragged(dragged, event, info);

        let board = engine.getBoardData();

        // updating the moves
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

        if (
            (this.move!.moveType == MoveTypes.BaseMove ||
                this.move!.moveType === MoveTypes.CaptureMove ||
                this.move!.moveType === MoveTypes.EnPassantMove) &&
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
            // !castling
            let oldFenDetails = engine.fenManager.data;
            legal = this.evaluateCastling(
                startPiece,
                endPiece,
                oldFenDetails,
                board
            );
        } else if (this.move!.moveType == MoveTypes.PromotionMove) {
            // !promotion
        }

        // update FEN Details
        if (legal) {
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
        }

        // update some state
        this.resetDrag(true);
        this.move = null;
        this.updateMove(this.move);
    }
}
