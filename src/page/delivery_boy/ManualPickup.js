import React, { Component } from 'react';
import {CheckBox, ScrollView,Picker,StyleSheet,BackHandler,Modal, AsyncStorage } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Grid,Col,Input,Badge, Row} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomSubButton from '../../component/CustomSubButton';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, COLUMN_PADDING,TEXT_PADDING_RIGHT, CREDIT_FIELD_HEIGHT,FOURTH_FONT,SHORT_BUTTON_HEIGHT,SHORT_BORDER_RADIUS, NORMAL_FONT, THIRD_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import CustomRadioButton from '../../component/CustomRadioButton';
import moment from 'moment';
import RNPrint from 'react-native-print';

import CustomCheckBox from '../../component/CustomCheckBox';
import session, { KEY } from '../../session/SessionManager';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import Api from '../../component/Fetch';
import { COUNTRY , STATE , CITY , OTP , VERIFY_OTP , CUSTOMER_DETALS ,PACKAGE_CATEGORY, PACKAGE_SUB_CATEGORY ,SHIPMENT_BOX, ORDER, ROUTES, DELIVERY_CHARGE, ADD_COD ,PAYER_PAYMENT, PAYMENT_BY_CASH, PINCODE_SEARCH, PHONE_SEARCH} from '../../constants/Api';



export default class ManualPickup extends React.Component {

  state = {

    loader:false,

    customer_id:'',
    customer_name : '',
    customer_no : '',
    customer_email : '',
    customer_country : '',
    customer_pincode : '',
    customer_localbody : '',
    customer_gmap : '',
    customer_address1 : '',
    customer_address2 : '',
    customer_state : '',
    customer_district : '',
    customer_city : '',
    customer_landmark : '',
    customer_countrycode : '',

    same_selected:false,
    new_selected:true,

    sender_id:'',
    sender_name:'',
    sender_no:'',
    sender_email:'',
    sender_country:'',
    sender_countrycode:'',
    sender_pincode:'',
    sender_localbody:'',
    sender_gmap:'',
    sender_address1:'',
    sender_address2:'',
    sender_state:'',
    sender_district:'',
    sender_city:'',
    sender_landmark:'',

    sender_contact_person_name:'',
    sender_contact_person_no:'',
    pickupdate:'',
    pickuptime:'',

    countries_sender:[],
    states_sender:[],
    cities_sender:[],
    countries_reciever:[],
    states_reciever:[],
    city_reciever:[],

    rec_city:'',
    rec_country_code:'',
    rec_country:'',
    rec_state:'',
    rec_landmark:'',
    rec_district:'',
    rec_pincode:'',
    rec_gmap:'',
    rec_localbody:'',
    rec_address1:'',
    rec_address2:'',

    rec_id_or_no:'',
    recievername:'',
    recieverno:'',
    proof:'',
    deliveredto:'',
    rec_notes:'',
    sameoffice_selected:true,
    difoffice_selected:false,
    office_id:'',

    order_id:'',

    
    
   
    package_categories:[],
   
   
    sender_details:[],
    package_category_list:[],
    package_sub_category_list:[],
    route_list:[],
    office_list:[],
    
    route_id:'',
    code_otp:'',
    phone_otp:'',
    verify_otp:'',
   
   
    
    

    package_subcategories:[],
    Shipment_weight:'',
    Shipment_height:'',
    Shipment_length:'',
    Shipment_width:'',
    Shipment_distance:'',
    Shipment_category_id:'',
    Shipment_subcategory_id:'',
    shipment_view:true,
    
   
    hour:'',
    minute:'',
    second:'',
    cod_credit_blnc:'',
    invoice_des:'',
    product_cost:'',
    gst_no:'',
    final_cod_charge:'',
    min_delivery_charge:'',
    package_applied:'',
    credit_available:'',
    delivery_charge:'',
    deliveryChargePaymentBySender:true,
    sender_selected:true,
    reciever_selected:false,
    payment_location:'',
    payment_phone:'',
    payment_comment:'',
    sender_payment:'',
    receiver_payment:'',
    payment_name:'',
    amount_recieved:'',
    balance_amount:'',
    selectedPrinter: null,
    checked:false,
    picode_search:'',
    sender_country_new:'',
    sender_state_new:'',
    sender_city_new:'',
    sender_district_new:'',
    pincode_new:'',
    sender_country_new_WP:'',
    sender_state_new_WP:'',
    sender_district_new_WP:'',
    pincode_new_wp:'',
    selected_radio1:true,
    selected_radio2:false,
    phone_view:false,
    phone_search:'',
    country_code:'',
  };

