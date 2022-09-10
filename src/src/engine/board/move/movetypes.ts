/**
 * An enum that contains all the move types possible.
 * ! Promotion moves have 2 stages, promotion-1 and promotion-2
 * * Promotion 1 is when a move is made and the move is recognised as a pawn promotion move. The UI then pops up to get the user to select the piece to be promoted into.
 * * Promotion 2 is when the piece is selected, and the board is updated.
 *
 * @enum {number}
 */
enum MoveTypes {
    BaseMove = 'move',
    CaptureMove = 'capture',
    CastleMove = 'castle',
    PromotionMoveStage1 = 'promotion-1',
    PromotionMoveStage2 = 'promotion-2',
    EnPassantMove = 'en-passant',
}

export default MoveTypes;
