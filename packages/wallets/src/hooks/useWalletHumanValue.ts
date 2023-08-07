import type { Wallet } from '@dogechia-network/api';
import { WalletType } from '@dogechia-network/api';
import { mojoToCATLocaleString, mojoToDogechiaLocaleString, useLocale } from '@dogechia-network/core';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

export default function useWalletHumanValue(
  wallet: Wallet,
  value?: string | number | BigNumber,
  unit?: string
): string {
  const [locale] = useLocale();

  return useMemo(() => {
    if (wallet && value !== undefined) {
      const localisedValue =
        wallet.type === WalletType.CAT ? mojoToCATLocaleString(value, locale) : mojoToDogechiaLocaleString(value, locale);

      return `${localisedValue} ${unit}`;
    }

    return '';
  }, [wallet, value, unit, locale]);
}
