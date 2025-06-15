// types/ProductDetailsResponse.ts
import { Product } from "./Products";
import { CommentWithRating } from "./Rating";

export interface ProductDetailsResponse {
  product: Product;
  reviews: CommentWithRating[];
}
