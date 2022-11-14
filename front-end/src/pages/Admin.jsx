import { useEffect, useState } from 'react';
import Button from '../components/button';
import Header from '../components/header';
import Input from '../components/input';
import UserList from '../components/userList';
import { getLocalStorage } from '../utils/localStorage';
import { deleteRequest, getRequest, postRequest } from '../utils/requests';
import './Admin.css';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const getUsers = async () => {
    try {
      const user = getLocalStorage('user');

      const config = {
        headers: {
          authorization: user.token,
        },
      };

      const response = await getRequest('/users', config);

      setUsers(response.filter((currentUser) => currentUser.role !== 'administrator'));
    } catch ({ response }) {
      const { status, data } = response;
      setErrorMessage(`Erro ${status} - ${data.message}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const user = getLocalStorage('user');

      const config = {
        headers: {
          authorization: user.token,
        },
      };

      await deleteRequest(`/admin/user/${id}`, config);

      getUsers();
    } catch ({ response }) {
      const { status, data } = response;
      setErrorMessage(`Erro ${status} - ${data.message}`);
    }
  };

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

  const submit = async () => {
    const newUser = {
      name,
      email,
      password,
      role,
    };

    try {
      const user = getLocalStorage('user');

      const config = {
        headers: {
          authorization: user.token,
        },
      };

      await postRequest('/admin/register', newUser, config);
      getUsers();
    } catch ({ response }) {
      const { status, data } = response;
      setErrorMessage(`Erro ${status} - ${data.message}`);
    }
  };

  return (
    <div>
      <Header />
      { errorMessage
        && (
          <p
            className="error-message"
            data-testId="admin_manage__element-invalid-register"
          >
            {errorMessage}
          </p>)}
      <h2 className="subtitle">Cadastrar novo usuário</h2>
      <form className="horizontal-container admin-register-user">
        <Input
          name="Nome"
          dataTestId="admin_manage__input-name"
          onChange={ (e) => setName(e.target.value) }
        />
        <Input
          name="Email"
          type="email"
          dataTestId="admin_manage__input-email"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <Input
          name="Senha"
          type="password"
          dataTestId="admin_manage__input-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
        <label htmlFor="type">
          <select
            name="type"
            id="type"
            onChange={ (e) => setRole(e.target.value) }
            data-testid="admin_manage__select-role"
          >
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
            <option value="administrador">Administrador</option>
          </select>
        </label>
        <Button
          name="Registrar"
          onClick={ submit }
          disabled={ buttonDisable }
          dataTestId="admin_manage__button-register"
        />
      </form>
      <div className="vertical-container">
        <UserList users={ users } deleteUser={ deleteUser } />
      </div>
      {errorMessage
        && <p data-testId="admin_manage__element-invalid-register">{errorMessage}</p>}
    </div>
  );
}
