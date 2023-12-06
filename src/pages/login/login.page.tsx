import * as Form from '@radix-ui/react-form';
import * as styles from './login.page.css';
import { FormEvent, useContext, useState } from 'react';
import {
  CrossCircledIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { Link } from '../../components/link';
import { Communishield } from '../../third-parties/communishield/client';
import { UserContext } from '../../contexts/user.context';
import { ErrorContext } from '../../contexts/error.context';
import { UnexpectedError } from '../../errors/unexpected.error';

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
        <Form.Root className={styles.formContainer} onSubmit={handleSubmit}>
          <Form.Field className={styles.formField} name="username">
            <Form.Label className={styles.label}>Username</Form.Label>
            <Form.Message className={styles.errorText} match="valueMissing">
              <CrossCircledIcon style={{ height: 12, width: 12 }} />
              Please enter a username
            </Form.Message>
            <Form.Control asChild>
              <input
                required
                className={styles.input}
                type="text"
                value={formData.username}
                onChange={e =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className={styles.formField} name="password">
            <Form.Label className={styles.label}>Password</Form.Label>
            <Form.Message className={styles.errorText} match="valueMissing">
              <CrossCircledIcon style={{ height: 12, width: 12 }} />
              Please enter a password
            </Form.Message>
            <div className={styles.inputWithIconContainer}>
              <Form.Control asChild>
                <input
                  required
                  className={`${styles.input} ${styles.inputWithIcon}`}
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Control>
              <IconButton
                type="button"
                variant="ghost"
                color="gray"
                className={styles.inputIcon}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </IconButton>
            </div>
          </Form.Field>

          <Form.Submit asChild>
            <button type="submit" className={styles.submitButton}>
              Log in
            </button>
          </Form.Submit>
        </Form.Root>
      </section>
    </div>
  );
}
