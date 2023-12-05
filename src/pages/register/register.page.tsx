import * as Form from '@radix-ui/react-form';
import * as styles from './register.page.css';
import { useEffect, useState } from 'react';
import {
  CrossCircledIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { Checkbox } from '../../components/checkbox';
import { Link } from '../../components/link';

export default function RegisterPage() {
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.container}>
      <section className={styles.text}>
        <h2>Create an account</h2>

        <p>
          Already have an account?{' '}
          <Link href="/login" color="indigo">
            Log in
          </Link>
        </p>
      </section>
      <section className={styles.form}>
        <Form.Root className={styles.formContainer}>
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

          <Form.Field className={styles.formField} name="confirmPassword">
            <Form.Label className={styles.label}>Confirm Password</Form.Label>
            <Form.Message className={styles.errorText} match="valueMissing">
              <CrossCircledIcon style={{ height: 12, width: 12 }} />
              Please confirm your password
            </Form.Message>
            <Form.Message
              className={styles.errorText}
              match={(value, formData) => value !== formData.get('password')}
            >
              <CrossCircledIcon style={{ height: 12, width: 12 }} />
              Passwords do not match
            </Form.Message>
            <Form.Control asChild>
              <input
                required
                className={styles.input}
                type="password"
                value={formData.confirmPassword}
                onChange={e =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </Form.Control>
          </Form.Field>

          <Form.Field
            name="termsAndConditions"
            className={`${styles.formField} ${styles.checkboxField}`}
          >
            <Checkbox
              checked={formData.termsAndConditions}
              onCheckedChange={e =>
                setFormData({
                  ...formData,
                  termsAndConditions: typeof e === 'boolean' && e.valueOf(),
                })
              }
            />
            <Form.Label>
              I agree to the{' '}
              <Link href="#" color="indigo">
                terms and conditions
              </Link>
            </Form.Label>
          </Form.Field>

          <Form.Submit asChild>
            <button type="submit" className={styles.submitButton}>
              Register
            </button>
          </Form.Submit>
        </Form.Root>
      </section>
    </div>
  );
}
