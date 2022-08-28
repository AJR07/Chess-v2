import { Stack } from '@mui/material';
import { Box, Theme } from '@mui/system';
import { Component } from 'react';
import Pair from '../../utils/pair';
import Move from '../board/move/move';

interface ChessBackgroundProps {
    move: [null | Move, React.Dispatch<React.SetStateAction<null | Move>>];
    theme: Theme;
}
interface ChessBackgroundState {}

export default class ChessBackgroundClass extends Component<
    ChessBackgroundProps,
    ChessBackgroundState
> {
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
                <Stack direction="row" key={i}>
                    {rowBackground}
                </Stack>
            );
        }
        return (
            <Stack
                alignItems="center"
                justifyContent="center"
                direction="column"
                style={{ position: 'absolute' }}
            >
                {background}
            </Stack>
        );
    }
}
