"use client";
import { useEffect, useState } from "react"
import Spinner from "@/components/Spinner";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from 'react-icons/ri';
import { withSwal } from "react-sweetalert2";

const CategoriesPage = ({ swal }) => {
    //state to hold the category with selected id
    const [cat, setCat] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);

    // fetch category based on id
    // useEffect(() => {
    //     const getData = async () => {
    //         const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
    //             cache: "no-store",
    //         });
    //         if (!res.ok) {
    //             throw new Error("Failed to fetch data");
    //         }
    //         const data = await res.json();

    //         setCat(data);
    //     };
    //     getData();
    // }, [id])

    // state tohold the category name
    const [categoryName, setCategoryName] = useState('');

    //state for parent category
    const [parentCategory, setParentCategory] = useState('');

    //state to hold property
    const [properties, setProperties] = useState([]);

    // state tohold the loading state when the sve button is clicked
    const [isLoadin, setIsLoadin] = useState(false)

    // SWR function tofetch data
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, mutate, error, isLoading } = useSWR(`/api/categories`, fetcher)
    // console.log(data)

    // function for onchange ofinput for category
    function handleNewCatgory(e) {
        setCategoryName(e.target.value);
    }

    // function for onchange ofinput for parent category
    function handleParentCatgory(e) {
        setParentCategory(e.target.value);
    }

    // function to save categories
    async function saveCategory(e) {
        console.log('first section')
        console.log(categoryName)

        e.preventDefault();
        setIsLoadin(true);

        const data = {
            categoryName,
            parentCategory,
            properties: properties.map(p => (
                {
                    name: p.name,
                    values: p.values.split(','),
                }
            )),
        };

        try {
            console.log('enter try block before await fetch section')
            if (editedCategory) {
                data._id = editedCategory._id;
                await fetch("/api/categories", {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...data, _id: editedCategory._id }),
                })
                setEditedCategory(null);
            } else {
                await fetch("/api/categories", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        categoryName,
                        parentCategory: parentCategory || undefined,
                        properties: properties.map(p => ({
                            name: p.name,
                            values: p.values.split(','),
                        })),
                    }),
                });
            }
            console.log('passed the await section')
            setCategoryName('');
            setParentCategory('');
            setIsLoadin(false);
            mutate();
            setProperties([])
        } catch (err) {
            console.log(err);
        }
    }
    // console.log(name);

    // async function saveCategory(e){
    //     e.preventDefault();
    //     setIsLoading(true);
    //     await axios.cate('/api/categories',{categoryName});
    //     setCategoryName('');
    //     setIsLoading(false);
    // }

    //function to edit category
    function editCategory(category) {
        setEditedCategory(category);
        setCategoryName(category.categoryName);
        setParentCategory(category.parentCategory?._id);
        setProperties(
            category.properties.map(({ name, values }) => ({
                name,
                values: values.join(',')
            }))
        );
    }

    //function to delete a category
    function deleteCategory(category) {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delte ${category.categoryName}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: 'red',
            reverseButtons: true,
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`/api/categories/${category._id}`)
            }
        });
        mutate();
    }

    //function to add property to a category
    function addProperty() {
        setProperties(prevCat => {
            return [...prevCat, { name: '', values: '' }];
        });
    };

    //function to handle the name input of a property
    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        })
    }

    //function to handle the values input of a property
    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        })
    }

    // function to remove property
    function removeProperty(indexToRemove) {
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        });
    }
    console.log(properties);
    return (
        <div>
            <h1 className="my-5 font-extrabold text-4xl text-blue-600" >Categories</h1>
            <div>
                <label className="text-blue-600" > {editedCategory ? `Edit Category ${editedCategory.categoryName} ` : 'Create New Category'} </label>
                <form onSubmit={saveCategory} className='flex flex-col gap-1 my-5' >
                    <label htmlFor="categoryName">Category Name</label>
                    <input
                        id="categoryName"
                        type="text"
                        placeholder='Category Name'
                        name="categoryName"
                        onChange={handleNewCatgory}
                        value={categoryName}
                        autoComplete="off"
                        required
                    />
                    <span className="flex flex-col" >
                        <label htmlFor="parentCategory">Select Parent Category</label>
                        <select
                            name="parentCategory"
                            value={parentCategory}
                            onChange={handleParentCatgory}
                            id="parentcategory" >
                            <option value="">No Parent category</option>
                            {data?.map(cate => (
                                <option value={cate._id} key={cate._id} >{cate.categoryName}</option>
                            ))}
                        </select>
                    </span>
                    <span className="flex flex-col my-5" >
                        <label>Properties</label>
                        <button type="button" onClick={addProperty} className="w-fit bg-gray-600 p-2 rounded-lg mb-3 text-white " >Add new property</button>
                        {properties?.map((property, index) => (
                            <div key={index} className="flex gap-1 mb-1" >
                                <input
                                    type="text"
                                    value={property.name}
                                    placeholder="property name (example: color"
                                    onChange={(e) => handlePropertyNameChange(index, property, e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={property.values}
                                    placeholder="values, comma seperated"
                                    onChange={(e) => handlePropertyValuesChange(index, property, e.target.value)}
                                />
                                <button type="button" onClick={() => removeProperty(index)} className="bg-red-600 rounded-lg p-3 text-white " >Remove</button>
                            </div>
                        ))}
                    </span>
                    <div className="flex gap-1" >
                        {
                            editedCategory && (
                                <button
                                    onClick={() => {
                                        setEditedCategory(null);
                                        setCategoryName('');
                                        setParentCategory('');
                                        setProperties([]);
                                    }}
                                    type="button"
                                    className="bg-gray-600 p-2 w-fit rounded-lg text-white"
                                >
                                    Cancel
                                </button>
                            )
                        }
                        <button type="submit" className="bg-blue-600 p-3 rounded-lg text-white w-fit" >{isLoadin ? <Spinner /> : 'Save'}</button>
                    </div>
                </form>
            </div>
            <div>
                {
                    !editedCategory && (
                        <table className="w-full table-auto" >
                            <thead>
                                <tr className="font-bold" >
                                    <td>Category Name</td>
                                    <td>Parent Category</td>
                                    <td></td>
                                </tr>
                            </thead>
                            {isLoading &&
                                // <div className="flex justify-center items-center h-screen " >
                                <Spinner />
                                // </div>
                            }
                            <tbody>
                                {data?.map(cate => (
                                    <tr key={cate._id} >
                                        <td>{cate.categoryName}</td>
                                        <td>{cate?.parentCategory?.categoryName}</td>
                                        <td className="gap-5 flex" >
                                            <button className="flex text-green-500 " onClick={() => editCategory(cate)} >Edit <CiEdit fontSize='1.5em' /> </button>
                                            {/* <Link className="flex text-red-500" href={'/categories/delete/' + cate._id} >Delete <RiDeleteBin2Line fontSize='1.5em' /> </Link> */}
                                            <button className="flex text-red-500" onClick={() => deleteCategory(cate)} >Delete <RiDeleteBin2Line fontSize='1.5em' /> </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>
    )
}

export default withSwal(({ swal }, ref) => (
    <CategoriesPage swal={swal} />
))