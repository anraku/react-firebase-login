import { Reducer } from 'redux';
import firebase from '../config/index';

export const CHANGE_AUTH_STATUS = 'USER/CHANGE_AUTH_STATUS';

export const changeAuthStatus = (user: firebase.User | null) => ({
  type: CHANGE_AUTH_STATUS as typeof CHANGE_AUTH_STATUS,
  user,
});

export type AuthAction = ReturnType<typeof changeAuthStatus>;

export interface AuthState {
  loginUser?: firebase.User | null;
}

const initialState: AuthState = {
  loginUser: firebase.auth().currentUser,
};

const auth: Reducer<AuthState, AuthAction> = (
  state: AuthState = initialState,
  action: AuthAction,
) => {
  switch (action.type) {
    case CHANGE_AUTH_STATUS:
      return {
        ...state,
        loginUser: action.user,
      };
    default:
      return state;
  }
};

export default auth;
