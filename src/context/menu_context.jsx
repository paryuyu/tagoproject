import { createContext, useEffect, useReducer, useState } from "react";

export const MenuContext = createContext();

export function MenuContextProvider({ children }) {

    const [arrSelectOpen, setArrSelectOpen] = useState(false);
    const [depSelectOpen, setDepSelectOpen] = useState(false);
    const [airlineSelectOpen, setAirlineSelectOpen] = useState(false);
    const [recentView, setRecentView] = useState(false);

    const handleArrSelectOpen = () => {
        setArrSelectOpen(c => !c)
    }

    const handleDepSelectOpen = () => {
        setDepSelectOpen(c => !c)
    }

    const handleLineSelectOpen = () => {
        setAirlineSelectOpen(c => !c)
    }

    const handlePageClick = () => {
        if (arrSelectOpen) setArrSelectOpen(false);
        if (depSelectOpen) setDepSelectOpen(false);
        if (airlineSelectOpen) setAirlineSelectOpen(false);
        if (recentView) setRecentView(false);
    }

    const handleRecentView = (val) => {
        setRecentView(c => !c);

    }

    return (
        <MenuContext.Provider value={{
            airlineSelectOpen,
            depSelectOpen,
            arrSelectOpen,
            handleArrSelectOpen,
            handleLineSelectOpen,
            handleDepSelectOpen,
            handlePageClick,
            handleRecentView,
            recentView
        }}>

            {children}
        </MenuContext.Provider>
    )
}
