'use client';
import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const Ss = ({ children }) => {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className='bg-gray-600 w-screen h-screen text-white flex items-center' >
                <div className='text-center w-full' >
                    <button onClick={() => signIn('google')} className='bg-red-500 py-4 px-9 rounded-lg' ><span className="flex gap-4" > Login with Google <span> <FcGoogle fontSize='1.5em' /> </span> </span> </button>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-gray-600 min-h-screen flex  '>
            <Nav />
            <div className='bg-white h-screen overflow-y-auto flex-grow rounded-lg m-5 p-5' >
                {children}
            </div>
        </div>
    )
}

export default Ss