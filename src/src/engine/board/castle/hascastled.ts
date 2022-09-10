/**
 * stores the information on who has castled already
 *
 * @export
 * @class HasCastled
 * @typedef {HasCastled}
 */
export default class HasCastled {
    king: boolean;
    queen: boolean;
    /**
     * Creates an instance of HasCastled.
     *
     * @constructor
     * @param {boolean} queen
     * @param {boolean} king
     */
    constructor(queen: boolean, king: boolean) {
        this.queen = queen;
        this.king = king;
    }
}
