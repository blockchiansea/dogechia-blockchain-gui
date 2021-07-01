import Unit from './Unit';
import { IS_MAINNET } from './constants';

export default {
  [Unit.DOGECHIA]: IS_MAINNET ? 'XDG' : 'TXDG',
};
