import { Reducer } from 'redux';
import firebase from '../config/index';

export const CHANGE_STATUS = 'USER/CHANGE_STATUS';
export const TEST = 'USER/TEST';

export const changeStatus = (user: firebase.User) => ({
  type: CHANGE_STATUS as typeof CHANGE_STATUS,
  user,
});

export type AuthAction = ReturnType<typeof changeStatus>;

export interface AuthState {
  loginUser: firebase.User | null;
}

const initialState: AuthState = {
  loginUser: firebase.auth().currentUser,
};

const auth: Reducer<AuthState, AuthAction> = (
  state: AuthState = initialState,
  action: AuthAction,
) => {
  switch (action.type) {
    case CHANGE_STATUS:
      return {
        ...state,
        loginUser: action.user,
      };
    default:
      return state;
  }
};

export default auth;
