import { withAuth } from "next-auth/middleware"
import { authOptions } from "./app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { useSession, signIn, signOut } from 'next-auth/react';
// export { default } from "next-auth/middleware"

// export default withAuth(
    //     function middleware(request){
        //         return NextResponse.rewrite(new URL('/api/categories',request.url))
        //     },
        //     {
            //         callbacks:authOptions,
            //     }
            // )
            
            const { data: session } = useSession();

export function middleware(request){
    if(!session(request)){
        return NextResponse.json(
            { success: false, message: 'authentication failed' },
            { status: 401 }
          )
    }
}

export const config = {
    matcher: ['/api/categories', '/api/categories/:path*']
}




// In one of my past at HiiT plc, I was responsible for mentoring and educating students who struggled to grasp programming and software development concepts. 
// I also helped in Utilizing best practice in NextJS to redesign the existing website of the company. 
//  One of the projects I am particularly proud of is the redesign of Geoplex website ( here is the deployed link to vercel- https://geoplex-web.vercel.app/) , Geoplex is one of the leading oil company in nigeria, where I played a key role in adding interactivity to the frontend and improving user experience. This experience allowed me to further enhance my expertise in frontend development.



//  Responsive design, web performnace optimization, improving user interface, security.



//  creating responsive designs and improving user experience



//  I would love to work with your organization to develop applications and websites that are in tune with 
// standard best practices and latest technological advancements. 
// And also maintaining applications where security is a priority to end-user experience.



// I also turn on my camera when required during virtual meetings, I also share all my informations such as my address, education, guarantor/referee to my employer



// I have never found any professional feedback hard on me, this is because i am open to learning and i constantly also try to improve myself and skills by learing from others and by educating myself with the appropriate resources