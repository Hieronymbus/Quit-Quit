import { create } from "zustand";

export const useQuitStore = create((set) => ({
    quits: [], 
    setQuits: (quits) => set({ quits }),
    createQuit: async (newQuit) => {
            if(newQuit.userID 
                || newQuit.addictionType || newQuit.startDate
                || newQuit.endDate || newQuit.spendingPerWeek 
                || newQuit.sessionsPerWeek || newQuit.status ) {
                    return { success: false, message: "Please fill in all fields." };
            }

            const response = await fetch("/api/quits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newQuit)
            });
            const data = await response.json();
            set( (prev) => ({quits:[...prev.quits, data.data ]}));
    },
    fetchQuits: async (userID) => {
        const response  = await fetch(`/api/quits/${userID}`);
        const data = await response.json();
        set( {quits: data.data});
    }
}))