'use client'
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Modal = ({id,name}) => {

    const { del, setDel, showDel, cancelDel } = useContext(GlobalContext);

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') cancelDel();
    }

    const handleDel = async (id) => {
        try{
            await fetch(`/api/products/${id}`,{
                method: "DELETE",
            });
        } catch (err){
            consoe.log(err);
        }
        await cancelDel();
    };


    if (!del) return null;

    console.log(id)

    return (
        // <div id="wrapper" onClick={handleClose} className=" rounded-md fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center z-[1000]" >
        <div id="wrapper" className=" rounded-md fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center z-[1000]" >
            <div className="w-[80%] md:w-[30%] bg-white rounded-md p-5 pb-16">

                <div className="border-b-[1px] border-black w-full px-0">
                    <div>
                        <p className=" font-bold text-center text-[16px] md:text-lg  py-3 pt-3 md:pt-0" > ARE YOU SURE YOU WANT TO DELETE {name} </p>
                    </div>

                </div>

                <div className="flex mx-auto max-h-[500px] text-2xl gap-5 items-center justify-center pt-5 mt-5" >
                   <button className="bg-red-500 p-3 rounded-lg" onclick={() => handleDel(id) } >Yes</button>
                   <button className="bg-green-500 p-3 rounded-lg" onClick={() => {cancelDel()}} >No</button>

                </div>

            </div>

        </div>
    )
}

export default Modal