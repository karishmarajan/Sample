import React, { Component }  from 'react';
import {ActivityIndicator, CheckBox, ScrollView,Picker,StyleSheet, SafeAreaView ,Modal, AsyncStorage, TouchableOpacity , DatePickerAndroid, TimePickerAndroid } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Grid,Col,Badge, Row, DatePicker, Toast, Item} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,LOGIN_FIELD_HEIGHT, COLUMN_PADDING,TEXT_PADDING_RIGHT, CREDIT_FIELD_HEIGHT,FOURTH_FONT,SHORT_BUTTON_HEIGHT,SHORT_BORDER_RADIUS, NORMAL_FONT, THIRD_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import CustomRadioButton from '../../component/CustomRadioButton';
import DatePickerAndroidCustom from '../../component/DatePickerAndroidCustom';
import moment from 'moment';
import RNPrint from 'react-native-print';
import CustomMandatory  from '../../component/CustomMandatory';
import CustomCheckBox from '../../component/CustomCheckBox';
import session, { KEY, KEY1 } from '../../session/SessionManager';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import Api from '../../component/Fetch';
import {PHONE_SEARCH,PINCODE_SEARCH, COUNTRY , STATE , DISTRICT , CITY , COST_CHECKLIST , CUSTOMER_DETAILS ,BRANCH_CUSTOMER_DETAILS  ,PACKAGE_CATEGORY, PACKAGE_SUB_CATEGORY ,SHIPMENT_BOX, ORDER, PRODUCT_BILL_UPLOAD, DELIVERY_CHARGE, ADD_COD ,PAYER_PAYMENT, PAYMENT_BY_CASH, ORDER_TRACKING, CUSTOMER_TYPE, USER_REGISTRATION, OTP, VERIFY_OTP , MOBILE_VALIDATION, ALL_USERS} from '../../constants/Api';
import CustomSearchBox from '../../component/CustomSearchBox';
import CustomSearchableDropdown from '../../component/CustomSearchableDropdown';



export default class OrderCreation extends React.Component {
  
  constructor(props) {
    super(props);
  
   
    global.countries=[];
    global.states=[];
    global.districts=[];
    global.country_id_pic=-1;
    global.state_id_pic=-1;
    global.district_id_pic=-1;
    global.country_id=-1;
    global.state_id=-1;
    global.district_id=-1;
  }
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
    customer_district_id:'',
    customer_city : '',
    customer_landmark : '',
    customer_countrycode : '',
    customer_countryid : '',
    branchUserId:'',
    branchUserIdCode:'',
    parent_user_id:'',
    customer_identity_type:'',

    new_customer:true,
    existing_customer:false,
    
    same_selected:false,
    new_selected:true,

    same_selected_pickup:false,
    new_selected_pickup:true,

    same_selected_delivery:false,
    new_selected_delivery:true,

    same_selected_delivery_address:false,
    new_selected_delivery_address:true,

    normal_selected:true,
    bullet_selected:false,

    checked_cod:false,


    sender_id:'',
    sender_name:'',
    sender_no:'',
    sender_email:'',
    sender_country:'',
    sender_countrycode:'',
    sender_countryid:'',
    sender_pincode:'',
    sender_localbody:'',
    sender_gmap:'',
    sender_address1:'',
    sender_address2:'',
    sender_state:'',
    sender_district:'',
    sender_district_id:'',
    sender_city:'',
    sender_landmark:'',

    sender_contact_person_name:'',
    sender_contact_person_no:'',
    select_date:'',
    pickupdate:'',
    pickup_date:'',
    pickuptime:'',

    countries_sender:[],
    states_sender:[],
    cities_sender:[],
    districts_sender:[],
    countries_reciever:[],
    states_reciever:[],
    districts_reciever:[],
    city_reciever:[],
    payments:[],
    users:[],

    rec_city:'',
    rec_country_code:'',
    rec_country_id:'',
    rec_country:'',
    rec_state:'',
    rec_landmark:'',
    rec_district:'',
    rec_district_id:'',
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

    delivery_type:'NORMAL',

    order_id:'',

    
    
   
    package_categories:[],
   
   
    sender_details:[],
    package_category_list:[],
    package_sub_category_list:[],
    route_list:[],
    office_list:[],
    order_track_details:[],
    
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
    shipment_sub_category:'',

    
      errorTextshipment_weight: '',
      errorTextshipment_height: '',
      errorTextshipment_length: '',
      errorTextshipment_width: '',
      errorTextshipment_distance: '',
      errorTextshipment_category_id: '',
      errorTextshipment_subcategory_id: '',
     


    
   
    hour:'',
    minute:'',
    second:'',
    cod_credit_blnc:'',
    invoice_des:'',
    product_cost:'',
    gst_no:'',

    errorTextcod_credit_blnc:'',
    errorTextinvoice_des:'',
    errorTextproduct_cost:'',
    errorTextgst_no:'',

    final_cod_charge:'',
    min_delivery_charge:'',
    package_applied:'',
    credit_available:'',
    delivery_charge:'',
    deliveryChargePaymentBySender:true,
    sender_selected:false,
    reciever_selected:false,
    payment_location:'',
    payment_phone:'',
    payment_comment:'',
    sender_payment:'',
    receiver_payment:'',
    payment_name:'',

    errorTextamount_recieved:'',
    errorTextbalance_amount:'',

    amount_recieved:'',
    balance_amount:'',
    amount_payed:'',
    amount_to_pay:'',

    selectedPrinter: null,

    errorTextpayment_name:'',
    errorTextpayment_phone:'',
    errorTextpayment_location:'',
    errorTextpayment_comment:'',

    active_page:1,

    hasError: false,
    errorTextcustomer_id: '',
      errorTextsender_country: '',
      errorTextsender_state: '',
      errorTextsender_city: '',
      errorTextsender_district: '',
      errorTextsender_pincode: '',
      errorTextsender_landmark: '',
      errorTextsender_gmap: '',
      errorTextsender_address1: '',
      errorTextsender_address2: '',
      errorTextsender_localbody: '',
      errorTextsender_contactname: '',
      errorTextsender_contactno: '',

      errorTextpickupdate: '',

      errorTextrec_country: '',
      errorTextrec_state: '',
      errorTextrec_city: '',
      errorTextrec_district: '',
      errorTextrec_pincode: '',
      errorTextrec_landmark: '',
      errorTextrec_gmap: '',
      errorTextrec_address1: '',
      errorTextrec_address2: '',
      errorTextrec_localbody: '',
      errorTextrec_name: '',
      errorTextrec_no: '',
      errorTextrec_canbedelivered: '',
      errorTextrec_proof: '',
      errorTextrec_notes: '',
      fromDate:'',
      toDate:'',
     

      selected_date:'',
      selected_time:'',
      hour3:'',
      minute3:'',

      save_clicked:false,
      shipment_total:'',
      errorTextshipment_total: '',
      cod_check:true,

      fname:'',
      lname:'',
      customer_type:'',
      mobile:'',
      otp:'',
      email:'',
      country:'',
      state:'',
      city:'',
      district:'',
      district_id:'',
      pincode:'',
      gst:'',
      address1:'',
      address2:'',
      localbody:'',
      landmark:'',
      gmaplink:'',
      password:'',
      conformpassword:'',
  
      customers:[],
      countries:[],
      countrycode:'',
      country_id:'',
      states:[],
      districts:[],
      cities:[],
  
  
        hasError: false,
        errorTextfname: '',
        errorTextlname: '',
        errorTextemail: '',
        errorTextcustype: '',
        errorTextcountry: '',
        errorTextstate: '',
        errorTextcity: '',
        errorTextdistrict: '',
        errorTextpincode: '',
        errorTextgst: '',
        errorTextmobile: '',
        errorTextadrress1: '',
        errorTextaddress2: '',
        errorTextlocalbody: '',
        errorTextlandmark: '',
        errorTextgmap: '',
        errorTextverify: '',
        errorTextpass: '',
        errorTextconformpass: '',
        loader:false,
        modalfirst:false,
        modalsecond:false,
        alert_visible:false,
        otp_verified:false,

        checked1:false,
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
        sender_address1_wp:'',
sender_address2_wp:'',
sender_localbody_wp:'',
sender_landmark_wp:'',
sender_gmap_wp:'',
sender_city_new_WP:'',
        selected_radio1:true,
        selected_radio2:false,
        phone_view:false,

        phone_search:'',
        country_code:'+91',
        sender_country_np:'',
        sender_state_np:'',
        sender_district_np:'',
        sender_city_np:'',
        sender_pincode_np:'',
    sender_address1_np:'',
       sender_address2_np:'',
      sender_localbody_np:'',
      sender_landmark_np:'',
       sender_gmap_np:'',
       select_phone:false,
       select_pin:false,
       select_phone_page2:false,
       select_pin_page2:false,
       country_pickup_page2:'',
       state_pickup_page2:'',
       district_pickup_page2:'',
       city_pickup_page2:'',
       pincode_pickup_page2:'',
       glink_pickup_page2:'',
       add1_pickup_page2:'',
       add2_pickup_page2:'',
       local_pickup_page2:'',
       landmark_pickup_page2:'',

       country_pickup_page2_new:'',
       state_pickup_page2_new:'',
       district_pickup_page2_new:'',
       city_pickup_page2_new:'',
       pincode_pickup_page2_new:'',
       glink_pickup_page2_new:'',
       add1_pickup_page2_new:'',
       add2_pickup_page2_new:'',
       local_pickup_page2_new:'',
       landmark_pickup_page2_new:'',

       loading:false,
       country_id_new:'',
       state_id_new:'',
       district_id_new:'',
       country_id_new_pic:'',
       state_id_new_pic:'',
       district_id_new_pic:'',
       exact:false,
       approx:true,
       modalVisible:false,
  };



 ///////////////////////// Date Picker Function  /////////////////////////////////////////////////////////////////////////////////////////

 async showPicker(mode) {
  if (Platform.OS == "android") {
    if (mode == 'time') {
      try {
          const { action, hour, minute } = await TimePickerAndroid.open({
              hour,
              minute,
              is24Hour: false, // Will display '2 PM'
              
          });
          if (action !== TimePickerAndroid.dismissedAction) {
           
            // setting AM/PM and hour to 12 by checking condition
             let am_pm = 'AM';

             if(hour>11){
                     am_pm = 'PM';
                    if(hour>12){
              let hour1 = hour - 12;
                this.setState({ hour3: this.make_two_digit(hour1), minute3: this.make_two_digit(minute) });
                this.setTimeout(
                this.setState({selected_time:`${this.state.hour3}:${this.state.minute3} ${am_pm}`})
              ,100);
              
               }
          }

                  if(hour == 0){
                     let hour1 = 12;
                       this.setState({ hour3: this.make_two_digit(hour1), minute3: this.make_two_digit(minute) });
                       const selectedTime = `${this.state.hour3}:${this.state.minute3} ${am_pm}` ;
                       this.setState({selected_time:selectedTime})
                    }

                    this.setState({ hour3: this.make_two_digit(hour), minute3: this.make_two_digit(minute) });
                    const selectedTime = `${this.state.hour3}:${this.state.minute3} ${am_pm}` ;
                    this.setState({selected_time:selectedTime})
          
          }
         

      } catch ({ code, message }) {
          console.warn('Cannot open time picker', message);
      }

  } else {
      try {
          const { action, year, month, day } = await DatePickerAndroid.open({
              date: new Date(),
              minDate: new Date(),
          });
          if (action !== DatePickerAndroid.dismissedAction) {

                  this.setState({ year: year, month: this.make_two_digit(month+1), day: this.make_two_digit(day) });
                  this.setState({selected_date:`${this.state.day}-${this.state.month}-${this.state.year}`});
          }
      } catch ({ code, message }) {
          console.warn("Cannot open date picker", message);
      }

  }
}
}
make_two_digit(d) {
  return (parseInt(d) < 10 ? "0" : "") + d;
}

  ///////////////////////////////////  componentDidMount function ///////////////////////////////////////////////////////////////////////////

  componentDidMount() {
    
    this.fetch_country_list_sender()
    this.fetch_country_list_reciever()
    this.fetch_package_category_list()
    this.date_time_setting_function()
    this.state_click()
    this.fetch_customer_type();
    this.fetch_country_list();
    this.fetch_customers_list();
 
  }

  //////////////////////////////// Fetching customer type function //////////////////////////////////////////////////////////////////////////////

fetch_customer_type() {

  Api.fetch_request(CUSTOMER_TYPE,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      var count = (result.payload).length;
      let customers = [];

      for(var i = 0; i < count; i++){
        customers.push({ name: result.payload[i].customerTypeName ,  id: result.payload[i].customerTypeId});
     }
     this.setState({customers: customers });
    }
    else{
      console.log('Failed');
    }
})
 
}

 //////////////////////////////// Fetching country function //////////////////////////////////////////////////////////////////////////////

 fetch_country_list() {

  Api.fetch_request(COUNTRY,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      var count = (result.payload).length;
      let countries = [];

      for(var i = 0; i < count; i++){
       countries.push({ name: result.payload[i].countryName , id: result.payload[i].countryId ,  code: result.payload[i].countryCode  });
     }
     this.setState({ countries: countries });
    }
    else{
      console.log('Failed');
    }
})
 
}
//////////////////////////////// Fetching sender state function //////////////////////////////////////////////////////////////////////////////

fetch_state_list(country_id) {

  this.setState({country_id:country_id})

  Api.fetch_request(STATE + country_id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      var count = (result.payload).length;
      let states = [];

      for(var i = 0; i < count; i++){
        states.push({ name: result.payload[i].stateName ,  id: result.payload[i].stateId});
     }
     this.setState({states: states });
    }
    else{
      console.log('Failed');
    }
})
 
}

//////////////////////////////// Fetching district city function //////////////////////////////////////////////////////////////////////////////

fetch_district_list(state_id) {

  Api.fetch_request(DISTRICT + state_id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));


      var count = (result.payload).length;
      let district = [];

      for(var i = 0; i < count; i++){
        district.push({ name: result.payload[i].districtName ,  id: result.payload[i].districtId});
     }
     this.setState({ districts : district });
    }
    else{
      console.log('Failed');
    }
})
 
}
//////////////////////////////// Fetching sender city function //////////////////////////////////////////////////////////////////////////////

fetch_city_list(state_id) {

  Api.fetch_request(CITY + state_id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));


      var count = (result.payload).length;
      let city = [];

      for(var i = 0; i < count; i++){
        city.push({ name: result.payload[i].cityName });
     }
     this.setState({ cities : city });
    }
    else{
      console.log('Failed');
    }
})
 
}

//////////////////////////////// customer mobile validating function //////////////////////////////////////////////////////////////////////////////

mobileno_validation() {

  Api.fetch_request(MOBILE_VALIDATION + this.state.countrycode+"/"+this.state.mobile,'GET','')
  .then(result => {
   
    if(result.error != false){

      console.log('Success:', JSON.stringify(result));
      this.send_otp();
 
    }
    else{
      console.log('Failed');
      Toast.show({ text: "already exist this number", type: 'warning' });
    }
})
 
}

  
///////////////////////////////// Sending OTP function /////////////////////////////////////////////////////////////////////////////////////
 
send_otp(){
  let body={
    "countryCode": this.state.countrycode,
    "mobileNumber": this.state.mobile,

};
  

  Api.fetch_request(OTP,'POST','',JSON.stringify(body))
  .then(result => {
   
    if(result.error != true){
    console.log('Success:', JSON.stringify(result))
    Toast.show({ text: result.message, type: 'success' });
    }
    else{
      console.log('Failed');
      Toast.show({ text: result.message, type: 'warning' });
    }
  })
}

/////////////////////////////////////////////////////////
phonenumber_search(country_code,phone_search){
  Api.fetch_request(PHONE_SEARCH+country_code+'/'+phone_search,'GET','')
  .then(result=>{

    if(result.error != true)
    {
      console.log('Success:', JSON.stringify(result))
      console.log('kkkkkkkkkkkkkkkk',PHONE_SEARCH+country_code+phone_search)
      
          this.setState({ sender_country_np:result.payload.country,
            sender_state_np:result.payload.state,
            sender_city_np:result.payload.city,
            sender_district_np:result.payload.district,
            sender_pincode_np:result.payload.pincode,
            sender_gmap_np:result.payload.gmapLink,
            sender_address1_np:result.payload.addressLine1,
            sender_address2_np:result.payload.addressLine2,
            sender_localbody_np:result.payload.localBodyType,
         
          
          })
          // let country_id_pic=-1;
          global.countries.every(function(element, index) {
          
           if (element.countryName==result.payload.country) 
           {
             country_id_pic=element.countryId;
              this.setState({country_id_new_pic:element.countryId})
             console.log(`COUNTRY VALUE GOT :${country_id_pic}`);
             return false
           }
           else return true
         }.bind(this));
       
        //  let state_id_pic=-1;
         global.states.every(function(element, index) {
         
          if (element.stateName==result.payload.state) 
          {
           state_id_pic=element.stateId;
            this.setState({state_id_new_pic:element.stateId})
            console.log(`STATE VALUE GOT :${state_id_pic}`);
            return false
          }
          else return true
        }.bind(this));
       
        // let district_id_pic=-1;
        global.districts.every(function(element, index) {
        
         if (element.districtName==result.payload.district) 
         {
           district_id_pic=element.districtId;
            this.setState({district_id_new_pic:element.districtId})
           console.log(`DISTRICT VALUE GOT :${district_id_pic}`);
           return false
         }
         else return true
       }.bind(this));


    }
  })

}

