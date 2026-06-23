import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error("useFilter는 FilterProvider 내부에서만 사용할 수 있습니다.")
    return context;
}

export const FilterProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState("전체");
    const [searchQuery, setSearchQuery] = useState("");

    const resetFilters = () => {
        setActiveCategory("전체");
        setSearchQuery("")
    };

    return (
        <FilterContext.Provider value={{
            activeCategory, setActiveCategory,
            searchQuery, setSearchQuery,
            resetFilters,
        }}>
            {children}
        </FilterContext.Provider>
    );
}