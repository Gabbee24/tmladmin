'use client'
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { PiUploadSimple } from "react-icons/pi";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
    _id,
    name: existingName,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    title
}) => {
    const [newProduct, setNewProduct] = useState({
        name: existingName || '',
        price: existingPrice || '',
        description: existingDescription || '',
    });

    const [images, setImages] = useState(existingImages || []);

    const [loading, setLoading] = useState(false);

    const [isUploading, setIsUploading] = useState(false);

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
        const data = { name, price, description, images };

        try {
            if (_id) {
                await fetch("/api/products", {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...data, _id }),
                })
            } else {

                await fetch("/api/products", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            }
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

    const { del, setDel, showDel, cancelDel } = useContext(GlobalContext);

    // async function uploadImages(e) {
    //     const files = e.target?.files;
    //     if (files?.length > 0) {
    //         const data = new FormData();
    //         for (const file of files) {
    //             data.append('file', file);
    //         }
    //         // files.forEach(file => data.append('file', file));
    //         const res = await fetch('/api/upload', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "multiparty/form-data",
    //             },
    //             body: data,
    //         });

    //         // if (!res.ok) {
    //         //     throw new Error("Failed to fetch data");
    //         // }
    //         // // const links = await res.json();
    //         console.log(res?.data);

    //         // setImages(prevImages => {
    //         //     return [...prevImages, ...res?.data.links]
    //         // });


    //         // useEffect(() => {
    //         //     const getData = async () => {
    //         //         const res = await fetch(`http://localhost:3000/api/upload`, {
    //         //             cache: "no-store",
    //         //         });
    //         //         if (!res.ok) {
    //         //             throw new Error("Failed to fetch data");
    //         //         }
    //         //         const data = await res.json();

    //         //         setImages(prevImages => {
    //         //             return [...prevImages, ...res?.data.links]
    //         //         });
    //         //     };
    //         //     getData();
    //         // }, [])

    //     }
    // }

    async function uploadImages(e) {
        const files = e.target?.files; //added await
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }

            const res = await axios.post("/api/upload", data);
            console.log(res.data);

            setImages(prevImages => {
                return [...prevImages, ...res.data.links] //changes links to link
            });
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    return (
        <div>
            <h3 >{title}</h3>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 ' >
                <span className='flex flex-col' >
                    <label htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        type='text'
                        placeholder='Product Name'
                        name="name"
                        required
                        value={newProduct.name}
                        autoComplete="off"
                        onChange={handleNewProduct}
                    />
                </span>

                <div className='flex flex-col' >
                    <p>Images</p>
                    <div className="flex mb-2 flex-wrap gap-2 " >
                        <ReactSortable
                            list={images}
                            setList={updateImagesOrder} 
                        className="flex flex-wrap gap-1 mb-2"
                        >
                            {
                                !!images?.length && images.map(link => (
                                    <div key={link} className="h-24 w-20 rounded-lg" >
                                        <img src={link} alt="images picture" className="rounded-lg w-fit h-full" />
                                    </div>
                                ))
                            }
                        </ReactSortable>
                        {
                            isUploading && (
                                <div className="h-24 flex items-center" >
                                    <Spinner />
                                </div>
                            )
                        }
                        <label className="w-24 h-24 bg-gray-200 rounded-lg flex flex-col justify-center cursor-pointer items-center text-gray-500 " >
                            <PiUploadSimple />
                            <p>Upload</p>
                            <input
                                type="file"
                                className="hidden"
                                onChange={uploadImages}
                            />
                        </label>
                    </div>
                    {
                        !images?.length && (
                            <p>No image in this product</p>
                        )
                    }
                </div>

                <span className='flex flex-col' >
                    <label htmlFor="price">Price (NGN) </label>
                    <input
                        id="price"
                        type='number'
                        placeholder='Product Price'
                        name="price"
                        required
                        value={newProduct.price}
                        autoComplete="off"
                        onChange={handleNewProduct}
                    />
                </span>
                <span className='flex flex-col' >
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
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