////////////////////////////////////////////////////edited Nishanth/////////////////////////////////////////
phonenumber_search_page2(country_code,phone_search){
  Api.fetch_request(PHONE_SEARCH+country_code+'/'+phone_search,'GET','')
  .then(result=>{

    if(result.error != true)
    {
      console.log('Success:', JSON.stringify(result))
      console.log('kkkkkkkkkkkkkkkk',PHONE_SEARCH+country_code+phone_search)
      
          this.setState({ country_pickup_page2:result.payload.country,
            state_pickup_page2:result.payload.state,
            city_pickup_page2:result.payload.city,
            district_pickup_page2:result.payload.district,
            pincode_pickup_page2:result.payload.pincode,
            glink_pickup_page2:result.payload.gmapLink,
            add1_pickup_page2:result.payload.addressLine1,
            add2_pickup_page2:result.payload.addressLine2,
            local_pickup_page2:result.payload.localBodyType,
         
          
          })


          // let country_id=-1;
          global.countries.every(function(element, index) {
          
           if (element.countryName==result.payload.country) 
           {
             country_id=element.countryId;
             
              this.setState({country_id_new:country_id})
             console.log(`COUNTRY VALUE GOT :${country_id}`);
             return false
           }
           else return true
         }.bind(this));
       
        //  let state_id=-1;
         global.states.every(function(element, index) {
         
          if (element.stateName==result.payload.state) 
          {
           state_id=element.stateId;
          this.setState({state_id_new:state_id})
            console.log(`STATE VALUE GOT :${state_id}`);
            return false
          }
          else return true
        }.bind(this));
       
        // let district_id=-1;
        global.districts.every(function(element, index) {
        
         if (element.districtName==result.payload.district) 
         {
           district_id=element.districtId;
          this.setState({district_id_new:district_id})
           console.log(`DISTRICT VALUE GOT :${district_id}`);
           return false
         }
         else return true
       }.bind(this));
       
    }
  })

}



///////////////////////////////// Verifying OTP function /////////////////////////////////////////////////////////////////////////////////////

verify_otp(otp) {

  let body={
    "countryCode": this.state.countrycode,
    "mobileNumber": this.state.mobile,

};

  Api.fetch_request(VERIFY_OTP + otp,'POST','',JSON.stringify(body))
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));
      this.setState({otp_verified:true,errorTextverify:''});
      Toast.show({ text: result.message, type: 'success' });
    }
    else{
      console.log('Failed');
      Toast.show({ text: result.message, type: 'warning' });
    }
})
 
}
////////////////////////////////// Verify string function //////////////////////////////////////////////////////////////////

verifyString(text) {
  var reg = /^[a-zA-Z]+$/;
  return reg.test(text);
}
////////////////////////////////// Verify number function //////////////////////////////////////////////////////////////////

verifyNumber(text) {
  var reg = /^[0-9\b]+$/;
  return reg.test(text);
}
////////////////////////////////// Verify gmap function //////////////////////////////////////////////////////////////////

verifyGmap(text) {
  var reg = /^http\:\/\/|https\:\/\/|Http\:\/\/|Https\:\/\/|www\.google$/;
  return reg.test(text);
}
////////////////////////////////// Verify alphanumeric function //////////////////////////////////////////////////////////////////

verifyAlphanumeric(text) {
  var reg = /^[a-zA-Z0-9]*$/;
  return reg.test(text);
}
////////////////////////////////// Verify email function //////////////////////////////////////////////////////////////////

verifyEmail(email) {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}


/////////////////////////////////// Pickup continue function ////////////////////////edited Nishanth//////////////////////////////////////

  pickup_continue() {

    this.setState({phone_search:''})


    this.setState({picode_search:''})
    
   this.setState({loading:true})

    console.log('Dataaaaaa',this.state.sender_country_np)



    if(this.state.new_selected==true)
    {
       
      console.log('NEWSELECTED',this.state.sender_country_np)

      

      this.setState({sender_country_new_WP:this.state.sender_country_np,
        sender_state_new_WP:this.state.sender_state_np,
        sender_district_new_WP:this.state.sender_district_np,
        sender_city_new_WP:this.state.sender_city_np,
        pincode_new_wp:this.state.sender_pincode_np,
        sender_address1_wp:this.state.sender_address1_np,
        sender_address2_wp:this.state.sender_address2_np,
        sender_localbody_wp:this.state.sender_localbody_np,
        sender_landmark_wp:this.state.sender_landmark_np,
        sender_gmap_wp:this.state.sender_gmap_np })



        console.log('NEWSELECTED',this.state.sender_country_new_WP,this.state.sender_state_new_WP,
        this.state.sender_district_new_WP,this.state.sender_city_new_WP,this.state.pincode_new_wp,this.state.sender_address1_wp,this.state.sender_address2_wp,
        this.state.sender_localbody_wp,'landmark',this.state.sender_landmark_wp,this.state.sender_gmap_wp
        )

    }
    if(this.state.select_phone==true)
    {
       
      console.log('PHONESELECTED',this.state.sender_country_np)

      

      this.setState({sender_country_new_WP:this.state.sender_country_np,
        sender_state_new_WP:this.state.sender_state_np,
        sender_district_new_WP:this.state.sender_district_np,
        sender_city_new_WP:this.state.sender_city_np,
        pincode_new_wp:this.state.sender_pincode_np,
        sender_address1_wp:this.state.sender_address1_np,
        sender_address2_wp:this.state.sender_address2_np,
        sender_localbody_wp:this.state.sender_localbody_np,
        sender_landmark_wp:this.state.sender_landmark_np,
        sender_gmap_wp:this.state.sender_gmap_np,
        sender_country_id:this.state.country_id_new_pic,
        sender_district_id:this.state.district_id_new_pic,
       })



        console.log('PHONESELECTED',this.state.sender_country_new_WP,this.state.sender_state_new_WP,
        this.state.sender_district_new_WP,this.state.sender_city_new_WP,this.state.pincode_new_wp,this.state.sender_address1_wp,this.state.sender_address2_wp,
        this.state.sender_localbody_wp,'landmark',this.state.sender_landmark_wp,this.state.sender_gmap_wp
        )

    }
    if(this.state.select_pin==true)
    {
       
      console.log('PINSELECTED',this.state.sender_country_np)

      

      this.setState({sender_country_new_WP:this.state.sender_country_np,
        sender_state_new_WP:this.state.sender_state_np,
        sender_district_new_WP:this.state.sender_district_np,
        sender_city_new_WP:this.state.sender_city_np,
        pincode_new_wp:this.state.sender_pincode_np,
        sender_address1_wp:this.state.sender_address1_np,
        sender_address2_wp:this.state.sender_address2_np,
        sender_localbody_wp:this.state.sender_localbody_np,
        sender_landmark_wp:this.state.sender_landmark_np,
        sender_gmap_wp:this.state.sender_gmap_np,
        sender_country_id:this.state.country_id_new_pic,
        sender_district_id:this.state.district_id_new_pic, })



        console.log('PINSELECTED',this.state.sender_country_new_WP,this.state.sender_state_new_WP,
        this.state.sender_district_new_WP,this.state.sender_city_new_WP,this.state.pincode_new_wp,this.state.sender_address1_wp,this.state.sender_address2_wp,
        this.state.sender_localbody_wp,'landmark',this.state.sender_landmark_wp,this.state.sender_gmap_wp
        )

    }
    if(this.state.same_selected==true){
      console.log('ELSEEEEEEEEEEEEE',this.state.sender_country_np)
      this.setState({sender_country_new_WP:this.state.sender_country,
        sender_state_new_WP:this.state.sender_state,
        sender_district_new_WP:this.state.sender_district,
        sender_city_new_WP:this.state.sender_city,
        pincode_new_wp:this.state.sender_pincode,
        sender_address1_wp:this.state.sender_address1,
        sender_address2_wp:this.state.sender_address2,
        sender_localbody_wp:this.state.sender_localbody,
        sender_landmark_wp:this.state.sender_landmark,
        sender_gmap_wp:this.state.sender_gmap,
      })
    
    }
   
    console.log('CONTENTS',this.state.sender_country_new_WP,this.state.sender_state_new_WP,
    this.state.sender_district_new_WP,this.state.sender_city_new_WP,this.state.pincode_new_wp,this.state.sender_address1_wp,this.state.sender_address2_wp,
    this.state.sender_localbody_wp,this.state.sender_landmark_wp,this.state.sender_gmap_wp
    )




    setTimeout(() => {
      this.setState({loading:false})

      

    if(this.state.customer_name==="") {

      console.log('1')
      this.setState({hasError: true, errorTextcustomer_id: 'Provide valid customer id and details !'});
      return;
    }
    if(this.state.sender_country_new_WP==="") {
      console.log('2')
      this.setState({hasError: true, errorTextsender_country: 'Please select country !'});
      return;
    }
    if(this.state.sender_state_new_WP==="") {
      console.log('3')
      this.setState({hasError: true, errorTextsender_state: 'Please select state !'});
      return;
    }
  
    if(this.state.sender_city_new_WP==="") {
      console.log('4')
      this.setState({hasError: true, errorTextsender_city: 'Please select city !'});
      return;
    }
    if(this.state.sender_district_new_WP==="") {
      console.log('5')
      this.setState({hasError: true, errorTextsender_district: 'Please fill !'});
      return;
    }
    if(!this.verifyString((this.state.sender_district_new_WP).trim())) {
      console.log('6')
      this.setState({hasError: true, errorTextsender_district: 'Please enter a valid data !'});
      return;
    }
    if(this.state.pincode_new_wp==="") {
      console.log('7')
      this.setState({hasError: true, errorTextsender_pincode: 'Please fill !'});
      return;
    }
    if(this.state.pincode_new_wp.length<6) {
      console.log('8')
      this.setState({hasError: true, errorTextsender_pincode: 'Minimum 6 digit !'});
      return;
    }
    // if(this.state.sender_gmap==="") {
    //   this.setState({hasError: true, errorTextsender_gmap: 'Please fill !'});
    //   return;
    // }
    if(this.state.sender_gmap_wp !="") {
      console.log('9')
    if(!this.verifyGmap((this.state.sender_gmap_wp).trim())) {
      console.log('9.5')
      this.setState({hasError: true, errorTextsender_gmap: 'Please enter a valid link !'});
      return;
    }
  }
    
    if(this.state.sender_address1_wp==="") {
      console.log('10')
      this.setState({hasError: true, errorTextsender_address1: 'Please fill !'});
      return;
    }
    if(this.state.sender_address2_wp==="") {
      console.log('11')
      this.setState({hasError: true, errorTextsender_address2: 'Please fill !'});
      return;
    }
    // if(this.state.sender_localbody_wp==="") {
    //   console.log('12')
    //   this.setState({hasError: true, errorTextsender_localbody: 'Please fill !'});
    //   return;
    // }
    if(this.state.sender_localbody_wp !="") {
      console.log('12')
      if(!this.verifyString((this.state.sender_localbody_wp).trim())) {
        console.log('12.5')
        this.setState({hasError: true, errorTextlocalbody: 'Please enter a valid data !'});
        return;
      }
    }
    // if(this.state.sender_landmark_wp==="") {
    //   console.log('13')
    //   this.setState({hasError: true, errorTextsender_landmark: 'Please fill !'});
    //   return;
    // }
   
    if(this.state.sender_contact_person_name==="") {
      console.log('14')
      this.setState({hasError: true, errorTextsender_contactname: 'Please fill !'});
      return;
    }
    if(!this.verifyString((this.state.sender_contact_person_name).replace(/ /g, '').trim())) {
      console.log('15')
      this.setState({hasError: true, errorTextsender_contactname: 'Please enter a valid name !'});
      return;
    }
    if(this.state.sender_contact_person_no==="") {
      console.log('16')
      this.setState({hasError: true, errorTextsender_contactno: 'Please fill !'});
      return;
    }
    if(this.state.selected_date==="") {
      console.log('17')
      this.setState({hasError: true, errorTextsender_contactno: 'Date cannot be null !'});
      return;
    }
    if(this.state.selected_time==="") {
      console.log('18')
      this.setState({hasError: true, errorTextsender_contactno: 'Time cannot be null !'});
      return;
    }
    if(!this.verifyNumber((this.state.sender_contact_person_no).trim())) {
      console.log('19')
      this.setState({hasError: true, errorTextsender_contactno: 'Please enter a valid number!'});
      return;
    }

    if(this.state.sender_contact_person_no.length < 10) {
      console.log('20')
      this.setState({hasError: true, errorTextsender_contactno: 'Minimum 10 digits !'});
      return;
    }
   
    console.log('Continued JJJJJJJJJJJJJJJJJ')
    // this.setState({active_page:2});
    // this.setState({modalVisible:true})
    this.setState({active_page:2})
  }, 2000);
  }

/////////////////////////////////// Delivery continue function //////////////////////////edited Nishanth////////////////////////////////////

delivery_continue() {

  // this.setState({country_code:''})
  this.setState({phone_search:''})

  this.setState({picode_search:''})
  
  

  console.log('Dataaaaaa',this.state.sender_country_np)



  if(this.state.new_selected_delivery_address==true)
  {
     
    console.log('NEWSELECTED',this.state.sender_country_np)

    

    this.setState({ country_pickup_page2_new:this.state.rec_country,
      state_pickup_page2_new:this.state.rec_state,
      district_pickup_page2_new:this.state.rec_district,
      city_pickup_page2_new:this.state.rec_city,
      pincode_pickup_page2_new:this.state.rec_pincode,
      add1_pickup_page2_new:this.state.rec_address1,
      add2_pickup_page2_new:this.state.rec_address2,
      local_pickup_page2_new:this.state.rec_localbody,
      landmark_pickup_page2_new:this.state.rec_landmark,
      glink_pickup_page2_new:this.state.rec_gmap }) 





      console.log('NEWSELECTED',this.state.country_pickup_page2_new,this.state.state_pickup_page2_new,
      this.state.district_pickup_page2_new,this.state.city_pickup_page2_new,this.state.pincode_pickup_page2_new,this.state.add1_pickup_page2_new,this.state.add2_pickup_page2_new,
      this.state.local_pickup_page2_new,'landmark',this.state.landmark_pickup_page2_new,this.state.glink_pickup_page2_new
      )

  }
  if(this.state.select_phone_page2==true)
  {
     
    console.log('PHONESELECTED',this.state.sender_country_np)

    

    this.setState({ country_pickup_page2_new:this.state.country_pickup_page2,
      state_pickup_page2_new:this.state.state_pickup_page2,
      district_pickup_page2_new:this.state.district_pickup_page2,
      city_pickup_page2_new:this.state.city_pickup_page2,
      pincode_pickup_page2_new:this.state.pincode_pickup_page2,
      add1_pickup_page2_new:this.state.add1_pickup_page2,
      add2_pickup_page2_new:this.state.add2_pickup_page2,
      local_pickup_page2_new:this.state.local_pickup_page2,
      landmark_pickup_page2_new:this.state.landmark_pickup_page2,
      glink_pickup_page2_new:this.state.glink_pickup_page2,
      rec_country_id:this.state.country_id_new,
      rec_district_id:this.state.district_id_new,
      rec_country_code:this.state.country_code,
      sender_countrycode:this.state.country_code})



      console.log('PHONESELECTED',this.state.country_pickup_page2_new,this.state.state_pickup_page2_new,
      this.state.district_pickup_page2_new,this.state.city_pickup_page2_new,this.state.pincode_pickup_page2_new,this.state.add1_pickup_page2_new,this.state.add2_pickup_page2_new,
      this.state.local_pickup_page2_new,'landmark',this.state.landmark_pickup_page2_new,this.state.glink_pickup_page2_new
      )

  }
  if(this.state.select_pin==true)
  {
     
    console.log('PINSELECTED',this.state.sender_country_np)

    

    this.setState({ country_pickup_page2_new:this.state.country_pickup_page2,
      state_pickup_page2_new:this.state.state_pickup_page2,
      district_pickup_page2_new:this.state.district_pickup_page2,
      city_pickup_page2_new:this.state.city_pickup_page2,
      pincode_pickup_page2_new:this.state.pincode_pickup_page2,
      add1_pickup_page2_new:this.state.add1_pickup_page2,
      add2_pickup_page2_new:this.state.add2_pickup_page2,
      local_pickup_page2_new:this.state.local_pickup_page2,
      landmark_pickup_page2_new:this.state.landmark_pickup_page2,
      glink_pickup_page2_new:this.state.glink_pickup_page2,
      rec_country_id:this.state.country_id_new,
      rec_district_id:this.state.district_id_new,
      sender_countrycode:this.state.country_code })



      console.log('PINSELECTED',this.state.country_pickup_page2_new,this.state.state_pickup_page2_new,
      this.state.district_pickup_page2_new,this.state.city_pickup_page2_new,this.state.pincode_pickup_page2_new,this.state.add1_pickup_page2_new,this.state.add2_pickup_page2_new,
      this.state.local_pickup_page2_new,'landmark',this.state.landmark_pickup_page2_new,this.state.glink_pickup_page2_new
      )

  }
  if(this.state.same_selected_delivery_address==true){
    console.log('ELSEEEEEEEEEEEEE',this.state.sender_country_np)
    this.setState({ country_pickup_page2_new:this.state.rec_country,
      state_pickup_page2_new:this.state.rec_state,
      district_pickup_page2_new:this.state.rec_district,
      city_pickup_page2_new:this.state.rec_city,
      pincode_pickup_page2_new:this.state.rec_pincode,
      add1_pickup_page2_new:this.state.rec_address1,
      add2_pickup_page2_new:this.state.rec_address2,
      local_pickup_page2_new:this.state.rec_localbody,
      landmark_pickup_page2_new:this.state.rec_landmark,
      glink_pickup_page2_new:this.state.rec_gmap }) 
  
  }

  console.log('CONTENTS',this.state.country_pickup_page2_new,this.state.state_pickup_page2_new,
  this.state.district_pickup_page2_new,this.state.city_pickup_page2_new,this.state.pincode_pickup_page2_new,this.state.add1_pickup_page2_new,this.state.add2_pickup_page2_new,
  this.state.local_pickup_page2_new,'landmark',this.state.landmark_pickup_page2_new,this.state.glink_pickup_page2_new
  )






  setTimeout(() => {



  if(this.state.country_pickup_page2_new==="") {
    this.setState({hasError: true, errorTextrec_country: 'Please select country !'});
    return;
  }
  if(this.state.state_pickup_page2_new==="") {
    this.setState({hasError: true, errorTextrec_state: 'Please select state !'});
    return;
  }

  if(this.state.city_pickup_page2_new==="") {
    this.setState({hasError: true, errorTextrec_city: 'Please select city !'});
    return;
  }
  if(this.state.district_pickup_page2_new==="") {
    this.setState({hasError: true, errorTextrec_district: 'Please fill !'});
    return;
  }
  if(!this.verifyString((this.state.district_pickup_page2_new).trim())) {
    this.setState({hasError: true, errorTextrec_district: 'Please enter a valid data !'});
    return;
  }
  if(this.state.pincode_pickup_page2_new==="") {
    this.setState({hasError: true, errorTextrec_pincode: 'Please fill !'});
    return;
  }
  if(this.state.pincode_pickup_page2_new.length<6) {
    this.setState({hasError: true, errorTextrec_pincode: 'Must be 6 digit !'});
    return;
  }
  // if(this.state.rec_gmap==="") {
  //   this.setState({hasError: true, errorTextrec_gmap: 'Please fill !'});
  //   return;
  // }
  if(this.state.glink_pickup_page2_new !="") {
  if(!this.verifyGmap(this.state.glink_pickup_page2_new)) {
    this.setState({hasError: true, errorTextrec_gmap: 'Please enter a valid link !'});
    return;
  }
}
  if(this.state.add1_pickup_page2_new==="") {
    this.setState({hasError: true, errorTextrec_address1: 'Please fill !'});
    return;
  }
  if(this.state.add2_pickup_page2_new==="") {
    this.setState({hasError: true, errorTextrec_address2: 'Please fill !'});
    return;
  }
  // if(this.state.rec_localbody==="") {
  //   this.setState({hasError: true, errorTextrec_localbody: 'Please fill !'});
  //   return;
  // }
  if(this.state.local_pickup_page2_new !="") {
  if(!this.verifyString((this.state.local_pickup_page2_new).replace(/ /g, '').trim())) {
    this.setState({hasError: true, errorTextrec_localbody: 'Please enter a valid data !'});
    return;
  }
}
  // if(this.state.landmark_pickup_page2_new==="") {
  //   this.setState({hasError: true, errorTextrec_landmark: 'Please fill !'});
  //   return;
  // }
 
  if(this.state.recievername==="") {
    this.setState({hasError: true, errorTextrec_name: 'Please fill !'});
    return;
  }
  if(!this.verifyString((this.state.recievername).replace(/ /g, '').trim())) {
    this.setState({hasError: true, errorTextrec_name: 'Please enter a valid name !'});
    return;
  }
  if(this.state.recieverno==="") {
    this.setState({hasError: true, errorTextrec_no: 'Please fill !'});
    return;
  }
  if(!this.verifyNumber((this.state.recieverno).trim())) {
    this.setState({hasError: true, errorTextrec_no: 'Please enter a valid number!'});
    return;
  }
  if(this.state.recieverno.length < 10) {
    this.setState({hasError: true, errorTextrec_no: 'Minimum 10 digits !'});
    return;
  }
  // if(this.state.proof==="") {
  //   this.setState({hasError: true, errorTextrec_proof: 'Please fill !'});
  //   return;
  // }
  if(this.state.proof !="") {
  if(!this.verifyString((this.state.proof).replace(/ /g, '').trim())) {
    this.setState({hasError: true, errorTextrec_proof: 'Please enter a valid data !'});
    return;
  }
}
 
  if(this.state.deliveredto !=""){
  if(!this.verifyString((this.state.deliveredto).replace(/ /g, '').trim())) {
    this.setState({hasError: true, errorTextrec_canbedelivered: 'Please enter a valid name !'});
    return;
  }
}

   this.create_order();
  }, 2000);

}


  ////////////////////////////////////////////////////////////////////////////////////////////////////

