import defaultsForPlotter from '../utils/defaultsForPlotter';
import optionsForPlotter from '../utils/optionsForPlotter';
import PlotterName from './PlotterName';

export default {
  displayName: 'Dogechia Proof of Space',
  options: optionsForPlotter(PlotterName.DOGECHIAPOS),
  defaults: defaultsForPlotter(PlotterName.DOGECHIAPOS),
  installInfo: { installed: true },
};
