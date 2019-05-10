import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import firebase from '../config/index';

import { AuthState, changeStatus } from '../reducers/auth';
import { ApplicationState } from '../reducers/index';
import LoginComponent from '../components/Login';

const mapStateToProps = (state: ApplicationState): AuthState => ({
  loginUser: state.auth.loginUser,
});

export interface DispatchProps {
  changeAuthStatus: (user: firebase.User | null) => void;
  handleLogout: () => void;
  handleLogin: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeAuthStatus: (user: firebase.User | null) =>
    dispatch(changeStatus(user)),
  handleLogout: () => {
    firebase.auth().signOut();
    dispatch(changeStatus(null));
  },
  handleLogin: () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    } else {
      dispatch(changeStatus(firebase.auth().currentUser));
    }
  },
});

const LoginContainer: FC<AuthState & DispatchProps> = ({
  loginUser,
  changeAuthStatus,
  handleLogin,
  handleLogout,
}) => {
  firebase.auth().onAuthStateChanged(user => {
    changeAuthStatus(user);
  });

  return (
    <LoginComponent
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
