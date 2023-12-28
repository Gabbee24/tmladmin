'use client';
import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function Home() {
  const { data: session } = useSession();


  return (
    <div className='flex justify-between' >
      <p>Login in as <b> {session?.user?.name}</b></p>
      <img src={session?.user?.image} alt='profileImage' className='w-9 h-9 rounded-full'/>
    </div>
  )
}
