import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import firebase from '../config/index';

import { AuthState, changeAuthStatus } from '../reducers/auth';
import { ApplicationState } from '../reducers/index';
import AuthComponent from '../components/Auth';

const mapStateToProps = (state: ApplicationState): AuthState => ({
  loginUser: state.auth.loginUser,
});

export interface DispatchProps {
  dispatchAuthStatus: (user: firebase.User | null) => void;
  handleLogout: () => void;
  handleLogin: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchAuthStatus: (user: firebase.User | null) =>
    dispatch(changeAuthStatus(user)),
  handleLogout: () => {
    firebase.auth().signOut();
    dispatch(changeAuthStatus(null));
  },
  handleLogin: () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    } else {
      dispatch(changeAuthStatus(firebase.auth().currentUser));
    }
  },
});

const LoginContainer: FC<AuthState & DispatchProps> = ({
  loginUser,
  dispatchAuthStatus,
  handleLogin,
  handleLogout,
}) => {
  firebase.auth().onAuthStateChanged(user => {
    dispatchAuthStatus(user);
  });

  return (
    <AuthComponent
      loginUser={loginUser}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
