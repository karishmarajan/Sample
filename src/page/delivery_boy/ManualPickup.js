import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet,BackHandler,Modal } from 'react-native';
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
import DatePicker from '../../component/DatePicker';

import CustomCheckBox from '../../component/CustomCheckBox';
import session, { KEY } from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { COUNTRY , STATE , CITY , OTP , VERIFY_OTP , CUSTOMER_DETALS ,PACKAGE_CATEGORY, PACKAGE_SUB_CATEGORY ,SHIPMENT_BOX, ORDER} from '../../constants/Api';



export default class ManualPickup extends React.Component {

  state = {
    modal_visible: false,
    reason:'',
    reason_val:'',
    modal_view: false,
    country_list:[],
    countries:[],
    state_list:[],
    states:[],
    city_list:[],
    city:[],
    package_categories:[],
    countries_reciever:[],
    states_reciever:[],
    city_reciever:[],
    countries_code:[],
    sender_details:[],
    package_category_list:[],
    package_sub_category_list:[],
    code_otp:'',
    phone_otp:'',
    verify_otp:'',
    houseno:'',
    landmark:'',
    roadname:'',
    district:'',
    pincode:'',
    recievername:'',
    recieverno:'',
    proof:'',
    deliveredto:'',
    rec_city:'',
    rec_country_code:'',
    rec_country:'',
    rec_state:'',
    rec_landmark:'',
    rec_district:'',
    rec_pincode:'',
    rec_gmap:'',
    customer_id:'',
    sender_name:'',
    sender_no:'',
    sender_email:'',
    sender_country:'',
    sender_pincode:'',
    sender_localbody:'',
    sender_gmap:'',
    sender_address1:'',
    sender_address2:'',
    sender_state:'',
    sender_district:'',
    sender_city:'',
    sender_landmark:'',
    package_subcategories:[],
    Shipment_weight:'',
    Shipment_height:'',
    Shipment_length:'',
    Shipment_width:'',
    Shipment_distance:'',
    Shipment_category_id:'',
    Shipment_subcategory_id:'',
    shipment_view:true,
    contact_person_name:'',
    contact_person_no:'',
    pickupdate:'',
    pickuptime:'',
  };

  componentDidMount() {
    this.fetch_country_list()
    this.fetch_country_list_reciever()
    this.fetch_package_category_list()
    this.fetch_package_subcategory_list()
  }
////////////////////////////// Fetching customer details with id function //////////////////////////////////////////////////////////////////////////////
  verify_customer_id(customer_id) {

    Api.fetch_request(CUSTOMER_DETALS + customer_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({sender_details : result.payload})

        this.setState({sender_name : result.payload.firstName +" "+ result.payload.lastName})
        this.setState({sender_no : result.payload.mobileNumber})
        this.setState({sender_email : result.payload.emailId})
        this.setState({sender_country : result.payload.country})
        this.setState({sender_pincode : result.payload.pincode})
        this.setState({sender_localbody : result.payload.localBodyType})
        this.setState({sender_gmap : result.payload.gmapLink})
        this.setState({sender_address1 : result.payload.addressLine1})
        this.setState({sender_address2 : result.payload.addressLine2})
        this.setState({sender_state : result.payload.state})
        this.setState({sender_district : result.payload.district})
        this.setState({sender_city : result.payload.city})
        this.setState({sender_landmark : result.payload.landMark})

      }
      else{
        console.log('Failed');
      }
  })
   
  }

  //////////////////////////////// Fetching sender country function //////////////////////////////////////////////////////////////////////////////

  fetch_country_list() {

    Api.fetch_request(COUNTRY,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({country_list : result.payload})

        var count = (result.payload).length;
        let countries = [];
        let countries_code = [];

        for(var i = 0; i < count; i++){
         countries.push({ value: result.payload[i].countryName , id: result.payload[i].countryId ,  code: result.payload[i].countryCode  });
         countries_code.push({ value: result.payload[i].countryName , id: result.payload[i].countryId ,  code: result.payload[i].countryCode  });
       }
       this.setState({ countries });
       this.setState({ countries_code });
      }
      else{
        console.log('Failed');
      }
  })
   
  }
