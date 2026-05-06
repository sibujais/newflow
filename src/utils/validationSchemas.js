import * as Yup from 'yup';

export const loginValidationSchema =
  Yup.object({
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),

    password: Yup.string()
      .trim()
      .min(8, 'Minimum 8 characters')
      .required('Password is required'),
  });

export const registerValidationSchema =
  Yup.object({
    name: Yup.string()
      .trim()
      .min(3, 'Minimum 3 characters')
      .required('Name is required'),

    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),

    password: Yup
      .string()
      .min(
        8,
        'Minimum 8 characters',
      )
      .matches(
        /[A-Z]/,
        'One uppercase letter required',
      )
      .matches(
        /[a-z]/,
        'One lowercase letter required',
      )
      .matches(
        /[0-9]/,
        'One number required',
      )
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'One special character required',
      )
      .required(
        'Password is required',
      ),

    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password')],
        'Passwords must match',
      )
      .required(
        'Confirm password is required',
      ),
  });