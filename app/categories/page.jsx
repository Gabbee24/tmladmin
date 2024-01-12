"use client";
import { useState } from "react"
import Spinner from "@/components/Spinner";
import axios from "axios";

const page = () => {
    const [categoryName, setCategoryName] = useState('');
    const [isLoading,setIsLoading] = useState(false)

    function handleNewCatgory(e){
        setCategoryName(e.target.value);
    }

    async function saveCategory(e) {
        console.log('first section')
        console.log(categoryName)

        e.preventDefault();
        setIsLoading(true);
        try {
            console.log('enter try block before await fetch section')
            await fetch("/api/categories", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({categoryName}),
            });
            console.log('passed the await section')
            setCategoryName('');
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    // console.log(name);

    // async function saveCategory(e){
    //     e.preventDefault();
    //     setIsLoading(true);
    //     await axios.post('/api/categories',{categoryName});
    //     setCategoryName('');
    //     setIsLoading(false);
    // }

    return (
        <div>
            <h1 className="my-5 font-extrabold text-4xl text-blue-600" >Categories</h1>
            <label> New Category Name </label>
            <form onSubmit={saveCategory} className='flex gap-1' >
                <input
                    type="text"
                    placeholder='Category Name'
                    name="categoryName"
                    onChange={handleNewCatgory}
                    value={categoryName}
                    autoComplete="off"
                    required
                />
                <button type="submit" className="bg-blue-600 p-3 rounded-lg text-white" >{isLoading ? <Spinner/> : 'Save'}</button>
            </form>
        </div>
    )
}

export default page