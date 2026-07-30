import { useMutation } from "@tanstack/react-query";
import { register } from "#/services/auth";
import { message } from "antd";
import { useNavigate } from "@tanstack/react-router";

export function useRegister(){
    const navigate = useNavigate()

    return useMutation({
        mutationFn: register,

        onSuccess: () => {
            message.success("Registered successfully");
            navigate({
                to: "/login"
            })
        }
    })
}