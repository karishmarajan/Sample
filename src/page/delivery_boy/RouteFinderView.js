// import React, { Component } from 'react';
// import { ScrollView,Picker,StyleSheet, SafeAreaView ,Modal, AsyncStorage, TouchableOpacity , DatePickerAndroid, TimePickerAndroid } from 'react-native';
// import { Container, View, Button, Left, Right,Icon,Text,Grid,Col,Badge, Row, DatePicker,FlatList, Toast, Item} from 'native-base';
// import { Actions } from 'react-native-router-flux';
// import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

// import Navbar from '../../component/Navbar';
// import Colors from '../../constants/Colors';
// import Strings from '../../constants/Strings';
// import CustomInput from '../../component/CustomInput';
// import CustomText from '../../component/CustomText';
// import { SECTION_MARGIN_TOP, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,LOGIN_FIELD_HEIGHT, COLUMN_PADDING,TEXT_PADDING_RIGHT, CREDIT_FIELD_HEIGHT,FOURTH_FONT,SHORT_BUTTON_HEIGHT,SHORT_BORDER_RADIUS, NORMAL_FONT, THIRD_FONT } from '../../constants/Dimen';
// import CustomButton from '../../component/CustomButton';
// import CustomDropdown from '../../component/CustomDropdown';
// import CustomRadioButton from '../../component/CustomRadioButton';
// import DatePickerAndroidCustom from '../../component/DatePickerAndroidCustom';
// import moment from 'moment';
// import RNPrint from 'react-native-print';

// import CustomCheckBox from '../../component/CustomCheckBox';
// import session, { KEY, KEY1 } from '../../session/SessionManager';
// import CustomActivityIndicator from '../../component/CustomActivityIndicator';
// import Api from '../../component/Fetch';
// import { COUNTRY , STATE , DISTRICT , CITY , COST_CHECKLIST , CUSTOMER_DETAILS ,BRANCH_CUSTOMER_DETAILS  ,PACKAGE_CATEGORY, PACKAGE_SUB_CATEGORY ,SHIPMENT_BOX, ORDER, PRODUCT_BILL_UPLOAD, DELIVERY_CHARGE, ADD_COD ,PAYER_PAYMENT, PAYMENT_BY_CASH, ORDER_TRACKING, CUSTOMER_TYPE, USER_REGISTRATION, OTP, VERIFY_OTP , MOBILE_VALIDATION, ALL_USERS,ROUTE_FINDER} from '../../constants/Api';
// import CustomSearchBox from '../../component/CustomSearchBox';
// import CustomSearchableDropdown from '../../component/CustomSearchableDropdown';



// export default class RouteFinderView extends React.Component {

//   state = {

//     loader:false,

//     pincode:this.props.newpin,
//    pin:'',
//    routeid:[],
//    routename:[],
//    destinations:[],
//    route:[],
//   };



//  ///////////////////////// Date Picker Function  /////////////////////////////////////////////////////////////////////////////////////////

//   ///////////////////////////////////  componentDidMount function ///////////////////////////////////////////////////////////////////////////

// //   componentDidMount() {
    
// //     this.fetch_country_list_sender()
// //     this.fetch_country_list_reciever()
// //     this.fetch_package_category_list()
// //     this.date_time_setting_function()

// //     this.fetch_customer_type();
// //     this.fetch_country_list();
// //     this.fetch_customers_list();
 
// //   }

//   //////////////////////////////// Fetching customer type function //////////////////////////////////////////////////////////////////////////////



//  //////////////////////////////// Fetching country function //////////////////////////////////////////////////////////////////////////////

// //  fetch_country_list() {

// //   Api.fetch_request(COUNTRY,'GET','')
// //   .then(result => {
   
// //     if(result.error != true){

// //       console.log('Success:', JSON.stringify(result));

// //       var count = (result.payload).length;
// //       let countries = [];

// //       for(var i = 0; i < count; i++){
// //        countries.push({ name: result.payload[i].countryName , id: result.payload[i].countryId ,  code: result.payload[i].countryCode  });
// //      }
// //      this.setState({ countries: countries });
// //     }
// //     else{
// //       console.log('Failed');
// //     }
// // })
 
// // }
// //////////////////////////////// Fetching sender state function //////////////////////////////////////////////////////////////////////////////

// //////////////////////////////// Fetching district city function //////////////////////////////////////////////////////////////////////////////

// //////////////////////////////// Fetching sender city function //////////////////////////////////////////////////////////////////////////////

// //////////////////////////////// customer mobile validating function //////////////////////////////////////////////////////////////////////////////

// ///////////////////////////////// Sending OTP function /////////////////////////////////////////////////////////////////////////////////////
 
// ///////////////////////////////// Verifying OTP function /////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////// Verify string function //////////////////////////////////////////////////////////////////

