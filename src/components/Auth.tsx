import React, { FC } from 'react';
import firebase from '../config/index';

interface AuthProps {
  loginUser?: firebase.User | null;
  handleLogin?: () => void;
  handleLogout?: () => void;
}

const AuthComponent: FC<AuthProps> = props => {
  const { loginUser, handleLogin, handleLogout } = props;

  return (
    <>
      {loginUser ? (
        <>
          <p>{loginUser.displayName}さんこんにちは</p>
          <button type="button" onClick={handleLogout}>
            Google Logout
          </button>
        </>
      ) : (
        <>
          <p>guestさんこんにちは</p>
          <button type="button" onClick={handleLogin}>
            Google Login
          </button>
        </>
      )}
    </>
  );
};

export default AuthComponent;
