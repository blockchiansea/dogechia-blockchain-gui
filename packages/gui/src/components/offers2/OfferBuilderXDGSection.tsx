import { Loading, dogechiaToMojo, mojoToDogechiaLocaleString, useCurrencyCode } from '@dogechia-network/core';
import { Farming } from '@dogechia-network/icons';
import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';

import useOfferBuilderContext from '../../hooks/useOfferBuilderContext';
import useStandardWallet from '../../hooks/useStandardWallet';
import OfferBuilderSection from './OfferBuilderSection';
import OfferBuilderWalletAmount from './OfferBuilderWalletAmount';

export type OfferBuilderXDGSectionProps = {
  name: string;
  offering?: boolean;
  muted?: boolean;
};

export default function OfferBuilderXDGSection(props: OfferBuilderXDGSectionProps) {
  const { name, offering, muted = false } = props;
  const { wallet, loading: isLoadingWallet } = useStandardWallet();
  const currencyCode = useCurrencyCode();
  const { fields, append, remove } = useFieldArray({
    name,
  });
  const amount =
    useWatch({
      name,
    })?.[0]?.amount ?? 0; // Assume there's only 1 XDG field per trade side
  const { requestedRoyalties, offeredRoyalties, isCalculatingRoyalties } = useOfferBuilderContext();

  // Yes, this is correct. Fungible (XDG) assets used to pay royalties are from the opposite side of the trade.
  const allRoyalties = offering ? requestedRoyalties : offeredRoyalties;

  const loading = isLoadingWallet || isCalculatingRoyalties;

  const [amountWithRoyalties, royaltyPayments] = useMemo(() => {
    if (!allRoyalties) {
      return [];
    }

    let amountWithRoyaltiesLocal = dogechiaToMojo(amount);
    const rows: Record<string, any>[] = [];
    Object.entries(allRoyalties).forEach(([nftId, royaltyPaymentsLocal]) => {
      const matchingPayment = royaltyPaymentsLocal?.find((payment) => payment.asset === 'xdg');
      if (matchingPayment) {
        amountWithRoyaltiesLocal = amountWithRoyaltiesLocal.plus(matchingPayment.amount);
        rows.push({
          nftId,
          payment: {
            ...matchingPayment,
            displayAmount: mojoToDogechiaLocaleString(matchingPayment.amount),
          },
        });
      }
    });

    return [mojoToDogechiaLocaleString(amountWithRoyaltiesLocal), rows];
  }, [allRoyalties, amount]);

  function handleAdd() {
    if (!fields.length) {
      append({
        amount: '',
      });
    }
  }

  function handleRemove(index: number) {
    remove(index);
  }

  return (
    <OfferBuilderSection
      icon={<Farming />}
      title={currencyCode}
      subtitle={<Trans>Dogechia ({currencyCode}) is a digital currency that is secure and sustainable</Trans>}
      onAdd={!fields.length ? handleAdd : undefined}
      expanded={!!fields.length}
      muted={muted}
    >
      {loading ? (
        <Loading />
      ) : (
        fields.map((field, index) => (
          <OfferBuilderWalletAmount
            key={field.id}
            walletId={wallet.id}
            name={`${name}.${index}.amount`}
            onRemove={() => handleRemove(index)}
            hideBalance={!offering}
            amountWithRoyalties={amountWithRoyalties}
            royaltyPayments={royaltyPayments}
          />
        ))
      )}
    </OfferBuilderSection>
  );
}