  componentDidMount() {
    this.fetch_country_list_sender()
    this.fetch_country_list_reciever()
    this.fetch_package_category_list()
    this.fetch_package_subcategory_list()
    this.date_time_setting_function()
    this.fetch_route_list_reciever()
  }

isSelected(no){
  if(no == 1){
    this.setState({sender_selected:true})
    this.setState({reciever_selected:false})
    this.setState({deliveryChargePaymentBySender:true})

  }
  if(no == 2){
    this.setState({reciever_selected:true})
    this.setState({sender_selected:false})
    this.setState({deliveryChargePaymentBySender:false})
  }
if(no == 3){
  this.setState({same_selected:true})
  this.setState({new_selected:false})

  this.setState({sender_id:this.state.customer_id});
  this.setState({sender_name:this.state.customer_name});
  this.setState({sender_no:this.state.customer_no});
  this.setState({sender_address1:this.state.customer_address1});
  this.setState({sender_address2:this.state.customer_address2});
  this.setState({sender_email:this.state.customer_email});
  this.setState({sender_countrycode:this.state.customer_countrycode});
  this.setState({sender_country:this.state.customer_country});
  this.setState({sender_state:this.state.customer_state});
  this.setState({sender_district:this.state.customer_district});
  this.setState({sender_city:this.state.customer_city});
  this.setState({sender_localbody:this.state.customer_localbody});
  this.setState({sender_landmark:this.state.customer_landmark});
  this.setState({sender_gmap:this.state.customer_gmap});
  this.setState({sender_pincode:this.state.customer_pincode});

}
if(no == 4){
  this.setState({new_selected:true})
  this.setState({same_selected:false})
  
}
if(no == 5){
  this.setState({sameoffice_selected:true})
  this.setState({difoffice_selected:false})
  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);
  this.setState({office_id:data.officeId});
  }
   ));
}
if(no == 6){
  this.setState({difoffice_selected:true})
  this.setState({sameoffice_selected:false})
  this.setState({deliveryChargePaymentBySender:false})
}
if(no == 7){
  this.setState({selected_radio1:true})
  this.setState({selected_radio2:false})
  this.setState({phone_view:false})
  this.setState({rec_country:'',
    rec_state:'',
    rec_city:'',
    rec_district:'',
    rec_pincode:'',
    rec_gmap:'',
    rec_address1:'',
    rec_address2:'',
    rec_localbody:'',
    rec_landmark:'',
  
  })

}
if(no == 8){
  this.setState({selected_radio2:true})
  this.setState({selected_radio1:false})
  this.setState({phone_view:true})
}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

silentPrint = async () => {
  if (!this.state.selectedPrinter) {
    alert('Must Select Printer First')
  }

  const jobName = await RNPrint.print({
    printerURL: this.state.selectedPrinter.url,
    html: '<h1>Silent Print</h1>'
  })

}

////////////////////////////////// Date time setting function //////////////////////////////////////////////////////////////////////////////////
  date_time_setting_function(){

    var time = moment().utcOffset('+05:30').format(' hh:mm:ss a');
    this.setState({pickuptime:time});

    var time1 = moment().format('hh:mm A');
    this.setState({pickuptime:time1});

    var date= moment().format('DD-MM-YYYY')
    this.setState({pickupdate:date});
    
    var h=moment().hour();
    this.setState({hour:h});

    var m=moment().minute();
    this.setState({minute:m});

    var s=moment().second();
    this.setState({second:s});

    // var n=moment.locale('en')
    // alert(n)
    
  }


////////////////////////////// Fetching customer details with id function //////////////////////////////////////////////////////////////////////////////
  verify_customer_id(customer_id) {

    this.setState({loader:true});
    setTimeout(()=>{this.setState({loader:false})},1000);

    Api.fetch_request(CUSTOMER_DETALS + customer_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({sender_details : result.payload})

        this.setState({customer_name : result.payload.firstName +" "+ result.payload.lastName})
        this.setState({customer_no : result.payload.mobileNumber})
        this.setState({customer_email : result.payload.emailId})
        this.setState({customer_country : result.payload.country})
        this.setState({customer_pincode : result.payload.pincode})
        this.setState({customer_localbody : result.payload.localBodyType})
        this.setState({customer_gmap : result.payload.gmapLink})
        this.setState({customer_address1 : result.payload.addressLine1})
        this.setState({customer_address2 : result.payload.addressLine2})
        this.setState({customer_state : result.payload.state})
        this.setState({customer_district : result.payload.district})
        this.setState({customer_city : result.payload.city})
        this.setState({customer_landmark : result.payload.landMark})
        this.setState({customer_countrycode : result.payload.countryCode})

      }
      else{
        console.log('Failed');
      }
  })
   
  }

  //////////////////////////////// Fetching sender country function //////////////////////////////////////////////////////////////////////////////

  fetch_country_list_sender() {

    Api.fetch_request(COUNTRY,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));

        var count = (result.payload).length;
        let countries = [];

        for(var i = 0; i < count; i++){
         countries.push({ value: result.payload[i].countryName , id: result.payload[i].countryId ,  code: result.payload[i].countryCode  });
       }
       this.setState({ countries_sender: countries });
      }
      else{
        console.log('Failed');
      }
  })
   
  }
//////////////////////////////// Fetching sender state function //////////////////////////////////////////////////////////////////////////////

fetch_state_list_sender(country_id) {

    Api.fetch_request(STATE + country_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));

        var count = (result.payload).length;
        let states = [];

        for(var i = 0; i < count; i++){
          states.push({ value: result.payload[i].stateName ,  id: result.payload[i].stateId});
       }
       this.setState({states_sender: states });
      }
      else{
        console.log('Failed');
      }
  })
   
  }
//////////////////////////////// Fetching sender city function //////////////////////////////////////////////////////////////////////////////
 
fetch_city_list_sender(state_id) {

    Api.fetch_request(CITY + state_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));


        var count = (result.payload).length;
        let city = [];

        for(var i = 0; i < count; i++){
          city.push({ value: result.payload[i].cityName });
       }
       this.setState({ cities_sender : city });
      }
      else{
        console.log('Failed');
      }
  })
   
  }

//////////////////////////////// Fetching reciever country function //////////////////////////////////////////////////////////////////////////////
 
fetch_country_list_reciever() {

    Api.fetch_request(COUNTRY,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));

        var count = (result.payload).length;
        let countries_reciever = [];

        for(var i = 0; i < count; i++){
         countries_reciever.push({ value: result.payload[i].countryName , id: result.payload[i].countryId ,  code: result.payload[i].countryCode  });
       }
       this.setState({ countries_reciever });
      }
      else{
        console.log('Failed');
      }
  })
   
  }

//////////////////////////////// Fetching reciever state function //////////////////////////////////////////////////////////////////////////////
 
fetch_state_list_reciever(country_id) {

  this.setState({rec_country_code:country_id})
    Api.fetch_request(STATE + country_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));

        var count = (result.payload).length;
        let states_reciever = [];

        for(var i = 0; i < count; i++){
          states_reciever.push({ value: result.payload[i].stateName ,  id: result.payload[i].stateId});
       }
       this.setState({ states_reciever });
      }
      else{
        console.log('Failed');
      }
  })
   
  }

//////////////////////////////// Fetching reciever city function //////////////////////////////////////////////////////////////////////////////
 
fetch_city_list_reciever(state_id) {

    Api.fetch_request(CITY + state_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));

        var count = (result.payload).length;
        let city_reciever = [];

        for(var i = 0; i < count; i++){
          city_reciever.push({ value: result.payload[i].cityName });
       }
       this.setState({ city_reciever });
      }
      else{
        console.log('Failed');
      }
  })
   
  }


  //////////////////////////////// Fetching sender route function //////////////////////////////////////////////////////////////////////////////
 
fetch_route_list_reciever() {

  Api.fetch_request(ROUTES ,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      var count = (result.payload).length;
      let route_list = [];

      for(var i = 0; i < count; i++){
        route_list.push({ value: result.payload[i].routeName , id: result.payload[i].routeId });
     }
     this.setState({ route_list });
    }
    else{
      console.log('Failed');
    }
})
 
}

//////////////////////////////// Fetching reciever office function //////////////////////////////////////////////////////////////////////////////
 
fetch_office_list_reciever() {

  Api.fetch_request(OFFICE ,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));
      // this.setState({city_list : result.payload})

      var count = (result.payload).length;
      let office_list = [];

      for(var i = 0; i < count; i++){
        office_list.push({ value: result.payload[i].officeId , id: result.payload[i].officeId });
     }
     this.setState({ office_list });
    }
    else{
      console.log('Failed');
    }
})
 
}
///////////////////////////////// Sending OTP function /////////////////////////////////////////////////////////////////////////////////////
 
send_otp(){
    let body={
      "countryCode": this.state.code_otp ,
      "mobileNumber": this.state.phone_otp ,
  
  };
    

    Api.fetch_request(OTP,'POST','',JSON.stringify(body))
    .then(result => {
     
      if(result.error != true){
      console.log('Success:', JSON.stringify(result))
      }
      else{
        console.log('Failed');
        alert(" Failed !")
      }
    })
  }

///////////////////////////////// Verifying OTP function /////////////////////////////////////////////////////////////////////////////////////
  verify_otp(otp) {

    Api.fetch_request(VERIFY_OTP + otp,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        alert(result.message)
      }
      else{
        console.log('Failed');
        alert(result.message)
      }
  })
   
  }

  //////////////////////////////////// fetching package category function /////////////////////////////////////////////////////////////////////////////////

  fetch_package_category_list() {

    Api.fetch_request(PACKAGE_CATEGORY,'GET','')
    .then(result => {
      if(result.error != true){
        console.log('Success:', JSON.stringify(result))
        var count = (result.payload).length;
        let package_categories = [];

        for(var i = 0; i < count; i++){
          package_categories.push({ value: result.payload[i].pkgCategoryName , id: result.payload[i].pkgCategoryId , });
       }
       this.setState({ package_categories });
      }
      else{
        console.log('Failed');
      }
  })
  }
