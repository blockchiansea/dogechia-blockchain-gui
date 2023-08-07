import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import dogechiaFormatter from './dogechiaFormatter';

export default function dogechiaToMojo(dogechia: string | number | BigNumber): BigNumber {
  return dogechiaFormatter(dogechia, Unit.DOGECHIA).to(Unit.MOJO).toBigNumber();
}
