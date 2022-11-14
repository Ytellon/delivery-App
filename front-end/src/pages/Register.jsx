import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../utils/requests';
import Button from '../components/button';
import Input from '../components/input';
import './Register.css';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const enableButton = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const minNameLength = 12;
      const minPasswordLength = 6;
      const validation = !(
        emailRegex.test(email)
        && name.length > minNameLength
        && password.length >= minPasswordLength
      );

      setButtonDisable(validation);
    };

    enableButton();
  }, [email, password, name]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
      name,
    };

    try {
      const resRegister = await postRequest('/register', user);

      localStorage.setItem('user', JSON.stringify(resRegister));

      navigate('/customer/products');
    } catch ({ response }) {
      const { status, data } = response;
      setErrorMessage(`Erro ${status} - ${data.message}`);
    }
  };

  return (
    <div>
      <form className="vertical-container login-register-container">
        <h1>Cadastro</h1>
        <hr />
        <Input
          classes="large-input"
          type="text"
          name="Nome"
          dataTestId="common_register__input-name"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          placeholder="Digite seu Nome"
        />
        <Input
          classes="large-input"
          type="email"
          name="Email"
          dataTestId="common_register__input-email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder=" Digite seu email"
        />
        <Input
          classes="large-input"
          type="password"
          name="Senha"
          dataTestId="common_register__input-password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Digite sua senha"
        />
        <Button
          classes="large-button"
          type="button"
          name="Cadastrar"
          dataTestId="common_register__button-register"
          disabled={ buttonDisable }
          onClick={ handleSubmit }
        />
      </form>
      { errorMessage
        && (
          <p
            className="error-message"
            data-testId="common_register__element-invalid_register"
          >
            {errorMessage}
          </p>
        )}
    </div>
  );
}
