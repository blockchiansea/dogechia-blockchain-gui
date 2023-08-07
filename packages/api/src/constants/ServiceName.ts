const ServiceName = {
  WALLET: 'dogechia_wallet',
  FULL_NODE: 'dogechia_full_node',
  FARMER: 'dogechia_farmer',
  HARVESTER: 'dogechia_harvester',
  SIMULATOR: 'dogechia_full_node_simulator',
  DAEMON: 'daemon',
  PLOTTER: 'chia_plotter',
  TIMELORD: 'dogechia_timelord',
  INTRODUCER: 'dogechia_introducer',
  EVENTS: 'wallet_ui',
  DATALAYER: 'dogechia_data_layer',
  DATALAYER_SERVER: 'dogechia_data_layer_http',
} as const;

type ObjectValues<T> = T[keyof T];

export type ServiceNameValue = ObjectValues<typeof ServiceName>;

export default ServiceName;
