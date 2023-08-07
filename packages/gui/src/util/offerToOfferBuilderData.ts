import { OfferSummaryRecord } from '@dogechia-network/api';
import { mojoToCAT, mojoToDogechia } from '@dogechia-network/core';
import BigNumber from 'bignumber.js';

import type OfferBuilderData from '../@types/OfferBuilderData';
import type OfferSummary from '../@types/OfferSummary';
import { launcherIdToNFTId } from './nfts';

export default function offerToOfferBuilderData(
  offerSummary: OfferSummary | OfferSummaryRecord,
  setDefaultOfferedFee?: boolean,
  defaultFee?: string // in mojos
): OfferBuilderData {
  const { fees, offered, requested, infos } = offerSummary;

  const defaultFeeXDG = defaultFee ? mojoToDogechia(defaultFee).toFixed() : '';

  const offeredXdg: OfferBuilderData['offered']['xdg'] = [];
  const offeredTokens: OfferBuilderData['offered']['tokens'] = [];
  const offeredNfts: OfferBuilderData['offered']['nfts'] = [];
  const offeredFee: OfferBuilderData['offered']['fee'] = setDefaultOfferedFee ? [{ amount: defaultFeeXDG }] : [];
  const requestedXdg: OfferBuilderData['requested']['xdg'] = [];
  const requestedTokens: OfferBuilderData['requested']['tokens'] = [];
  const requestedNfts: OfferBuilderData['requested']['nfts'] = [];

  // processing requested first because it's what you/we will give

  Object.keys(requested).forEach((id) => {
    const amount = new BigNumber(requested[id]);
    const info = infos[id];

    if (info?.type === 'CAT') {
      offeredTokens.push({
        amount: mojoToCAT(amount).toFixed(),
        assetId: id,
      });
    } else if (info?.type === 'singleton') {
      offeredNfts.push({
        nftId: launcherIdToNFTId(info.launcherId),
      });
    } else if (id === 'xdg') {
      offeredXdg.push({
        amount: mojoToDogechia(amount).toFixed(),
      });
    }
  });

  Object.keys(offered).forEach((id) => {
    const amount = new BigNumber(offered[id]);
    const info = infos[id];

    if (info?.type === 'CAT') {
      requestedTokens.push({
        amount: mojoToCAT(amount).toFixed(),
        assetId: id,
      });
    } else if (info?.type === 'singleton') {
      requestedNfts.push({
        nftId: launcherIdToNFTId(info.launcherId),
      });
    } else if (id === 'xdg') {
      requestedXdg.push({
        amount: mojoToDogechia(amount).toFixed(),
      });
    }
  });

  return {
    offered: {
      xdg: offeredXdg,
      tokens: offeredTokens,
      nfts: offeredNfts,
      fee: offeredFee,
    },
    requested: {
      xdg: requestedXdg,
      tokens: requestedTokens,
      nfts: requestedNfts,
      fee: [
        {
          amount: mojoToDogechia(fees).toFixed(),
        },
      ],
    },
  };
}