// ////////////////////////////////// Verify number function //////////////////////////////////////////////////////////////////

// ////////////////////////////////// Verify gmap function //////////////////////////////////////////////////////////////////

// ////////////////////////////////// Verify alphanumeric function //////////////////////////////////////////////////////////////////

// ////////////////////////////////// Verify email function //////////////////////////////////////////////////////////////////

// /////////////////////////////////// Pickup continue function //////////////////////////////////////////////////////////////

// //   pickup_continue() {

// //     if(this.state.customer_name==="") {
// //       this.setState({hasError: true, errorTextcustomer_id: 'Provide valid customer id and details !'});
// //       return;
// //     }
// //     if(this.state.sender_country==="") {
// //       this.setState({hasError: true, errorTextsender_country: 'Please select country !'});
// //       return;
// //     }
// //     if(this.state.sender_state==="") {
// //       this.setState({hasError: true, errorTextsender_state: 'Please select state !'});
// //       return;
// //     }
  
// //     if(this.state.sender_city==="") {
// //       this.setState({hasError: true, errorTextsender_city: 'Please select city !'});
// //       return;
// //     }
// //     if(this.state.sender_district==="") {
// //       this.setState({hasError: true, errorTextsender_district: 'Please fill !'});
// //       return;
// //     }
// //     if(!this.verifyString((this.state.sender_district).trim())) {
// //       this.setState({hasError: true, errorTextsender_district: 'Please enter a valid data !'});
// //       return;
// //     }
// //     if(this.state.sender_pincode==="") {
// //       this.setState({hasError: true, errorTextsender_pincode: 'Please fill !'});
// //       return;
// //     }
// //     if(this.state.sender_pincode.length<6) {
// //       this.setState({hasError: true, errorTextsender_pincode: 'Minimum 6 digit !'});
// //       return;
// //     }
// //     // if(this.state.sender_gmap==="") {
// //     //   this.setState({hasError: true, errorTextsender_gmap: 'Please fill !'});
// //     //   return;
// //     // }
// //     if(this.state.sender_gmap !="") {
// //     if(!this.verifyGmap((this.state.sender_gmap).trim())) {
// //       this.setState({hasError: true, errorTextsender_gmap: 'Please enter a valid link !'});
// //       return;
// //     }
// //   }
    
// //     if(this.state.sender_address1==="") {
// //       this.setState({hasError: true, errorTextsender_address1: 'Please fill !'});
// //       return;
// //     }
// //     if(this.state.sender_address2==="") {
// //       this.setState({hasError: true, errorTextsender_address2: 'Please fill !'});
// //       return;
// //     }
// //     // if(this.state.sender_localbody==="") {
// //     //   this.setState({hasError: true, errorTextsender_localbody: 'Please fill !'});
// //     //   return;
// //     // }
// //     if(this.state.sender_localbody !="") {
// //     if(!this.verifyString((this.state.sender_localbody).replace(/ /g, '').trim())) {
// //       this.setState({hasError: true, errorTextsender_localbody: 'Please enter a valid data !'});
// //       return;
// //     }
// //   }
// //     if(this.state.sender_landmark==="") {
// //       this.setState({hasError: true, errorTextsender_landmark: 'Please fill !'});
// //       return;
// //     }
   
// //     if(this.state.sender_contact_person_name==="") {
// //       this.setState({hasError: true, errorTextsender_contactname: 'Please fill !'});
// //       return;
// //     }
// //     if(!this.verifyString((this.state.sender_contact_person_name).replace(/ /g, '').trim())) {
// //       this.setState({hasError: true, errorTextsender_contactname: 'Please enter a valid name !'});
// //       return;
// //     }
// //     if(this.state.sender_contact_person_no==="") {
// //       this.setState({hasError: true, errorTextsender_contactno: 'Please fill !'});
// //       return;
// //     }
// //     if(this.state.selected_date==="") {
// //       this.setState({hasError: true, errorTextsender_contactno: 'Date cannot be null !'});
// //       return;
// //     }
// //     if(this.state.selected_time==="") {
// //       this.setState({hasError: true, errorTextsender_contactno: 'Time cannot be null !'});
// //       return;
// //     }
// //     if(!this.verifyNumber((this.state.sender_contact_person_no).trim())) {
// //       this.setState({hasError: true, errorTextsender_contactno: 'Please enter a valid number!'});
// //       return;
// //     }

// //     if(this.state.sender_contact_person_no.length < 10) {
// //       this.setState({hasError: true, errorTextsender_contactno: 'Minimum 10 digits !'});
// //       return;
// //     }
   
// //     console.log('Continued JJJJJJJJJJJJJJJJJ')
// //     this.setState({active_page:2});

// //   }

// /////////////////////////////////// Delivery continue function //////////////////////////////////////////////////////////////


