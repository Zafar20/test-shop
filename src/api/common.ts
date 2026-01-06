import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiInstance from "."
import type { ILogin, IRegister } from "../types"

export const registerUser = () => {
    return useMutation({
        mutationFn: (data:IRegister) => apiInstance.post('auth/register',data),
        onSuccess:(response) => {
            console.log('Ответ', response);
        }
    })
}
export const loginUser = () => {
    return useMutation({
        mutationFn: (data:ILogin) => apiInstance.post('auth/login',data),
        onSuccess:(response) => {
          if(response.data && response.data.access) {
                localStorage.access_token = response.data.access
                localStorage.refresh_token = response.data.refresh
          }
        }
    })
}

export const getUserData = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => apiInstance.get('auth/users/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.access_token}`,
            }
        }),
        select:(response) => response.data
    })
}

interface IProductsParams {
    searchValue: string;
    sortValue: string;
    offset: number;
    limit: number;
}

export const getProducts = ({ searchValue, sortValue, offset, limit }: IProductsParams) => {
    return useQuery({
        queryKey: ['products', searchValue, sortValue, offset],
        queryFn: () => apiInstance.get('products', {
            params: {
                search: searchValue,
                ordering: sortValue,
                offset,
                limit
            }
        }),
        select:(response) => response.data 
    })
}

export const getProductById = (id:number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => apiInstance.get(`products/${id}`),
        select: (response) => response.data 
    })
}

export const updateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ data, id }: any) => apiInstance.put(`auth/users/${id}/update`, data),
        onSuccess:() => {
            queryClient.invalidateQueries(['user'])
        }
    })
}
export const updateUserAvatar = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ data, id }: any) => apiInstance.put(`auth/users/${id}/update/avatar`, data),
        onSuccess:() => {
            queryClient.invalidateQueries(['user'])
        }
    })
}