import { Product } from "../models/product.model";

export interface IProductForm extends Product {
    createUserId: number;
    updateUserId: number;
}