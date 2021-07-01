import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import { ReactComponent as DogeChiaIcon } from './images/dogechia.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={DogeChiaIcon} viewBox="0 0 150 58" {...props} />;
}
