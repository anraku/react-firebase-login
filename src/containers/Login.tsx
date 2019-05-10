import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import firebase from '../config/index';

import LoginComponent, { LoginProps } from '../components/Login';
import { AuthState, changeStatus } from '../reducers/auth';
import { ApplicationState } from '../reducers/index';

const mapStateToProps = (state: ApplicationState): AuthState => ({
  loginUser: state.auth.loginUser,
});

interface DispatchProps {
  changeAuthStatus: (user: firebase.User) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeAuthStatus: (user: firebase.User) => dispatch(changeStatus(user)),
});

// const login = (): void => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithRedirect(provider);
// };

// const logout = (): void => {
//   firebase.auth().signOut();
// };

type EnhancedAuthProps = LoginProps & DispatchProps;

const LoginContainer: FC<EnhancedAuthProps> = ({
  loginUser = null,
  changeAuthStatus,
}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        changeAuthStatus(user);
      }
    });
  }, [loginUser]);

  return <LoginComponent loginUser={loginUser} />;
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
