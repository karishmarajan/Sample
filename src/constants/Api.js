export const BASE_URL= 'http://172.105.252.58:8080/';
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
export const BASE_URL_MASTER= 'http://45.79.124.220:6080/';
export const SUB_URL_MASTER='epex/master/';
export const COUNTRY= BASE_URL_MASTER + SUB_URL_MASTER + 'country';
export const STATE= BASE_URL_MASTER + SUB_URL_MASTER + 'state/country/';
export const CITY= BASE_URL_MASTER + SUB_URL_MASTER + 'city/state/';
export const OTP= BASE_URL_MASTER + SUB_URL_MASTER + 'otp';
export const VERIFY_OTP= BASE_URL_MASTER + SUB_URL_MASTER + 'otp/';
export const COST_CHECKLIST= BASE_URL_MASTER + SUB_URL_MASTER + 'cost-checklist';
export const BASE_URL_USER= 'http://45.79.124.220:7080/';
export const SUB_URL_USER='epex/user/';
export const CUSTOMER_DETAILS= BASE_URL_USER + SUB_URL_USER + 'fetch/';
export const BRANCH_CUSTOMER_DETAILS= BASE_URL_USER + SUB_URL_USER + 'branch-users/';
export const SELF_ASSIGN_ORDERS = BASE_URL + SUB_URL + 'deliveryOrder-selfassign/';
export const SELF_UNASSIGN = BASE_URL + SUB_URL + 'deliveryOrder/selfunassign';
export const SELF_ASSIGN = BASE_URL + SUB_URL + 'deliveryOrder/selfassign';
export const PACKAGE_CATEGORY= BASE_URL_MASTER + SUB_URL_MASTER + 'package-category/active';
export const PACKAGE_SUB_CATEGORY= BASE_URL_MASTER + SUB_URL_MASTER + 'package-category/';
export const BASE_URL_ORDER= 'http://172.105.252.58:9080/';
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