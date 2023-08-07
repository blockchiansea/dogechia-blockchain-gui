import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from './dogechiaLazyBaseQuery';

export { baseQuery };

export default createApi({
  reducerPath: 'dogechiaApi',
  baseQuery,
  endpoints: () => ({}),
});
