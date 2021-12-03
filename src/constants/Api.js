// export const BASE_URL= 'http://172.105.252.58:8080/';         //production
export const BASE_URL= 'http://109.237.25.79:8080/';                     //qa
// export const BASE_URL= 'http://109.74.198.118:8080/';                     //uat
export const SUB_URL='epex/delivery/';
export const LOGIN= BASE_URL + SUB_URL + 'login';
export const DELIVERY_COUNT= BASE_URL + SUB_URL + 'ordersToday/';
export const PICKUP_COUNT= BASE_URL + SUB_URL + 'pickupToday/'; 
export const DELIVERY_ORDERS= BASE_URL + SUB_URL + 'deliveryList/fetch';
export const PICKUP_ORDERS= BASE_URL + SUB_URL + 'pickupOrder/fetch';
export const DELIVERY_OUT= BASE_URL + SUB_URL + 'delivery-agents/';
export const UPDATE_DELIVERY_OUT= BASE_URL + SUB_URL + 'delivery-out/';
export const DELIVERYBOY_VEHICLE= BASE_URL + SUB_URL + 'vehicle';
export const TASK_ASSIGNED= BASE_URL + SUB_URL + 'taskAssigned/';
export const ORDER_TRANSFER= BASE_URL + SUB_URL + 'order/transfer';
export const DELIVERY_OUT_DETAILS= BASE_URL + SUB_URL + 'deliveryOrder/';
export const DELIVERY_ASSIGNED_ACCEPT= BASE_URL + SUB_URL + 'deliveryList/accept';
export const DELIVERY_ASSIGNED_REJECT= BASE_URL + SUB_URL + 'deliveryList/reject';
export const DELIVERY_STATUS_UPDATE= BASE_URL + SUB_URL + 'delivery/status';
export const DELIVERY_ORDER_PAYMENT= BASE_URL + SUB_URL + 'delivery/receiver/payment/cash';
export const DELIVERY_PROOF_UPLOAD= BASE_URL + SUB_URL + 'delivery/';
export const PICKUP_DETAILS= BASE_URL + SUB_URL + 'pickupOrder/';
export const PICKUP_ORDER_UPDATE= BASE_URL + SUB_URL + 'pickup/status';
export const PICKUP_ASSIGNED_ACCEPT= BASE_URL + SUB_URL + 'pickupOrder/accept';
export const PICKUP_ASSIGNED_REJECT= BASE_URL + SUB_URL + 'pickupOrder/reject';
export const AMOUNT_COLLECTED= BASE_URL + SUB_URL + 'amount-collected-today/';
export const VEHICLE_DETAILS= BASE_URL + SUB_URL + 'vehicle/';
export const VEHICLE_REQUEST= BASE_URL + SUB_URL + 'request/vehicleRequest';
export const REQUEST_STATUS= BASE_URL + SUB_URL + 'request/';
// export const BASE_URL_MASTER= 'http://45.79.124.220:6080/';              //production
export const BASE_URL_MASTER= 'http://109.237.25.79:6080/';                   //qa
// export const BASE_URL_MASTER= 'http://109.74.198.118:6080/';                   //uat

export const SUB_URL_MASTER='epex/master/';
export const COUNTRY= BASE_URL_MASTER + SUB_URL_MASTER + 'country';
export const STATE= BASE_URL_MASTER + SUB_URL_MASTER + 'state/country/';
export const DISTRICT= BASE_URL_MASTER + SUB_URL_MASTER + 'district/state/';
export const CITY= BASE_URL_MASTER + SUB_URL_MASTER + 'city/state/';
export const OTP= BASE_URL_MASTER + SUB_URL_MASTER + 'otp/sms';
export const VERIFY_OTP= BASE_URL_MASTER + SUB_URL_MASTER + 'otp/sms/';
export const COST_CHECKLIST= BASE_URL_MASTER + SUB_URL_MASTER + 'cost-checklist';
export const PICKUP_PIN_BY_OFFICEID= BASE_URL_MASTER + SUB_URL_MASTER + 'office/';

// export const BASE_URL_USER= 'http://45.79.124.220:7080/';                   //production
export const BASE_URL_USER= 'http://109.237.25.79:7080/';                      //qa
// export const BASE_URL_USER= 'http://109.74.198.118:7080/';                      //uat

export const SUB_URL_USER='epex/user/';
export const CUSTOMER_DETAILS= BASE_URL_USER + SUB_URL_USER + 'fetch/';
export const BRANCH_CUSTOMER_DETAILS= BASE_URL_USER + SUB_URL_USER + 'branch-users/';
export const ALL_USERS= BASE_URL_USER + SUB_URL_USER + 'all-users';
export const SELF_ASSIGN_ORDERS = BASE_URL + SUB_URL + 'deliveryOrder-selfassign/';
export const SELF_UNASSIGN = BASE_URL + SUB_URL + 'deliveryOrder/selfunassign';
export const SELF_ASSIGN = BASE_URL + SUB_URL + 'deliveryOrder/selfassign';
export const PACKAGE_CATEGORY= BASE_URL_MASTER + SUB_URL_MASTER + 'package-category/active';
export const PACKAGE_SUB_CATEGORY= BASE_URL_MASTER + SUB_URL_MASTER + 'package-category/';
// export const BASE_URL_ORDER= 'http://172.105.252.58:9080/';               //production
export const BASE_URL_ORDER= 'http://109.237.25.79:9080/';                   //qa
// export const BASE_URL_ORDER= 'http://109.74.198.118:9080/';                   //uat