//   ////////////////////////////////////////////////////////////////////////////////////////////////////



// ////////////////////////////////// Date time setting function //////////////////////////////////////////////////////////////////////////////////
  
// ////////////////////////////// Fetching customer details with id function //////////////////////////////////////////////////////////////////////////////
 
//   ////////////////////////////// Fetching branch customer details with id function //////////////////////////////////////////////////////////////////////////////
 
 


//   //////////////////////////////// Fetching sender country function //////////////////////////////////////////////////////////////////////////////

//   fetch_route(newpin) {

//     Api.fetch_request(ROUTE_FINDER+pincode,'GET','')
//     .then(result => {
     
//       if(result.error != true){
//         this.setState({order : result.payload})

//         // console.log('Success:', JSON.stringify(result));
//         var count = (result.payload.routeResponse).length;
        
//         console.log(count);
//         let routeid = [];
//         let routename = [];
//         let destinations = [];
//         console.log('Success55555555:', JSON.stringify(result.payload.routeResponse[0].routeId));

       
//         for(var i = 0; i < count; i++){
//           routeid.push({ value: result.payload.routeResponse[i].routeId  });
//           routename.push({ value: result.payload.routeResponse[i].routeName  });
//           destinations.push({ value: result.payload.routeResponse[i].noOfDestinations  });
//           console.log('Success:',routeid[i]+routename[i]+destinations[i]);
//        }
//        this.setState({ routeid });
//        this.setState({ routename });
//        this.setState({ destinations });
//         this.setState({order : result.payload})
//         console.log('Success:',(routeid[1]+routename[1]+destinations[1]));
//       }
//       else{
//         console.log('Failed');
//       }
//   })
   
//   }
// //////////////////////////////// Fetching sender state function //////////////////////////////////////////////////////////////////////////////


//   //////////////////////////////// Fetching sender district function //////////////////////////////////////////////////////////////////////////////
 

// //////////////////////////////// Fetching sender city function //////////////////////////////////////////////////////////////////////////////


// //////////////////////////////// Fetching reciever country function //////////////////////////////////////////////////////////////////////////////
 

// //////////////////////////////// Fetching reciever state function //////////////////////////////////////////////////////////////////////////////
 


//   //////////////////////////////// Fetching reciever district function //////////////////////////////////////////////////////////////////////////////
 



// //////////////////////////////// Fetching reciever city function //////////////////////////////////////////////////////////////////////////////
 



//   //////////////////////////////////// fetching package category function /////////////////////////////////////////////////////////////////////////////////

 

//   //////////////////////////////////// fetching package sub category function /////////////////////////////////////////////////////////////////////////////////

 
// //////////////////////////////// Fetching all customers function //////////////////////////////////////////////////////////////////////////////


//    ///////////////////////////////// Creating Order function //////////////////////////////////////////////////////////////////////////////////////// 
 

//   ///////////////////////////////// Creating shipment box function //////////////////////////////////////////////////////////////////////////////////////// 
 
// // create_shipment_box() {

// //   if(this.state.Shipment_weight==="") {
// //     this.setState({hasError: true, errorTextshipment_weight: 'Please fill !'});
// //     return;
// //   }
// //   if(this.state.Shipment_length==="") {
// //     this.setState({hasError: true, errorTextshipment_length: 'Please fill !'});
// //     return;
// //   }

// //   if(this.state.Shipment_width==="") {
// //     this.setState({hasError: true, errorTextshipment_width: 'Please fill !'});
// //     return;
// //   }
// //   if(this.state.Shipment_height==="") {
// //     this.setState({hasError: true, errorTextshipment_height: 'Please fill !'});
// //     return;
// //   }
// //   if(this.state.Shipment_category_id==="") {
// //     this.setState({hasError: true, errorTextshipment_category_id: 'Please select category !'});
// //     return;
// //   }
// //   if(this.state.Shipment_subcategory_id==="") {
// //     this.setState({hasError: true, errorTextshipment_subcategory_id: 'Please select sub category !'});
// //     return;
// //   }
 
// //   this.setState({shipment_view:false})

// //   AsyncStorage.getItem(KEY).then((value => {
// //     let data = JSON.parse(value);

// //     let body = {
// //       "destinationCountry":this.state.rec_country,
// //       "destinationDistrictId":this.state.rec_district_id,
// //       "height": this.state.Shipment_height,
// //       "isApprox": true,
// //       "length": this.state.Shipment_length,
// //       "orderId": this.state.order_id,
// //       "parentUserId": this.state.parent_user_id,
// //       "shipmentBoxId": 0,
// //       "shipmentCategoryId": this.state.Shipment_category_id,
// //       "shipmentSubCategoryId": this.state.Shipment_subcategory_id,
// //       "sourceCountry": this.state.sender_country,
// //       "sourceDistrictId": this.state.sender_district_id,
// //       "weight": this.state.Shipment_weight,
// //       "width": this.state.Shipment_width

