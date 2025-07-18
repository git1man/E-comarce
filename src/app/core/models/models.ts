export interface IAuth{
    email:string;
    password:string;
}
export interface ILoginResponse{
    message:string;
    token:string;
}
export interface IUser{
    id:string;
    role:string;
    name:string
}
export interface IProduct{
    _id:string;
    name:string;
    price:number;
    desc:string;
    imgURL:string;
    stock:number;
    category:string[]
}
export interface ICart{
    _id:string;
    user:string;
    products:ICartProduct[];
    createdAt:string;
    updatedAt:string;
}
export interface ICartProduct {
  product: {
    _id: string;
    name: string;
    price: number;
    imgURL: string;
    desc?: string;
    stock?: number;
    category?: string[];
  };
  quantity: number;
}
export interface IProductResponse{
    message:string;
    data:IProduct[];
}
export interface IPurchase {
  _id: string;
  user: string;       
  product: string;    
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
export interface IPaginatedProductResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalResult: number;
  result: IProduct[];
}

export interface ICanComponentDeactivate{
    canDeactivate :()=>boolean | Promise<boolean>
}