isSelected(no){
  if(no == 1){
    this.setState({sender_selected:true})
    this.setState({reciever_selected:false})
    this.setState({deliveryChargePaymentBySender:true})

    this.setState({payment_name:this.state.sender_contact_person_name , payment_phone:this.state.sender_contact_person_no});

  }
  if(no == 2){
    this.setState({reciever_selected:true})
    this.setState({sender_selected:false})
    this.setState({deliveryChargePaymentBySender:false})

    this.setState({payment_name:this.state.recievername , payment_phone:this.state.recieverno});
  }
if(no == 3){
  this.setState({same_selected:true})
  this.setState({new_selected:false})
  this.setState({select_phone:false})
  this.setState({select_pin:false})
  this.setState({sender_id:this.state.customer_id});
  this.setState({sender_name:this.state.customer_name});
  this.setState({sender_no:this.state.customer_no});
  this.setState({sender_address1:this.state.customer_address1});
  this.setState({sender_address2:this.state.customer_address2});
  this.setState({sender_email:this.state.customer_email});
  this.setState({sender_countrycode:this.state.customer_countrycode});
  this.setState({sender_country_id:this.state.customer_countryid});
  this.setState({sender_country:this.state.customer_country});
  this.setState({sender_state:this.state.customer_state});
  this.setState({sender_district:this.state.customer_district});
  this.setState({sender_district_id:this.state.customer_district_id});
  this.setState({sender_city:this.state.customer_city});
  this.setState({sender_localbody:this.state.customer_localbody});
  this.setState({sender_landmark:this.state.customer_landmark});
  this.setState({sender_gmap:this.state.customer_gmap});
  this.setState({sender_pincode:this.state.customer_pincode});

}
if(no == 4){
  this.setState({new_selected:true})
  this.setState({same_selected:false})
  this.setState({select_phone:false})
  this.setState({select_pin:false})
  this.setState({sender_id:''});
  this.setState({sender_name:''});
  this.setState({sender_no:''});
  this.setState({sender_address1:''});
  this.setState({sender_address2:''});
  this.setState({sender_email:''});
  this.setState({sender_countrycode:''});
  this.setState({sender_country_id:''});
  this.setState({sender_country:''});
  this.setState({sender_state:''});
  this.setState({sender_district:''});
  this.setState({sender_district_id:''});
  this.setState({sender_city:''});
  this.setState({sender_localbody:''});
  this.setState({sender_landmark:''});
  this.setState({sender_gmap:''});
  this.setState({sender_pincode:''});
  
}
if(no == 5){
  this.setState({same_selected_delivery_address:true})
  this.setState({new_selected_delivery_address:false})
  this.setState({select_phone_page2:false})
  this.setState({select_pin_page2:false})

  this.setState({rec_address1:this.state.customer_address1});
  this.setState({rec_address2:this.state.customer_address2});
  this.setState({rec_country_code:this.state.customer_countrycode});
  this.setState({rec_country_id:this.state.customer_countryid});
  this.setState({rec_country:this.state.customer_country});
  this.setState({rec_state:this.state.customer_state});
  this.setState({rec_district:this.state.customer_district});
  this.setState({rec_district_id:this.state.customer_district_id});
  this.setState({rec_city:this.state.customer_city});
  this.setState({rec_localbody:this.state.customer_localbody});
  this.setState({rec_landmark:this.state.customer_landmark});
  this.setState({rec_gmap:this.state.customer_gmap});
  this.setState({rec_pincode:this.state.customer_pincode});

}
if(no == 6){
  this.setState({new_selected_delivery_address:true})
  this.setState({same_selected_delivery_address:false})
  this.setState({select_phone_page2:false})
  this.setState({select_pin_page2:false})
  this.setState({rec_address1:''});
  this.setState({rec_address2:''});
  this.setState({rec_country_code:''});
  this.setState({rec_country_id:''});
  this.setState({rec_country:''});
  this.setState({rec_state:''});
  this.setState({rec_district:''});
  this.setState({rec_district_id:''});
  this.setState({rec_city:''});
  this.setState({rec_localbody:''});
  this.setState({rec_landmark:''});
  this.setState({rec_gmap:''});
  this.setState({rec_pincode:''});

  
}
if(no == 7){
  this.setState({same_selected_pickup:true})
  this.setState({new_selected_pickup:false})

  this.setState({sender_contact_person_name:this.state.customer_name});
  this.setState({sender_contact_person_no:this.state.customer_no});

}
if(no == 8){
  this.setState({new_selected_pickup:true})
  this.setState({same_selected_pickup:false})

  this.setState({sender_contact_person_name:''});
  this.setState({sender_contact_person_no:''});
  
}

if(no == 9){
  this.setState({same_selected_delivery:true})
  this.setState({new_selected_delivery:false})

  this.setState({recievername:this.state.customer_name});
  this.setState({recieverno:this.state.customer_no});

}
if(no == 10){
  this.setState({new_selected_delivery:true})
  this.setState({same_selected_delivery:false})

  this.setState({recievername:''});
  this.setState({recieverno:''});
  
}

if(no == 11){
  this.setState({normal_selected:true})
  this.setState({bullet_selected:false})

  this.setState({delivery_type:"NORMAL"});
 

}
if(no == 12){
  this.setState({normal_selected:false})
  this.setState({bullet_selected:true})
  
  this.setState({delivery_type:"BULLET"});
 
}
if(no == 13){
  this.setState({new_customer:true})
  this.setState({existing_customer:false})
 
}
if(no == 14){
  this.setState({new_customer:false})
  this.setState({existing_customer:true})
 
}
if(no == 15){
  this.setState({same_selected:false})
  this.setState({new_selected:false})
  this.setState({select_phone:true})
  this.setState({select_pin:false})
  this.setState({sender_id:''});
  this.setState({sender_name:''});
  this.setState({sender_no:''});
  this.setState({sender_address1_np:''});
  this.setState({sender_address2_np:''});
  this.setState({sender_email:''});
  this.setState({sender_countrycode:''});
  this.setState({sender_country_id:''});
  this.setState({sender_country_np:''});
  this.setState({sender_state_np:''});
  this.setState({sender_district_np:''});
  this.setState({sender_district_id:''});
  this.setState({sender_city_np:''});
  this.setState({sender_localbody_np:''});
  this.setState({sender_landmark:''});
  this.setState({sender_gmap_np:''});
  this.setState({sender_pincode_np:''});
 
}
if(no == 16){
  this.setState({same_selected:false})
  this.setState({new_selected:false})
  this.setState({select_phone:false})
  this.setState({select_pin:true})
  this.setState({sender_id:''});
  this.setState({sender_name:''});
  this.setState({sender_no:''});
  this.setState({sender_address1_np:''});
  this.setState({sender_address2_np:''});
  this.setState({sender_email:''});
  this.setState({sender_countrycode:''});
  this.setState({sender_country_id:''});
  this.setState({sender_country_np:''});
  this.setState({sender_state_np:''});
  this.setState({sender_district_np:''});
  this.setState({sender_district_id:''});
  this.setState({sender_city_np:''});
  this.setState({sender_localbody_np:''});
  this.setState({sender_landmark:''});
  this.setState({sender_gmap_np:''});
  this.setState({sender_pincode_np:''});
 
}
if(no == 17){
this.setState({same_selected_delivery_address:false})
this.setState({new_selected_delivery_address:false})
this.setState({select_phone_page2:true})
this.setState({select_pin_page2:false})

this.setState({add1_pickup_page2:''});
this.setState({add2_pickup_page2:''});
this.setState({rec_country_code:''});
this.setState({rec_country_id:''});
this.setState({country_pickup_page2:''});
this.setState({state_pickup_page2:''});
this.setState({district_pickup_page2:''});
this.setState({rec_district_id:''});
this.setState({city_pickup_page2:''});
this.setState({local_pickup_page2:''});
this.setState({landmark_pickup_page2:''});
this.setState({glink_pickup_page2:''});
this.setState({pincode_pickup_page2:''});
}
if(no == 18){
  this.setState({same_selected_delivery_address:false})
  this.setState({new_selected_delivery_address:false})
  this.setState({select_phone_page2:false})
  this.setState({select_pin_page2:true})
  
  this.setState({add1_pickup_page2:''});
this.setState({add2_pickup_page2:''});
this.setState({rec_country_code:''});
this.setState({rec_country_id:''});
this.setState({country_pickup_page2:''});
this.setState({state_pickup_page2:''});
this.setState({district_pickup_page2:''});
this.setState({rec_district_id:''});
this.setState({city_pickup_page2:''});
this.setState({local_pickup_page2:''});
this.setState({landmark_pickup_page2:''});
this.setState({glink_pickup_page2:''});
this.setState({pincode_pickup_page2:''});
  }
  
}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////edited Nishanth/////////////////////////////////

state_click(){
  Api.fetch_request('http://109.237.25.79:6080/epex/master/country','GET','')
  .then(result => {
   
    if (result.error != true) {
        console.log('COUNTRY DATAAA',result.payload[0].countryName); 
       
        global.countries=result.payload;

        // this.setState({statename:result})
     // console.log('dataaaa',statename); 
      // Toast.show({ text: 'Uploaded success', type: 'success' });
  
     

    }
    else {
      console.log('Failed');
  
    }

  })

  Api.fetch_request('http://109.237.25.79:6080/epex/master/state','GET','')
  .then(result => {
   
    if (result.error != true) {
      global.states=result.payload;
        console.log('STATE DATAA',result); 
        // this.setState({statename:result})
    //  console.log('dataaaa',statename); 
      // Toast.show({ text: 'Uploaded success', type: 'success' });
  
     

    }
    else {
      console.log('Failed');
  
    }

  })

  Api.fetch_request('http://109.237.25.79:6080/epex/master/district/All-district','GET','')
  .then(result => {
   
    if (result.error != true) {
      global.districts=result.payload;
       // console.log('DISTRICT DATAA',result); 
        // this.setState({statename:result})
//console.log('dataaaa',statename); 
      // Toast.show({ text: 'Uploaded success', type: 'success' });
  
     

    }
    else {
      console.log('Failed');
  
    }

  })


}


   ////////////////////////edited Nishanth/////////////////




   pin_search_pickup(pin_search)
   {
     Api.fetch_request(PINCODE_SEARCH+pin_search,'GET','')
     .then(result=>{
     if (result.error != true)
     {
       console.log("OUTER COUNTRY"+global.countries);
       console.log('PINSEARCH SUCCESS:', JSON.stringify(result))
       this.setState({sender_country_np:result.payload.country})
       this.setState({sender_state_np:result.payload.state})
       this.setState({sender_district_np:result.payload.district})
       this.setState({sender_pincode_np:result.payload.pincode})
       global.countries.every(function(element, index) {
       
        if (element.countryName==result.payload.country) 
        {
         // global.country_id_pic=element.countryId;
           this.setState({country_id_new_pic:element.countryId})
        //  console.log(`COUNTRY VALUE GOT :${global.country_id_pic}`);
          console.log(`COUNTRY VALUE GOT :${this.state.country_id_new_pic}`);
          return false
        }
        else return true
      }.bind(this));
    
      global.states.every(function(element, index) {
      
       if (element.stateName==result.payload.state) 
       {
        state_id_pic=element.stateId;
        this.setState({state_id_new_pic:element.stateId})
         console.log(`STATE VALUE GOT :${state_id_pic}`);
         return false
       }
       else return true
     }.bind(this));
    
     global.districts.every(function(element, index) {
     
      if (element.districtName==result.payload.district) 
      {
        district_id_pic=element.districtId;
       this.setState({district_id_new_pic:element.districtId})
        console.log(`DISTRICT VALUE GOT :${district_id_pic}`);
        return false
      }
      else return true
    }.bind(this));
    
   
       console.log(this.state.country,this.state.state,this.state.district)
     }
     else {
       console.log('Failed');
       alert(result.message)
     }
     
     
     })
     
     
   }
//////////////////////////////////////edited Nishanth/////////////////////////////////////
pin_search(pin_search){

  Api.fetch_request(PINCODE_SEARCH+pin_search,'GET','')
  .then(result=>{
  if (result.error != true)
  {
    console.log('PINSEARCH SUCCESS:', JSON.stringify(result))
    this.setState({country:result.payload.country})
    this.setState({state:result.payload.state})
    this.setState({district:result.payload.district})
    this.setState({pincode:result.payload.pincode})
    console.log(this.state.country,this.state.state,this.state.district)
  }
  else {
    console.log('Failed');
    alert(result.message)
  }
  
  
  })
  
  
  
  
  
  }

  ///////////////////////////////////////////////edited Nishanth///////////////////////////////////////////
  pin_search_page2(pin_search){
    Api.fetch_request(PINCODE_SEARCH+pin_search,'GET','')
     .then(result=>{
     if (result.error != true)
     {
       console.log('PINSEARCH SUCCESS:', JSON.stringify(result))
       this.setState({ country_pickup_page2:result.payload.country})
       this.setState({state_pickup_page2:result.payload.state})
       this.setState({district_pickup_page2:result.payload.district})
       this.setState({pincode_pickup_page2:result.payload.pincode})
       console.log(this.state.country,this.state.state,this.state.district)
  
  
              global.countries.every(function(element, index) {
              
               if (element.countryName==result.payload.country) 
               {
                 country_id=element.countryId;
               this.setState({country_id_new:country_id})
                 console.log(`COUNTRY VALUE GOT :${country_id}`);
                 return false
               }
               else return true
             }.bind(this));
           
             global.states.every(function(element, index) {
             
              if (element.stateName==result.payload.state) 
              {
               state_id=element.stateId;
              this.setState({state_id_new:state_id})
                console.log(`STATE VALUE GOT :${state_id}`);
                return false
              }
              else return true
            }.bind(this));
           
            global.districts.every(function(element, index) {
            
             if (element.districtName==result.payload.district) 
             {
               district_id=element.districtId;
               this.setState({district_id_new:district_id})
               console.log(`DISTRICT VALUE GOT :${district_id}`);
               return false
             }
             else return true
           }.bind(this));
    
     }
     else {
       console.log('Failed');
       alert(result.message)
     }
     
     
     })
     
     
     
     
   
   
   
     }
