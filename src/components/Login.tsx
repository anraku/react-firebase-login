import React, { FC } from 'react';
import firebase from '../config/index';

export interface LoginProps {
  loginUser: firebase.User | null;
  // login: () => void;
  // logout: () => void;
  // changeAuthStatus: (user: firebase.User) => void;
}

const login = (): void => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const logout = (): void => {
  firebase.auth().signOut();
};

const LoginComponent: FC<LoginProps> = props => {
  const { loginUser } = props;

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       changeAuthStatus(user);
  //     }
  //   });
  // }, []);

  return (
    <>
      <p>{loginUser ? loginUser.displayName : 'guest'}さんこんにちは</p>
      <button type="button" onClick={logout}>
        Google Logout
      </button>
      <button type="button" onClick={login}>
        Google Login
      </button>
    </>
  );
};

export default LoginComponent;
