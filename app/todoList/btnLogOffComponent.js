"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function BtnLogOff() {

    const route = useRouter()

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch('https://api-todo-nodejs.onrender.com/todoList', {
                method: 'head',
                credentials: 'include'
            })
            
            console.log(res)
            
            if(res.ok) {
                console.log(res.ok)
                route.push('/')
            } else {
                throw new Error('Erro ao tentar sair.')
            }

        }
    })

    const logOff = () => {
        mutation.mutate()
    }

    return (<>
        <button onClick={logOff}>Sair</button>
    </>)
}