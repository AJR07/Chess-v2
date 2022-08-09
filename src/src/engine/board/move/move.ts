import BaseMove from './types/basemove';
import CaptureMove from './types/capturemove';
import CastleMove from './types/castlemove';
import CheckMove from './types/checkmove';

type Move = BaseMove | CaptureMove | CastleMove | CheckMove;

export default Move;
