export interface ProductProps {
  id: string;
  name: string;
  price: number;
  description?: string;
  imgUrl: string;
  quantity?: number;
}