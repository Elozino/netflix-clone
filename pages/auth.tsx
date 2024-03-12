import Input from '@/components/Input'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import App from './_app';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

interface IUserInput {
  email: string;
  name: string;
  password: string;
}

const Auth = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState<IUserInput>({
    email: "",
    name: "",
    password: ""
  })

  const [variant, setVariant] = useState<'login' | 'register'>('login')

  const toggleVariant = () => {
    setVariant(variant === 'login' ? 'register' : 'login')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value })
  }

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email: userInput.email,
        password: userInput.password,
        redirect: false,
        callbackUrl: '/',
      })

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [router, userInput.email, userInput.password])
  
  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', { ...userInput })
      login()
    } catch (error) {
      console.log(error)
    }
  }, [login, userInput])

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <Image
            src={'/images/logo.png'} alt={'logo'}
            priority
            width={100}
            height={100}
          />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white font-semibold text-4xl mb-8'>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  id={'name'}
                  onChange={handleInputChange}
                  value={userInput.name}
                  label={'Username'}
                />
              )}
              <Input
                id={'email'}
                onChange={handleInputChange}
                value={userInput.email}
                label={'Email'}
                type='email'
              />
              <Input
                id={'password'}
                onChange={handleInputChange}
                value={userInput.password}
                label={'Password'}
                type='password'
              />
            </div>
            <button
              onClick={() => {
                variant === 'login' ? login() : register()
              }}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === 'login' ? 'Login' : 'Register'}
            </button>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}{" "}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'>
                {variant === 'login' ? 'Create account' : 'Sign In'}
              </span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth