import { useState, useEffect } from 'react';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    const enableButton = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const minNameLength = 12;
      const minPasswordLength = 6;
      const validation = !(
        emailRegex.test(email)
        && name.length > minNameLength
        && password.length > minPasswordLength
      );

      setButtonDisable(validation);
    };

    enableButton();
  }, [email, password, name]);

  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            id="name"
            data-testid="common_register__input-name"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Nome
          <input
            type="email"
            name="email"
            id="email"
            data-testid="common_register__input-email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            id="password"
            data-testid="common_register__input-password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ buttonDisable }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
