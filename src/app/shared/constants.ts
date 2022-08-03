export abstract class Constants {
    static readonly DELETE_CLIENT: string = 'El cliente se ha eliminado correctamente.';
    static readonly ADD_CLIENT: string = 'El cliente se ha añadido correctamente.';
    static readonly EDIT_CLIENT: string = 'El cliente se ha editado correctamente.';

    static readonly EDIT_SEWING: string = 'La compostura se ha editado correctamente.';
    static readonly ADD_SEWING: string = 'La compostura se ha añadido correctamente.';
    static readonly DELETE_SEWING: string = 'La compostura se ha eliminado correctamente.';

    static readonly ADD_ORDERS: string = 'El pedido se ha añadido correctamente.';
    static readonly DELETE_ORDER: string = 'El pedido se ha eliminado correctamente.';
    static readonly EDIT_ORDER: string = 'El pedido se ha editado correctamente.';

    static readonly DELETE_CUSTOMER_SERVICE: string = '/api/Customers';
    static readonly POST_CUSTOMER_SERVICE: string = '/api/Customers';
    static readonly PUT_CUSTOMER_SERVICE: string = '/api/Customers';
    static readonly GET_CUSTOMER_SERVICE: string = '/api/Customers';

    static readonly DELETE_PRODUCTSERVICE_SERVICE: string = '/api/ProductService';
    static readonly POST_PRODUCTSERVICE_SERVICE: string = '/api/ProductService';
    static readonly PUT_PRODUCTSERVICE_SERVICE: string = '/api/ProductService';
    static readonly GET_PRODUCTSERVICE_SERVICE: string = '/api/ProductService';

    static readonly DELETE_SERVICECUSTOMER_SERVICE: string = '/api/ServiceCustomer';
    static readonly GET_SERVICECUSTOMER_SERVICE: string = '/api/ServiceCustomer';
    static readonly GET_SERVICECUSTOMER_COMPLETE_SERVICE: string = '/api/ServiceCustomer/orders/completed';
    static readonly POST_SERVICECUSTOMER_SERVICE: string = '/api/ServiceCustomer';
    static readonly PUT_SERVICECUSTOMER_SERVICE: string = '/api/ServiceCustomer';
    static readonly PUT_SERVICESCUSTOMER_SERVICE: string = '/api/ServiceCustomer/ServiceCustomer/UpdateOrders';
    static readonly GETBYCUSTOMER_SERVICECUSTOMER_SERVICE: string = '/api/ServiceCustomer/ServiceCustomer';

    static readonly POST_ASSOCIATE_SERVICE: string ='/api/Associate/login';

    static readonly SNACK_SUCCESS: string ='warning';
    static readonly SNACK_ERROR: string ='error';
  }