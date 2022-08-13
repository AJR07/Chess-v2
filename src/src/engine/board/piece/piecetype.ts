import Bishop from './types/bishop';
import Piece from './types/empty';
import Knight from './types/knight';
import Pawn from './types/pawn';
import Queen from './types/queen';
import King from './types/king';

type PieceType = Piece | Pawn | Knight | Bishop | Queen | King;

export default PieceType;
