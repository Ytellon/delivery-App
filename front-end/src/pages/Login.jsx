import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../utils/requests';
import Button from '../components/button';
import Input from '../components/input';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = useCallback(async () => {
    const saveStorage = JSON.parse(localStorage.getItem('user'));
    if (saveStorage?.role === 'customer') return navigate('/customer/products');
    if (saveStorage?.role === 'seller') return navigate('/seller/orders');
    if (saveStorage?.role === 'administrator') return navigate('/admin/manage');
  }, [navigate]);

  useEffect(() => {
    const enableButton = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const minPasswordLength = 6;
      const validation = !(
        emailRegex.test(email)
        && password.length >= minPasswordLength
      );

      setButtonDisable(validation);
    };

    handleLogin();
    enableButton();
  }, [email, password, handleLogin]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const login = {
      email,
      password,
    };

    try {
      const resLogin = await postRequest('/login', login);

      localStorage.setItem('user', JSON.stringify(resLogin));

      handleLogin();
    } catch ({ response }) {
      const { status, data } = response;
      setErrorMessage(`Erro ${status} - ${data.message}`);
    }
  };

  return (
    <div className="login">
      <form className="vertical-container">
        <h1>Login</h1>
        <hr />
        <Input
          name="Email"
          dataTestId="common_login__input-email"
          type="email"
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Digite seu email"
        />
        <Input
          name="Senha"
          dataTestId="common_login__input-password"
          type="password"
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Digite sua senha"
        />
        <Button
          name="Log in"
          type="submit"
          dataTestId="common_login__button-login"
          disabled={ buttonDisable }
          onClick={ handleSubmit }
        />
        <Button
          classes="white-button"
          name="Ainda não tenho conta"
          type="button"
          dataTestId="common_login__button-register"
          onClick={ () => navigate('/register') }
        />
      </form>
      { errorMessage
        && <p data-testId="common_login__element-invalid-email">{ errorMessage }</p> }
    </div>
  );
}
