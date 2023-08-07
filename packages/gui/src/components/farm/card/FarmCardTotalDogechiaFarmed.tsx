import { useGetFarmedAmountQuery } from '@dogechia-network/api-react';
import { useCurrencyCode, mojoToDogechiaLocaleString, CardSimple, useLocale } from '@dogechia-network/core';
import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';

export default function FarmCardTotalDogechiaFarmed() {
  const currencyCode = useCurrencyCode();
  const [locale] = useLocale();
  const { data, isLoading, error } = useGetFarmedAmountQuery();

  const farmedAmount = data?.farmedAmount;

  const totalDogechiaFarmed = useMemo(() => {
    if (farmedAmount !== undefined) {
      return (
        <>
          {mojoToDogechiaLocaleString(farmedAmount, locale)}
          &nbsp;
          {currencyCode}
        </>
      );
    }
    return undefined;
  }, [farmedAmount, locale, currencyCode]);

  return (
    <CardSimple title={<Trans>Total Dogechia Farmed</Trans>} value={totalDogechiaFarmed} loading={isLoading} error={error} />
  );
}