// //     };

// //     Api.fetch_request(SHIPMENT_BOX, 'POST', '', JSON.stringify(body))
// //       .then(result => {

// //         if (result.error != true) {

// //           console.log('Success:', JSON.stringify(result));
// //           Toast.show({ text: result.message, type: 'success' });
// //           this.submitAndClear();
// //           this.fetching_order_details();

// //         }
// //         else {
// //           console.log('Failed');
// //           this.create_cost_checklist();
// //         }
// //       })
// //   }));
// // }

// ///////////////////////////////// Creating cost checklist function //////////////////////////////////////////////////////////////////////////////////////// 
 

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // submitAndClear (){
// //   this.setState({Shipment_distance:""})
// //   this.setState({Shipment_weight:""})
// //   this.setState({Shipment_length:""})
// //   this.setState({Shipment_width:""})
// //   this.setState({Shipment_height:""})
// // }

//  ///////////////////////////////// Add shipment box function //////////////////////////////////////////////////////////////////////////////////////// 


// ////////////////////////////// Fetching delivery charge details function //////////////////////////////////////////////////////////////////////////////



//  ///////////////////////////////// Add COD details function //////////////////////////////////////////////////////////////////////////////////////// 
 
 
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// render(){


//     var left = (
//         <Left style={{ flex: 1 }}>
//           <Button onPress={() => Actions.pop()} transparent>
//             <Icon style={{ color:Colors.navbarIconColor}} name='md-close' />
//             </Button>
//         </Left>
//       );




//   return (

//     <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
//       <View style={styles.cell1}><Icon name='arrow-up' style={{ fontSize: 14 }} /></View>
//       <View style={styles.cell}><CustomText text={item.serialId ? item.serialId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
//       <View style={styles.cell}><CustomText text={item.orderId ? item.orderId :Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
//       <View style={styles.cell}><CustomText text={item.contactPersonName} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
//       <View style={styles.cell}><CustomText text={item.addressLine1 ? item.addressLine1 : Strings.na} textType={Strings.subtext}  color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
//                                 <CustomText text={item.addressLine2 ? item.addressLine2 : Strings.na} textType={Strings.subtext}  color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
//                                 <CustomText text={item.city ? item.city : Strings.na} textType={Strings.subtext}  color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
//                                 </View>
//       <View style={styles.cell}><CustomText text={item.gmapLink ? item.gmapLink : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
//       <View style={styles.cell}><CustomText text={item.contactPersonNumber} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
//       <View style={styles.cell}><CustomText text={item.pickupDate ? item.pickupDate : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
//                                 <CustomText text={item.pickupTime ? item.pickupTime : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
//                                 </View>
//       <View style={styles.cell}><CustomText text={item.pickupStatus ? item.pickupStatus : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
//       <View style={styles.cell}><CustomText text={item.attempt ? item.attempt : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
//       <View style={styles.cell}><CustomText text={item.deliveryType ? item.deliveryType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
//       <View style={styles.cell}><CustomText text={item.total ? item.total : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

//       <View style={styles.cell}>
//         <View>
//           <CustomButton title={'Notify'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5}  text_color={Colors.darkSkyBlue} />
//           <CustomButton title={'Call'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5}  text_color={Colors.darkSkyBlue} onPress={()=>this.dialCall(item.contactPersonNumber)}/>
//           <CustomButton title={'Details'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5}  text_color={Colors.darkSkyBlue} onPress={() => Actions.pickupdetails({pickup_id:item.pickupId})} />
//         </View>
//       </View>
//       <View style={styles.cell}>
//         {item.pickupStatus == 'COLLECTED' && (<View>
//           <CustomButton title={'Close'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={30} marginBottom={5}  text_color={Colors.darkSkyBlue} onPress={()=>this.pickup_update(item.orderId)} />
//           </View>)}
//        </View>

//     </View>


//   )
  
  
// }
// <FlatList
// data={this.state.newpin}

// keyExtractor={(x, i) => i}
// renderItem={({ item })=> {
//   return this._body(item)}}
// />
// _body = (item) => {


// const styles=StyleSheet.create({
//   input :{
//     flexDirection:'row',
//     borderColor:Colors.borderColor,
//     borderWidth:SHORT_BORDER_WIDTH,
//     borderRadius:SHORT_BORDER_RADIUS,
//     padding:1,alignItems:'center',
//     justifyContent:'space-between',
//     marginTop:SECTION_MARGIN_TOP,
//   },

//   mainOuterComponent: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#00000088'
//   },
//   mainContainer: {
//     flexDirection: 'column',
//     width: '80%',
//     backgroundColor: Colors.white,
//     borderRadius: 10,
//     padding: 10,
//   },
  
 
// });

