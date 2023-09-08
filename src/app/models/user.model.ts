import { Role } from "./role.model"

export interface User {
    createdAt: string
    updatedAt: string
    id: number
    firstname: string
    lastname: string
    fullname: string
    age: number
    entryDate: string
    birthDate: string
    role: Role
}