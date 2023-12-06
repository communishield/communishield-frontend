import * as styles from './signup.page.css';
import { FormEvent, useContext, useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Checkbox } from '../../components/checkbox';
import { Link } from '../../components/link';
import { Communishield } from '../../third-parties/communishield/client';
import { ErrorContext } from '../../contexts/error.context';
import {
  Form,
  FormField,
  FormInput,
  FormInputIcon,
  FormInputWithIcon,
  FormMessage,
  FormSubmit,
} from '../../components/form';

export default function SignupPage() {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    Communishield.signup({
      username: formData.username,
      password: formData.password,
    })
      .then(() => {
        window.location.href = '/login';
      })
      .catch(error => {
        setError(error);
      });
  };

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
          <FormField
            name="confirmPassword"
            label="Confirm password"
            messages={[
              <FormMessage
                key="confirmPasswordMissing"
                level="error"
                message="Please confirm your password"
                match="valueMissing"
              />,
              <FormMessage
                key="passwordsDontMatch"
                level="error"
                message="Passwords don't match"
                match={(value, formData) => value !== formData.get('password')}
              />,
            ]}
            input={
              <FormInput>
                <input
                  required
                  className={styles.input}
                  type="text"
                  value={formData.confirmPassword}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </FormInput>
            }
          />
          <FormField
            name="termsAndConditions"
            label={
              <>
                I agree to the{' '}
                <Link href="/terms-and-conditions" color="indigo">
                  Terms and Conditions
                </Link>
              </>
            }
            messages={[]}
            input={
              <Checkbox
                checked={formData.termsAndConditions}
                onCheckedChange={(checked: boolean) => {
                  setFormData({ ...formData, termsAndConditions: checked });
                }}
              />
            }
          />
          <FormSubmit
            isDisabled={!formData.termsAndConditions}
            label="Sign up"
          />
        </Form>
      </section>
    </div>
  );
}
