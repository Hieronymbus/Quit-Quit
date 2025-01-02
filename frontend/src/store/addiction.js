import { create } from "zustand";

export const useAddictionStore = create((set) => ({
    addictionsArr: [] ,
    fetchAddictions: async () => {
        const response = await fetch("/api/addictions/");
        const data = await response.json();
        set({addictionsArr: data.data})
    }

}));