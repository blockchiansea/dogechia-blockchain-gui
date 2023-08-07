import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import dogechiaFormatter from './dogechiaFormatter';

export default function mojoToDogechia(mojo: string | number | BigNumber): BigNumber {
  return dogechiaFormatter(mojo, Unit.MOJO).to(Unit.DOGECHIA).toBigNumber();
}
