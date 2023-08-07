import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import dogechiaFormatter from './dogechiaFormatter';

export default function mojoToCAT(mojo: string | number | BigNumber): BigNumber {
  return dogechiaFormatter(mojo, Unit.MOJO).to(Unit.CAT).toBigNumber();
}
