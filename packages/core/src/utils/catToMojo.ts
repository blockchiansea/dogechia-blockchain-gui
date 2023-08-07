import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import dogechiaFormatter from './dogechiaFormatter';

export default function catToMojo(cat: string | number | BigNumber): BigNumber {
  return dogechiaFormatter(cat, Unit.CAT).to(Unit.MOJO).toBigNumber();
}
