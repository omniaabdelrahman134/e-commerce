'use server';
import axios from 'axios';
import { registerSchemaType } from '@/Schema/registerSchema';
import { cookies } from 'next/headers';

export async function RegisterAction(values: registerSchemaType) {
  try {
    const { data } = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      values,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (data.message !== 'success') {
      return { success: false, error: data.message };
    }

    const cookieStore = await cookies();
    cookieStore.set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.response?.data?.message || 'Registration failed',
    };
  }
}
