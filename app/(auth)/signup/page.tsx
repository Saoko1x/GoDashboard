'use client';
import { trpc } from '@/server/client';

function SignUpForm() {
  const signUpMutation = trpc.auth.signUp.useMutation();

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const username = event.target.username.value;

    try {
      const user = await signUpMutation.mutateAsync({
        email,
        password,
        name: username
      });
      console.log('User created:', user);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="text" name="username" placeholder="Username" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
