import { create } from "zustand";

export const useQuitStore = create((set) => ({
    quits: [], 
    setQuits: (quits) => set({ quits }),
    createQuit: async (newQuit) => {
            if(!newQuit.userID 
                || !newQuit.addictionTypeID 
                || !newQuit.startDate
                || !newQuit.endDate 
                || !newQuit.usageParameters || !newQuit.status ) {
                    return { success: false, message: "Please fill in all fields." };
            }
            console.log(newQuit.videoFile)
            const formData = new FormData();
            formData.append("userID", newQuit.userID)
            formData.append("addictionTypeID", newQuit.addictionTypeID)
            formData.append("startDate", newQuit.startDate)
            formData.append("endDate", newQuit.endDate)
            formData.append('usageParameters', JSON.stringify(newQuit.usageParameters));
            formData.append("status", newQuit.status)
            if(newQuit.reasonsToQuit) {
                formData.append("reasonsToQuit", newQuit.reasonsToQuit)
            }
            if(newQuit.videoFile) {
                formData.append("videoFile", newQuit.videoFile)
            }
            try {
                
                const response = await fetch("/api/quits", {
                    method: "POST",
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                const data = await response.json();
                set( (prev) => ({quits:[...prev.quits, data.data ]}));
                

                return {success: true, message:"new quit succesfully started"}
                
            } catch (error) {
                console.error(error)
                return {success: false, message:"new quit failed to started"}
            }
    },
    fetchQuits: async (userID) => {
        const response  = await fetch(`/api/quits/${userID}`);
        const data = await response.json();
        set( {quits: data.data});
    },
    abandonQuit: async (quit) => {
        
        const forPatch = {
            status: "abandoned",
            abandonedDate: new Date()
        }
        console.log(quit._id)
        try {
            
            const response = await fetch(`/api/quits/${quit._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(forPatch)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            const data = await response.json()
            console.log("updatedQuit", data.data)  
        } catch (error) {
            console.error(error)

        }
    },
    deleteSingleQuit:  async (quitID) => {
        console.log(quitID)
        try {
            const response = await fetch(`/api/quits/${quitID}`,{
                method: "DELETE",
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json()
        } catch (error) {
            console.error(error)

        }
    }
}))