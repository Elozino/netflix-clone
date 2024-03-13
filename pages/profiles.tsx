import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react'
import App from './_app';
import Image from 'next/image';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser()
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-4xl text-white text-center'>
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => { router.push('/') }}>
            <div className="group flex-row w-44 mx-auto">
              <div className="
                w-44 h-44 rounded-md items-center justify-center border-2 border-transparent
                group-hover:border-white
                group-hover:cursor-pointer
                overflow-hidden
              ">
                <Image
                  src={'/images/default-blue.png'}
                  width={100}
                  height={100}
                  className='w-44 h-44'
                  alt='Profiles'
                  priority
                />
              </div>
              <div className="
                mt-4 text-gray-400 text-lg text-center
                group-hover:text-white
              ">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profiles

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}