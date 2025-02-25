'use client';

import AuthForm from '@/components/AuthForm';
import { signUp } from '@/lib/actions/auth.action';
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
      onSubmit={signUp}
    />
  );
};

export default SignUp;
