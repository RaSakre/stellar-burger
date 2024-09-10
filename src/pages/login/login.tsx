import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../slices/loginSlice';
import { Navigate } from 'react-router-dom';
import { fetchUser } from '../../slices/userInfoSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const isAuthenticated = useSelector(
    (state) => state.loginReducer.isAuthenticated
  );
  const loginUserRequest = useSelector(
    (state) => state.loginReducer.loginUserRequest
  );
  const loginUserError = useSelector(
    (state) => state.loginReducer.loginUserError
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginUser({ email, password }));
  };
  if (loginUserRequest) {
    return <Preloader />;
  }
  if (isAuthenticated) {
    dispatch(fetchUser());
    return <Navigate replace to={'/'} />;
  }
  return (
    <LoginUI
      errorText={loginUserError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
