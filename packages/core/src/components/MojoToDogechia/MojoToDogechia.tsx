import BigNumber from 'bignumber.js';
import React from 'react';

import useCurrencyCode from '../../hooks/useCurrencyCode';
import mojoToDogechia from '../../utils/mojoToDogechiaLocaleString';
import FormatLargeNumber from '../FormatLargeNumber';

export type MojoToDogechiaProps = {
  value: number | BigNumber;
};

export default function MojoToDogechia(props: MojoToDogechiaProps) {
  const { value } = props;
  const currencyCode = useCurrencyCode();
  const updatedValue = mojoToDogechia(value);

  return (
    <>
      <FormatLargeNumber value={updatedValue} />
      &nbsp;{currencyCode ?? ''}
    </>
  );
}
