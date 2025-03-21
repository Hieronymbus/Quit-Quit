import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: {
        isLoggedIn: false,
        userDetails: {},
        isLoading: true
    },
    registerUser: async (newUser) => {
        if(!newUser.userName ||!newUser.email || !newUser.password || !newUser.confirmationPassword){
            return { success: false, message: "Please fill in all fields."};
        }
        if(newUser.password != newUser.confirmationPassword){
            return {success: false, message:"Password does not match confirrmation password"}
        }
        console.log(newUser)
        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(newUser)
            })
            
            if(!response.ok){
                const errorData = await response.json()
                throw new Error(errorData.message || "Somthing went wrong")
            }
            
            const data = await response.json()
            return { success: true, message: "User registered successfully & logged in" };
            
        } catch (err) {
            return { success: false, message: err.message}
           
            
        }
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
            
            if(data.success){
                set({user: {
                    isLoggedIn: true,
                    userDetails: data.data,
                    isLoading:false
                }});

                return { success: data.success, message: data.message}
            } else {
                return { success: data.success, message: data.message}
            }
        
        
    },
    fetchUser: async () => {
        
        const response = await fetch("/api/users/", {
            credentials: "include"
        });
        const data = await response.json();
        console.log("fetch user", data)
        
        if (data.success) {
            set({
                user:{
                    isLoggedIn: true,
                    userDetails: data.data,
                    isLoading: false
                }
            })
        } else {
            set({
                user:{
                    isLoggedIn: false,
                    userDetails: {},
                    isLoading: false
                }
            })              
        }
    },
    logoutUser: async () => {
        const response = await fetch("/api/users/logout", {
            method:"POST",
            credentials: "include",
            headers:{
                "Content-Type" : "application/json"
            }
        })
        const data = await response.json();
        if(data.success === true){
            return {success: true, message: "logged out"}
        }
        set({ user: {
            isLoggedIn: false,
            userDetails: {},
            isLoading: true
        }})
    },
    deleteUser: async (userID) => {
        const response = await fetch(`/api/users/${userID}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const data = await response.json();
        if(data.success ){
            return {success: true, message: "Account deleted"}
        }
        set({ user: {
            isLoggedIn: false,
            userDetails: {},
            isLoading: true
        }})
    }

}))