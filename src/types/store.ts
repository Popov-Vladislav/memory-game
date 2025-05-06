export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    discount?: number;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface DeliveryOption {
    id: number;
    name: string;
    price: number;
    estimatedDays: string;
  }
  
  export interface OrderDetails {
    items: CartItem[];
    deliveryOption: DeliveryOption | null;
    address: string;
    paymentMethod: string;
    total: number;
  }