////////////////////////////////// Date time setting function //////////////////////////////////////////////////////////////////////////////////
  date_time_setting_function(){

    // var time = moment().utcOffset('+05:30').format(' hh:mm:ss a');
    // this.setState({pickuptime:time});

    var time1 = moment().format('hh:mm A');
    this.setState({pickuptime:time1});
    this.setState({selected_time:time1});

    var date= moment().format('DD-MM-YYYY')
    this.setState({pickup_date:date});
    this.setState({selected_date:date});
    
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

    
    if(customer_id=="") {
      this.setState({hasError: true, errorTextcustomer_id: 'Provide customer id !'});
      return;
    }
    this.setState({customer_id:customer_id});

    this.setState({loader:true});
    setTimeout(()=>{this.setState({loader:false})},1000);

    Api.fetch_request(CUSTOMER_DETAILS + customer_id,'GET','')
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
        this.setState({customer_district_id : result.payload.districtId})
        this.setState({customer_city : result.payload.city})
        this.setState({customer_landmark : result.payload.landMark})
        this.setState({customer_countrycode : result.payload.countryCode})
        this.setState({customer_countryid : result.payload.countryId})
        this.setState({customer_identity_type: 'COMMON_USER'})
        this.setState({parent_user_id : '0' })
        

        this.setState({sender_id:''});
  this.setState({sender_name:''});
  this.setState({sender_no:''});
  this.setState({sender_address1:''});
  this.setState({sender_address2:''});
  this.setState({sender_email:''});
  this.setState({sender_countrycode:''});
  this.setState({sender_country_id:''});
  this.setState({sender_country:''});
  this.setState({sender_state:''});
  this.setState({sender_district:''});
  this.setState({sender_district_id :''})
  this.setState({sender_city:''});
  this.setState({sender_localbody:''});
  this.setState({sender_landmark:''});
  this.setState({sender_gmap:''});
  this.setState({sender_pincode:''});

  this.setState({sender_contact_person_name:''});
  this.setState({sender_contact_person_no:''});
  this.setState({same_selected:false,
    new_selected:true,
    same_selected_pickup:false,
    new_selected_pickup:true,})

      }
      else{
        console.log('Failed');
      
        this.setState({sender_details : ''})
        this.setState({customer_name : ''})
        this.setState({customer_no : ''})
        this.setState({customer_email : ''})
        this.setState({customer_country : ''})
        this.setState({customer_pincode :''})
        this.setState({customer_localbody : ''})
        this.setState({customer_gmap : ''})
        this.setState({customer_address1 : ''})
        this.setState({customer_address2 : ''})
        this.setState({customer_state : ''})
        this.setState({customer_district : ''})
        this.setState({customer_district_id : ''})
        this.setState({customer_city : ''})
        this.setState({customer_landmark : ''})
        this.setState({customer_countrycode : ''})
        this.setState({customer_countryid : ''})
        this.setState({customer_type: ''})

        this.setState({same_selected:false,
          new_selected:true,
          same_selected_pickup:false,
          new_selected_pickup:true,})


        
        Toast.show({ text: result.message, type: 'warning' });
      }
  })
   
  }

  ////////////////////////////// Fetching branch customer details with id function //////////////////////////////////////////////////////////////////////////////
 
  verify_branch_customer_id(customer_id) {

    if(customer_id=="") {
      this.setState({hasError: true, errorTextcustomer_id: 'Provide customer id !'});
      return;
    }

    var id= customer_id.replace('B', '');
    this.setState({customer_id:id})

    this.setState({loader:true});
    setTimeout(()=>{this.setState({loader:false})},1000);

    Api.fetch_request(BRANCH_CUSTOMER_DETAILS + id,'GET','')
    .then(result => {
      
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({sender_details : result.payload})

       this.setState({branchUserId : result.payload.branchUserId })
      //  this.setState({customer_id : result.payload.branchUserId })
       this.setState({branchUserIdCode : result.payload.branchUserIdCode })
       this.setState({parent_user_id : result.payload.parent.userId })
        this.setState({customer_name : result.payload.firstName })
        this.setState({customer_no : result.payload.mobileNumber})
        this.setState({customer_email : result.payload.email})
        this.setState({customer_country : result.payload.country})
        this.setState({customer_pincode : result.payload.pincode})
        this.setState({customer_localbody : result.payload.localBodyType})
        this.setState({customer_gmap : result.payload.gmapLink})
        this.setState({customer_address1 : result.payload.addressLine1})
        this.setState({customer_address2 : result.payload.addressLine2})
        this.setState({customer_state : result.payload.state})
        this.setState({customer_district : result.payload.district})
        this.setState({customer_district_id : result.payload.districtId})
        this.setState({customer_city : result.payload.city})
        this.setState({customer_landmark : result.payload.landMark})
        this.setState({customer_countrycode : result.payload.countryCode})
        this.setState({customer_countryid : result.payload.countryId})
        this.setState({customer_identity_type: 'BRANCH_USER'})

      }
      else{
        console.log('Failed');
      
        this.setState({sender_details : ''})
        this.setState({customer_name : ''})
        this.setState({customer_no : ''})
        this.setState({customer_email : ''})
        this.setState({customer_country : ''})
        this.setState({customer_pincode :''})
        this.setState({customer_localbody : ''})
        this.setState({customer_gmap : ''})
        this.setState({customer_address1 : ''})
        this.setState({customer_address2 : ''})
        this.setState({customer_state : ''})
        this.setState({customer_district : ''})
        this.setState({customer_city : ''})
        this.setState({customer_landmark : ''})
        this.setState({customer_countrycode : ''})
        this.setState({customer_countryid : ''})
        this.setState({customer_type: ''})
        Toast.show({ text: result.message, type: 'warning' });
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
         countries.push({name: result.payload[i].countryName , id: result.payload[i].countryId ,  code: result.payload[i].countryCode  });
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

  this.setState({sender_country_id:country_id});

    Api.fetch_request(STATE + country_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));

        var count = (result.payload).length;
        let states = [];

        for(var i = 0; i < count; i++){
          states.push({ name: result.payload[i].stateName ,  id: result.payload[i].stateId});
       }
       this.setState({states_sender: states });
      }
      else{
        console.log('Failed');
      }
  })
   
  }
  //////////////////////////////// Fetching sender district function //////////////////////////////////////////////////////////////////////////////
 
fetch_district_list_sender(state_id) {

  Api.fetch_request(DISTRICT + state_id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));


      var count = (result.payload).length;
      let district = [];

      for(var i = 0; i < count; i++){
        district.push({ name: result.payload[i].districtName ,  id: result.payload[i].districtId});
     }
     this.setState({ districts_sender : district });
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
          city.push({ name: result.payload[i].cityName });
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
         countries_reciever.push({ name: result.payload[i].countryName , id: result.payload[i].countryId ,  code: result.payload[i].countryCode  });
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

  this.setState({rec_country_id:country_id});

  this.setState({rec_country_code:country_id})
    Api.fetch_request(STATE + country_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));

        var count = (result.payload).length;
        let states_reciever = [];

        for(var i = 0; i < count; i++){
          states_reciever.push({ name: result.payload[i].stateName ,  id: result.payload[i].stateId});
       }
       this.setState({ states_reciever });
      }
      else{
        console.log('Failed');
      }
  })
   
  }

  //////////////////////////////// Fetching reciever district function //////////////////////////////////////////////////////////////////////////////
 
fetch_district_list_reciever(state_id) {

  Api.fetch_request(DISTRICT + state_id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      var count = (result.payload).length;
      let district = [];

      for(var i = 0; i < count; i++){
        district.push({ name: result.payload[i].districtName ,  id: result.payload[i].districtId});
     }
     this.setState({ districts_reciever : district});
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
        let city = [];

        for(var i = 0; i < count; i++){
          city.push({ name: result.payload[i].cityName });
       }
       this.setState({ city_reciever : city});
      }
      else{
        console.log('Failed');
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

  //////////////////////////////////// fetching package sub category function /////////////////////////////////////////////////////////////////////////////////

  fetch_package_subcategory_list(id) {

    Api.fetch_request(PACKAGE_SUB_CATEGORY+id+'/package-sub-category/active','GET','')
    .then(result => {
      if(result.error != true){
        console.log('Success:', JSON.stringify(result))

        var count = (result.payload).length;
        let package_subcategories = [];

        for(var i = 0; i < count; i++){
          package_subcategories.push({ name: result.payload[i].pkgSubCategoryName , id: result.payload[i].pkgSubCategoryId , });
       }
       this.setState({ package_subcategories });
      }
      else{
        
        console.log('Failed');
      }
  })
  }
//////////////////////////////// Fetching all customers function //////////////////////////////////////////////////////////////////////////////

fetch_customers_list() {

  Api.fetch_request(ALL_USERS,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      var count = (result.payload).length;
      let customers = [];

      for(var i = 0; i < count; i++){
       customers.push({name: result.payload[i].userId+' - '+ result.payload[i].firstName+' '+result.payload[i].lastName +' - '+result.payload[i].mobileNumber, id: result.payload[i].userId });
     }
     this.setState({ users: customers });
    }
    else{
      console.log('Failed');
    }
})
 
}
   ///////////////////////////////// Creating Order function //////////////////////////////////edited Nishanth////////////////////////////////////////////////////// 
 
create_order() {
 
  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body =
    {
      "createdAtOfficeId": 0,
      "creatorId": data.personId,
      "creatorUserType": "DELIVERY_AGENT",
      "customerId": this.state.customer_id,
      "customerIdentityType": this.state.customer_identity_type,
      "delivery": {
        "addressLine1": this.state.add1_pickup_page2_new,
        "addressLine2": this.state.add2_pickup_page2_new,
        "canBeDeliveredTo": this.state.deliveredto,
        "city": this.state.city_pickup_page2_new,
        "contactPersonCountryCode": this.state.rec_country_code,
        "contactPersonCustomerId": 0,
        "contactPersonName": this.state.recievername,
        "contactPersonNumber": this.state.recieverno,
        "country": this.state.country_pickup_page2_new,
        "countryId": this.state.rec_country_id,
        "district": this.state.district_pickup_page2_new,
        "districtId":this.state.rec_district_id,
        "gmapLink": this.state.glink_pickup_page2_new,
        "localBodyType": this.state.local_pickup_page2_new,
        "notesToCourierBoy": this.state.rec_notes,
        "pincode": this.state.pincode_pickup_page2_new,
        "proofToBeProduced": this.state.proof,
        "state": this.state.state_pickup_page2_new
      },
      "deliveryType": this.state.delivery_type,
      "isManualPickup": true,
      "isPickupRequired": true,
      "pickup": {
        "addressLine1": this.state.sender_address1_wp,
        "addressLine2": this.state.sender_address2_wp,
        "city": this.state.sender_city_new_WP,
        "contactPersonCountryCode": this.state.sender_countrycode,
        "contactPersonName": this.state.sender_contact_person_name,
        "contactPersonNumber": this.state.sender_contact_person_no,
        "country": this.state.sender_country_new_WP,
        "countryId": this.state.sender_country_id,
        "district": this.state.sender_district_new_WP,
        "districtId":this.state.sender_district_id,
        "gmapLink": this.state.sender_gmap_wp,
        "localBodyType": this.state.sender_localbody_wp,
        "notesToCourierBoy": this.state.sender_notes,
        "pickupDate": this.state.selected_date,
        "pickupTime": this.state.selected_time,
        "pincode": this.state.pincode_new_wp,
        "state": this.state.sender_state_new_WP
      }
    }


    Api.fetch_request(ORDER, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          Toast.show({ text: result.message, type: 'success' });
          this.setState({order_id:JSON.stringify(result.payload.orderId)});
          this.setState({active_page:3});
          this.fetching_order_details();

        }
        else {
          console.log('Failed');
          if(result.message === 'epex/master/office/destination-point/{pincode} - pickupOffice ->No content available now'){
            Toast.show({ text: "No office available for this pickup pincode", type: 'warning' });
          }
          else if(result.message === 'epex/master/office/destination-point/{pincode} - deliveryOffice -> No content available now'){
            Toast.show({ text: "No office available for this delivery pincode", type: 'warning' });
          }
            else{
            Toast.show({ text:result.message , type: 'warning' });
          }
        }
      })
  }));
}

  ///////////////////////////////// Creating shipment box function //////////////////edited Nishanth////////////////////////////////////////////////////////////////////// 
 
create_shipment_box() {

  if(this.state.Shipment_weight==="") {
    this.setState({hasError: true, errorTextshipment_weight: 'Please fill !'});
    return;
  }
  if(this.state.Shipment_length==="") {
    this.setState({hasError: true, errorTextshipment_length: 'Please fill !'});
    return;
  }

  if(this.state.Shipment_width==="") {
    this.setState({hasError: true, errorTextshipment_width: 'Please fill !'});
    return;
  }
  if(this.state.Shipment_height==="") {
    this.setState({hasError: true, errorTextshipment_height: 'Please fill !'});
    return;
  }
  if(this.state.Shipment_category_id==="") {
    this.setState({hasError: true, errorTextshipment_category_id: 'Please select category !'});
    return;
  }
  if(this.state.Shipment_subcategory_id==="") {
    this.setState({hasError: true, errorTextshipment_subcategory_id: 'Please select sub category !'});
    return;
  }
 
  this.setState({shipment_view:false})

  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = {
      "destinationCountry":this.state.country_pickup_page2_new,
      "destinationDistrictId":this.state.rec_district_id,
      "height": this.state.Shipment_height,
      "isApprox": true,
      "length": this.state.Shipment_length,
      "orderId": this.state.order_id,
      "parentUserId": this.state.parent_user_id,
      "shipmentBoxId": 0,
      "shipmentCategoryId": this.state.Shipment_category_id,
      "shipmentSubCategoryId": this.state.Shipment_subcategory_id,
      "sourceCountry": this.state.sender_country_new_WP,
      "sourceDistrictId": this.state.sender_district_id,
      "weight": this.state.Shipment_weight,
      "width": this.state.Shipment_width

    };

    Api.fetch_request(SHIPMENT_BOX, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success Create:', JSON.stringify(result));
          Toast.show({ text: result.message, type: 'success' });
          this.submitAndClear();
          this.fetching_order_details();

        }
        else {
          console.log('Failed');
          this.create_cost_checklist();
        }
      })
  }));
}

///////////////////////////////// Creating cost checklist function //////////////////////////////////////////////////////////////////////////////////////// 
 
create_cost_checklist() {

  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = 
      {
        "bulletDeliveryCost": 0,
        "costChecklistId": 0,
        "createdById": data.personId,
        "createdByUserType": "DELIVERY_AGENT",
        "destinationCountryId": this.state.rec_country_id,
        "destinationDistrictId": this.state.rec_district_id,
        "fromHeight": this.state.Shipment_height,
        "fromLength": this.state.Shipment_length,
        "fromWeight": this.state.Shipment_weight,
        "fromWidth": this.state.Shipment_width,
        "normalDeliveryCost": 0,
        "shipmentCostTemplateId": 0,
        "sourceCountryId": this.state.sender_country_id,
        "sourceDistrictId": this.state.sender_district_id,
        "toHeight": this.state.Shipment_height,
        "toLength": this.state.Shipment_length,
        "toWeight": this.state.Shipment_weight,
        "toWidth": this.state.Shipment_width,
      };

    Api.fetch_request(COST_CHECKLIST, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          Toast.show({ text: result.message, type: 'success' });
          this.submitAndClear();
          this.fetching_order_details();

        }
        else {
          console.log('Failed');
          Toast.show({ text: result.message, type: 'warning' });
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

  if(this.state.order_id==="") {
    alert("you have to create order and add shipment first")
    return;
  }

  Api.fetch_request(DELIVERY_CHARGE + this.state.order_id ,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      this.setState({active_page:4});

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

  if(this.state.gst_no !="") {
  if(!this.verifyAlphanumeric((this.state.gst_no).trim())) {
    this.setState({hasError: true, errorTextgst_no: 'Please enter a valid GST no!'});
    return;
  }
}
  // if(this.state.invoice_des==="") {
  //   this.setState({hasError: true, errorTextinvoice_des: 'Please fill !'});
  //   return;
  // }

  if(this.state.product_cost==="") {
    this.setState({hasError: true, errorTextproduct_cost: 'Please fill !'});
    return;
  }
  if(!this.verifyNumber((this.state.product_cost).trim())) {
    this.setState({hasError: true, errorTextproduct_cost: 'Please enter a valid cost!'});
    return;
  }

  if(this.state.cod_credit_blnc==="") {
    this.setState({hasError: true, errorTextcod_credit_blnc: 'Please fill !'});
    return;
  }
  if(!this.verifyNumber((this.state.cod_credit_blnc).trim())) {
    this.setState({hasError: true, errorTextcod_credit_blnc: 'Please enter a valid credit!'});
    return;
  }
    
  if(parseInt(this.state.cod_credit_blnc) > parseInt(this.state.product_cost)){
    this.setState({hasError: true, errorTextcod_credit_blnc: 'Credit should not be greater than product cost'});
    return;
  }

 
    let body = {
      "codCreditBalance": this.state.cod_credit_blnc,
      "invoiceDescription": this.state.invoice_des,
      "orderId": this.state.order_id,
      "productCost": this.state.product_cost,
      "receiverGSTNumber": this.state.gst_no

    };

    Api.fetch_request(ADD_COD, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

         this.setState({final_cod_charge:result.payload.finalCodCharge})
          console.log('Success:', JSON.stringify(result));
         

        }
        else {
          console.log('Failed');
          alert(result.message)
        }
      })

}

///////////////////////////////////////// Payer payment function  //////////////////////////////////////////////////////////////////////////////////

payer_payment() {

  console.log('DATTTTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfirst',this.state.country_code);

  if(this.state.payment_name==="") {
    this.setState({hasError: true, errorTextpayment_name: 'Please fill !'});
    return;
  }
  if(!this.verifyString((this.state.payment_name).replace(/ /g, '').trim())) {
    this.setState({hasError: true, errorTextpayment_name: 'Please enter a valid name !'});
    return;
  }
  if(this.state.payment_phone==="") {
    this.setState({hasError: true, errorTextpayment_phone: 'Please fill !'});
    return;
  }
  
  if(!this.verifyNumber((this.state.payment_phone).trim())) {
    this.setState({hasError: true, errorTextpayment_phone: 'Please enter a valid number!'});
    return;
  }
  if(this.state.payment_phone.length < 10) {
    this.setState({hasError: true, errorTextpayment_phone: 'Minimum 10 digit !'});
    return;
  }
  if(this.state.country_code==="") {
    this.setState({hasError: true, errorTextpayment_location: 'Please fill !'});
    return;
  }
  // if(this.state.payment_comment==="") {
  //   this.setState({hasError: true, errorTextpayment_comment: 'Please fill !'});
  //   return;
  // }
  console.log('DATTTTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',this.state.country_code);
    let body = {
      "deliveryChargePaymentBySender": this.state.deliveryChargePaymentBySender,
      "orderId": this.state.order_id,
      "payerComment": this.state.payment_comment,
      "payerContactNumber": this.state.payment_phone,
     "payerCountryCode": this.state.rec_country_code,
     "payerLocation": this.state.country_code,
     "payerName": this.state.payment_name

    };

    
    Api.fetch_request(PAYER_PAYMENT, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
        
          this.setState({ payments: result.payload })
          this.setState({ save_clicked:true, cod_check:false })
          this.setState({sender_payment:JSON.stringify(result.payload.payableBySender)})
          this.setState({receiver_payment:JSON.stringify(result.payload.payableByReceiver)})
          Toast.show({ text: 'Saved', type: 'success' });

        }
        else {
          console.log('Failed');
         
        }
      })
}

