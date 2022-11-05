import PropTypes from 'prop-types';
import Button from './button';

export default function UserList({ users }) {
  return (
    <div>
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
                  <tr
                    key={ index }
                  >
                    <td
                      data-testid={
                        `admin_manage__element-user-table-item-number-${index + 1}`
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      data-testid={ `admin_manage__element-user-table-name-${index + 1}` }
                    >
                      {user.name}
                    </td>
                    <td
                      data-testid={
                        `admin_manage__element-user-table-email-${index + 1}`
                      }
                    >
                      {user.email}
                    </td>
                    <td
                      data-testid={ `admin_manage__element-user-table-role-${index + 1}` }
                    >
                      {user.role}
                    </td>
                    <td>
                      <Button
                        name="Excluir"
                        type="button"
                        data-testid={
                          `admin_manage__element-user-table-remove-${index + 1}`
                        }
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

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  })),
};

UserList.defaultProps = {
  users: [],
};
