import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Pair from '../../utils/pair';
import Coordinates from './coordinates/coordinates';
import CoordType from './coordinates/coordtype';
import piece from './piece/piece';

interface SquareProps {
    coordinates: string;
    coordtype: CoordType;
    piece: string | null;
}

export default class Square extends React.Component<SquareProps, {}> {
    piece: string | null;
    coordinates: Coordinates;

    constructor(props: SquareProps) {
        super(props);
        // TODO: CHECK FOR INACCURATE PARAMS PASSED IN
        this.coordinates = new Coordinates(props.coordinates, props.coordtype);
        if (props.piece) this.piece = piece.get(props.piece)!;
        else this.piece = null;
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
                {this.piece ? (
                    <img
                        src={`/images/chess_set/version2/${this.piece}.png`}
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
