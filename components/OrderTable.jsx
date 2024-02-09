'use client'
import Link from "next/link";
import { RiDeleteBin2Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

const OrderTable = ({data}) => {
    const {del, setDel, showDel, cancelDel} = useContext(GlobalContext);

    const router = useRouter();    

    const handleDel = (id) => {

        router.push('/')
    }

    return (
        <table className="basic" >
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Paid</td>
                    <td>Recipients details</td>
                    <td>orders</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {data?.map(order => (
                    <tr key={order._id} >
                        {/* <td>{order.createdAt.replace('T', '  ').substring(0, 16)}</td> */}
                        <td> {(new Date(order.createdAt)).toLocaleString()} </td>
                        <td className={order.paid ? 'text-green-500' : 'text-red-500'} >{order.paid ? 'YES' : 'NO'}</td>
                        <td>{order.name}-{order.email}-{order.phone}-{order.address}-{order.city}-{order.state}-{order.code}-{order.country} </td>
                        <td>
                            {
                                order.line_items.map(l => (
                                    <>
                                    {l.price_data?.product_data.name} x 
                                    {l.quantity}
                                    </>
                                ))
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>)
}

export default OrderTable