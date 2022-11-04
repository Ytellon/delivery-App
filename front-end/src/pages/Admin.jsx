import { useEffect, useState } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import { getLocalStorage } from '../utils/localStorage';
import { getRequest } from '../utils/requests';

export default function Admin() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const user = getLocalStorage('user');

      const config = {
        headers: {
          authorization: user.token,
        },
      };

      const response = await getRequest('/users', config);

      setUsers(response);
    } catch ({ response }) {
      const { status, data } = response;
      setErrorMessage(`Erro ${status} - ${data.message}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <form>
        <h1>Cadastrar novo usuário</h1>
        <Input
          name="Nome"
          dataTestId="admin_manage__input-name"
          onChange={ (e) => setName(e.target.value) }
        />
        <Input
          name="Email"
          dataTestId="admin_manage__input-email"
          onChange={ (e) => setName(e.target.value) }
        />
        <Input
          name="Senha"
          dataTestId="admin_manage__input-password"
          onChange={ (e) => setName(e.target.value) }
        />
        <label htmlFor="type">
          <select name="type" id="type" data-testid="admin_manage__select-role">
            <option value="volvo">Vendedor</option>
            <option value="saab">Cliente</option>
            <option value="opel">Administrador</option>
          </select>
        </label>
        <Button
          name="Registrar"
          type="submit"
          dataTestId="admin_manage__button-register"
        />
      </form>
      <div>
        <h2>Lista de usuários</h2>
        {
          users.length > 0 && (
            <table>
              <tr>
                <th>Item</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Tipo</th>
                <th>Excluir</th>
              </tr>
              {
                users.map((user, index) => (
                  <tr key={ index }>
                    <td
                      dataTestId={
                        `admin_manage__element-user-table-item-number-${index}`
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      dataTestId={ `admin_manage__element-user-table-name-${index}` }
                    >
                      {user.name}
                    </td>
                    <td
                      dataTestId={ `admin_manage__element-user-table-email-${index}` }
                    >
                      {user.email}
                    </td>
                    <td
                      dataTestId={ `admin_manage__element-user-table-role-${index}` }
                    >
                      {user.role}
                    </td>
                    <td>
                      <Button
                        name="Excluir"
                        type="button"
                        dataTestId={ `admin_manage__element-user-table-remove-${index}` }
                      />
                    </td>
                  </tr>
                ))
              }
            </table>
          )
        }
      </div>
    </div>
  );
}
