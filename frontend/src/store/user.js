import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: {
        isLoggedIn: false,
        userDetails: {}
    },
    registerUser: async (newUser) => {
        if(!newUser.userName ||!newUser.email || !newUser.password || !newUser.confirmationPassword){
            if(newUser.password != newUser.confirmationPassword){
                return {success: false, message:"password does not match conifrmation password"}
            }
            return { success: false, message: "Please fill in all fields."};
        }
        console.log(newUser)
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newUser)
        })

        const data = await response.json()
        return { success: true, message: "User registered successfully" };
    },
    loginUser: async (loginDetails) => {
        if(!loginDetails.userNameEmail || !loginDetails.password) {
            return {success:false, message:"login details missing"}
        }
        const response = await fetch("/api/users/login", {
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(loginDetails)
        })
        const data = await response.json()

        set({user: {
            isLoggedIn: true,
            userDetails: data.data
        }});

        return { success: true, message: data.message }
    }
}))