//////////////////////////////// Fetching sender state function //////////////////////////////////////////////////////////////////////////////

  fetch_state_list(country_id) {

    Api.fetch_request(STATE + country_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({state_list : result.payload})

        var count = (result.payload).length;
        let states = [];

        for(var i = 0; i < count; i++){
          states.push({ value: result.payload[i].stateName ,  id: result.payload[i].stateId});
       }
       this.setState({ states });
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
        this.setState({city_list : result.payload})

        var count = (result.payload).length;
        let city = [];

        for(var i = 0; i < count; i++){
          city.push({ value: result.payload[i].cityName });
       }
       this.setState({ city });
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
        this.setState({country_list : result.payload})

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
        this.setState({state_list : result.payload})

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
        this.setState({city_list : result.payload})

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
 
  

  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = 
      {
        "creatorId": data.personId,
        "creatorUserType": "CUSTOMER",
        "customerId": this.state.customer_id,
        "deliveryRequest": {
          "addressLine1": this.state.rec_address1,
          "addressLine2": this.state.rec_address2,
          "assignedBy": "string",
          "attempt": 0,
          "canBeDeliveredTo": this.state.deliveredto,
          "city": this.state.rec_city,
          "contactPersonCountryCode": this.state.rec_country_code,
          "contactPersonCustomerId": "string",
          "contactPersonName": this.state.recievername,
          "contactPersonNumber": this.state.recieverno,
          "country": this.state.rec_country_code,
          "customerId": this.state.rec_id_or_no,
          "deliveryId": 0,
          "deliveryType": "BULLET",
          "district": this.state.rec_district,
          "gmapLink": this.state.rec_gmap,
          "localBodyType": this.state.rec_localbody,
          "notesToCourierBoy": this.state.rec_notes,
          "officeId": 0,
          "orderId": 0,
          "pincode": this.state.rec_pincode,
          "proofToBeProduced": this.state.proof,
          "serialId": "string",
          "state": this.state.rec_state
        },
        "deliveryType": "BULLET",
        "isManualPickup": true,
        "officeId": 0,
        "orderId": 0,
        "pickupRequest": {
          "addressLine1": this.state.sender_address1,
          "addressLine2": this.state.sender_address2,
          "assignedBy": "string",
          "attempt": 0,
          "city": this.state.sender_city,
          "contactPersonCountryCode": "string",
          "contactPersonName": this.state.sender_name,
          "contactPersonNumber": this.state.sender_no,
          "country": this.state.sender_country,
          "customerId": this.state.customer_id,
          "deliveryType": "BULLET",
          "district": this.state.sender_district,
          "gmapLink": this.state.gmapLink,
          "localBodyType": this.state.localBodyType,
          "notesToCourierBoy": this.state.sender_notes,
          "officeId": 0,
          "orderId": 0,
          "pickupDate": "2020-12-15",
          "pickupId": 0,
          "pickupTime": {
            "hour": "string",
            "minute": "string",
            "nano": 0,
            "second": "string"
          },
          "pincode": this.state.sender_pincode,
          "serialId": "string",
          "state": this.state.sender_state,
        }
    };

    Api.fetch_request(ORDER, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          alert("Order Created")

        }
        else {
          console.log('Failed');
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
      "orderId": 0,
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

        }
        else {
          console.log('Failed');
        }
      })
  }));
}

 ///////////////////////////////// Add shipment box function //////////////////////////////////////////////////////////////////////////////////////// 
 
 add_shipment_box() {
 
  this.setState({shipment_view:true})
  
}

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
         <CustomButton title={'Print'}  text_color={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={THIRD_FONT} marginRight={COLUMN_PADDING} marginTop={BORDER_WIDTH}  />
        </Right>
      );


    return(
  
        <Container>

{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} right={right} title="Manual Pickup" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>

{/* /////////////////////////// Sender Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING}}>

<View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Sender Details'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
        <CustomText text={'Customer Id'} textType={Strings.subtext} color={Colors.black}/>
        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white} onChangeText={(text) => this.setState({customer_id: text})} value={this.state.customer_id}  />
        <CustomButton title={'search'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.verify_customer_id(this.state.customer_id)}/>
        </View>
        <CustomText text={'Full Name'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_name} />
        <CustomText text={'Mobile Number'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_no} />
        <CustomText text={'Email Id'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_email} />
        <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_country} />
        <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_pincode} />
        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_localbody} />
        <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_gmap} />
        <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_address1} />
        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_address2} />
        <CustomText text={'State'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_state} />
        <CustomText text={'District'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_district} />
        <CustomText text={'City'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_city} />
        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_landmark} />

</View>


{/* /////////////////////////// Pickup Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>

<View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Pickup Details'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
      
        <CustomText text={'Contact Person Name'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({contact_person_name: text})} value={this.state.contact_person_name}/>
        <CustomText text={'Contact Person Number'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({contact_person_no: text})} value={this.state.contact_person_no}/>
        <CustomText text={'Notes to Courier Boy'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({sender_notes: text})} value={this.state.sender_notes}/>
        <CustomText text={'Pickup Date'} textType={Strings.subtext} color={Colors.black}/>
        <DatePicker  />
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({pickupdate: text})} value={this.state.pickupdate}/>
        <CustomText text={'Pickup Time'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({pickuptime: text})} value={this.state.pickuptime}/>
       

</View>

{/*/////////////////////////// Delivery Address //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Address'} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
    
          <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Local'} selectedColor={Colors.darkSkyBlue} selected={true}/>
         <CustomRadioButton title={'Global'} selectedColor={Colors.darkSkyBlue} selected={false}/>
         </View>

          <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black}/>
          <CustomDropdown data={this.state.countries_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_state_list_reciever(data[index]['id']) ; this.setState({rec_country:value}) }, 500); }} />

          <CustomText text={'State'} textType={Strings.subtext} color={Colors.black}/>
          <CustomDropdown data={this.state.states_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.fetch_city_list_reciever(data[index]['id']) ; this.setState({rec_state:value}) }, 500); }} />

          <CustomText text={'City'} textType={Strings.subtext} color={Colors.black}/>
          <CustomDropdown data={this.state.city_reciever} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => { setTimeout(() => { this.setState({rec_city:value}) }, 500); }} />
 
          <CustomText text={'District'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_district: text})} value={this.state.rec_district} />

         <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_pincode: text})} value={this.state.rec_pincode} />

          <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_gmap: text})} value={this.state.rec_gmap} />
         
          <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} value={this.state.rec_address1} />

        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} value={this.state.rec_address2} />

        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} value={this.state.rec_localbody} />

        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_landmark: text})} value={this.state.rec_landmark} />
          
        
         
