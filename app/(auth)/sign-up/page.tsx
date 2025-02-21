'use client';

import AuthForm from '@/components/AuthForm';
import { signUpSchema } from '@/lib/validations';
import React from 'react';

const SignUp = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: '',
        password: '',
        fullName: '',
        universityId: 0,
        universityCard: '',
      }}
      onSubmit={async (data) => {
        return {
          success: true,
        };
      }}
    />
  );
};

export default SignUp;
