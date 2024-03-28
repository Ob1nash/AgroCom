
export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  }
  
  const products: Product[] = [
    { id: 1, name: "Product 1", price: 19.99, imageUrl: "https://new-image-url.com/1" },
    { id: 2, name: "Product 2", price: 29.99, imageUrl: "https://new-image-url.com/2" },
    { id: 3, name: "Product 3", price: 39.99, imageUrl: "https://new-image-url.com/3" },
    
  ];
  
  export default products;
  