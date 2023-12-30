'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProductForm = ({
    name:existingName,
    description:existingDescription,
    price:existingPrice,
    title
}) => {
    const [newProduct, setNewProduct] = useState({
        name: existingName || '',
        price: existingPrice || '',
        description: existingDescription || '',
    });

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    function handleNewProduct(e) {
        const { name, value } = e.target;
        setNewProduct(prevProduct => (
            {
                ...prevProduct,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { name, price, description } = newProduct;
        const data = { name, price, description };

        try {
            await fetch("/api/products", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            // mutate();
            e.target.reset();
            setLoading(false);
            setNewProduct({
                name: '',
                price: '',
                description: '',
            });
            router.push('/products');
            // setNewPost('')
            // res.status === 201 && router.push('/dashboard/login?success=Account has been created');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h3 >{title}</h3>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 ' >
                <span className='flex flex-col' >
                    <label htmlFor="name">Product Name</label>
                    <input
                        type='text'
                        placeholder='Product Name'
                        name="name"
                        required
                        value={newProduct.name}
                        autoComplete="off"
                        onChange={handleNewProduct}
                    />
                </span>
                <span className='flex flex-col' >
                    <label htmlFor="name">Price (NGN) </label>
                    <input
                        type='number'
                        placeholder='Product Name'
                        name="price"
                        required
                        value={newProduct.price}
                        autoComplete="off"
                        onChange={handleNewProduct}
                    />
                </span>
                <span className='flex flex-col' >
                    <label htmlFor="name">Description</label>
                    <textarea
                        placeholder='Product description'
                        className=' resize-none'
                        required
                        name="description"
                        value={newProduct.description}
                        onChange={handleNewProduct}
                        autoComplete="off"
                    />
                </span>
                <button type='submit' className='flex bg-purple-300 w-fit p-3 rounded-lg' >Submit</button>
            </form>
        </div>
    )
}

export default ProductForm