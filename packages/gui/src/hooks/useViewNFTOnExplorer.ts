import type { NFTInfo } from '@dogechia-network/api';
import { useCurrencyCode } from '@dogechia-network/core';

import useOpenExternal from './useOpenExternal';

/* ========================================================================== */

function getMintGardenURL(nft: NFTInfo, testnet: boolean) {
  const url = `https://${testnet ? 'testnet.' : ''}mintgarden.io/nfts/${nft.$nftId}`;
  return url;
}

function getSpacescanURL(nft: NFTInfo, testnet: boolean) {
  const url = `https://spacescan.io/${testnet ? 'txdg10' : 'xdg'}/nft/${nft.$nftId}`;
  return url;
}

/* ========================================================================== */

export enum NFTExplorer {
  MintGarden = 'mintgarden',
  Spacescan = 'spacescan',
}

const UrlBuilderMapping = {
  [NFTExplorer.MintGarden]: getMintGardenURL,
  [NFTExplorer.Spacescan]: getSpacescanURL,
};

export default function useViewNFTOnExplorer() {
  const openExternal = useOpenExternal();
  const testnet = useCurrencyCode() === 'TXDG';

  function handleViewNFTOnExplorer(nft: NFTInfo, explorer: NFTExplorer) {
    const urlBuilder = UrlBuilderMapping[explorer];
    const url = urlBuilder(nft, testnet);

    openExternal(url);
  }

  return handleViewNFTOnExplorer;
}
