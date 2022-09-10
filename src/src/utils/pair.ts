/**
 * Utility class that represents a pair of two unknowns
 *
 * @export
 * @class Pair
 * @typedef {Pair}
 * @template First
 * @template Second
 */
export default class Pair<First, Second> {
    first: First;
    second: Second;

    /**
     * Creates an instance of Pair.
     *
     * @constructor
     * @param {First} first
     * @param {Second} second
     */
    constructor(first: First, second: Second) {
        this.first = first;
        this.second = second;
    }

    /**
     * Converts a pair to a string
     *
     * @private
     * @returns {string}
     */
    private toString(): string {
        return `(${this.first}, ${this.second})`;
    }

    /**
     * Compares the two elements in the pair and checks if they are equal
     *
     * @param {Pair<First, Second>} other
     * @returns {boolean}
     */
    equals(other: Pair<First, Second>): boolean {
        return other.first === this.first && other.second === this.second;
    }
}
