import { Stack } from '@mui/material';
import { Box, Theme } from '@mui/system';
import { Component } from 'react';
import Move from '../board/move/move';

/**
 * Props for the chess background class.
 * Since the class needs to track the state of the move, it is included in the props.
 *
 * @interface ChessBackgroundProps
 * @typedef {ChessBackgroundProps}
 */
interface ChessBackgroundProps {
    move: [null | Move, React.Dispatch<React.SetStateAction<null | Move>>];
    theme: Theme;
}
/**
 * State for the chess background class.
 * In this case, there is no state.
 *
 * @interface ChessBackgroundState
 * @typedef {ChessBackgroundState}
 */
interface ChessBackgroundState {}

/**
 * Class that renders the Background of the chessboard (a.k.a. the board itself)
 *
 * @export
 * @class ChessBackgroundClass
 * @typedef {ChessBackgroundClass}
 * @extends {Component<ChessBackgroundProps, ChessBackgroundState>}
 */
export default class ChessBackgroundClass extends Component<
    ChessBackgroundProps,
    ChessBackgroundState
> {
    /**
     * Called by react to render the board's background.
     *
     * @returns {*}
     */
    render() {
        let background: JSX.Element[] = [];
        for (let i = 0; i < 8; i++) {
            let rowBackground: JSX.Element[] = [];
            for (let j = 0; j < 8; j++) {
                let startComparison =
                        this.props.move[0]?.startPosition?.coords?.first ===
                            i &&
                        this.props.move[0]?.startPosition?.coords?.second === j,
                    endComparison =
                        this.props.move[0]?.endPosition?.coords?.first === i &&
                        this.props.move[0]?.endPosition?.coords?.second === j;
                rowBackground.push(
                    <Box
                        sx={{
                            backgroundColor: startComparison
                                ? this.props.theme.palette.secondary.light
                                : endComparison
                                ? this.props.theme.palette.error.light
                                : `primary.${
                                      (i + j) % 2 == 0 ? 'light' : 'dark'
                                  }`,
                            width: '5vw',
                            height: '5vw',
                        }}
                        key={`${i}${j}`}
                    ></Box>
                );
            }
            background.push(
                <Stack direction='row' key={i}>
                    {rowBackground}
                </Stack>
            );
        }
        return (
            <Stack
                alignItems='center'
                justifyContent='center'
                direction='column'
                style={{ position: 'absolute', opacity: 0.8 }}
                id='background-screen'
            >
                {background}
            </Stack>
        );
    }
}
