import { Dispatch } from 'react';
import { Client, Conversation } from '@xmtp/xmtp-js';

export interface AppContext {
  dispatch: Dispatch<AppAction>;
  state: AppState;
}

export interface AppState {
  client: Client | null;
  conversations: Conversation[];
  selectedAddress: string;
}

export enum ActionTypes {
  UPDATE_STATE = 'UPDATE_STATE',
  SET_STATE = 'SET_STATE',
  CLEAR_STATE = 'CLEAR_STATE',
}

export type AppAction = {
  type: ActionTypes;
  key?: string;
  data: any;
};
