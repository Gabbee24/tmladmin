'use client'
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const page = ({ params }) => {
    const { id } = params;
    const [pro,setPro] = useState();

    // const fetcher = (...args) => fetch(...args).then(res => res.json())
    // const { data, mutate, error, isLoading } = useSWR(`/api/products/${id}`, fetcher)
    //   const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user.name}`, fetcher)
    // console.log(data);

    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();

            setPro(data);
        };
        getData();
    }, [id])

    // console.log(pro)

    const handleDel = async (id) => {
        try {
            await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });
        } catch (err) {
            consoe.log(err);
        }
        await router.push('/products');
    };


    return (


        <div id="wrapper" className=" rounded-md fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center z-[1000]" >
            <div>

                <div className="border-b-[1px] border-black w-full px-0">
                    <div>
                        <p className=" font-bold text-center text-[16px] md:text-lg  py-3 pt-3 md:pt-0" > ARE YOU SURE YOU WANT TO DELETE {pro?.name}  </p>
                    </div>

                </div>

                <div className="flex mx-auto max-h-[500px] text-2xl gap-5 items-center justify-center pt-5 mt-5" >
                    <button className="bg-red-500 p-3 rounded-lg" onClick={() => handleDel(id)} >Yes</button>
                    <button className="bg-green-500 p-3 rounded-lg" onClick={() => router.push('/products')} >No</button>

                </div>

            </div>

        </div>

    )
}

export default page