////////////////////////////////////////////////pin search//////////////////////////////////////////////////////////

pin_search(pin_search){

Api.fetch_request(PINCODE_SEARCH+pin_search,'GET','')
.then(result=>{
if (result.error != true)
{
  console.log('PINSEARCH SUCCESS:', JSON.stringify(result))
  this.setState({sender_country_new:result.payload.country})
  this.setState({sender_state_new:result.payload.state})
  this.setState({sender_district_new:result.payload.district})
  this.setState({pincode_new:result.payload.pincode})
  console.log(this.state.sender_state_new,this.state.sender_state_new,this.state.sender_district_new)
}
else {
  console.log('Failed');
  alert(result.message)
}


})





}
//////////////////////////////////Phone number search//////////////////////////////////////////////////////////
phonenumber_search(country_code,phone_search){
  Api.fetch_request(PHONE_SEARCH+country_code+'/'+phone_search,'GET','')
  .then(result=>{

    if(result.error != true)
    {
      console.log('Success:', JSON.stringify(result))
      console.log('kkkkkkkkkkkkkkkk',PHONE_SEARCH+country_code+phone_search)
      
          this.setState({rec_country:result.payload.country,
            rec_state:result.payload.state,
            rec_city:result.payload.city,
            rec_district:result.payload.district,
            rec_pincode:result.payload.pincode,
            rec_gmap:result.payload.gmapLink,
            rec_address1:result.payload.addressLine1,
            rec_address2:result.payload.addressLine2,
            rec_localbody:result.payload.localBodyType,
            rec_landmark:result.payload.mobileNumber,
          
          })



    }
  })

}



  //////////////////////////////////// fetching package sub category function /////////////////////////////////////////////////////////////////////////////////

  fetch_package_subcategory_list() {

    Api.fetch_request(PACKAGE_SUB_CATEGORY,'GET','')
    .then(result => {
      if(result.error != true){
        console.log('Success:', JSON.stringify(result))

        var count = (result.payload).length;
        let package_subcategories = [];

        for(var i = 0; i < count; i++){
          package_subcategories.push({ value: result.payload[i].pkgSubCategoryName , id: result.payload[i].pkgSubCategoryId , });
       }
       this.setState({ package_subcategories });
      }
      else{
        console.log('Failed');
      }
  })
  }

   ///////////////////////////////// Creating Order function //////////////////////////////////////////////////////////////////////////////////////// 
 
create_order() {
 
if(this.state.same_selected==true){

  this.setState({sender_country_new_WP:this.state.sender_country,sender_state_new_WP:this.state.sender_state,sender_district_new_WP:this.state.sender_district,
  
    pincode_new_wp:this.state.sender_pincode })
}
else{

  this.setState({sender_country_new_WP:this.state.sender_country_new,sender_state_new_WP:this.state. sender_state_new,sender_district_new_WP:this.state.sender_district_new,
    pincode_new_wp:this.state.picode_search 
  })

}



  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = 
    {
      "creatorId": data.personId,
      "creatorUserType": "DELIVERY_AGENT",
      "customerId": this.state.customer_id,
      "deliveryRequest": {
        "addressLine1": this.state.rec_address1,
        "addressLine2": this.state.rec_address2,
        "canBeDeliveredTo":this.state.deliveredto,
        "city": this.state.rec_city,
        "contactPersonCountryCode": this.state.rec_country_code,
        "contactPersonCustomerId": this.state.rec_id_or_no,
        "contactPersonName": this.state.recievername,
        "contactPersonNumber": this.state.recieverno,
        "country": this.state.rec_country,
        "customerId": this.state.rec_id_or_no,
        "deliveryId": 0,
        "deliveryType": "BULLET",
        "destinationOfficeId": 119,
        "district": this.state.rec_district,
        "gmapLink": this.state.rec_gmap,
        "isSameAsOffice": true,
        "localBodyType": this.state.rec_localbody,
        "notesToCourierBoy": this.state.rec_notes,
        "officeId": this.state.officeId,
        "orderId": 0,
        "pincode": this.state.rec_pincode,
        "proofToBeProduced": this.state.proof,
        "routeId": 0,
        "state": this.state.rec_state
      },
      "deliveryType": "BULLET",
      "isManualPickup": true,
      "officeId": this.state.officeId,
      "orderId": 0,
      "pickupRequest": {
        "addressLine1": this.state.sender_address1,
        "addressLine2": this.state.sender_address2,
        "city": this.state.sender_city,
        "contactPersonCountryCode": this.state.sender_countrycode,
        "contactPersonName": this.state.sender_contact_person_name,
        "contactPersonNumber": this.state.sender_contact_person_no,
        "country": this.state.sender_country_new_WP,
        "customerId": this.state.customer_id,
        "deliveryType": "BULLET",
        "district": this.state.sender_district_new_WP,
        "gmapLink": this.state.sender_gmap,
        "localBodyType": this.state.sender_localbody,
        "notesToCourierBoy": this.state.sender_notes,
        "officeId": data.officeId,
        "orderId": 0,
        "pickupDate": this.state.pickupdate,
        "pickupId": 0,
        "pickupTime":this.state.pickuptime,
        "pincode": this.state.pincode_new_wp,
        "routeId": this.state.route_id,
        "state": this.state.sender_state_new_WP,
      }
    }
    console.log('BODYYYYYYYYYYY',body);
    Api.fetch_request(ORDER, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          alert(result.message)
          this.setState({orderId:result.payload.orderId});
          alert(this.state.order_id)

        }
        else {
          console.log('Failed');
          alert(result.message)
        }
      })
  }));
}

  ///////////////////////////////// Creating shipment box function //////////////////////////////////////////////////////////////////////////////////////// 
 
