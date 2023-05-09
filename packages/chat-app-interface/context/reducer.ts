import { AppState, AppAction, ActionTypes } from './types';

export const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case ActionTypes.SET_STATE:
      return action.data;
    case ActionTypes.UPDATE_STATE:
      return {
        ...state,
        [action.key]: action.data,
      };
    case ActionTypes.CLEAR_STATE:
      return {
        client: null,
        conversations: [],
      };
    default:
      return state;
  }
};