////////////////////////////////// Balance calculating fuction /////////////////////////////////////////////////////////////////////////////////////

balanceCalculate(text){

  var myInt = parseInt(text);
  var payment=parseInt(this.state.sender_payment)
  var bal=myInt-payment;
  var bal1=payment-myInt;

  if(myInt==payment){
    this.setState({balance_amount:'0',amount_payed:this.state.amount_recieved,amount_to_pay:'0'});
  }else if(myInt>payment){
    this.setState({balance_amount:''+bal,amount_payed:''+payment, amount_to_pay:'0'});
  }else{
    this.setState({balance_amount:'0',amount_payed:''+myInt, amount_to_pay:''+bal1});
  }
 

}

///////////////////////////////////////// Payment by cash function  //////////////////////////////////////////////////////////////////////////////////

cash_payment() {

  if(this.state.amount_recieved==="" && this.state.payments.payableBySender > 0) {
    this.setState({hasError: true, errorTextamount_recieved: 'Please fill !'});
    return;
  }

  let body = {
    "amountPayed": this.state.amount_payed,
    "isAmountCollectedByDeliveryBoy": false,
    "orderId": this.state.order_id,

  };

  Api.fetch_request(PAYMENT_BY_CASH, 'POST', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        Toast.show({ text: result.message, type: 'success' });
        Actions.dashboard();

      }
      else {
        console.log('Failed');
        Toast.show({ text: result.message, type: 'warning' });
        
      }
    })
}
///////////////////////////////// file upload function //////////////////////////////////////////////////////////////////////////////////////// 
 
productcost_file_upload() {

  if(this.state.shipment_total==="") {
    this.setState({hasError: true, errorTextshipment_total: 'Please fill !'});
    return;
  }
  let formData = [];

  Api.fetch_request(PRODUCT_BILL_UPLOAD+this.state.order_id+'/e-way-bill-produced/'+this.state.shipment_total, 'PUT', { "Content-Type": "multipart/form-data" }, formData)
    .then(result => {
      setTimeout(() => {
      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        // Toast.show({ text: 'Uploaded success', type: 'success' });
        this.generate_invoice();
       

      }
      else {
        console.log('Failed');
        Toast.show({ text: 'Someting went wrong', type: 'warning' });
      }

    })
 }, 100);
}

////////////////////////////// Fetching order details function //////////////////////////////////////////////////////////////////////////////
  
fetching_order_details() {

  Api.fetch_request(ORDER_TRACKING + this.state.order_id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));
      this.setState({order_track_details : result.payload})


    }
    else{
      console.log('Failed');
    }
})
 
}

//////////////////////////////////  Signup function /////////////////////////////////////////////////////////////////////////////////////

signup() {


  if(this.state.fname==="") {
    this.setState({hasError: true, errorTextfname: 'Please fill !'});
    return;
  }
  if(!this.verifyString((this.state.fname).trim())) {
    this.setState({hasError: true, errorTextfname: 'Please enter a valid name !'});
    return;
  }
  if(this.state.lname==="") {
    this.setState({hasError: true, errorTextlname: 'Please fill !'});
    return;
  }
  if(!this.verifyString((this.state.lname).trim())) {
    this.setState({hasError: true, errorTextlname: 'Please enter a valid name !'});
    return;
  }
  if(this.state.customer_type==="") {
    this.setState({hasError: true, errorTextcustype: 'Please select customer type !'});
    return;
  }
  if(this.state.email==="") {
    this.setState({hasError: true, errorTextemail: 'Please fill !'});
    return;
  }
  if(!this.verifyEmail((this.state.email).trim())) {
    this.setState({hasError: true, errorTextemail: 'Please enter a valid email address !'});
    return;
  }
 
  if(this.state.country==="") {
    this.setState({hasError: true, errorTextcountry: 'Please select country !'});
    return;
  }
  if(this.state.state==="") {
    this.setState({hasError: true, errorTextstate: 'Please select state !'});
    return;
  }
  if(this.state.city==="") {
    this.setState({hasError: true, errorTextcity: 'Please select city !'});
    return;
  }
  if(this.state.district==="") {
    this.setState({hasError: true, errorTextdistrict: 'Please fill !'});
    return;
  }
  if(!this.verifyString((this.state.district).trim())) {
    this.setState({hasError: true, errorTextdistrict: 'Please enter a valid data !'});
    return;
  }
  if(this.state.pincode==="") {
    this.setState({hasError: true, errorTextpincode: 'Please fill !'});
    return;
  }
  if(this.state.pincode.length<6) {
    this.setState({hasError: true, errorTextpincode: 'minimum 6 digit !'});
    return;
  }
  // if(this.state.gst==="") {
  //   this.setState({hasError: true, errorTextgst: 'Please fill !'});
  //   return;
  // }
  if(this.state.gst !="") {
  if(!this.verifyAlphanumeric((this.state.gst).trim())) {
    this.setState({hasError: true, errorTextgs: 'Please enter a valid GST number!'});
    return;
  }
}
  if(this.state.address1==="") {
    this.setState({hasError: true, errorTextaddress1: 'Please fill !'});
    return;
  }
  if(this.state.address2==="") {
    this.setState({hasError: true, errorTextaddress2: 'Please fill !'});
    return;
  }
  // if(this.state.localbody==="") {
  //   this.setState({hasError: true, errorTextlocalbody: 'Please fill !'});
  //   return;
  // }
  if(this.state.localbody !="") {
  if(!this.verifyString((this.state.localbody).trim())) {
    this.setState({hasError: true, errorTextlocalbody: 'Please enter a valid data !'});
    return;
  }
}
  if(this.state.landmark==="") {
    this.setState({hasError: true, errorTextlandmark: 'Please fill !'});
    return;
  }
  // if(this.state.gmaplink==="") {
  //   this.setState({hasError: true, errorTextgmap: 'Please fill !'});
  //   return;
  // }
  if(this.state.gmaplink !="") {
  if(!this.verifyGmap((this.state.gmaplink).trim())) {
    this.setState({hasError: true, errorTextgmap: 'Please enter a valid link !'});
    return;
  }
}
  if(this.state.mobile==="") {
    this.setState({hasError: true, errorTextmobile: 'Please fill !'});
    return;
  }
  if(!this.verifyNumber((this.state.mobile).trim())) {
    this.setState({hasError: true, errorTextmobile: 'Please enter a valid number!'});
    return;
  }
  if(this.state.otp==="") {
    this.setState({hasError: true, errorTextverify: 'Please fill !'});
    return;
  }
  if(this.state.otp_verified != true) {
    this.setState({hasError: true, errorTextverify: 'You have to verify OTP!'});
    return;
  }
  if(this.state.password==="") {
    this.setState({hasError: true, errorTextpass: 'Please fill !'});
    return;
  }
  if(this.state.password.length < 6) {
    this.setState({hasError: true, errorTextpass: 'Passwords must contains at least 6 characters !'});
    return;
  }
  if(this.state.conformpassword==="") {
    this.setState({hasError: true, errorTextconformpass: 'Please fill !'});
    return;
  }
  if(this.state.password != this.state.conformpassword) {
    this.setState({hasError: true, errorTextconformpass: 'Password mismatch'});
    return;
  }
  
  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

  let body={
    
      "addressLine1": this.state.address1,
      "addressLine2": this.state.address2,
      "city": this.state.city,
      "country": this.state.country,
      "countryCode": this.state.countrycode,
      "countryId": this.state.country_id,
      "createdBy": data.personId,
      "creatorUserType": "DELIVERY_AGENT",
      "customerType": this.state.customer_type,
      "district": this.state.district,
      "districtId": this.state.district_id,
      "emailId": this.state.email,
      "firstName": this.state.fname,
      "gmapLink": this.state.gmaplink,
      "gstNumber": this.state.gst,
      "landMark": this.state.landmark,
      "lastName": this.state.lname,
      "localBodyType": this.state.localbody,
      "mobileNumber": this.state.mobile,
      "password": this.state.password,
      "pincode": this.state.pincode,
      "state": this.state.state,
      "userId": 0
};

console.log('BODYYYYYYYYYYYYYY:', body);
  Api.fetch_request(USER_REGISTRATION,'POST','',JSON.stringify(body))
  .then(result => {
   

    if(result.error != true){

    console.log('Success:', JSON.stringify(result));
    Toast.show({ text: result.message, type: 'success' });

    this.setState({customer_id:result.payload.userId,
      customer_name:result.payload.firstName +" "+ result.payload.lastName,
      customer_no:result.payload.mobileNumber,
      customer_address1:result.payload.addressLine1,
      customer_address2:result.payload.addressLine2,
      customer_email:result.payload.emailId,
      customer_countrycode:result.payload.countryCode,
      customer_countryid:result.payload.countryId,
      customer_country:result.payload.country,
      customer_state:result.payload.state,
      customer_district:result.payload.district,
      customer_district_id :result.payload.districtId,
      customer_city:result.payload.city,
      customer_localbody:result.payload.localBodyType,
      customer_landmark:result.payload.landMark,
      customer_gmap:result.payload.gmapLink,
      customer_pincode:result.payload.pincode,
      customer_identity_type:'COMMON_USER',
      parent_userId:result.payload.parentUserId,
    });


    }
    else{
      console.log('Failed');
      Toast.show({ text: result.message, type: 'warning' });
      
    }
  })
 
}));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

render(){

  // const [modalVisible, setModalVisible] = useState(false);

    var left = (
        <Left style={{ flex: 1 }}>
          <Button onPress={() => Actions.pop()} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='md-close' />
            </Button>
        </Left>
      );


    return(
  
        <Container>

{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} title="Ship a new Package" />
        
        <KeyboardAvoidingScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps = 'always'>

 

{/*////////////////////// main view //////////////////////////////////////////////// */}

<View style={{justifyContent:"center",alignItems:"center"
    }}>
    <Modal
       transparent={true}
      
  visible={this.state.modalVisible}
      backdropOpacity={0.1}
     
      style={styles.model}
    //  animationIn={"fadeIn"}
    //  animationOut={"fadeOut"}
     >
      <View style={{height:150,width:300,justifyContent:"center",alignItems:"center",
    backgroundColor:"white",borderRadius:7}}>
        <View>
        <CustomText text={'Select type of orders'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<View style={{flexDirection:"row"}}>
<CustomButton title={'Single Order'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.setState({active_page:2})}/>

<CustomButton title={'Bulk Order'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.pin_search(this.state.picode_search)}/>

          </View>
        </View>
      </View>
    </Modal>
    </View>






{/* ///////////////////////////////////////////////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>

        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginBottom:SECTION_MARGIN_TOP}}>

<TouchableOpacity  style={{ width:30,height:30,borderRadius:30/2,backgroundColor:this.state.active_page == 1 ? Colors.darkSkyBlue : Colors.gray,justifyContent:'center',}}><Text style={{textAlign:'center',color:Colors.white}}>1</Text></TouchableOpacity>
<TouchableOpacity  style={{ width:30,height:30,borderRadius:30/2,backgroundColor:this.state.active_page == 2 ? Colors.darkSkyBlue : Colors.gray,justifyContent:'center',}}><Text style={{textAlign:'center',color:Colors.white}}>2</Text></TouchableOpacity>
<TouchableOpacity  style={{ width:30,height:30,borderRadius:30/2,backgroundColor:this.state.active_page == 3 ? Colors.darkSkyBlue : Colors.gray,justifyContent:'center',}}><Text style={{textAlign:'center',color:Colors.white}}>3</Text></TouchableOpacity>
<TouchableOpacity  style={{ width:30,height:30,borderRadius:30/2,backgroundColor:this.state.active_page == 4 ? Colors.darkSkyBlue : Colors.gray,justifyContent:'center',}}><Text style={{textAlign:'center',color:Colors.white}}>4</Text></TouchableOpacity>

</View>

{this.state.active_page === 1 && (<View>
{/* /////////////////////////// Sender Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING}}>

<View style={{marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Sender Details'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
<View>
<View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'New Customer'} selectedColor={Colors.darkSkyBlue} selected={this.state.new_customer} onPress={()=>this.isSelected(13)}/>
         <CustomRadioButton title={'Existing Customer'} selectedColor={Colors.darkSkyBlue} selected={this.state.existing_customer} onPress={()=>this.isSelected(14)}/>
         </View>

       {this.state.new_customer===true && 
       ( <View style={{marginLeft:4,flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}} >
         <CheckBox
         tintColors={{ true: '#185DD7' }}
      value={this.state.checked}
      onValueChange={() => this.setState({ checked: !this.state.checked })}
    />
     <Text style={{fontSize:14,marginTop:5}}>Continue with search by Pincode?</Text>
     
     </View>) } 
        
       {this.state.checked ?
        ( <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({picode_search: text})} value={this.state.picode_search} keyboardType={'number-pad'}  />
        <CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.pin_search(this.state.picode_search)}/>
        </View>)  : undefined}

        </View>
  {/*/////////////////////////////////////////// Registration Block //////////////////////////////////////////////// */}

        {this.state.new_customer === true && ( <View style={{marginTop:SECTION_MARGIN_TOP}}>   

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'First Name'}  borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) =>{ this.setState({fname: text , errorTextfname:""})}} value={this.state.fname} />
          {!!this.state.errorTextfname && (<Text style={{color: 'red'}}>{this.state.errorTextfname}</Text>)}
        </View>

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Second Name'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({lname: text, errorTextlname:""})} value={this.state.lname} />
          {!!this.state.errorTextlname && (<Text style={{color: 'red'}}>{this.state.errorTextlname}</Text>)}
        </View>

        <View style={{}}>
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Customer Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
          {/* <CustomDropdown data={this.state.customers} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({customer_type:value, errorTextcustype:""}) }, 500); }} /> */}
          <CustomSearchBox onTextChange={(text)=>{setTimeout(()=>{this.setState({customer_type: text})},0)}} value={this.state.customer_type} placeholder={'Select customer type'} onItemSelect={(item) =>{ setTimeout(() => {this.setState({customer_type:item.name , errorTextcustype:""});}, 500); }} items={this.state.customers} />
          {!!this.state.errorTextcustype && (<Text style={{color: 'red'}}>{this.state.errorTextcustype}</Text>)}
        </View>

       

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Email Id'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({email: text , errorTextemail:""})} value={this.state.email} />
          {!!this.state.errorTextemail && (<Text style={{color: 'red'}}>{this.state.errorTextemail}</Text>)}
        </View>
        <View style={{flexDirection:'row'}}>

    <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
    <CustomMandatory/></View>

    <CustomSearchBox onTextChange={(text)=>{setTimeout(()=>{this.setState({country: text})},0)}} value={this.state.country} placeholder={'Select country'} onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list(item.id) ; this.setState({country:item.name , errorTextcountry:""}) ; this.setState({countrycode:item.code}); }, 500); }} items={this.state.countries} />
   {!!this.state.errorTextcountry && (<Text style={{color: 'red'}}>{this.state.errorTextcountry}</Text>)}
   <View style={{flexDirection:'row'}}>

   <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
   <CustomMandatory/></View>

    <CustomSearchBox onTextChange={(text)=> this.setState({state: text})} value={this.state.state} placeholder={'Select state'} onItemSelect={(item) =>{ setTimeout(() => {this.fetch_district_list(item.id); this.fetch_city_list(item.id) ; this.setState({state:item.name , errorTextstate:""}) }, 500); }}  items={this.state.states} />
    {!!this.state.errorTextstate && (<Text style={{color: 'red'}}>{this.state.errorTextstate}</Text>)}
    <View style={{flexDirection:'row'}}>

    <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
    <CustomMandatory/></View>

      <CustomSearchBox onTextChange={(text)=> this.setState({district: text })} value={this.state.district} placeholder={'Select city'} onItemSelect={(item) =>{ setTimeout(() => { this.setState({district:item.name, district_id:item.id , errorTextdistrict:""}) }, 500); }} items={this.state.districts} />
      {!!this.state.errorTextdistrict && (<Text style={{color: 'red'}}>{this.state.errorTextdistrict}</Text>)}
      <View style={{flexDirection:'row'}}>

      <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
      <CustomMandatory/></View>

      {this.state.checked?(<View>
                <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({city: text})} value={this.state.city} />

          </View>):
          (<View>
      <CustomSearchBox onTextChange={(text)=> this.setState({city: text})} value={this.state.city} placeholder={'Select city'} onItemSelect={(item) =>{ setTimeout(() => { this.setState({city:item.name , errorTextcity:""}) }, 500); }} items={this.state.cities} />
    {!!this.state.errorTextcity && (<Text style={{color: 'red'}}>{this.state.errorTextcity}</Text>)}


          </View>)}


  
        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Pincode'}  maxLength={10} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({pincode: text, errorTextpincode:""})} value={this.state.pincode} />
          {!!this.state.errorTextpincode && (<Text style={{color: 'red'}}>{this.state.errorTextpincode}</Text>)}
        </View>

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'GST No.'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({gst: text, errorTextgst:""})} value={this.state.gst} />
          {!!this.state.errorTextgst && (<Text style={{color: 'red'}}>{this.state.errorTextgst}</Text>)}
        </View>

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Address Line1'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({address1: text, errorTextaddress1:""})} value={this.state.address1} />
          {!!this.state.errorTextaddress1 && (<Text style={{color: 'red'}}>{this.state.errorTextaddress1}</Text>)}
        </View>

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Address Line2'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({address2: text, errorTextaddress2:""})} value={this.state.address2} />
          {!!this.state.errorTextaddress2 && (<Text style={{color: 'red'}}>{this.state.errorTextaddress2}</Text>)}
        </View>

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Municipality/Panchayath/Corporation'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({localbody: text, errorTextlocalbody:""})} value={this.state.localbody} />
          {!!this.state.errorTextlocalbody && (<Text style={{color: 'red'}}>{this.state.errorTextlocalbody}</Text>)}
        </View>

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Landmark'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({landmark: text, errorTextlandmark:""})} value={this.state.landmark} />
          {!!this.state.errorTextlandmark && (<Text style={{color: 'red'}}>{this.state.errorTextlandmark}</Text>)}
        </View>

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Gmap Link'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({gmaplink: text , errorTextgmap:""})} value={this.state.gmaplink} />
          {!!this.state.errorTextgmap && (<Text style={{color: 'red'}}>{this.state.errorTextgmap}</Text>)}
        </View>

        <View style={styles.input}>
        <View style={{flex:6}}><CustomInput backgroundColor={Colors.white} flex={1} maxLength={12} keyboardType={'phone-pad'} placeholder={'Mobile Number'} onChangeText={(text) => this.setState({mobile: text , errorTextmobile:""})} value={this.state.mobile}   /></View>
        <View style={{flex:3}}><CustomButton title={'SEND OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.mobileno_validation()}/></View>
        </View>
        {!!this.state.errorTextmobile && (<Text style={{color: 'red'}}>{this.state.errorTextmobile}</Text>)}

        <View style={styles.input}>
        <View style={{flex:5}}><CustomInput backgroundColor={Colors.white} flex={1} keyboardType={'number-pad'} placeholder={'Enter OTP'} onChangeText={(text) => this.setState({otp: text, errorTextverify:""})} value={this.state.otp}   /></View>
       {this.state.otp_verified === false &&(<View style={{flex:3}}><CustomButton title={'VERIFY OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.verify_otp(this.state.otp)}/></View>)}
        </View>
        {!!this.state.errorTextverify && (<Text style={{color: 'red'}}>{this.state.errorTextverify}</Text>)}

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Password'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({password: text, errorTextpass:""})} value={this.state.password} />
          {!!this.state.errorTextpass && (<Text style={{color: 'red'}}>{this.state.errorTextpass}</Text>)}
        </View>

        <View style={{marginTop:SECTION_MARGIN_TOP}}>
          <CustomInput flex={1} placeholder={'Conform Password'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({conformpassword: text, errorTextconformpass:""})} value={this.state.conformpassword} />
          {!!this.state.errorTextconformpass && (<Text style={{color: 'red'}}>{this.state.errorTextconformpass}</Text>)}
        </View>
 

          <View >
           <CustomButton  title={'Register'} fontSize={FOURTH_FONT} onPress={()=>this.signup()} borderRadius={SHORT_BLOCK_BORDER_RADIUS}/>
          </View>
    
          </View>)}

  {/*/////////////////////////////////////////// Acivity indicator Block //////////////////////////////////////////////// */}

 { this.state.loader === true && (<View style={{justifyContent:'center'}}>
        <CustomActivityIndicator/>
        </View>)}


        {this.state.existing_customer === true && ( <View>
        <CustomText text={'Customer Id'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
    <CustomSearchBox  placeholder={'Select customers'} onTextChange={(text)=>this.setState({customer_id: text})}  value={this.state.customer_id}  onItemSelect={(item) =>{ if(item.id.charAt(0)=='B'){this.verify_branch_customer_id(item.id)}else{this.verify_customer_id(item.id)}}} items={this.state.users} />
    
        {/* <View style={{flexDirection:'row',borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <View style={{flex:6}}><CustomInput backgroundColor={Colors.white} onChangeText={(text) => this.setState({customer_id: text, errorTextcustomer_id:''})} value={this.state.customer_id}  flex={1} /></View>
        <View style={{flex:2}}><CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>{if(this.state.customer_id.charAt(0)=='B'){this.verify_branch_customer_id(this.state.customer_id)}else{this.verify_customer_id(this.state.customer_id)}}}/></View>
        </View> */}
        {!!this.state.errorTextcustomer_id && (<Text style={{color: 'red'}}>{this.state.errorTextcustomer_id}</Text>)}
       
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
        <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_gmap} />
        <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_address1} />
        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_address2} />
        <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_state} />
        <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_district} />
        <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_city} />
        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_landmark} />

        </View>)}

