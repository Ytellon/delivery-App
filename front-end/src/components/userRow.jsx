import PropTypes from 'prop-types';

export default function UserRow({ number, id, name, email, role, deleteUser }) {
  return (
    <tr>
      <td
        data-testid={
          `admin_manage__element-user-table-item-number-${number}`
        }
      >
        { number }
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-name-${number}` }
      >
        { name }
      </td>
      <td
        data-testid={
          `admin_manage__element-user-table-email-${number}`
        }
      >
        {email}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-role-${number}` }
      >
        {role}
      </td>
      <td>
        <button
          type="button"
          name={ number }
          onClick={ () => deleteUser(id) }
          data-testid={
            `admin_manage__element-user-table-remove-${number}`
          }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

UserRow.propTypes = {
  number: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
