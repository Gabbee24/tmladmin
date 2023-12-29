import ProductTable from "@/components/ProductTable";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

const page = async () => {
  const data = await getData();
  return (
    <div className='' >
      <Link href='/products/new' className='bg-purple-400 p-3 rounded-lg' >Add new product</Link>
      <ProductTable data={data} />
    </div>
  )
}

export default page