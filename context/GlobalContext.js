"use client";
import { createContext } from "react";
import { useState } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {

    const [del,setDel] = useState(false);

    const showDel = () => {
        setDel(true)
    }

    const cancelDel = () => {
        setDel(false)
    }

    return (
        <GlobalContext.Provider value={{ del,setDel,showDel,cancelDel }} >
            {children}
        </GlobalContext.Provider>
    );
}