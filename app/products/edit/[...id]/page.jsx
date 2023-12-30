import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";

async function getData(id){
  const res = await fetch(`http://localhost:3000/api/products/${id}`,{
  // const res = await fetch('http://localhost:3000/api/products?id='+id,{
    cache:'no-store',
  });
  if(!res.ok){
    return notFound();
  }
  return res.json();
}

export async function generateMetadata({params}){
  const product = await getData(params.id)
  return{
    title:product.name,
    description:product.description,
  };
}

const page = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <ProductForm {...data} title='Edit Product' />
  )
}

export default page