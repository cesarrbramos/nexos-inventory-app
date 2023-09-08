import { User } from "./user.model"

export interface Product {
    createdAt: string
    updatedAt: string
    id: number
    name: string
    quantity: number
    entryDate: string
    createUser: User
    updateUser: User
}