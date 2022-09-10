import { Pieces } from './piecetype';
import Bishop from './types/bishop';
import Piece from './types/empty';
import King from './types/king';
import Knight from './types/knight';
import Pawn from './types/pawn';
import Queen from './types/queen';
import Rook from './types/rook';

/**
 * A utility function to create a piece from the short name provided.
 * It also passes in the rest of the parameters provided in the function as constructor arguments for the pieces.
 * @date 9/10/2022 - 9:03:59 PM
 *
 * @export
 * @param {string} name
 * @param {...ConstructorParameters<typeof Piece>} args
 * @returns {Pieces}
 */
export default function convertPiece(
    name: string,
    ...args: ConstructorParameters<typeof Piece>
): Pieces {
    let newPiece: Pieces = new Piece(args[0]);

    switch (name) {
        case 'p':
            newPiece = new Pawn(args[0]);
            break;
        case 'n':
            newPiece = new Knight(args[0]);
            break;
        case 'b':
            newPiece = new Bishop(args[0]);
            break;
        case 'r':
            newPiece = new Rook(args[0]);
            break;
        case 'q':
            newPiece = new Queen(args[0]);
            break;
        case 'k':
            newPiece = new King(args[0]);
            break;
    }
    return newPiece;
}
