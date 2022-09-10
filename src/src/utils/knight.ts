import Pair from './pair';

/**
 * Utility function to generate the move offset
 *
 * @export
 * @returns {Pair<number, number>[]}
 */
export default function generateKnightMoveOffsets(): Pair<number, number>[] {
    let moveOffsets: Pair<number, number>[] = [];
    for (let i of [1, 2, -1, -2]) {
        for (let j of [1, 2, -1, -2]) {
            if (Math.abs(i) != Math.abs(j)) moveOffsets.push(new Pair(i, j));
        }
    }
    return moveOffsets;
}
