'use client';
import useSWR from "swr";
import Link from "next/link";
import OrderTable from "@/components/OrderTable";

const page = async () => {
  // SWR function tofetch data
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, mutate, error, isLoading } = useSWR(`/api/orders`, fetcher)
  // console.log(data)
  // const data = await getData();
  return (
    <div className='' >
      <h1 className="my-5 font-extrabold text-4xl text-blue-600" >Orders</h1>
      <OrderTable data={data} />
    </div>
  )
}

export default page 