</View>

{/*///////////////////////////////////////////////////////////////////////// Delivery Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Details '} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>

        <CustomText text={'Enter the receiving person customer id or registered mobile number.'} textType={Strings.subtext} color={Colors.grayTextColor}/>
    
        <CustomText text={'Customer Id / Mobile Number'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_id_or_no: text})} value={this.state.rec_id_or_no} />

        <CustomText text={'Reciever Name'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recievername: text})} value={this.state.recievername} />

          <CustomText text={'Receiver Phone Number'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recieverno: text})} value={this.state.recieverno} />

          <CustomText text={'Proof to be produced'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({proof: text})} value={this.state.proof} />

          <CustomText text={'Can be delivered to'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({deliveredto: text})} value={this.state.deliveredto} />

          <CustomText text={'Notes to Courier Boy'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_notes: text})} value={this.state.rec_notes} />

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

         <CustomText text={'Approx. Weight'} textType={Strings.subtext} color={Colors.black}/>
         <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({Shipment_weight: text})} value={this.state.Shipment_weight} placeholder={'kg'} />

<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
<CustomText text={'Length'} textType={Strings.subtext} color={Colors.black}/>
<CustomText text={'Width'} textType={Strings.subtext} color={Colors.black}/>
<CustomText text={'Height'} textType={Strings.subtext} color={Colors.black}/>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}}>
<View style={{width:60}}><CustomInput  borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} placeholder={'cm'} onChangeText={(text) => this.setState({Shipment_length: text})} value={this.state.Shipment_length}/></View>
<View style={{width:60}}><CustomInput  borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} placeholder={'cm'} onChangeText={(text) => this.setState({Shipment_width: text})} value={this.state.Shipment_width}/></View>
<View style={{width:60}}><CustomInput  borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} placeholder={'cm'} onChangeText={(text) => this.setState({Shipment_height: text})} value={this.state.Shipment_height} /></View>
</View>
<CustomText text={'Approx. Distance'} textType={Strings.subtext} color={Colors.black}/>
         <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({Shipment_distance: text})} value={this.state.Shipment_distance} placeholder={'kg'} />

  
        <CustomText text={'Shipment Category'} textType={Strings.subtext} color={Colors.black}/>
        <CustomDropdown data={this.state.package_categories} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => {this.setState({Shipment_category_id:data[index]['id']}) }} />
    
        <CustomText text={'Shipment Type'} textType={Strings.subtext} color={Colors.black}/>
        <CustomDropdown data={this.state.package_subcategories} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} onChangeValue={(value, index, data ) => {this.setState({Shipment_subcategory_id:data[index]['id']}) }} />

        </View>)}
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} height={30} onPress={()=>this.create_shipment_box()} />
        <CustomButton title={'Add Shipment'} backgroundColor={Colors.darkSkyBlue} height={30} onPress={()=>this.add_shipment_box()} />
         </View>



<CustomButton title={'Generate Invoice'} text_color={Colors.darkSkyBlue} borderColor={Colors.darkSkyBlue} borderWidth={1} backgroundColor={Colors.white}/>

</View>


{/*///////////////////////////////////////////////////////////////////////// Delivery Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Approximate Delivery Total '} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
    
        <CustomText text={'Min. Delivery Charge'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_name} />

        <CustomText text={'Package Applied'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_name} />

        <CustomText text={'Delivery Credit Available'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_name} />

        <CustomText text={'Delivery Charge'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} value={this.state.sender_name} />


        <CustomRadioButton title={'COD'} selectedColor={Colors.darkSkyBlue} selected={true}/>

        <CustomText text={'Reciever GST Number'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recievername: text})} value={this.state.recievername} />

          <CustomText text={'Invoie Description'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recieverno: text})} value={this.state.recieverno} />

          <CustomText text={'Product Cost'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({proof: text})} value={this.state.proof} />

          <CustomText text={'COD Credit balance'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({deliveredto: text})} value={this.state.deliveredto} />

          <CustomText text={'Final COD charge'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({rec_notes: text})} value={this.state.rec_notes} />
        
          <CustomButton title={'Generate COD Invoice'} text_color={Colors.darkSkyBlue} borderColor={Colors.darkSkyBlue} borderWidth={1} backgroundColor={Colors.white}/>

          <CustomText text={'Grand Total'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.sender_name} />
</View>


{/*/////////////////////////////////////////////////// Delivery charge payment Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Charge Payment '} textType={Strings.subtitle} textDecorationLine={'underline'} />
        </View>
    
        <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Sender'} selectedColor={Colors.darkSkyBlue} selected={true}/>
         <CustomRadioButton title={'Receiver'} selectedColor={Colors.darkSkyBlue} selected={false}/>
         </View>

        <CustomText text={'Sender Name'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recievername: text})} value={this.state.recievername} />

          <CustomText text={'Contact number'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recieverno: text})} value={this.state.recieverno} />

          <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({proof: text})} value={this.state.proof} />

          <CustomText text={'Comment'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({deliveredto: text})} value={this.state.deliveredto} />

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

        <CustomText text={'Amount Recieved'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recievername: text})} value={this.state.recievername} />

          <CustomText text={'Balance Amount'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({recieverno: text})} value={this.state.recieverno} />


</View>

{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue}  />
          </View>
        </ScrollView>
        </Container>
    );

}
}

