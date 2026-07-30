import {useMutation} from "@tanstack/react-query"
import { login } from "#/services/auth"
import { useNavigate } from "@tanstack/react-router"
import { message } from "antd"

export function useLogin(){
    const navigate = useNavigate()
    
    return useMutation({
        mutationFn: login,

        onSuccess: () => {
            message.success("Logged In");
            navigate({
                to: "/app/dashboard"
            })
        }
    })
}