create_shipment_box() {
 
  this.setState({shipment_view:false})

  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = {
      "approxDistance": this.state.Shipment_distance,
      "height": this.state.Shipment_height,
      "isApprox": true,
      "length": this.state.Shipment_length,
      "orderId": 20,
      "shipmentBoxId": 0,
      "shipmentCategoryId": this.state.Shipment_category_id,
      "shipmentSubCategoryId": this.state.Shipment_subcategory_id,
      "weight": this.state.Shipment_weight,
      "width": this.state.Shipment_width

    };

    Api.fetch_request(SHIPMENT_BOX, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          alert("Shipment Added")
          this.submitAndClear();

        }
        else {
          console.log('Failed');
          alert(result.message)
          this.submitAndClear();
        }
      })
  }));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

submitAndClear (){
  this.setState({Shipment_distance:""})
  this.setState({Shipment_weight:""})
  this.setState({Shipment_length:""})
  this.setState({Shipment_width:""})
  this.setState({Shipment_height:""})
}

 ///////////////////////////////// Add shipment box function //////////////////////////////////////////////////////////////////////////////////////// 
 
 add_shipment_box() {
 
  this.setState({shipment_view:true})
  
}

////////////////////////////// Fetching delivery charge details function //////////////////////////////////////////////////////////////////////////////

generate_invoice() {

  Api.fetch_request(DELIVERY_CHARGE + 20 ,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      this.setState({min_delivery_charge : JSON.stringify( result.payload.originalDeliveryCharge) })
      this.setState({package_applied : JSON.stringify(result.payload.deliveryChargePackageDeduction)})
      this.setState({credit_available :JSON.stringify( result.payload.deliveryChargeCreditDeduction )})
      this.setState({delivery_charge : JSON.stringify(result.payload.deliveryChargeAfterDeductions )})

    }
    else{
      console.log('Failed');
    }
})
 
}

 ///////////////////////////////// Add COD details function //////////////////////////////////////////////////////////////////////////////////////// 
 
 generate_cod() {
 

    let body = {
      "codCreditBalance": this.state.cod_credit_blnc,
      "invoiceDescription": this.state.invoice_des,
      "orderId": 20,
      "productCost": this.state.product_cost,
      "receiverGSTNumber": this.state.gst_no

    };

    Api.fetch_request(ADD_COD, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

         this.setState({final_cod_charge:result.payload.finalCodCharge})
          console.log('Success:', JSON.stringify(result));
          alert(result.message)

        }
        else {
          console.log('Failed');
          alert(result.message)
        }
      })

}

///////////////////////////////////////// Payer payment function  //////////////////////////////////////////////////////////////////////////////////

payer_payment() {

    let body = {
      "deliveryChargePaymentBySender": this.state.deliveryChargePaymentBySender,
      "orderId": 1,
      "payerComment": this.state.payment_comment,
      "payerContactNumber": this.state.payment_phone,
     "payerCountryCode": 91,
     "payerLocation": this.state.payment_location,
     "payerName": this.state.payment_name

    };

    Api.fetch_request(PAYER_PAYMENT, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          alert(result.message)

          this.setState({sender_payment:result.payload.payableBySender})
          this.setState({receiver_payment:result.payload.payableByReceiver})

        }
        else {
          console.log('Failed');
          alert(result.message)
        }
      })
}

///////////////////////////////////////// Payment by cash function  //////////////////////////////////////////////////////////////////////////////////

