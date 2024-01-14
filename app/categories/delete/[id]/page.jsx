'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
    const { id } = params;
    const [cat,setCat] = useState();

    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();

            setCat(data);
        };
        getData();
    }, [id])

    // console.log(cat)

    const handleDel = async (id) => {
        try {
            await fetch(`/api/categories/${id}`, {
                method: "DELETE",
            });
        } catch (err) {
            consoe.log(err);
        }
        await router.push('/categories');
    };


    return (


        <div className=" rounded-md fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center z-[1000]" >
            <div>

                <div className="border-b-[1px] border-black w-full px-0">
                    <div>
                        <p className=" font-bold text-center text-[16px] md:text-lg  py-3 pt-3 md:pt-0" > ARE YOU SURE YOU WANT TO DELETE <span className="text-red-500" >" {cat?.categoryName} "</span>  </p>
                    </div>

                </div>

                <div className="flex mx-auto max-h-[500px] text-2xl gap-5 items-center justify-center pt-5 mt-5" >
                    <button className="bg-red-500 p-3 rounded-lg" onClick={() => handleDel(id)} >Yes</button>
                    <button className="bg-green-500 p-3 rounded-lg" onClick={() => router.push('/categories')} >No</button>

                </div>

            </div>

        </div>

    )
}

export default page