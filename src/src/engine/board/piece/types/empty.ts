import Pair from '../../../../utils/pair';
import Move from '../../move/move';
import { Pieces, PieceShortNames } from '../piecetype';
import Colour from '../colour';
import Coordinates from '../../coordinates/coordinates';
import CoordType from '../../coordinates/coordtype';
import generateKnightMoveOffsets from '../../../../utils/knight';

export default class Piece {
    shortName: string = '';
    name: string = '';
    colour: Colour;

    constructor(colour: Colour = Colour.none) {
        this.colour = colour;
    }

    getLongName() {
        return `${this.colour}_${this.name}`;
    }

    calculateOffset(move: Move) {
        return new Pair(
            move.startPosition.coords!.first - move.endPosition.coords!.first,
            move.startPosition.coords!.second - move.endPosition.coords!.second
        );
    }

    kingIsChecked(move: Move, oldBoard: Pieces[][]) {
        let board: Pieces[][] = JSON.parse(JSON.stringify(oldBoard)); // dereference it
        // play out the move on the board first
        board[move.endPosition.coords!.first][move.endPosition.coords!.second] =
            board[move.startPosition.coords!.first][
                move.startPosition.coords!.second
            ];
        board[move.startPosition.coords!.first][
            move.startPosition.coords!.second
        ] = new Piece(Colour.none);

        // get the position of the king
        // TODO: Optimisation (Keep track of the king's position in the board itself)
        let kingPos: Coordinates | null = null;
        for (let xIdx = 0; xIdx < 8; xIdx++) {
            for (let yIdx = 0; yIdx < 8; yIdx++) {
                let piece = board[xIdx][yIdx];
                if (
                    piece.shortName === PieceShortNames.King &&
                    piece.colour === move.startPieceColour
                ) {
                    kingPos = new Coordinates(
                        new Pair(xIdx, yIdx),
                        CoordType.pairCoordinates
                    );
                    break;
                }
            }
        }

        // check if any piece can reach the king
        let oppositeColour =
            move.startPieceColour === Colour.white
                ? Colour.black
                : Colour.white;

        // horizontal (rook and queen)
        for (let xIdx = kingPos!.coords!.first + 1; xIdx < 8; xIdx++) {
            let piece = board[xIdx][kingPos!.coords!.second];
            if (
                piece.colour === oppositeColour &&
                (piece.shortName === PieceShortNames.Rook ||
                    piece.shortName === PieceShortNames.Queen)
            )
                return true;
            if (piece.colour !== Colour.none) break;
        }
        for (let xIdx = kingPos!.coords!.first - 1; xIdx >= 0; xIdx--) {
            let piece = board[xIdx][kingPos!.coords!.second];
            if (
                piece.colour === oppositeColour &&
                (piece.shortName === PieceShortNames.Rook ||
                    piece.shortName === PieceShortNames.Queen)
            )
                return true;
            if (piece.colour !== Colour.none) break;
        }

        // vertical (rook and queen)
        for (let yIdx = kingPos!.coords!.second + 1; yIdx < 8; yIdx++) {
            let piece = board[kingPos!.coords!.first][yIdx];
            if (
                piece.colour === oppositeColour &&
                (piece.shortName === PieceShortNames.Rook ||
                    piece.shortName === PieceShortNames.Queen)
            )
                return true;
            if (piece.colour !== Colour.none) break;
        }
        for (let yIdx = kingPos!.coords!.second - 1; yIdx >= 0; yIdx--) {
            let piece = board[kingPos!.coords!.first][yIdx];
            if (
                piece.colour === oppositeColour &&
                (piece.shortName === PieceShortNames.Rook ||
                    piece.shortName === PieceShortNames.Queen)
            )
                return true;
            if (piece.colour !== Colour.none) break;
        }

        // diagonal (bishop and queen)
        for (let idxUp = 1; idxUp < 8; idxUp++) {
            if (
                !(
                    kingPos!.coords!.first + idxUp < 8 &&
                    kingPos!.coords!.second + idxUp < 8
                )
            )
                break;
            let piece =
                board[kingPos!.coords!.first + idxUp][
                    kingPos!.coords!.second + idxUp
                ];
            if (
                piece.colour === oppositeColour &&
                (piece.shortName === PieceShortNames.Bishop ||
                    piece.shortName === PieceShortNames.Queen)
            )
                return true;
            if (piece.colour !== Colour.none) break;
        }
        for (let idxUp = 1; idxUp < 8; idxUp++) {
            if (
                !(
                    kingPos!.coords!.first - idxUp >= 0 &&
                    kingPos!.coords!.second - idxUp >= 0
                )
            )
                break;
            let piece =
                board[kingPos!.coords!.first - idxUp][
                    kingPos!.coords!.second - idxUp
                ];
            if (
                piece.colour === oppositeColour &&
                (piece.shortName === PieceShortNames.Bishop ||
                    piece.shortName === PieceShortNames.Queen)
            )
                return true;
            if (piece.colour !== Colour.none) break;
        }
        for (let idxUp = 1; idxUp < 8; idxUp++) {
            if (
                !(
                    kingPos!.coords!.first - idxUp >= 0 &&
                    kingPos!.coords!.second + idxUp < 8
                )
            )
                break;
            let piece =
                board[kingPos!.coords!.first - idxUp][
                    kingPos!.coords!.second + idxUp
                ];
            if (
                piece.colour === oppositeColour &&
                (piece.shortName === PieceShortNames.Bishop ||
                    piece.shortName === PieceShortNames.Queen)
            )
                return true;
            if (piece.colour !== Colour.none) break;
        }
        for (let idxUp = 1; idxUp < 8; idxUp++) {
            if (
                !(
                    kingPos!.coords!.first + idxUp < 8 &&
                    kingPos!.coords!.second - idxUp >= 0
                )
            )
                break;
            let piece =
                board[kingPos!.coords!.first + idxUp][
                    kingPos!.coords!.second - idxUp
                ];
            if (
                piece.colour === oppositeColour &&
                (piece.shortName === PieceShortNames.Bishop ||
                    piece.shortName === PieceShortNames.Queen)
            )
                return true;
            if (piece.colour !== Colour.none) break;
        }

        // L-shaped (knight)
        for (let knightMove of generateKnightMoveOffsets()) {
            let xCoord = kingPos!.coords!.first + knightMove.first,
                yCoord = kingPos!.coords!.second + knightMove.second;
            if (!(xCoord >= 0 && xCoord < 8 && yCoord >= 0 && yCoord < 8))
                continue;
            let potentialKnight = board[xCoord][yCoord];
            if (
                potentialKnight.colour === oppositeColour &&
                potentialKnight.shortName === PieceShortNames.Knight
            )
                return true;
        }

        // Pawn (1, 1), (1, -1)
        let movementDirection = move.startPieceColour === Colour.white ? -1 : 1,
            xCoord = kingPos!.coords!.first + movementDirection;
        console.log(xCoord);
        if (
            xCoord >= 0 &&
            xCoord < 8 &&
            kingPos!.coords!.second - 1 >= 0 &&
            board[xCoord][kingPos!.coords!.second - 1].colour ===
                oppositeColour &&
            board[xCoord][kingPos!.coords!.second - 1].shortName ===
                PieceShortNames.Pawn
        )
            return true;
        if (
            xCoord >= 0 &&
            xCoord < 8 &&
            kingPos!.coords!.second + 1 < 8 &&
            board[xCoord][kingPos!.coords!.second + 1].colour ===
                oppositeColour &&
            board[xCoord][kingPos!.coords!.second + 1].shortName ===
                PieceShortNames.Pawn
        )
            return true;
        return false;
    }

    basicLegalValidation(move: Move, board: Pieces[][]) {
        if (move.currentFenDetails!.activeColour !== this.colour) return false;
        if (move.endPieceColour == this.colour) return false;
        if (this.kingIsChecked(move, board)) return false;
        return true;
    }

    canBeMovedTo(move: Move, board: Pieces[][]) {
        return false;
    }
}
