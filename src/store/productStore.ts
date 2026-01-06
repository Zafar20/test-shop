import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface IProductStore {
    searchValue: string;
    sortValue: string;
    currentPage: number,
    limit: number,
    offset: number,
    setCurrentPage:(val: number) => void,
    setOffset:(val: number) => void,   
    setSearchValue: (val: string) => void;
    setSortValue: (val: string) => void;
}

export const productStore = create<IProductStore>()(devtools((set) => ({
    searchValue: '',
    sortValue: '',
    currentPage: 1,
    limit: 9,
    offset: 0,
    setCurrentPage:(val) => set({ currentPage: val}),
    setOffset:(val) => set({ offset: val}),   
    setSearchValue: (val) => set({ searchValue: val}),
    setSortValue: (val) => set({ sortValue: val}) 
})))