</View>


{this.state.customer_name != '' && (<View>
{/* /////////////////////////// Sender Address //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>

<View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Pickup Address'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>

        
         <CustomRadioButton title={'Same as contact address'} selectedColor={Colors.darkSkyBlue} selected={this.state.same_selected} onPress={()=>this.isSelected(3)}/>
         <CustomRadioButton title={'Enter new pickup address'} selectedColor={Colors.darkSkyBlue} selected={this.state.new_selected} onPress={()=>this.isSelected(4)}/>
         <CustomRadioButton title={'Search by contact number'} selectedColor={Colors.darkSkyBlue} selected={this.state.select_phone} onPress={()=>this.isSelected(15)}/>
         <CustomRadioButton title={'Search by Pincode'} selectedColor={Colors.darkSkyBlue} selected={this.state.select_pin} onPress={()=>this.isSelected(16)}/>

         {/* <View style={{marginLeft:4,flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}} >
         <CheckBox
         tintColors={{ true: '#185DD7' }}
      value={this.state.checked2}
      onValueChange={() => this.setState({ checked2: !this.state.checked2 })}
    />
     <Text style={{fontSize:14,marginTop:5}}>Search by contact number</Text>
     
         </View>

       {this.state.checked2 ?
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

</View>)  : undefined}
  */}
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



{/* /////////////////////////////////////////////pin/////////////////////edited Nishanth///////////////////////////////////////////////// */}
{ this.state.select_pin === true && (<View>
  <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({picode_search: text})} value={this.state.picode_search} keyboardType={'number-pad'}  />
        <CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.pin_search_pickup(this.state.picode_search)}/>
        </View>
<View style={{flexDirection:'row'}}>
<CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomSearchBox
fontSizeInput={12}
onTextChange={(text)=>this.setState({sender_country_np: text})} 
value={this.state.sender_country_np} 
color={Colors.white}
placeholder={'Select country'} 
onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list_sender(item.id) ; this.setState({sender_country_np:item.name , errorTextsender_country:""}) ; this.setState({sender_countrycode:item.code}); }, 500); }} 
items={this.state.countries_sender} />

{/* <CustomSearchableDropdown
placeholder={'Select country'} 
onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list_sender(item.id) ; this.setState({sender_country:item.name , errorTextsender_country:""}) ; this.setState({sender_countrycode:item.code}); }, 500); }} 
items={this.state.countries_sender} /> */}


{/* <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomDropdown data={this.state.countries_sender} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_state_list_sender(data[index]['id']) ; this.setState({sender_country:value , errorTextsender_country:""}) ; this.setState({sender_countrycode:data[index]['code']}); }, 500); }} />
        {!!this.state.errorTextsender_country && (<Text style={{color: 'red'}}>{this.state.errorTextsender_country}</Text>)} */}
<View style={{flexDirection:'row'}}>
        <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomSearchBox
          fontSizeInput={12}
          onTextChange={(text)=> this.setState({sender_state_np: text})} 
          color={Colors.white}
          value={this.state.sender_state_np} 
          placeholder={'Select state'} 
          onItemSelect={(item) =>{ setTimeout(() => { this.fetch_district_list_sender(item.id); this.fetch_city_list_sender(item.id) ; this.setState({sender_state_np:item.name , errorTextsender_state:""}) }, 500); }} 
          items={this.state.states_sender} />
        {/* <CustomDropdown data={this.state.states_sender} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_city_list_sender(data[index]['id']) ; this.setState({sender_state:value , errorTextsender_state:""}) }, 500); }} /> */}
        {!!this.state.errorTextsender_state && (<Text style={{color: 'red'}}>{this.state.errorTextsender_state}</Text>)}
        <View style={{flexDirection:'row'}}>
        <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        {/* <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_district: text , errorTextsender_district:""})} value={this.state.sender_district} /> */}
        <CustomMandatory/></View>
        <CustomSearchBox
          fontSizeInput={12}
          onTextChange={(text)=> this.setState({sender_district_np: text})} 
          color={Colors.white}
          value={this.state.sender_district_np} 
          placeholder={'Select district'} 
          onItemSelect={(item) =>{ setTimeout(() => { this.setState({sender_district_np:item.name, sender_district_id:item.id , errorTextsender_district:""}) }, 500); }} 
          items={this.state.districts_sender} />
        {!!this.state.errorTextsender_district && (<Text style={{color: 'red'}}>{this.state.errorTextsender_district}</Text>)}
        <View style={{flexDirection:'row'}}>
        <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomSearchBox
          fontSizeInput={12}
          onTextChange={(text)=> this.setState({sender_city_np: text})} 
          color={Colors.white}
          value={this.state.sender_city_np} 
          placeholder={'Select city'} 
          onItemSelect={(item) =>{ setTimeout(() => { this.setState({sender_city_np:item.name , errorTextsender_city:""}) }, 500); }} 
          items={this.state.cities_sender} />
        {/* <CustomDropdown data={this.state.cities_sender} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({sender_city:value , errorTextsender_city:""}) }, 500); }} /> */}
        {!!this.state.errorTextsender_city && (<Text style={{color: 'red'}}>{this.state.errorTextsender_city}</Text>)}

       
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_pincode_np: text , errorTextsender_pincode:""})} value={this.state.sender_pincode_np} />
        {!!this.state.errorTextsender_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextsender_pincode}</Text>)}

        <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_gmap_np: text, errorTextsender_gmap:""})} value={this.state.sender_gmap_np} />
        {!!this.state.errorTextsender_gmap && (<Text style={{color: 'red'}}>{this.state.errorTextsender_gmap}</Text>)}
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
       <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_address1_np: text , errorTextsender_address1:""})} value={this.state.sender_address1_np} />
       {!!this.state.errorTextsender_address1 && (<Text style={{color: 'red'}}>{this.state.errorTextsender_address1}</Text>)}
       <View style={{flexDirection:'row'}}>
      <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
      <CustomMandatory/></View>
      <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_address2_np: text , errorTextsender_address2:""})} value={this.state.sender_address2_np} />
      {!!this.state.errorTextsender_address2 && (<Text style={{color: 'red'}}>{this.state.errorTextsender_address2}</Text>)}

      <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
      <CustomInput flex={1} placeholder={'Eg:Municipality/Panchayath/Corporation'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_localbody_np: text , errorTextsender_localbody:""})} value={this.state.sender_localbody_np} />
      {!!this.state.errorTextsender_localbody && (<Text style={{color: 'red'}}>{this.state.errorTextsender_localbody}</Text>)}

      <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
      <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_landmark_np: text , errorTextsender_landmark:""})} value={this.state.sender_landmark_np} />
      {!!this.state.errorTextsender_landmark && (<Text style={{color: 'red'}}>{this.state.errorTextsender_landmark}</Text>)}

</View>)}




{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
{/* ////////////////////////////////////////////////phone////////////////////////////edited Nishanth/////////////////////////////////////////////// */}
{ this.state.select_phone === true && (<View>
  <View style={{flexDirection:'row'}}>
  <CustomText text={'Country code'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
  <CustomMandatory/></View>
<View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
<CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({country_code: text})} value={this.state.country_code}  />
</View>
<View style={{flexDirection:'row'}}>
<CustomText text={'Phone number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
<CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({phone_search: text})} value={this.state.phone_search} keyboardType={'number-pad'}  />
<CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.phonenumber_search(this.state.country_code,this.state.phone_search)}/>
</View>
<View style={{flexDirection:'row'}}>
<CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomSearchBox
fontSizeInput={12}
onTextChange={(text)=>this.setState({sender_country_np: text})} 
value={this.state.sender_country_np} 
color={Colors.white}
placeholder={'Select country'} 
onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list_sender(item.id) ; this.setState({sender_country_np:item.name , errorTextsender_country:""}) ; this.setState({sender_countrycode:item.code}); }, 500); }} 
items={this.state.countries_sender} />

{/* <CustomSearchableDropdown
placeholder={'Select country'} 
onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list_sender(item.id) ; this.setState({sender_country:item.name , errorTextsender_country:""}) ; this.setState({sender_countrycode:item.code}); }, 500); }} 
items={this.state.countries_sender} /> */}


{/* <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomDropdown data={this.state.countries_sender} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_state_list_sender(data[index]['id']) ; this.setState({sender_country:value , errorTextsender_country:""}) ; this.setState({sender_countrycode:data[index]['code']}); }, 500); }} />
        {!!this.state.errorTextsender_country && (<Text style={{color: 'red'}}>{this.state.errorTextsender_country}</Text>)} */}
<View style={{flexDirection:'row'}}>
        <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomSearchBox
          fontSizeInput={12}
          onTextChange={(text)=> this.setState({sender_state_np: text})} 
          color={Colors.white}
          value={this.state.sender_state_np} 
          placeholder={'Select state'} 
          onItemSelect={(item) =>{ setTimeout(() => { this.fetch_district_list_sender(item.id); this.fetch_city_list_sender(item.id) ; this.setState({sender_state_np:item.name , errorTextsender_state:""}) }, 500); }} 
          items={this.state.states_sender} />
        {/* <CustomDropdown data={this.state.states_sender} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_city_list_sender(data[index]['id']) ; this.setState({sender_state:value , errorTextsender_state:""}) }, 500); }} /> */}
        {!!this.state.errorTextsender_state && (<Text style={{color: 'red'}}>{this.state.errorTextsender_state}</Text>)}
        <View style={{flexDirection:'row'}}>
        <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        {/* <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_district: text , errorTextsender_district:""})} value={this.state.sender_district} /> */}
        <CustomSearchBox
          fontSizeInput={12}
          onTextChange={(text)=> this.setState({sender_district_np: text})} 
          color={Colors.white}
          value={this.state.sender_district_np} 
          placeholder={'Select district'} 
          onItemSelect={(item) =>{ setTimeout(() => { this.setState({sender_district_np:item.name, sender_district_id:item.id , errorTextsender_district:""}) }, 500); }} 
          items={this.state.districts_sender} />
        {!!this.state.errorTextsender_district && (<Text style={{color: 'red'}}>{this.state.errorTextsender_district}</Text>)}
        <View style={{flexDirection:'row'}}>
        <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomSearchBox
          fontSizeInput={12}
          onTextChange={(text)=> this.setState({sender_city_np: text})} 
          color={Colors.white}
          value={this.state.sender_city_np} 
          placeholder={'Select city'} 
          onItemSelect={(item) =>{ setTimeout(() => { this.setState({sender_city_np:item.name , errorTextsender_city:""}) }, 500); }} 
          items={this.state.cities_sender} />
        {/* <CustomDropdown data={this.state.cities_sender} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({sender_city:value , errorTextsender_city:""}) }, 500); }} /> */}
        {!!this.state.errorTextsender_city && (<Text style={{color: 'red'}}>{this.state.errorTextsender_city}</Text>)}

       
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_pincode_np: text , errorTextsender_pincode:""})} value={this.state.sender_pincode_np} />
        {!!this.state.errorTextsender_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextsender_pincode}</Text>)}

        <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_gmap_np: text, errorTextsender_gmap:""})} value={this.state.sender_gmap_np} />
        {!!this.state.errorTextsender_gmap && (<Text style={{color: 'red'}}>{this.state.errorTextsender_gmap}</Text>)}
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
       <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_address1_np: text , errorTextsender_address1:""})} value={this.state.sender_address1_np} />
       {!!this.state.errorTextsender_address1 && (<Text style={{color: 'red'}}>{this.state.errorTextsender_address1}</Text>)}
       <View style={{flexDirection:'row'}}>
      <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
      <CustomMandatory/></View>
      <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_address2_np: text , errorTextsender_address2:""})} value={this.state.sender_address2_np} />
      {!!this.state.errorTextsender_address2 && (<Text style={{color: 'red'}}>{this.state.errorTextsender_address2}</Text>)}

      <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
      <CustomInput flex={1} placeholder={'Eg:Municipality/Panchayath/Corporation'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_localbody_np: text , errorTextsender_localbody:""})} value={this.state.sender_localbody_np} />
      {!!this.state.errorTextsender_localbody && (<Text style={{color: 'red'}}>{this.state.errorTextsender_localbody}</Text>)}

      <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
      <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_landmark_np: text , errorTextsender_landmark:""})} value={this.state.sender_landmark_np} />
      {!!this.state.errorTextsender_landmark && (<Text style={{color: 'red'}}>{this.state.errorTextsender_landmark}</Text>)}

</View>)}




 {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
 { this.state.new_selected === true && (<View>
  <View style={{flexDirection:'row'}}>
  <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
  <CustomMandatory/></View>
  <CustomSearchBox
  fontSizeInput={12}
  onTextChange={(text)=>this.setState({sender_country_np: text})} 
  value={this.state.sender_country_np} 
  color={Colors.white}
  placeholder={'Select country'} 
  onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list_sender(item.id) ; this.setState({sender_country_np:item.name , errorTextsender_country:""}) ; this.setState({sender_countrycode:item.code}); }, 500); }} 
  items={this.state.countries_sender} />
  
  {/* <CustomSearchableDropdown
  placeholder={'Select country'} 
  onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list_sender(item.id) ; this.setState({sender_country:item.name , errorTextsender_country:""}) ; this.setState({sender_countrycode:item.code}); }, 500); }} 
  items={this.state.countries_sender} /> */}


  {/* <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomDropdown data={this.state.countries_sender} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_state_list_sender(data[index]['id']) ; this.setState({sender_country:value , errorTextsender_country:""}) ; this.setState({sender_countrycode:data[index]['code']}); }, 500); }} />
          {!!this.state.errorTextsender_country && (<Text style={{color: 'red'}}>{this.state.errorTextsender_country}</Text>)} */}
