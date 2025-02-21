'use client';

import AuthForm from '@/components/AuthForm';
import React from 'react';
import { signInSchema } from '@/lib/validations';

const SignIn = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (data) => {
        return {
          success: true,
        };
      }}
    />
  );
};

export default SignIn;
