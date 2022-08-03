export interface ServiceCustomer {
    id: number;
    customerId: number;
    productServiceId: number;
    realPrice: number;
    registrationDate: Date;
    deliveryDate:Date;
    status:number;
    descriptionService:string;
    statusPaid:number;
    productServiceName?:string;
    codeClothing:string;
    nameCustomer?:string;
    associateId:number;
    codeShort:string;
  }