<View style={{flexDirection:'row'}}>
          <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomSearchBox
            fontSizeInput={12}
            onTextChange={(text)=> this.setState({sender_state_np: text})} 
            color={Colors.white}
            value={this.state.sender_state_np} 
            placeholder={'Select state'} 
            onItemSelect={(item) =>{ setTimeout(() => { this.fetch_district_list_sender(item.id); this.fetch_city_list_sender(item.id) ; this.setState({sender_state_np:item.name , errorTextsender_state:""}) }, 500); }} 
            items={this.state.states_sender} />
          {/* <CustomDropdown data={this.state.states_sender} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_city_list_sender(data[index]['id']) ; this.setState({sender_state:value , errorTextsender_state:""}) }, 500); }} /> */}
          {!!this.state.errorTextsender_state && (<Text style={{color: 'red'}}>{this.state.errorTextsender_state}</Text>)}
          <View style={{flexDirection:'row'}}>
          <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          {/* <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_district: text , errorTextsender_district:""})} value={this.state.sender_district} /> */}
          <CustomSearchBox
            fontSizeInput={12}
            onTextChange={(text)=> this.setState({sender_district_np: text})} 
            color={Colors.white}
            value={this.state.sender_district_np} 
            placeholder={'Select district'} 
            onItemSelect={(item) =>{ setTimeout(() => { this.setState({sender_district_np:item.name, sender_district_id:item.id , errorTextsender_district:""}) }, 500); }} 
            items={this.state.districts_sender} />
          {!!this.state.errorTextsender_district && (<Text style={{color: 'red'}}>{this.state.errorTextsender_district}</Text>)}
          <View style={{flexDirection:'row'}}>
          <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomSearchBox
            fontSizeInput={12}
            onTextChange={(text)=> this.setState({sender_city_np: text})} 
            color={Colors.white}
            value={this.state.sender_city_np} 
            placeholder={'Select city'} 
            onItemSelect={(item) =>{ setTimeout(() => { this.setState({sender_city_np:item.name , errorTextsender_city:""}) }, 500); }} 
            items={this.state.cities_sender} />
          {/* <CustomDropdown data={this.state.cities_sender} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({sender_city:value , errorTextsender_city:""}) }, 500); }} /> */}
          {!!this.state.errorTextsender_city && (<Text style={{color: 'red'}}>{this.state.errorTextsender_city}</Text>)}

          <View style={{flexDirection:'row'}}>

          <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_pincode_np: text , errorTextsender_pincode:""})} value={this.state.sender_pincode_np} />
          {!!this.state.errorTextsender_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextsender_pincode}</Text>)}

          <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
       
       
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_gmap_np: text, errorTextsender_gmap:""})} value={this.state.sender_gmap_np} />
          {!!this.state.errorTextsender_gmap && (<Text style={{color: 'red'}}>{this.state.errorTextsender_gmap}</Text>)}
          <View style={{flexDirection:'row'}}>

          <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
         <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_address1_np: text , errorTextsender_address1:""})} value={this.state.sender_address1_np} />
         {!!this.state.errorTextsender_address1 && (<Text style={{color: 'red'}}>{this.state.errorTextsender_address1}</Text>)}
         <View style={{flexDirection:'row'}}>
        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_address2_np: text , errorTextsender_address2:""})} value={this.state.sender_address2_np} />
        {!!this.state.errorTextsender_address2 && (<Text style={{color: 'red'}}>{this.state.errorTextsender_address2}</Text>)}

        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} placeholder={'Eg:Municipality/Panchayath/Corporation'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_localbody_np: text , errorTextsender_localbody:""})} value={this.state.sender_localbody_np} />
        {!!this.state.errorTextsender_localbody && (<Text style={{color: 'red'}}>{this.state.errorTextsender_localbody}</Text>)}

        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_landmark_np: text , errorTextsender_landmark:""})} value={this.state.sender_landmark_np} />
        {!!this.state.errorTextsender_landmark && (<Text style={{color: 'red'}}>{this.state.errorTextsender_landmark}</Text>)}

</View>)}



</View>
{/* /////////////////////////// Pickup Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>

<View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Pickup Details'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
        <CustomRadioButton title={'Same as contact details'} selectedColor={Colors.darkSkyBlue} selected={this.state.same_selected_pickup} onPress={()=>this.isSelected(7)}/>
         <CustomRadioButton title={'Enter new pickup details'} selectedColor={Colors.darkSkyBlue} selected={this.state.new_selected_pickup} onPress={()=>this.isSelected(8)}/>

      {this.state.same_selected_pickup == true && (<View>

        <CustomText text={'Contact Person Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_contact_person_name} />

        <CustomText text={'Contact Person Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_contact_person_no} />


      </View>)}



      {this.state.new_selected_pickup == true && (<View>
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Contact Person Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({sender_contact_person_name: text, errorTextsender_contactname:""})} value={this.state.sender_contact_person_name}/>
        {!!this.state.errorTextsender_contactname && (<Text style={{color: 'red'}}>{this.state.errorTextsender_contactname}</Text>)}
          <View style={{flexDirection:'row'}}>
        <CustomText text={'Contact Person Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput keyboardType={"phone-pad"} maxLength={12} borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({sender_contact_person_no: text, errorTextsender_contactno:""})} value={this.state.sender_contact_person_no}/>
        {!!this.state.errorTextsender_contactno && (<Text style={{color: 'red'}}>{this.state.errorTextsender_contactno}</Text>)}
        
        </View>)}

        <CustomText text={'Notes to Courier Boy'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({sender_notes: text})} value={this.state.sender_notes}/>

        <CustomText text={'Pickup Date'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <TouchableOpacity onPress={() => this.showPicker("date")}>
         <DatePickerAndroidCustom backgroundColor={'#fff'} elevation={8} mode={"date"}date={this.state.selected_date} place_holder={this.state.pickup_date} />
        </TouchableOpacity>
        {!!this.state.errorTextpickupdate && (<Text style={{color: 'red'}}>{this.state.errorTextpickupdate}</Text>)}


        <CustomText text={'Pickup Time'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <TouchableOpacity onPress={() => this.showPicker("time")}>
        <DatePickerAndroidCustom backgroundColor={'#fff'} elevation={8} mode={"time"} date={this.state.selected_time} place_holder={this.state.pickuptime} />
        </TouchableOpacity>

</View>

</View>)}

{this.state.loading === true ? (<View>
<CustomActivityIndicator/>
</View>): undefined}

<CustomButton title={'Continue'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.pickup_continue() } />

</View>)}

{this.state.active_page === 2 && (<View>
{/*/////////////////////////// Delivery Address //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Address'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
    
          <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Local'} selectedColor={Colors.darkSkyBlue} selected={true}/>
         <CustomRadioButton title={'Global'} selectedColor={Colors.darkSkyBlue} selected={false}/>
         </View>

         <CustomText text={'Delivery Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Normal'} selectedColor={Colors.darkSkyBlue} selected={this.state.normal_selected} onPress={()=>this.isSelected(11)}/>
         <CustomRadioButton title={'Bullet'} selectedColor={Colors.darkSkyBlue} selected={this.state.bullet_selected} onPress={()=>this.isSelected(12)}/>
         </View>

         <View style={{marginTop:SECTION_MARGIN_TOP}}>
         <CustomRadioButton title={'Same as contact address'} selectedColor={Colors.darkSkyBlue} selected={this.state.same_selected_delivery_address} onPress={()=>this.isSelected(5)}/>
         <CustomRadioButton title={'Enter new delivery address'} selectedColor={Colors.darkSkyBlue} selected={this.state.new_selected_delivery_address} onPress={()=>this.isSelected(6)}/>
         <CustomRadioButton title={'search by contact number'} selectedColor={Colors.darkSkyBlue} selected={this.state.select_phone_page2} onPress={()=>this.isSelected(17)}/>
         <CustomRadioButton title={'search by pincode'} selectedColor={Colors.darkSkyBlue} selected={this.state.select_pin_page2} onPress={()=>this.isSelected(18)}/>
      
      
      
        </View>

 
 { this.state.same_selected_delivery_address === true && (<View>
  <View style={{flexDirection:'row'}}>
        <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
         <CustomInput flex={1} value={this.state.rec_country} />
         <View style={{flexDirection:'row'}}>
          <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomInput flex={1} value={this.state.rec_state} />
          <View style={{flexDirection:'row'}}>
          <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomInput flex={1} value={this.state.rec_city} />
          <View style={{flexDirection:'row'}}>
          <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomInput flex={1} value={this.state.rec_district} />
          <View style={{flexDirection:'row'}}>
         <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
       
<CustomMandatory/></View>
         <CustomInput flex={1} value={this.state.rec_pincode} />
         
          <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} value={this.state.rec_gmap} />
          <View style={{flexDirection:'row'}}>
          <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomInput flex={1} value={this.state.rec_address1} />
          <View style={{flexDirection:'row'}}>
        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1} value={this.state.rec_address2} />

        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.rec_localbody} />

        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.rec_landmark} />
        
   </View>)}
   {/* //////////////////////////////////////////////////////pin///////////////////////edited Nishanth/////////////////////// */}
   { this.state.select_pin_page2 === true && (<View>

    <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({picode_search: text})} value={this.state.picode_search} keyboardType={'number-pad'}  />
        <CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.pin_search_page2(this.state.picode_search)}/>
        </View>



        <View style={{flexDirection:'row'}}>
        <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>

<CustomSearchBox
fontSizeInput={12}
onTextChange={(text)=> this.setState({country_pickup_page2: text})} 
color={Colors.white}
value={this.state.country_pickup_page2} 
placeholder={'Select country'} 
onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list_reciever(item.id) ; this.setState({country_pickup_page2:item.name , errorTextrec_country:""}) ; this.setState({rec_country_code:item.code}); }, 500); }} 
items={this.state.countries_reciever} />
{/* <CustomDropdown data={this.state.countries_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_state_list_reciever(data[index]['id']) ; this.setState({rec_country:value , errorTextrec_country:""}); this.setState({rec_country_code:data[index]['code']}); }, 500); }} /> */}
{!!this.state.errorTextrec_country && (<Text style={{color: 'red'}}>{this.state.errorTextrec_country}</Text>)}
<View style={{flexDirection:'row'}}>
<CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomSearchBox
  fontSizeInput={12}
  onTextChange={(text)=> this.setState({state_pickup_page2: text})} 
  color={Colors.white}
  value={this.state.state_pickup_page2} 
  placeholder={'Select state'} 
  onItemSelect={(item) =>{ setTimeout(() => { this.fetch_district_list_reciever(item.id); this.fetch_city_list_reciever(item.id) ; this.setState({state_pickup_page2:item.name , errorTextrec_state:""}) }, 500); }} 
  items={this.state.states_reciever} />

{/* <CustomDropdown data={this.state.states_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_city_list_reciever(data[index]['id']) ; this.setState({rec_state:value , errorTextrec_state:""}) }, 500); }} /> */}
{!!this.state.errorTextrec_state && (<Text style={{color: 'red'}}>{this.state.errorTextrec_state}</Text>)}
<View style={{flexDirection:'row'}}>

<CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
{/* <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_district: text, errorTextrec_district:""})} value={this.state.rec_district} /> */}
<CustomSearchBox
  fontSizeInput={12}
  onTextChange={(text)=> this.setState({district_pickup_page2: text})} 
  color={Colors.white}
  value={this.state.district_pickup_page2} 
  placeholder={'Select district'} 
  onItemSelect={(item) =>{ setTimeout(() => { this.setState({district_pickup_page2:item.name, rec_district_id:item.id , errorTextrec_district:""}) }, 500); }} 
  items={this.state.districts_reciever} />
{!!this.state.errorTextrec_district && (<Text style={{color: 'red'}}>{this.state.errorTextrec_district}</Text>)}
<View style={{flexDirection:'row'}}>
<CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomSearchBox
  fontSizeInput={12}
  onTextChange={(text)=> this.setState({city_pickup_page2: text})} 
  color={Colors.white}
  value={this.state.city_pickup_page2} 
  placeholder={'Select city'} 
  onItemSelect={(item) =>{ setTimeout(() => { this.setState({city_pickup_page2:item.name , errorTextrec_city:""}) }, 500); }} 
  items={this.state.city_reciever} />
{/* <CustomDropdown data={this.state.city_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({rec_city:value , errorTextrec_city:""}) }, 500); }} /> */}
{!!this.state.errorTextrec_city && (<Text style={{color: 'red'}}>{this.state.errorTextrec_city}</Text>)}


<View style={{flexDirection:'row'}}>
<CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({pincode_pickup_page2: text , errorTextrec_pincode:""})} value={this.state.pincode_pickup_page2} />
{!!this.state.errorTextrec_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextrec_pincode}</Text>)}

<CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({glink_pickup_page2: text, errorTextrec_gmap:""})} value={this.state.glink_pickup_page2} />
{!!this.state.errorTextrec_gmap && (<Text style={{color: 'red'}}>{this.state.errorTextrec_gmap}</Text>)}
<View style={{flexDirection:'row'}}>
<CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({add1_pickup_page2: text , errorTextrec_address1:""})} value={this.state.add1_pickup_page2} />
{!!this.state.errorTextrec_address1 && (<Text style={{color: 'red'}}>{this.state.errorTextrec_address1}</Text>)}
<View style={{flexDirection:'row'}}>
<CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({add2_pickup_page2: text, errorTextrec_address2:""})} value={this.state.add2_pickup_page2} />
{!!this.state.errorTextrec_address2 && (<Text style={{color: 'red'}}>{this.state.errorTextrec_address2}</Text>)}

<CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomInput flex={1} placeholder={'Eg:Municipality/Panchayath/Corporation'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({local_pickup_page2: text, errorTextrec_localbody:""})} value={this.state.local_pickup_page2} />
{!!this.state.errorTextrec_localbody && (<Text style={{color: 'red'}}>{this.state.errorTextrec_localbody}</Text>)}

<CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({landmark_pickup_page2: text, errorTextrec_landmark:""})} value={this.state.landmark_pickup_page2} />
{!!this.state.errorTextrec_landmark && (<Text style={{color: 'red'}}>{this.state.errorTextrec_landmark}</Text>)}  
 

</View>)}

   {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}
   {/* //////////////////////////////////////////////////////////////////phone//////////////edited Nishanth////////////////////////////// */}
   { this.state.select_phone_page2 === true && (<View>
    <View style={{flexDirection:'row'}}>

    <CustomText text={'Country code'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
    <CustomMandatory/></View>
<View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
<CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({country_code: text})} value={this.state.country_code}  />
</View>
<View style={{flexDirection:'row'}}>

<CustomText text={'Phone number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
<CustomInput backgroundColor={Colors.white} width={150} onChangeText={(text) => this.setState({phone_search: text})} value={this.state.phone_search} keyboardType={'number-pad'}  />
<CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.phonenumber_search_page2(this.state.country_code,this.state.phone_search)}/>
</View>

<View style={{flexDirection:'row'}}>
<CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomSearchBox
fontSizeInput={12}
onTextChange={(text)=> this.setState({country_pickup_page2: text})} 
color={Colors.white}
value={this.state.country_pickup_page2} 
placeholder={'Select country'} 
onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list_reciever(item.id) ; this.setState({country_pickup_page2:item.name , errorTextrec_country:""}) ; this.setState({rec_country_code:item.code}); }, 500); }} 
items={this.state.countries_reciever} />
{/* <CustomDropdown data={this.state.countries_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_state_list_reciever(data[index]['id']) ; this.setState({rec_country:value , errorTextrec_country:""}); this.setState({rec_country_code:data[index]['code']}); }, 500); }} /> */}
{!!this.state.errorTextrec_country && (<Text style={{color: 'red'}}>{this.state.errorTextrec_country}</Text>)}
<View style={{flexDirection:'row'}}>
<CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomSearchBox
  fontSizeInput={12}
  onTextChange={(text)=> this.setState({state_pickup_page2: text})} 
  color={Colors.white}
  value={this.state.state_pickup_page2} 
  placeholder={'Select state'} 
  onItemSelect={(item) =>{ setTimeout(() => { this.fetch_district_list_reciever(item.id); this.fetch_city_list_reciever(item.id) ; this.setState({state_pickup_page2:item.name , errorTextrec_state:""}) }, 500); }} 
  items={this.state.states_reciever} />

{/* <CustomDropdown data={this.state.states_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_city_list_reciever(data[index]['id']) ; this.setState({rec_state:value , errorTextrec_state:""}) }, 500); }} /> */}
{!!this.state.errorTextrec_state && (<Text style={{color: 'red'}}>{this.state.errorTextrec_state}</Text>)}
<View style={{flexDirection:'row'}}>
<CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
{/* <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_district: text, errorTextrec_district:""})} value={this.state.rec_district} /> */}
<CustomSearchBox
  fontSizeInput={12}
  onTextChange={(text)=> this.setState({district_pickup_page2: text})} 
  color={Colors.white}
  value={this.state.district_pickup_page2} 
  placeholder={'Select district'} 
  onItemSelect={(item) =>{ setTimeout(() => { this.setState({district_pickup_page2:item.name, rec_district_id:item.id , errorTextrec_district:""}) }, 500); }} 
  items={this.state.districts_reciever} />
{!!this.state.errorTextrec_district && (<Text style={{color: 'red'}}>{this.state.errorTextrec_district}</Text>)}
<View style={{flexDirection:'row'}}>
<CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomSearchBox
  fontSizeInput={12}
  onTextChange={(text)=> this.setState({city_pickup_page2: text})} 
  color={Colors.white}
  value={this.state.city_pickup_page2} 
  placeholder={'Select city'} 
  onItemSelect={(item) =>{ setTimeout(() => { this.setState({city_pickup_page2:item.name , errorTextrec_city:""}) }, 500); }} 
  items={this.state.city_reciever} />
{/* <CustomDropdown data={this.state.city_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({rec_city:value , errorTextrec_city:""}) }, 500); }} /> */}
{!!this.state.errorTextrec_city && (<Text style={{color: 'red'}}>{this.state.errorTextrec_city}</Text>)}

<View style={{flexDirection:'row'}}>

<CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({pincode_pickup_page2: text , errorTextrec_pincode:""})} value={this.state.pincode_pickup_page2} />
{!!this.state.errorTextrec_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextrec_pincode}</Text>)}

<CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({glink_pickup_page2: text, errorTextrec_gmap:""})} value={this.state.glink_pickup_page2} />
{!!this.state.errorTextrec_gmap && (<Text style={{color: 'red'}}>{this.state.errorTextrec_gmap}</Text>)}
<View style={{flexDirection:'row'}}>
<CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({add1_pickup_page2: text , errorTextrec_address1:""})} value={this.state.add1_pickup_page2} />
{!!this.state.errorTextrec_address1 && (<Text style={{color: 'red'}}>{this.state.errorTextrec_address1}</Text>)}
<View style={{flexDirection:'row'}}>

<CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomMandatory/></View>
<CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({add2_pickup_page2: text, errorTextrec_address2:""})} value={this.state.add2_pickup_page2} />
{!!this.state.errorTextrec_address2 && (<Text style={{color: 'red'}}>{this.state.errorTextrec_address2}</Text>)}

<CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomInput flex={1} placeholder={'Eg:Municipality/Panchayath/Corporation'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({local_pickup_page2: text, errorTextrec_localbody:""})} value={this.state.local_pickup_page2} />
{!!this.state.errorTextrec_localbody && (<Text style={{color: 'red'}}>{this.state.errorTextrec_localbody}</Text>)}

<CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({landmark_pickup_page2: text, errorTextrec_landmark:""})} value={this.state.landmark_pickup_page2} />
{!!this.state.errorTextrec_landmark && (<Text style={{color: 'red'}}>{this.state.errorTextrec_landmark}</Text>)}  

</View>)}


