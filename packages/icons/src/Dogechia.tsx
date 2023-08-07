import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';

import DogechiaBlackIcon from './images/dogechia-black.svg';
import DogechiaIcon from './images/dogechia.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={DogechiaIcon} viewBox="0 0 300 300" {...props} />;
}

export function DogechiaBlack(props: SvgIconProps) {
  return <SvgIcon component={DogechiaBlackIcon} viewBox="0 0 100 100" sx={{ width: '100px', height: '100px' }} {...props} />;
}