cash_payment() {

  let body = {
    "amountPayed": this.state.amount_recieved,
    "orderId": 1,

  };

  Api.fetch_request(PAYMENT_BY_CASH, 'POST', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        alert(result.message)

      }
      else {
        console.log('Failed');
        alert(result.message)
      }
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

render(){
    var left = (
        <Left style={{ flex: 1 }}>
          <Button onPress={() => Actions.pop()} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='md-arrow-round-back' />
            </Button>
        </Left>
      );

      var right = (
        <Right style={{ flex: 1 }}>
          <Button onPress={this.silentPrint} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='md-pint' />
            </Button>
        </Right>
      );
     
    return(
  
        <Container>

{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} right={right}  title="Manual Pickup" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

 

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>


{/* /////////////////////////// Sender Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING}}>

  {/*/////////////////////////////////////////// Acivity indicator Block //////////////////////////////////////////////// */}

 { this.state.loader === true && (<View style={{justifyContent:'center'}}>
        <CustomActivityIndicator/>
        </View>)}

<View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Sender Details'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
        <CustomText text={'Customer Id'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({customer_id: text})} value={this.state.customer_id} keyboardType={'number-pad'}  />
        <CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.verify_customer_id(this.state.customer_id)}/>
        </View>
        <CustomText text={'Full Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_name} />
        <CustomText text={'Mobile Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_no} />
        <CustomText text={'Email Id'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_email} />
        <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_country} />
        <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_pincode} />
        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_localbody} />
        <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black}fontWeight={'bold'} />
        <CustomInput flex={1} value={this.state.customer_gmap} />
        <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_address1} />
        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_address2} />
        <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'} />
        <CustomInput flex={1} value={this.state.customer_state} />
        <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_district} />
        <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_city} />
        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_landmark} />

</View>

{/* /////////////////////////// Sender Address //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>

<View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Sender Address'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>

        
         <CustomRadioButton title={'Same as contact address'} selectedColor={Colors.darkSkyBlue} selected={this.state.same_selected} onPress={()=>this.isSelected(3)}/>
         <CustomRadioButton title={'Enter new pickup address'} selectedColor={Colors.darkSkyBlue} selected={this.state.new_selected} onPress={()=>this.isSelected(4)}/>
         <View style={{marginLeft:4,flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}} >
         <CheckBox
         tintColors={{ true: '#185DD7' }}
      value={this.state.checked}
      onValueChange={() => this.setState({ checked: !this.state.checked })}
    />
     <Text style={{fontSize:14,marginTop:5}}>Continue with search by Pincode?</Text>
     
         </View>

       {this.state.checked ?
        ( <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({picode_search: text})} value={this.state.picode_search} keyboardType={'number-pad'}  />
        <CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.pin_search(this.state.picode_search)}/>
        </View>)  : undefined}
 
 { this.state.same_selected === true && (<View>

        <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_country} />
        <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_state} />
        <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_district} />
        <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_city} />
        <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_pincode} />
        <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_address1} />
        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_address2} />
        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_localbody} />
        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_landmark} />
        <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_gmap} />
       
        </View>)}

 { this.state.new_selected === true && (<View>

  <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomDropdown data={this.state.countries_sender} value={this.state.sender_country_new} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_state_list_sender(data[index]['id']) ; this.setState({sender_country_new:value}) ; this.setState({sender_countrycode:data[index]['code']}); }, 500); }} />

          <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomDropdown data={this.state.states_sender}  value={this.state.sender_state_new} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_city_list_sender(data[index]['id']) ; this.setState({sender_state_new:value}) }, 500); }} />
          <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>


              {this.state.checked?(<View>
                <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_city: text})} value={this.state.sender_city} />

          </View>):
          (<View>
                      <CustomDropdown data={this.state.cities_sender}  height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({sender_city:value}) }, 500); }} />

          </View>)}

          <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} value={this.state.sender_district_new} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_district_new: text})} value={this.state.sender_district_new} />

          <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({pincode_new: text})} value={this.state.pincode_new} />

          <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_gmap: text})} value={this.state.sender_gmap} />
         
          <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_address1: text})} value={this.state.sender_address1} />

        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_address2: text})} value={this.state.sender_address2} />

        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_localbody: text})} value={this.state.sender_localbody} />

        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_landmark: text})} value={this.state.sender_landmark} />

</View>)}



        <CustomText text={'Route'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <CustomDropdown data={this.state.route_list} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({route_id:data[index]['id']}) }, 500); }}/>

</View>
{/* /////////////////////////// Pickup Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>

<View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Pickup Details'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Contact Person Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({sender_contact_person_name: text})} value={this.state.sender_contact_person_name}/>
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Contact Person Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput keyboardType={"phone-pad"} borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({sender_contact_person_no: text})} value={this.state.sender_contact_person_no}/>
        <CustomText text={'Notes to Courier Boy'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({sender_notes: text})} value={this.state.sender_notes}/>
        <CustomText text={'Pickup Date'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        {/* <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({sender_notes: text})} value={this.state.sender_notes}/> */}
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({pickupdate: text})} value={this.state.pickupdate}/>
        <CustomText text={'Pickup Time'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({pickuptime: text})} value={this.state.pickuptime}/>
       

