import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import dogechiaFormatter from './dogechiaFormatter';

export default function mojoToCATLocaleString(mojo: string | number | BigNumber, locale?: string) {
  return dogechiaFormatter(mojo, Unit.MOJO).to(Unit.CAT).toLocaleString(locale);
}
