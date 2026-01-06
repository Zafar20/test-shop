import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import './scss/main.scss'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"

const client  = new QueryClient({
    defaultOptions: {}
})

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
        <RouterProvider router={router} />
        <ToastContainer/>
    </QueryClientProvider>
)


