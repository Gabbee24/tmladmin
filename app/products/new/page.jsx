'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

const page = () => {
  
    return (
        <ProductForm title='Create New Product' />
    )
}

export default page