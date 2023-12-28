import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='text-red-500 min-h-screen flex justify-center '>

            <div className=' flex flex-col justify-center items-center'>
                <h2><span className='text-2xl  md:text-9xl font-bold '>404</span> </h2>
                <p className='text-[20px] md:text-[24px] pb-2'>OOPS! this page does not exist </p>
                <div className=''>
                    
                <Link href="/">
                    <button className='px-12 py-3 bg-purple-500 rounded text-white text-base md:text-lg mt-5'>Return Home</button>
                </Link>
                </div>
            </div>
        </div>
    )
}