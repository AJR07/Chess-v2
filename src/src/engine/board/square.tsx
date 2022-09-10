import { Box } from '@mui/system';
import React from 'react';
import Coordinates from './coordinates/coordinates';
import CoordType from './coordinates/coordtype';
import { Pieces } from './piece/piecetype';

/**
 * Props that each square UI requires to render.
 *
 * @interface SquareProps
 * @typedef {SquareProps}
 */
interface SquareProps {
    coordinates: string;
    coordtype: CoordType;
    piece: Pieces;
}

/**
 * Square UI Class that renders a piece, and keep tracks of things like its coordinates, drag etc.
 *
 * @export
 * @class Square
 * @typedef {Square}
 * @extends {React.Component<SquareProps, {}>}
 */
export default class Square extends React.Component<SquareProps, {}> {
    /**
     * Current coordinates of the piece rendered.
     *
     * @private
     * @type {Coordinates}
     */
    private coordinates: Coordinates;
    /**
     * Current piece that is to be rendered.
     *
     * @private
     * @type {Pieces}
     */
    private piece: Pieces;
    /**
     * Creates an instance of Square.
     *
     * @constructor
     * @param {SquareProps} props
     */
    constructor(props: SquareProps) {
        super(props);
        // TODO: CHECK FOR INACCURATE PARAMS PASSED IN
        this.coordinates = new Coordinates(props.coordinates, props.coordtype);
        this.piece = props.piece;
    }

    /**
     * Called by react when rendering a square
     *
     * @returns {*}
     */
    render() {
        return (
            <Box
                id="square"
                sx={{
                    width: '5vw',
                    height: '5vw',
                }}
            >
                {this.piece.name !== '' ? (
                    <img
                        src={`/images/chess_set/version2/${this.piece.getLongName()}.png`}
                        style={{ width: '5vw', height: '5vw' }}
                        draggable={false}
                        className="undraggable"
                    ></img>
                ) : (
                    <></>
                )}
            </Box>
        );
    }
}
