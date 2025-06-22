import {Product} from "./Products";

export interface CartResponse {
    products: Product[];
    totalPrice: number;
}