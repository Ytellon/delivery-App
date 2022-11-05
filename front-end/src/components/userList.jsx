import PropTypes from 'prop-types';
import UserRow from './userRow';

export default function UserList({ users, deleteUser }) {
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
                  <UserRow
                    key={ index }
                    number={ index + 1 }
                    id={ user.id }
                    name={ user.name }
                    email={ user.email }
                    role={ user.role }
                    deleteUser={ deleteUser }
                  />
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
  deleteUser: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  users: [],
};
