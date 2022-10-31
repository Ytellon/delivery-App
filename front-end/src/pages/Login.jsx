import Button from '../components/button';
import Input from '../components/input';

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Input name="Login" dataTestId="common_login__input-email" type="email" />

      <Input name="Senha" dataTestId="common_login__input-password" type="password" />

      <Button
        name="Log in"
        type="submit"
        dataTestId="common_login__button-login"
      />

      <Button
        name="Ainda não tenho conta"
        type="button"
        dataTestId="common_login__button-register"
      />
    </div>
  );
}
