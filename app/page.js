'use client';
import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function Home() {
  const { data: session } = useSession();

  // console.log(session)

  // hard code sales, should be stored in mongodb
  const items = {
    onSale: 'yes',
    price: 100,
    priceDrop: 50,
  }


  return (
    <div>

      <div className='flex justify-between' >
        <p>Login in as <b> {session?.user?.name}</b></p>
        <img src={session?.user?.image} alt='profileImage' className='w-9 h-9 rounded-full' />
      </div>


      <div className='mb-2 flex' >

        <p className={`mr-3 text-sm font-semibold ${items.onSale === 'yes' ? 'line-through' : ''}`} >
          {`$ ${items.price}`}
        </p>

        {
          items.onSale === 'yes' ?
            <p className='mr-3 text-sm font-semibold text-red-500' >
              {`$ ${(items.price - items.price * (items.priceDrop / 100)).toFixed(2)}`}
            </p>
            : null
        }

        {
          items.onSale === 'yes' ?
            <p className='mr-3 text-sm font-semibold' >{`- (${items.priceDrop} % ) off`}</p>
            : null
        }

      </div>
    </div>
  )
}
