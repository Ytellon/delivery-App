import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../utils/requests';
import Button from '../components/button';
import Input from '../components/input';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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

    enableButton();
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const login = {
      email,
      password,
    };

    try {
      await postRequest('/login', login);
      navigate('/customer/products');
    } catch ({ response }) {
      const { status, data } = response;
      setErrorMessage(`Erro ${status} - ${data.message}`);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <Input
          name="Login"
          dataTestId="common_login__input-email"
          type="email"
          onChange={ (e) => setEmail(e.target.value) }
        />

        <Input
          name="Senha"
          dataTestId="common_login__input-password"
          type="password"
          onChange={ (e) => setPassword(e.target.value) }
        />

        <Button
          name="Log in"
          type="submit"
          dataTestId="common_login__button-login"
          disabled={ buttonDisable }
          onClick={ handleSubmit }
        />

        <Button
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
