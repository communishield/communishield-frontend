import * as styles from './login.page.css';
import { useContext, useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Link } from '../../components/link';
import { Communishield } from '../../third-parties/communishield/client';
import { UserContext } from '../../contexts/user.context';
import { ErrorContext } from '../../contexts/error.context';
import { UnexpectedError } from '../../errors/unexpected.error';
import {
  Form,
  FormField,
  FormInput,
  FormInputIcon,
  FormInputWithIcon,
  FormMessage,
  FormSubmit,
} from '../../components/form';

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      const token = await Communishield.login({
        username: formData.username,
        password: formData.password,
      });
      Communishield.setToken(token);
      const user = await Communishield.getUser(formData.username);

      setUser({ token, ...user });
      window.location.href = '/';
    } catch (error) {
      setError(error instanceof Error ? error : new UnexpectedError());
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.text}>
        <h2>Log in to your account</h2>

        <p>
          Don&apos;t have an account?{' '}
          <Link href="/signup" color="indigo">
            Sign up
          </Link>
        </p>
      </section>
      <section className={styles.form}>
        <Form onSubmit={handleSubmit}>
          <FormField
            name="username"
            label="Username"
            messages={[
              <FormMessage
                key="usernameMissing"
                level="error"
                message="Please enter a username"
                match="valueMissing"
              />,
            ]}
            input={
              <FormInput>
                <input
                  required
                  className={styles.input}
                  type="text"
                  value={formData.username}
                  onChange={e =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </FormInput>
            }
          />
          <FormField
            name="password"
            label="Password"
            messages={[
              <FormMessage
                key="passwordMissing"
                level="error"
                message="Please enter a password"
                match="valueMissing"
              />,
            ]}
            input={
              <FormInputWithIcon
                icon={
                  <FormInputIcon
                    ariaLabel={showPassword ? 'Hide password' : 'Show password'}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </FormInputIcon>
                }
              >
                <input
                  required
                  className={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </FormInputWithIcon>
            }
          />
          <FormSubmit label="Sign in" />
        </Form>
      </section>
    </div>
  );
}