{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
   { this.state.new_selected_delivery_address === true && (<View>
    <View style={{flexDirection:'row'}}>
          <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomSearchBox
  fontSizeInput={12}
  onTextChange={(text)=> this.setState({rec_country: text})} 
  color={Colors.white}
  value={this.state.rec_country} 
  placeholder={'Select country'} 
  onItemSelect={(item) =>{ setTimeout(() => { this.fetch_state_list_reciever(item.id) ; this.setState({rec_country:item.name , errorTextrec_country:""}) ; this.setState({rec_country_code:item.code}); }, 500); }} 
  items={this.state.countries_reciever} />
          {/* <CustomDropdown data={this.state.countries_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_state_list_reciever(data[index]['id']) ; this.setState({rec_country:value , errorTextrec_country:""}); this.setState({rec_country_code:data[index]['code']}); }, 500); }} /> */}
          {!!this.state.errorTextrec_country && (<Text style={{color: 'red'}}>{this.state.errorTextrec_country}</Text>)}
          <View style={{flexDirection:'row'}}>
          <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomSearchBox
            fontSizeInput={12}
            onTextChange={(text)=> this.setState({rec_state: text})} 
            color={Colors.white}
            value={this.state.rec_state} 
            placeholder={'Select state'} 
            onItemSelect={(item) =>{ setTimeout(() => { this.fetch_district_list_reciever(item.id); this.fetch_city_list_reciever(item.id) ; this.setState({rec_state:item.name , errorTextrec_state:""}) }, 500); }} 
            items={this.state.states_reciever} />
          
          {/* <CustomDropdown data={this.state.states_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_city_list_reciever(data[index]['id']) ; this.setState({rec_state:value , errorTextrec_state:""}) }, 500); }} /> */}
          {!!this.state.errorTextrec_state && (<Text style={{color: 'red'}}>{this.state.errorTextrec_state}</Text>)}
          <View style={{flexDirection:'row'}}>
          <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          {/* <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_district: text, errorTextrec_district:""})} value={this.state.rec_district} /> */}
          <CustomSearchBox
            fontSizeInput={12}
            onTextChange={(text)=> this.setState({rec_district: text})} 
            color={Colors.white}
            value={this.state.rec_district} 
            placeholder={'Select district'} 
            onItemSelect={(item) =>{ setTimeout(() => { this.setState({rec_district:item.name, rec_district_id:item.id , errorTextrec_district:""}) }, 500); }} 
            items={this.state.districts_reciever} />
          {!!this.state.errorTextrec_district && (<Text style={{color: 'red'}}>{this.state.errorTextrec_district}</Text>)}
          <View style={{flexDirection:'row'}}>
          <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomSearchBox
            fontSizeInput={12}
            onTextChange={(text)=> this.setState({rec_city: text})} 
            color={Colors.white}
            value={this.state.rec_city} 
            placeholder={'Select city'} 
            onItemSelect={(item) =>{ setTimeout(() => { this.setState({rec_city:item.name , errorTextrec_city:""}) }, 500); }} 
            items={this.state.city_reciever} />
          {/* <CustomDropdown data={this.state.city_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({rec_city:value , errorTextrec_city:""}) }, 500); }} /> */}
          {!!this.state.errorTextrec_city && (<Text style={{color: 'red'}}>{this.state.errorTextrec_city}</Text>)}

         
          <View style={{flexDirection:'row'}}>

         <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <CustomMandatory/></View>
          <CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_pincode: text , errorTextrec_pincode:""})} value={this.state.rec_pincode} />
          {!!this.state.errorTextrec_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextrec_pincode}</Text>)}
         
          <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_gmap: text, errorTextrec_gmap:""})} value={this.state.rec_gmap} />
          {!!this.state.errorTextrec_gmap && (<Text style={{color: 'red'}}>{this.state.errorTextrec_gmap}</Text>)}
          <View style={{flexDirection:'row'}}>
          <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_address1: text , errorTextrec_address1:""})} value={this.state.rec_address1} />
        {!!this.state.errorTextrec_address1 && (<Text style={{color: 'red'}}>{this.state.errorTextrec_address1}</Text>)}
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_address2: text, errorTextrec_address2:""})} value={this.state.rec_address2} />
        {!!this.state.errorTextrec_address2 && (<Text style={{color: 'red'}}>{this.state.errorTextrec_address2}</Text>)}

        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} placeholder={'Eg:Municipality/Panchayath/Corporation'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_localbody: text, errorTextrec_localbody:""})} value={this.state.rec_localbody} />
        {!!this.state.errorTextrec_localbody && (<Text style={{color: 'red'}}>{this.state.errorTextrec_localbody}</Text>)}

        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_landmark: text, errorTextrec_landmark:""})} value={this.state.rec_landmark} />
        {!!this.state.errorTextrec_landmark && (<Text style={{color: 'red'}}>{this.state.errorTextrec_landmark}</Text>)}  
      
        </View>)}
         
</View>

{/*///////////////////////////////////////////////////////////////////////// Delivery Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Details '} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>

        <CustomRadioButton title={'Same as contact details'} selectedColor={Colors.darkSkyBlue} selected={this.state.same_selected_delivery} onPress={()=>this.isSelected(9)}/>
         <CustomRadioButton title={'Enter new delivery details'} selectedColor={Colors.darkSkyBlue} selected={this.state.new_selected_delivery} onPress={()=>this.isSelected(10)}/>
      
       
         {this.state.same_selected_delivery == true && (<View>
         
<CustomText text={'Reciever Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>

<CustomInput flex={1} value={this.state.recievername} />

<CustomText text={'Receiver Phone Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>

<CustomInput flex={1} value={this.state.recieverno} />


</View>)}



{this.state.new_selected_delivery == true && (<View>

  <View style={{flexDirection:'row'}}>
        <CustomText text={'Reciever Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recievername: text , errorTextrec_name:""})} value={this.state.recievername} />
          {!!this.state.errorTextrec_name && (<Text style={{color: 'red'}}>{this.state.errorTextrec_name}</Text>)}
          <View style={{flexDirection:'row'}}>
          <CustomText text={'Receiver Phone Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          <CustomInput flex={1} keyboardType={"phone-pad"} maxLength={12} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recieverno: text , errorTextrec_no:""})} value={this.state.recieverno} />
          {!!this.state.errorTextrec_no && (<Text style={{color: 'red'}}>{this.state.errorTextrec_no}</Text>)}


</View>)}
          <CustomText text={'Proof to be produced'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({proof: text , errorTextrec_proof:""})} value={this.state.proof} />
          {!!this.state.errorTextrec_proof && (<Text style={{color: 'red'}}>{this.state.errorTextrec_proof}</Text>)}

          <CustomText text={'Can be delivered to'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({deliveredto: text , errorTextrec_canbedelivered:""})} value={this.state.deliveredto} />
          {!!this.state.errorTextrec_canbedelivered && (<Text style={{color: 'red'}}>{this.state.errorTextrec_canbedelivered}</Text>)}

          <CustomText text={'Notes to Courier Boy'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_notes: text , errorTextrec_notes:""})} value={this.state.rec_notes} />
          {!!this.state.errorTextrec_notes && (<Text style={{color: 'red'}}>{this.state.errorTextrec_notes}</Text>)}


</View>

<CustomButton title={'Continue'} backgroundColor={Colors.darkSkyBlue} onPress={()=>{this.delivery_continue();}} />

</View>)}

{this.state.active_page === 3 && (<View>
{/*/////////////////////////// Shipment Box Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Shipment Box Details'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>

        <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Approx. Values'} selectedColor={Colors.darkSkyBlue} selected={true}/>
         {/* <CustomRadioButton title={'Exact Values'} selectedColor={Colors.darkSkyBlue} selected={false}/> */}
         </View>


         { this.state.shipment_view == true &&  (   <View style={{marginTop:SECTION_MARGIN_TOP}}>
        <CustomText text={'Shipment box'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>

         <CustomText text={'Approx. Weight'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({Shipment_weight: text, errorTextshipment_weight:""})} value={this.state.Shipment_weight} placeholder={'gm'} />
         {!!this.state.errorTextshipment_weight && (<Text style={{color: 'red'}}>{this.state.errorTextshipment_weight}</Text>)}

<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
<CustomText text={'Length'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomText text={'Width'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomText text={'Height'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}}>
<View style={{width:60}}><CustomInput keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} placeholder={'cm'} onChangeText={(text) => this.setState({Shipment_length: text , errorTextshipment_length:""})} value={this.state.Shipment_length}/>
{!!this.state.errorTextshipment_length && (<Text style={{color: 'red'}}>{this.state.errorTextshipment_length}</Text>)}
</View>
<View style={{width:60}}><CustomInput keyboardType={"number-pad"}  borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} placeholder={'cm'} onChangeText={(text) => this.setState({Shipment_width: text, errorTextshipment_width:""})} value={this.state.Shipment_width}/>
{!!this.state.errorTextshipment_width && (<Text style={{color: 'red'}}>{this.state.errorTextshipment_width}</Text>)}
</View>
<View style={{width:60}}><CustomInput keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} placeholder={'cm'} onChangeText={(text) => this.setState({Shipment_height: text , errorTextshipment_height:""})} value={this.state.Shipment_height} />
{!!this.state.errorTextshipment_height && (<Text style={{color: 'red'}}>{this.state.errorTextshipment_height}</Text>)}
</View>
</View>
{/* <CustomText text={'Approx. Distance'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({Shipment_distance: text})} value={this.state.Shipment_distance} placeholder={'kg'} />
         {!!this.state.errorTextshipment_distance && (<Text style={{color: 'red'}}>{this.state.errorTextshipment_distance}</Text>)} */}
  
        <CustomText text={'Shipment Category'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomDropdown data={this.state.package_categories} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => {this.setState({Shipment_category_id:data[index]['id'] , errorTextshipment_category_id:""}); this.fetch_package_subcategory_list(data[index]['id']); }} />
        {!!this.state.errorTextshipment_category_id && (<Text style={{color: 'red'}}>{this.state.errorTextshipment_category_id}</Text>)}

        <CustomText text={'Shipment Sub-category'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomSearchBox
  fontSizeInput={12}
  onTextChange={(text)=>{setTimeout(()=>{this.setState({shipment_sub_category: text})},0)}} 
  color={Colors.white}
  value={this.state.shipment_sub_category} 
  placeholder={'Select sub-category'} 
  onItemSelect={(item) =>{ setTimeout(() => {this.setState({shipment_sub_category:item.name,Shipment_subcategory_id:item.id, errorTextshipment_subcategory_id:"" }) }, 500); }} 
  items={this.state.package_subcategories} />
        {/* <CustomDropdown label={'select sub-category'} data={this.state.package_subcategories} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => {this.setState({Shipment_subcategory_id:data[index]['id'], errorTextshipment_subcategory_id:"" }) }} /> */}
        {!!this.state.errorTextshipment_subcategory_id && (<Text style={{color: 'red'}}>{this.state.errorTextshipment_subcategory_id}</Text>)}

        </View>)}
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} height={30} onPress={()=>this.create_shipment_box()} />
        <CustomButton title={'Add Shipment'} backgroundColor={Colors.darkSkyBlue} height={30} onPress={()=>this.add_shipment_box()} />
         </View>

         <CustomText text={'No. of Shipmentbox you added'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={String(this.state.order_track_details.noOfShipmentBoxes)} editable={false} />

         <CustomText text={'Considered value of all shipments'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} keyboardType={'number-pad'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({shipment_total: text, errorTextshipment_total:""})} value={this.state.shipment_total} />
        {!!this.state.errorTextshipment_total && (<Text style={{color: 'red'}}>{this.state.errorTextshipment_total}</Text>)}

{this.state.order_track_details.noOfShipmentBoxes >0 && (<View><CustomButton title={'Generate Invoice'} text_color={Colors.darkSkyBlue} borderColor={Colors.darkSkyBlue} borderWidth={1} backgroundColor={Colors.white} onPress={()=>this.productcost_file_upload()}/>
 </View>)}

</View>

</View>)}

{this.state.active_page === 4 && (<View>
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

        {this.state.cod_check === true &&(  <View style={{marginTop:SECTION_MARGIN_TOP, flexDirection:'row'}}>
          <CustomCheckBox color={Colors.buttonBackgroundColor} onPress={()=>{if(this.state.checked_cod==true){this.setState({checked_cod:false})}else{this.setState({checked_cod:true})}}} checked={this.state.checked_cod}/>
          <CustomText text={'COD'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'} paddingLeft={1} mTop={5} />
        </View>)}



       {this.state.checked_cod === true && (<View>

        <CustomText text={'Reciever GST Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1}  borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({gst_no: text, errorTextgst_no:''})} value={this.state.gst_no} />
          {!!this.state.errorTextgst_no && (<Text style={{color: 'red'}}>{this.state.errorTextgst_no}</Text>)}

          <CustomText text={'Invoice Description'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({invoice_des: text, errorTextinvoice_des:''})} value={this.state.invoice_des} />
          {!!this.state.errorTextinvoice_des && (<Text style={{color: 'red'}}>{this.state.errorTextinvoice_des}</Text>)}
          <View style={{flexDirection:'row'}}>

          <CustomText text={'Product Cost'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>

          <CustomInput flex={1} keyboardType={"phone-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({product_cost: text , errorTextproduct_cost:''})} value={this.state.product_cost} />
          {!!this.state.errorTextproduct_cost && (<Text style={{color: 'red'}}>{this.state.errorTextproduct_cost}</Text>)}
          <View style={{flexDirection:'row'}}>

          <CustomText text={'COD Credit balance'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>

          <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({cod_credit_blnc: text, errorTextcod_credit_blnc:''})} value={this.state.cod_credit_blnc} />
          {!!this.state.errorTextcod_credit_blnc && (<Text style={{color: 'red'}}>{this.state.errorTextcod_credit_blnc}</Text>)}

          <CustomButton title={'Generate COD Invoice'} text_color={Colors.darkSkyBlue} borderColor={Colors.darkSkyBlue} borderWidth={1} backgroundColor={Colors.white} onPress={()=>this.generate_cod()}/>

          <CustomText text={'Final COD charge'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} value={this.state.final_cod_charge} />

          </View>)}

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

         { this.state.deliveryChargePaymentBySender == true &&  (
                     

           <View><View style={{flexDirection:'row'}}><CustomText text={'Sender Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <CustomMandatory/></View>

          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_name: text, errorTextpayment_name:''})} value={this.state.payment_name} />
          {!!this.state.errorTextpayment_name && (<Text style={{color: 'red'}}>{this.state.errorTextpayment_name}</Text>)}
          <View style={{flexDirection:'row'}}>

          <CustomText text={'Contact number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>

          <CustomInput flex={1} keyboardType={"phone-pad"} maxLength={12} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_phone: text,errorTextpayment_phone:''})} value={this.state.payment_phone} />
          {!!this.state.errorTextpayment_phone && (<Text style={{color: 'red'}}>{this.state.errorTextpayment_phone}</Text>)}
         
          </View>)}

          { this.state.deliveryChargePaymentBySender == false &&  (
            
            <View>
                          <View style={{flexDirection:'row'}}>

              <CustomText text={'Receiver Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
              <CustomMandatory/></View>

          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_name: text, errorTextpayment_name:''})} value={this.state.payment_name} />
          {!!this.state.errorTextpayment_name && (<Text style={{color: 'red'}}>{this.state.errorTextpayment_name}</Text>)}
          <View style={{flexDirection:'row'}}>

          <CustomText text={'Contact number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>

          <CustomInput flex={1} keyboardType={"phone-pad"} maxLength={12} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_phone: text,errorTextpayment_phone:''})} value={this.state.payment_phone} />
          {!!this.state.errorTextpayment_phone && (<Text style={{color: 'red'}}>{this.state.errorTextpayment_phone}</Text>)}
         
          </View>)}

         

            
          <View style={{flexDirection:'row'}}>

          <CustomText text={'Country code'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomMandatory/></View>
          {/* <CustomText text={this.state.country_code} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/> */}
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({country_code: text, errorTextpayment_location:""})} value={this.state.country_code} />
          {!!this.state.errorTextpayment_location && (<Text style={{color: 'red'}}>{this.state.errorTextpayment_location}</Text>)}

          <CustomText text={'Comment'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({payment_comment: text,errorTextpayment_comment:''})} value={this.state.payment_comment} />
          {!!this.state.errorTextpayment_comment && (<Text style={{color: 'red'}}>{this.state.errorTextpayment_comment}</Text>)}
{this.state.save_clicked === false && (<View>
          <CustomButton title={'Save'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.payer_payment()} />
          </View>)}
          
          <CustomText text={'Payment for Sender'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} value={this.state.sender_payment} />

          <CustomText text={'Payment for Receiver'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} value={this.state.receiver_payment} />

          
</View>

{/*/////////////////////////////////////////////////// payment method Details //////////////////////////////////////////////// */}

{ this.state.payments.payableBySender > 0 && (<View>
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
          <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) =>{this.balanceCalculate(text); this.setState({amount_recieved: text})}} value={this.state.amount_recieved} />
          {!!this.state.errorTextamount_recieved && (<Text style={{color: 'red'}}>{this.state.errorTextamount_recieved}</Text>)}

          <CustomText text={'Balance Amount'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          {/* <CustomInput flex={1} keyboardType={"phone-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({balance_amount: text})} value={this.state.balance_amount} /> */}
          <CustomInput flex={1} value={this.state.balance_amount} />

          <CustomText text={'Balance To Pay'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput flex={1} value={this.state.amount_to_pay} />


</View>

<CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.cash_payment()}  />
</View>)}

{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

{ this.state.payments.payableBySender == 0 && (<View>
      <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} onPress={()=>Actions.dashboard()}  />
</View>)}

     </View>)} 
     <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
          </View>
        </KeyboardAvoidingScrollView>
       
        </Container>
    );

}
}

const styles=StyleSheet.create({
  input :{
    flexDirection:'row',
    borderColor:Colors.borderColor,
    borderWidth:SHORT_BORDER_WIDTH,
    borderRadius:SHORT_BORDER_RADIUS,
    padding:1,alignItems:'center',
    justifyContent:'space-between',
    marginTop:SECTION_MARGIN_TOP,
  },

  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088'
  },
  mainContainer: {
    flexDirection: 'column',
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
  },
  modal:{
    backgroundColor:"#00000099",
    flex:1,
    marginLeft:60,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});

