import { WalletType } from '@dogechia-network/api';
import { useGetWalletBalanceQuery } from '@dogechia-network/api-react';
import { mojoToCATLocaleString, mojoToDogechiaLocaleString, useLocale } from '@dogechia-network/core';
import { useWallet } from '@dogechia-network/wallets';
import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';

export type OfferBuilderWalletBalanceProps = {
  walletId: number;
};

export default function OfferBuilderWalletBalance(props: OfferBuilderWalletBalanceProps) {
  const { walletId } = props;
  const [locale] = useLocale();
  const { data: walletBalance, isLoading: isLoadingWalletBalance } = useGetWalletBalanceQuery({
    walletId,
  });

  const { unit, wallet, loading } = useWallet(walletId);

  const isLoading = isLoadingWalletBalance || loading;

  const xdgBalance = useMemo(() => {
    if (isLoading || !wallet || !walletBalance || !('spendableBalance' in walletBalance)) {
      return undefined;
    }

    if (wallet.type === WalletType.STANDARD_WALLET) {
      return mojoToDogechiaLocaleString(walletBalance.spendableBalance, locale);
    }

    if (wallet.type === WalletType.CAT) {
      return mojoToCATLocaleString(walletBalance.spendableBalance, locale);
    }

    return undefined;
  }, [isLoading, wallet, walletBalance, locale]);

  if (!isLoading && xdgBalance === undefined) {
    return null;
  }

  return (
    <Trans>
      Spendable Balance:{' '}
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {xdgBalance}
          &nbsp;
          {unit?.toUpperCase()}
        </>
      )}
    </Trans>
  );
}