</View>

{/*/////////////////////////// Delivery Address //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Address'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
    
          <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Local'} selectedColor={Colors.darkSkyBlue} selected={this.state.selected_radio1}onPress ={()=>this.isSelected(7) }/>
         <CustomRadioButton title={'Global'} selectedColor={Colors.darkSkyBlue} selected={false}/>

         </View>
         <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Search by contact number'} selectedColor={Colors.darkSkyBlue} selected={this.state.selected_radio2} onPress ={()=>this.isSelected(8) }/>
           
         </View>
         {this.state.phone_view ?
        ( 
          <View>
                      <CustomText text={'Country code'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>

                <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({country_code: text})} value={this.state.country_code}  />
        </View>
        <CustomText text={'Phone number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>

        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({phone_search: text})} value={this.state.phone_search} keyboardType={'number-pad'}  />
        <CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.phonenumber_search(this.state.country_code,this.state.phone_search)}/>
        </View>
        
        </View>
        )  : undefined}

          <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomDropdown data={this.state.countries_reciever} height={TEXT_FIELD_HIEGHT} value={this.state.rec_country} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_state_list_reciever(data[index]['id']) ; this.setState({rec_country:value}); this.setState({rec_country_code:data[index]['code']}); }, 500); }} />

          <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomDropdown data={this.state.states_reciever} height={TEXT_FIELD_HIEGHT} value={this.state.rec_state} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_city_list_reciever(data[index]['id']) ; this.setState({rec_state:value}) }, 500); }} />

          <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomDropdown data={this.state.city_reciever} height={TEXT_FIELD_HIEGHT} value={this.state.rec_city} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({rec_city:value}) }, 500); }} />
 
          <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_district: text})} value={this.state.rec_district} />

         <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_pincode: text})} value={this.state.rec_pincode} />

          <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_gmap: text})} value={this.state.rec_gmap} />
         
          <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_address1: text})} value={this.state.rec_address1} />

        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_address2: text})} value={this.state.rec_address2} />

        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_localbody: text})} value={this.state.rec_localbody} />

        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_landmark: text})} value={this.state.rec_landmark} />
          
        
         
</View>

{/*///////////////////////////////////////////////////////////////////////// Delivery Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Details '} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>

        <CustomText text={'Enter the receiving person customer id or registered mobile number.'} textType={Strings.subtext} color={Colors.grayTextColor}/>
    
        <CustomText text={'Customer Id / Mobile Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} keyboardType={"phone-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_id_or_no: text})} value={this.state.rec_id_or_no} />
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Reciever Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recievername: text})} value={this.state.recievername} />
          <View style={{flexDirection:'row'}}>
          <CustomText text={'Receiver Phone Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>

          <CustomInput flex={1} keyboardType={"phone-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recieverno: text})} value={this.state.recieverno} />

          <CustomText text={'Proof to be produced'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({proof: text})} value={this.state.proof} />

          <CustomText text={'Can be delivered to'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({deliveredto: text})} value={this.state.deliveredto} />

          <CustomText text={'Notes to Courier Boy'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_notes: text})} value={this.state.rec_notes} />

          <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Same office'} selectedColor={Colors.darkSkyBlue} selected={this.state.sameoffice_selected} onPress={()=>this.isSelected(5)}/>
         <CustomRadioButton title={'Different'} selectedColor={Colors.darkSkyBlue} selected={this.state.difoffice_selected} onPress={()=>this.isSelected(6)}/>
         </View>

</View>

<CustomButton title={'Continue'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.create_order()} />

