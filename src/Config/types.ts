export interface currentUserType {
  email: string;
  name: string;
  phone: string;
  rememberMe: boolean;
  isLoggedIn: boolean;
}

export interface shopsType {
  ShopId?: number;
  Name: string;
  About: string;
  Address: string;
  Latitude: string;
  Longitude: string;
  Products?: productsType[];
}

export interface productsType {
  ProductId?: number;
  Name: string;
  Description: string;
  Price: number;
  Tags: string;
  Quantity: string;
}