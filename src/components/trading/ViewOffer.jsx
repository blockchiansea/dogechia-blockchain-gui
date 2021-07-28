import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import { Dropzone } from '@dogechia/core';
import { Trans } from '@lingui/macro';
import { Button } from '@material-ui/core';
import {
  resetTrades,
  offerParsingName,
  parsingStarted,
  parsingStatePending,
} from '../../modules/trade';

import {
  accept_trade_action,
  parse_trade_action,
} from '../../modules/trade_messages';
import { Card } from '@dogechia/core';
import TradesTable from './TradesTable';
import WalletType from '../../constants/WalletType';

/* global BigInt */

export const DropView = () => {
  const dispatch = useDispatch();
  const parsing_state = useSelector((state) => state.trade_state.parsing_state);
  const isParsing = parsing_state === parsingStatePending;

  function handleDrop(acceptedFiles) {
    const offer_file_path = acceptedFiles[0].path;
    const offer_name = offer_file_path.replace(/^.*[/\\]/, '');

    dispatch(offerParsingName(offer_name, offer_file_path));
    dispatch(parse_trade_action(offer_file_path));
    dispatch(parsingStarted());
  }

  return (
    <Card title={<Trans>Select Offer</Trans>}>
      <Dropzone onDrop={handleDrop} processing={isParsing}>
        <Trans>Drag and drop offer file</Trans>
      </Dropzone>
    </Card>
  );
};

export const OfferView = () => {
  const offer = useSelector((state) => state.trade_state.parsed_offer);
  const dispatch = useDispatch();
  const file_path = useSelector((state) => state.trade_state.parsed_offer_path);

  function handleAccept() {
    dispatch(accept_trade_action(file_path));
  }

  function handleDecline() {
    dispatch(resetTrades());
  }

  const trades = useMemo(() => {
    return Object.keys(offer).map((name) => ({
      amount: offer[name],
      name,
      type: name.startsWith("ff02ffff01ff02ffff03ffff09ff5bff8080ffff01ff0101ffff01ff02ffff03ffff09ff13ff0280ffff01ff0101ff8080ff018080ff0180ffff04ffff01a0") ? WalletType.COLOURED_COIN : WalletType.STANDARD_WALLET
    }));
  }, offer);

  return (
    <Card
      title={<Trans>Offer</Trans>}
      actions={
        <>
          <Button onClick={handleDecline} variant="outlined">
            <Trans>Cancel</Trans>
          </Button>
          <Button onClick={handleAccept} variant="contained" color="primary">
            <Trans>Accept</Trans>
          </Button>
        </>
      }
    >
      <TradesTable rows={trades} />
    </Card>
  );
};

export const OfferSwitch = () => {
  const showOffer = useSelector((state) => state.trade_state.show_offer);

  if (showOffer) {
    return <OfferView />;
  }
  return <DropView />;
};
