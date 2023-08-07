import { WalletType } from '@dogechia-network/api';
import type { Wallet } from '@dogechia-network/api';

export default function getWalletPrimaryTitle(wallet: Wallet): string {
  switch (wallet.type) {
    case WalletType.STANDARD_WALLET:
      return 'Dogechia';
    default:
      return wallet.meta?.name ?? wallet.name;
  }
}