{/*/////////////////////////// Shipment Box Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Shipment Box Details'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>

        <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Approx. Values'} selectedColor={Colors.darkSkyBlue} selected={true}/>
         <CustomRadioButton title={'Exact Values'} selectedColor={Colors.darkSkyBlue} selected={false}/>
         </View>


         { this.state.shipment_view == true &&  (   <View style={{marginTop:SECTION_MARGIN_TOP}}>
        <CustomText text={'Shipment box'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>

         <CustomText text={'Approx. Weight'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({Shipment_weight: text})} value={this.state.Shipment_weight} placeholder={'kg'} />

<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
<CustomText text={'Length'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomText text={'Width'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomText text={'Height'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}}>
<View style={{width:60}}><CustomInput keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} placeholder={'cm'} onChangeText={(text) => this.setState({Shipment_length: text})} value={this.state.Shipment_length}/></View>
<View style={{width:60}}><CustomInput keyboardType={"number-pad"}  borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} placeholder={'cm'} onChangeText={(text) => this.setState({Shipment_width: text})} value={this.state.Shipment_width}/></View>
<View style={{width:60}}><CustomInput keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} placeholder={'cm'} onChangeText={(text) => this.setState({Shipment_height: text})} value={this.state.Shipment_height} /></View>
</View>
<CustomText text={'Approx. Distance'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({Shipment_distance: text})} value={this.state.Shipment_distance} placeholder={'kg'} />

  
        <CustomText text={'Shipment Category'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomDropdown data={this.state.package_categories} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => {this.setState({Shipment_category_id:data[index]['id']}) }} />
    
        <CustomText text={'Shipment Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomDropdown data={this.state.package_subcategories} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => {this.setState({Shipment_subcategory_id:data[index]['id']}) }} />

        </View>)}
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} height={30} onPress={()=>this.create_shipment_box()} />
        <CustomButton title={'Add Shipment'} backgroundColor={Colors.darkSkyBlue} height={30} onPress={()=>this.add_shipment_box()} />
         </View>



<CustomButton title={'Generate Invoice'} text_color={Colors.darkSkyBlue} borderColor={Colors.darkSkyBlue} borderWidth={1} backgroundColor={Colors.white} onPress={()=>this.generate_invoice()}/>

</View>


{/*///////////////////////////////////////////////////////////////////////// Delivery Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Approximate Delivery Total '} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
    
        <CustomText text={'Min. Delivery Charge'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.min_delivery_charge} />

        <CustomText text={'Package Applied'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.package_applied} />

        <CustomText text={'Delivery Credit Available'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.credit_available} />

        <CustomText text={'Delivery Charge'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.delivery_charge} />


        <CustomRadioButton title={'COD'} selectedColor={Colors.darkSkyBlue} selected={true} />

        <CustomText text={'Reciever GST Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} keyboardType={"phone-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({gst_no: text})} value={this.state.gst_no} />

          <CustomText text={'Invoie Description'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({invoice_des: text})} value={this.state.invoice_des} />

          <CustomText text={'Product Cost'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} keyboardType={"phone-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({product_cost: text})} value={this.state.product_cost} />

          <CustomText text={'COD Credit balance'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({cod_credit_blnc: text})} value={this.state.cod_credit_blnc} />
        
          <CustomButton title={'Generate COD Invoice'} text_color={Colors.darkSkyBlue} borderColor={Colors.darkSkyBlue} borderWidth={1} backgroundColor={Colors.white} onPress={()=>this.generate_cod()}/>

          <CustomText text={'Final COD charge'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} value={this.state.final_cod_charge} />

</View>


{/*/////////////////////////////////////////////////// Delivery charge payment Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Charge Payment '} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
    
        <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Sender'} selectedColor={Colors.darkSkyBlue} selected={this.state.sender_selected} onPress={()=>this.isSelected(1)}/>
         <CustomRadioButton title={'Receiver'} selectedColor={Colors.darkSkyBlue} selected={this.state.reciever_selected} onPress={()=>this.isSelected(2)}/>
         </View>

         { this.state.deliveryChargePaymentBySender == true &&  ( <View><CustomText text={'Sender Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_name: text})} value={this.state.payment_name} />
          </View>)}

          { this.state.deliveryChargePaymentBySender == false &&  ( <View><CustomText text={'Receiver Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_name: text})} value={this.state.payment_name} />
          </View>)}

          <CustomText text={'Contact number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} keyboardType={"phone-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_phone: text})} value={this.state.payment_phone} />

          <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_location: text})} value={this.state.payment_location} />

          <CustomText text={'Comment'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_comment: text})} value={this.state.payment_comment} />

          <CustomButton title={'Save'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.payer_payment()} />

          <CustomText text={'Payment for Sender'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} value={this.state.sender_payment} />

          <CustomText text={'Payment for Receiver'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} value={this.state.receiver_payment} />
</View>

{/*/////////////////////////////////////////////////// payment method Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Payment Method '} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
    
        <View style={{flexDirection:'column',}}>
         <CustomRadioButton title={'Cash'} selectedColor={Colors.darkSkyBlue} selected={true}/>
         <CustomRadioButton title={'QR Code'} selectedColor={Colors.darkSkyBlue} selected={false}/>
         <CustomRadioButton title={'Online Payment'} selectedColor={Colors.darkSkyBlue} selected={false}/>
         <CustomRadioButton title={'Bank Transfer'} selectedColor={Colors.darkSkyBlue} selected={false}/>
         </View>

        <CustomText text={'Amount Recieved'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} keyboardType={"phone-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({amount_recieved: text})} value={this.state.amount_recieved} />

          <CustomText text={'Balance Amount'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} keyboardType={"phone-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({balance_amount: text})} value={this.state.balance_amount} />


</View>

{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.cash_payment()}  />
          </View>
        </ScrollView>
        </Container>
    );

}
}

