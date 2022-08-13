import PieceType from './piecetype';
import Bishop from './types/bishop';
import Piece from './types/empty';
import King from './types/king';
import Knight from './types/knight';
import Pawn from './types/pawn';
import Queen from './types/queen';

let pieceConversion = new Map([
    ['', Piece],
    ['p', Pawn],
    ['n', Knight],
    ['b', Bishop],
    ['q', Queen],
    ['k', King],
]);

export default function convertPiece(name: string) {
    console.log(pieceConversion.get(name)!);
    return pieceConversion.get(name)!;
}
