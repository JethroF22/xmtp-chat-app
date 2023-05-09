import { createContext } from 'react';

import { AppContext, AppState } from './types';

export const Context = createContext<AppContext>({
  dispatch: () => null,
  state: {} as AppState,
});
