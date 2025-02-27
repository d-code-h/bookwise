'use server';
import { AuthCredentials } from '@/app/types';

import { eq } from 'drizzle-orm';
import { hash } from 'bcryptjs';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { signIn, signOut } from '@/auth';
import { headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';
import { workflowClient } from '../workflow';
import config from '../config';

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>,
) => {
  // Destructure params
  const { email, password } = params;

  // Rate limit
  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect('/too-fast');
  }

  try {
    // Sign in user
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    // If sign in fails, return error
    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true }; // Return success
  } catch (error) {
    console.log('error', 'Signin error');
    return {
      success: false,
      error: 'Signin error',
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  // Destructure params
  const { fullName, email, password, universityId, universityCard } = params;

  // Rate limit
  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect('/too-fast');
  }

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // If user already exists, return error
  if (existingUser.length > 0) {
    return {
      success: false,
      error: 'User already exists',
    };
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  try {
    // Create user
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    // Sign in user
    await signInWithCredentials({ email, password });

    // Return success
    return {
      success: true,
    };
  } catch (error) {
    console.log('error', 'Signup error');
    return {
      success: false,
      error: 'Signup error',
    };
  }
};

export const logout = async () => {
  await signOut();
};
