export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface Login {
    email:string,
    password:string
}

export interface Product {
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined|number,
    productId:undefined|number
}
export interface Cart {
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number | undefined,
    quantity:undefined|number,
    userId:number,
    productId:number
}

export interface PriceSummary {
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface AddressDetail{
    email:string,
    address:string,
    contact:string,
    totalPrice:number|undefined,
    userId:number|undefined,
    id:number|undefined
}