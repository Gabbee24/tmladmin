import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { CiLogout, CiSettings } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiListOrdered } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Modal from './Modal';

const Nav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const {data: session} = useSession();
    const activeNav = 'bg-white p-3 mr-0 rounded-lg '
    return (
        <aside className='p-7 h-screen flex justify-between flex-col' >
            <Link href='/' >
                <span className='font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600' >T M L</span>
            </Link>
            <nav className='flex flex-col gap-7' >
                <Link href='/' className={pathname === '/' ? activeNav : ''  } ><span className="flex gap-4" > <span> <LuLayoutDashboard fontSize='1.5em' color='purple' /> </span> Dashboard  </span> </Link>
                <Link href='/products' className={pathname.startsWith('/products') ? activeNav : ''  } ><span className="flex gap-4" > <span> <MdOutlineProductionQuantityLimits fontSize='1.5em' color='purple' /> </span> Products  </span> </Link>
                <Link href='/category' className={pathname.startsWith('/category') ? activeNav : ''  } ><span className="flex gap-4" > <span> <MdOutlineProductionQuantityLimits fontSize='1.5em' color='purple' /> </span> Products  </span> </Link>
                <Link href='/' className={pathname.startsWith('/orders') ? activeNav : ''  } ><span className="flex gap-4" > <span> <RiListOrdered fontSize='1.5em' color='purple' /> </span> Orders  </span> </Link>
                <Link href='/' className={pathname.startsWith('/settings') ? activeNav : ''  } ><span className="flex gap-4" > <span> <CiSettings fontSize='1.5em' color='purple' /> </span> Settings  </span> </Link>
            </nav>
                <button onClick={signOut} className='py-4  rounded-lg' ><span className="flex gap-4" > <span> <CiLogout fontSize='1.5em' color='purple' /> </span> Log Out  </span> </button>
                {/* <Modal/> */}
        </aside>
    )
}

export default Nav