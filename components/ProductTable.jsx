'use client'
import Link from "next/link";
import { RiDeleteBin2Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

const ProductTable = ({data}) => {
    const {del, setDel, showDel, cancelDel} = useContext(GlobalContext);

    const router = useRouter();    

    const handleDel = (id) => {

        router.push('/')
    }

    return (
        <table className="basic" >
            <thead>
                <tr>
                    <td>Product Name</td>
                    <td>Price</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {data.map(product => (
                    <tr key={product._id} >
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td className="gap-5 flex" >
                            <Link className="flex text-green-500 " href={'/products/edit/'+product._id} >Edit <CiEdit fontSize='1.5em' /> </Link>
                            <Link className="flex text-red-500" href={'/products/delete/'+product._id} >Delete <RiDeleteBin2Line fontSize='1.5em' /> </Link>
                            {/* <button onClick={showDel} className="flex text-red-500">Delete <RiDeleteBin2Line fontSize='1.5em' /> </button> */}
                        </td>
                        {/* <Modal id={product._id} name={product.name} /> */}
                    </tr>
                ))}
            </tbody>
        </table>)
}

export default ProductTable