export const SUB_URL_ORDER='epex/order/';
export const SHIPMENT_BOX= BASE_URL_ORDER + SUB_URL_ORDER + 'shipment-box';
export const ORDER= BASE_URL_ORDER + SUB_URL_ORDER + 'order';
export const ROUTES= BASE_URL_MASTER + SUB_URL_MASTER + 'route';
export const OFFICE= BASE_URL_MASTER + SUB_URL_MASTER + 'office';
export const DELIVERY_CHARGE= BASE_URL_ORDER + SUB_URL_ORDER + 'order/delivery-charge/';
export const ADD_COD= BASE_URL_ORDER + SUB_URL_ORDER + 'order/cod';
export const PAYER_PAYMENT= BASE_URL_ORDER + SUB_URL_ORDER + 'order/cod/payer';
export const PAYMENT_BY_CASH= BASE_URL_ORDER + SUB_URL_ORDER + 'order/sender/payment/cash';
export const PRODUCT_BILL_UPLOAD= BASE_URL_ORDER + SUB_URL_ORDER + 'order/';
export const ORDER_TRACKING= BASE_URL_ORDER + SUB_URL_ORDER+ 'order-track/';
export const UPDATE_RECEIVER_NAME= BASE_URL + SUB_URL + 'delivery/receiver';
export const CUSTOMER_TYPE= BASE_URL_MASTER + SUB_URL_MASTER + 'customer-type/active';
export const USER_REGISTRATION= BASE_URL_USER + SUB_URL_USER + 'registration';
export const MOBILE_VALIDATION= BASE_URL_USER + SUB_URL_USER + 'fetch/';
export const ORDER_RECIVER_PAYMENT=BASE_URL_ORDER + SUB_URL_ORDER +'order/receiver/payment/cash';
export const DELIVERYBOY_VIEW_MANUALORDERS= BASE_URL_ORDER + SUB_URL_ORDER +'creatorUserType/DELIVERY_AGENT/creatorId/';
export const ROUTE_FINDER=BASE_URL_MASTER+SUB_URL_MASTER+'office/office/route/destination-point/';
export const PINCODE_SEARCH=BASE_URL_MASTER+SUB_URL_MASTER+'pincode/';
export const PHONE_SEARCH=BASE_URL+SUB_URL+'address/';
export const PREORDER_PIN=BASE_URL_ORDER+SUB_URL_ORDER+'predefined-order/';
export const PREORDER_WITH_PIN=BASE_URL_ORDER+SUB_URL_ORDER+'predefined-order/preOrder/pin';
export const DELIVERY_REPORT=BASE_URL+SUB_URL+'delivery/deliverdItems';
export const DELIVERY_REPORT_CUSTOMER=BASE_URL+SUB_URL+'delivery/delivery-report/deliveryId/';
export const CUSTOMER_PROOF=BASE_URL+SUB_URL+'delivery/customer-proof/';
export const CUSTOMER_SIGN=BASE_URL+SUB_URL+'delivery/customer-signature/';
export const PICKUP_STATUS_CLOSE= BASE_URL + SUB_URL + 'pickup/pickup-statuses';
export const DELIVERY_STATUS_CLOSE= BASE_URL + SUB_URL + 'delivery/delivery-statuses';
export const GET_PICKUP_BY_SCAN= BASE_URL + SUB_URL + 'pickup/orderId/';
export const GET_DELIVERY_BY_SCAN= BASE_URL + SUB_URL + 'delivery/orderId/';
export const PREDEFINED_ID_STATUS= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/assignee/status';
export const UPDATE_PDOID_STATUS= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/';
export const DELIVERY_AGENT_BY_OFFICE_ID= BASE_URL + SUB_URL + 'deliveryBoy/';
export const GET_OFFICE_STAFFS= BASE_URL_MASTER + SUB_URL_MASTER + 'office-staff/';
export const ASSIGN_PDOID= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/range';
export const PDOID_LIST_BY_STATUS= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/assigner/assignment-status';
export const UPDATE_PDOID_PAYMENT_STATUS= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/payment';
export const USED_UNUSED_PDOID= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/preorder/';
export const AVAILABLE_PDOID_DETAILS= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/preorder/';
export const VALIDATE_PDOID= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/assignee';
export const ASSIGN_SINGLE_ORDER= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/single-order';
export const PREORDER_TRACKING= BASE_URL_ORDER + SUB_URL_ORDER + 'preorder-assign/tracking-preorder';
export const UPDATE_DELIVERY_TYPE= BASE_URL_ORDER + SUB_URL_ORDER + 'order/orderId/';
export const PAYMENT_DETAILS= BASE_URL_ORDER + SUB_URL_ORDER + 'orderId/';
export const ADD_PAYMENT_BY_TYPE= BASE_URL_ORDER + SUB_URL_ORDER + 'order/addPayment';
export const ADD_PAYMENT_BY_PAYMENTID= BASE_URL_ORDER + SUB_URL_ORDER + 'payment/update-payment-status';
export const VIEW_PAYMENT_BY_PAYMENTID= BASE_URL_ORDER + SUB_URL_ORDER + 'paymentId/';
export const EDIT_PAYMENT= BASE_URL_ORDER + SUB_URL_ORDER + 'payment';







