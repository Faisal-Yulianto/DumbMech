export interface CartItem {
  productId: string;
  product: {
    productName: string;
    price: number;
    image: string;
    productDesc: string;
  };
  quantity: number;
}
