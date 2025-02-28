

import { useState } from "react";
import {useAuthContext} from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:5000/api/user/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
              "Content-Type": "application/json",
            },
        });
      
        const json = await response.json();
      
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error);
        }
      
        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: "LOGIN", payload: json})

            setIsLoading(false)
            // console.log("sign in successfull", json);
        }
    }
    return {login, isLoading, error}
}