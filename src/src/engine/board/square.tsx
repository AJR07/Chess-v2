import { Box } from '@mui/system';
import React from 'react';
import Coordinates from './coordinates/coordinates';
import CoordType from './coordinates/coordtype';
import { Pieces } from './piece/piecetype';

interface SquareProps {
    coordinates: string;
    coordtype: CoordType;
    piece: Pieces;
}

export default class Square extends React.Component<SquareProps, {}> {
    piece: Pieces;
    coordinates: Coordinates;

    constructor(props: SquareProps) {
        super(props);
        // TODO: CHECK FOR INACCURATE PARAMS PASSED IN
        this.coordinates = new Coordinates(props.coordinates, props.coordtype);
        this.piece = props.piece;
    }

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
