import { TypeOf, object, string } from 'zod';

export const createUserSchema = object({
  name: string({ required_error: 'Name is required' }).min(
    1,
    'Name is required'
  ),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  photo: string().optional(),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string({
    required_error: 'Please confirm your password',
  }).min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export const loginUserSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email or password'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
}).refine((data) => {
  // Check if it's a Google login
  const isGoogleLogin = data.email === 'google@example.com'; // Use a specific email for Google login
  return isGoogleLogin || (data.email && data.password); // Validate only if not Google login
}, {
  message: 'Email and password are required unless logging in with Google',
  path: ['email', 'password'], // Specify the paths for the error message
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
