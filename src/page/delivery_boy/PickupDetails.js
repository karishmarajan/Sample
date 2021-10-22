import React, { Component } from 'react';
import { ScrollView,StyleSheet,Modal,Linking , AsyncStorage} from 'react-native';
import { Container, View, Button, Left, Right,Icon,Grid,Col, Toast, Text} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP,SHORT_BORDER_RADIUS, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SIGNATURE_VIEW_HEIGHT,TOTAL_BLOCK, CREDIT_FIELD_HEIGHT,TEXT_MARGIN_TOP, CAMERA_SIZE,FOURTH_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import CustomRadioButton from '../../component/CustomRadioButton';
import session, { KEY } from '../../session/SessionManager';

import Api from '../../component/Fetch';
import { PICKUP_DETAILS , PICKUP_ORDER_UPDATE , PAYMENT_BY_CASH, UPDATE_DELIVERY_TYPE, ADD_PAYMENT_BY_TYPE} from '../../constants/Api';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';


const myArray=[{name:"Select a Status" , value:"Select a Status"},{name:"COLLECTED" , value:"COLLECTED"},{name:"ATTEMPT_FAILED" , value:"ATTEMPT FAILED"},{name:"UNVISITED" , value:"UNVISITED"}];
const myArray1=[{name:"Select/Enter a Reason" , value:"Select/Enter a reason"},{name:"Address invalid" , value:"Address invalid"},{name:"Door was  locked" , value:"Door was  locked"},{name:"Enter a Reason" , value:"Enter a Reason"}];
const myArray2=[{name:"Cash" , value:"Cash"},{name:"Credit card" , value:"Credit card"},{name:"Debit card" , value:"Debit card"},{name:"Paytm" , value:"Paytm"}];

export default class PickupDetails extends React.Component {

  state = {
    modal_visible: false,
    status:'',
    reason:'',
    reason_val:'',
    modal_view: false,
    pickup_details:[],
    amount_recieved:'',
    balance_amount:'',
    amount_payed:'',
    amount_to_pay:'',
    additional_charge:'0',
    additional_charge2:'',
    errorTextadditional_charge2:'',
    order_id:'',
    pay_by_sender_withAdditinal:'',
    sender_payment:'0',
    errorTextamount_recieved:'',
    hasError:false,
    delivery_type:'',
    normal_selected:true,
    bullet_selected:false,
    modal_visible2:false,
    bullet_additional_btn_pay:true,
    order_type:'',
    personId:'',
    officeId:'',
  };


  componentDidMount() {
    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);
      this.setState({personId:data.personId, officeId:data.officeId})
   
  }));
    this.fetch_pickup_details(this.props.pickup_id);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
isCharacterALetter(char) {
  return (/[a-zA-Z]/).test(char)
}
//////////////////////////////////////////////////////////////////////////////

isSelected(no){

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
}
   /////////////////////////////////////// Call function ////////////////////////////////////////////////////////////////////////////

 dialCall = (no) => {

  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = 'tel:${'+no+'}';
  }
  else {
    phoneNumber = 'telprompt:${'+no+'}';
  }

  Linking.openURL(phoneNumber);
};



  //////////////////////////////////////////// Pickup details fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
 fetch_pickup_details(id){

  // alert(id)

  Api.fetch_request(PICKUP_DETAILS+id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));
      this.setState({pickup_details : result.payload, sender_payment: result.payload.payableBySender})
   ////////////////////////// checking delivery type /////////////////////////////////////////////////////////////////////////////////////
     
   if(result.payload.deliveryType === 'NORMAL'){
      this.isSelected(11)
    }else{
      this.isSelected(12)
    }

    ///////////////////////// checking order id type ////////////////////////////////////////////////////////////////////////////////////////////

    if(result.payload.isPreDefinedOrderWithPin === true )
    {
      this.setState({order_type:'PREDEFINED_ORDER_ID', order_id:result.payload.preDefinedOrderId})

    }else
    {
      this.setState({order_type:'AUTOMATIC_ORDER_ID', order_id:result.payload.orderId})
    }

    }
    else{
      console.log('Failed');
    }
})

 }

///////////////////////////////// Delivery type update function //////////////////////////////////////////////////////////////////////////////////////// 
 
update_delivery_type() {
  
  Api.fetch_request(UPDATE_DELIVERY_TYPE+this.state.pickup_details.orderId+'/deliveryType'+this.state.delivery_type, 'PUT', '')
    .then(result => {

      if (result.error != true) {

       this.setState({final_cod_charge:result.payload.finalCodCharge})
        console.log('Success:', JSON.stringify(result));
        Toast.show({ text: result.message, type: 'success' });

        Actions.pop()
        Actions.refresh({key: Math.random()})
      }
      else {
        console.log('Failed');
        Toast.show({ text: result.message, type: 'warning' });
      }
    })

}

  ///////////////////////////////// Pickup order update function //////////////////////////////////////////////////////////////////////////////////////// 
 
  pickup_update() {

      let body = {

    "orderId": this.state.pickup_details.orderId,
    "pickupFailedReason": this.state.reason_val,
    "pickupStatus": this.state.status
  
      };
  
      Api.fetch_request(PICKUP_ORDER_UPDATE, 'PUT', '', JSON.stringify(body))
        .then(result => {
  
          if (result.error != true) {
  
           this.setState({final_cod_charge:result.payload.finalCodCharge})
            console.log('Success:', JSON.stringify(result));
            Toast.show({ text: result.message, type: 'success' });

            this.fetch_pickup_details(this.props.pickup_id);
  
          }
          else {
            console.log('Failed');
            Toast.show({ text: result.message, type: 'warning' });
          }
        })
  
  }
 ////////////////////////////////// Additional charge calculating function /////////////////////////////////////////////////////////////////////////////////////

 additional_Calculate(text){
 if(text==''){
  var myInt = 0;
  var payment=parseInt(this.state.pickup_details.payableBySender)
  var total=myInt+payment;

  var new_additional = parseInt(this.state.pickup_details.payableBySender) + myInt ;
 
    this.setState({sender_payment:''+total , additional_charge :new_additional });
  
}else{
  var myInt = parseInt(text);
  var payment=parseInt(this.state.pickup_details.payableBySender)
  var total=myInt+payment;

  var new_additional = parseInt(this.state.pickup_details.payableBySender) + myInt ;
 
    this.setState({sender_payment:''+total , additional_charge :new_additional });
  // if(this.state.amount_recieved != null){ this.balanceCalculate(this.state.amount_recieved);}

}
 }
  ////////////////////////////////// Balance calculating fuction /////////////////////////////////////////////////////////////////////////////////////

balanceCalculate(text){

if(text===''){
  var myInt = 0;
  var payment=parseInt(this.state.sender_payment)
  var bal=myInt-payment;
  var bal1=payment-myInt;

if(myInt==payment){
  this.setState({balance_amount:'0',amount_payed:''+myInt,amount_to_pay:'0'});
}else if(myInt>payment){
  this.setState({balance_amount:''+bal,amount_payed:''+payment, amount_to_pay:'0'});
}else{
  this.setState({balance_amount:'0',amount_payed:''+myInt, amount_to_pay:''+bal1});
}

}else{

  var myInt = parseInt(text);
  var payment=parseInt(this.state.sender_payment)
  var bal=myInt-payment;
  var bal1=payment-myInt;

if(myInt==payment){
  this.setState({balance_amount:'0',amount_payed:''+myInt,amount_to_pay:'0'});
}else if(myInt>payment){
  this.setState({balance_amount:''+bal,amount_payed:''+payment, amount_to_pay:'0'});
}else{
  this.setState({balance_amount:'0',amount_payed:''+myInt, amount_to_pay:''+bal1});
}

}
  

}

///////////////////////////////////////// Payment by cash function  //////////////////////////////////////////////////////////////////////////////////

cash_payment() {

  if (this.state.amount_recieved === "" && this.state.pickup_details.payableBySender > 0) {
    this.setState({ hasError: true, errorTextamount_recieved: 'Please fill !' });
    return;
  }
  if (parseInt(this.state.amount_recieved) < parseInt(this.state.pickup_details.payableBySender)) {
    this.setState({ hasError: true, errorTextamount_recieved: 'Please collect full amount' });
    return;
  }


  let body = {
    "additionalCharges":this.state.additional_charge,
    "amountPayed": this.state.amount_payed,
    "isAmountCollectedByDeliveryBoy": true,
    "orderId": this.state.pickup_details.orderId,


  };

  Api.fetch_request(PAYMENT_BY_CASH, 'POST', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        Toast.show({ text: result.message, type: 'success' });
        this.fetch_pickup_details(this.props.pickup_id);


      }
      else {
        console.log('Failed');
        Toast.show({ text: result.message, type: 'warning' });
      }
    })
}

 ////////////////////////////////////// Additional charge adding function ///////////////////////////////////////////////////////////////////////////////////
 
 add_additional_charge() {

  if (this.state.additional_charge2 === "") {
      this.setState({ hasError: true, errorTextadditional_charge2: 'Please fill !' });
      return;
    }
    if (parseInt (this.state.additional_charge2) <= 0) {
      this.setState({ hasError: true, errorTextadditional_charge2: 'Please add valid charge !' });
      return;
    }
    

    let body = {
      
      "amountCollected": this.state.additional_charge2,
      "officeId": this.state.officeId,
      "officeStaffId": this.state.personId,
      "officeStaffType": "DELIVERY_AGENT",
      "orderId": this.state.order_id,
      "orderType":this.state.order_type,
      "paymentType": "ADDITIONAL_CHARGE"
   
    };

    Api.fetch_request(ADD_PAYMENT_BY_TYPE, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          Toast.show({ text: result.message, type: 'success' });
          this.update_delivery_type()
          this.fetch_pickup_details(this.props.pickup_id);

        }
        else {
          console.log('Failed');
          Toast.show({ text: result.message, type: 'warning' });
        }
      })
  
}

  /////////////////////////////////// Render Method  /////////////////////////////////////////////////////////////////////////////

render(){
    var left = (
        <Left style={{ flex: 1 }}>
          <Button onPress={() => { Actions.pop();Actions.refresh({key: Math.random()})}} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='md-arrow-round-back' />
            </Button>
        </Left>
      );
      var right = (
        <Right style={{ flex: 1 }}>
    
          <Button onPress={() => this.setState({modal_view:true})} transparent>
            <Icon style={{color:Colors.navbarIconColor }} name='md-more' />
          </Button>
        </Right>
      );


    return(
  
        <Container>
        

 {/*////////////////////////////////////// Modal Block //////////////////////////////////////////////// */}

 <Modal visible={this.state.modal_visible} supportedOrientations={['landscape']} transparent>
<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.transparent, }}>
    <View style={{ backgroundColor: Colors.white, alignSelf: 'center', marginTop:SECTION_MARGIN_TOP }}>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>  
        <View style={styles.modalview}>
          <CustomInput  onChangeText={(text)=>this.setState({reason:text})} flex={1}/>
          <CustomButton title={'Submit'} onPress={()=>this.setState({reason_val:this.state.reason,modal_visible:false})}/>
        </View>
        </View>
    </View>
</View>
</Modal>

{/*////////////////////////////////////// Modal Block 2 //////////////////////////////////////////////// */}

<Modal visible={this.state.modal_visible2} supportedOrientations={['landscape']} transparent>
<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.transparent, }}>
    <View style={{ backgroundColor: Colors.white, alignSelf: 'center', marginTop:SECTION_MARGIN_TOP }}>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' , flexGrow:1}}>  
        <View style={styles.modalview}>
          <CustomInput  onChangeText={(text)=>this.setState({reason:text})} flex={1}/>
          <CustomButton title={'Submit'} onPress={()=>this.setState({reason_val:this.state.reason,modal_visible:false})}/>
        </View>
        </View>
    </View>
</View>
</Modal>


<Modal visible={this.state.modal_view} supportedOrientations={['landscape']} transparent>
<View style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>  
        <View style={styles.modalview1}>
        <CustomText text={'Notify Customer'} textType={Strings.subtext} onPress={()=>this.setState({modal_view:false})} />
        <CustomText text={'Call Customer'} textType={Strings.subtext} onPress={()=>{this.dialCall(this.state.pickup_details.contactPersonNumber) ; this.setState({modal_view:false})}} />
        <CustomText text={'Print'} textType={Strings.subtext} onPress={()=>this.setState({modal_view:false})}/>
        </View>
    </View>
</Modal>

{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} right={right} title="PickUp Details" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>

{/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Pickup Address & Details'} textType={Strings.subtitle} fontWeight={'bold'} />
        </View>

       
          <CustomText text={'Name'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.contactPersonName ? this.state.pickup_details.contactPersonName : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Customer Id'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.customerId ? this.state.pickup_details.customerId : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Mobile No.'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.contactPersonNumber ? this.state.pickup_details.contactPersonNumber : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.gmapLink ? this.state.pickup_details.gmapLink : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Address'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputviewaddress}>
            <CustomText text={this.state.pickup_details.addressLine1 ? this.state.pickup_details.addressLine1 : Strings.na} textType={Strings.subtext} color={Colors.black}/>
            <CustomText text={this.state.pickup_details.addressLine2 ? this.state.pickup_details.addressLine2 : Strings.na} textType={Strings.subtext} color={Colors.black}/>
            <CustomText text={this.state.pickup_details.city ? this.state.pickup_details.city : Strings.na} textType={Strings.subtext} color={Colors.black}/>
          </View>
</View>

{/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:10}}>
<View style={{ backgroundColor:Colors.signBackgroundColor,flexGrow:1,padding:MAIN_VIEW_PADDING}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Order Details'} textType={Strings.subtitle} fontWeight={'bold'} />
        </View>

        {/* <CustomText text={'Serial No.'} textType={Strings.subtext} color={Colors.black}/>
        <View style={styles.inputview2}><CustomText text={this.state.pickup_details.serialId ? this.state.pickup_details.serialId : Strings.na } textType={Strings.subtext} color={Colors.black}/></View> */}
          <CustomText text={'Order No.'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.preDefinedOrderId ? this.state.pickup_details.preDefinedOrderId : this.state.pickup_details.orderId } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Date And Time'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.pickupDate ? this.state.pickup_details.pickupDate + ' '+ this.state.pickup_details.pickupTime  : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Seller ID'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput keyboardType={'number-pad'} flex={1} backgroundColor={Colors.textBackgroundColor1}/>
          <CustomText text={'Delivery Type'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.deliveryType ? this.state.pickup_details.deliveryType : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Credit Allowed'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} backgroundColor={Colors.textBackgroundColor1}/>
          <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.gmapLink ? this.state.pickup_details.gmapLink : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Package Details'} textType={Strings.subtext} color={Colors.black}/>
          <View style={{flexDirection:'row',flex:2,justifyContent:'space-between'}}>
          <CustomText text={'No. of Pieces'} textType={Strings.subtext} color={Colors.black}/>
          <CustomText text={'Scanned Pieces'} textType={Strings.subtext} color={Colors.black}/>
          </View>
          <View style={{flexDirection:'row',flex:2,justifyContent:'space-between'}}>
          <View style={{flex:1}}><CustomInput flex={1} backgroundColor={Colors.textBackgroundColor1}/></View>
          <View style={{flex:1,marginLeft:SECTION_MARGIN_TOP}}><CustomInput flex={1} backgroundColor={Colors.textBackgroundColor1}/></View>
          </View>
         <CustomButton title={'Scan Pieces'} backgroundColor={Colors.darkSkyBlue} marginTop={SECTION_MARGIN_TOP} />

          </View>
</View>

{/* ////////////////////////////////////////////////////////////////////////// */}
{this.state.pickup_details.deliveryType ==='NORMAL' &&(
  <View style={{ backgroundColor:Colors.white,flexGrow:1,paddingLeft:MAIN_VIEW_PADDING,paddingRight:MAIN_VIEW_PADDING,paddingBottom:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>

<CustomText text={'Delivery Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Normal'} selectedColor={Colors.darkSkyBlue} selected={this.state.normal_selected} onPress={()=>this.isSelected(11)}/>
         <CustomRadioButton title={'Bullet'} selectedColor={Colors.darkSkyBlue} selected={this.state.bullet_selected} onPress={()=>this.isSelected(12)}/>
         </View>
         {this.state.delivery_type === 'BULLET' && (<View>
      <CustomText text={'Additional Charge'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <View style={{flex:4}}><CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text) =>{this.setState({additional_charge2: text, errorTextadditional_charge2:''})}} value={this.state.additional_charge2} /></View>

  {this.state.bullet_additional_btn_pay === true && (<View style={{flex:2,marginLeft:5}}><CustomButton title={'ADD'} marginTop={1} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.add_additional_charge()} /></View>)}
  {this.state.bullet_additional_btn_pay === false && (<View style={{flex:2,marginLeft:5}}><CustomButton title={'Details'} marginTop={1} backgroundColor={Colors.darkSkyBlue} onPress={()=>Actions.paymentdetails({order_id:this.state.predefinedpin})} /></View>)}


</View>
{!!this.state.errorTextadditional_charge2 && (<Text style={{ color: 'red' }}>{this.state.errorTextadditional_charge2}</Text>)}

      </View>)}
</View>)}
{/*///////////////////////////// Order Status Block //////////////////////////////////////////////// */}

{this.state.pickup_details.pickupStatus == 'ASSIGNED' && (<View>

<View style={{backgroundColor:Colors.white,flex:10,flexDirection:'row' ,marginTop:SECTION_MARGIN_TOP,padding:MAIN_VIEW_PADDING,alignItems:'center',}}>
              <CustomText  text={'Status Update'} textType={Strings.subtitle} flex={9} fontWeight={'bold'}/>
              <Icon name={'md-arrow-dropdown'} style={{color:Colors.black,fontSize:FOURTH_FONT,flex:1,}}/>
              </View>
<View style={{ backgroundColor:Colors.white,flexGrow:1,paddingLeft:MAIN_VIEW_PADDING,paddingRight:MAIN_VIEW_PADDING,paddingBottom:MAIN_VIEW_PADDING}}>

      <CustomText text={'Status'} textType={Strings.maintext}/> 
      <CustomDropdown data={myArray} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} onChangeValue={(value,index,data)=>{this.setState({status:data[index]['name']});}} value={this.state.status}/>
 
      
      {this.state.status == 'ATTEMPT_FAILED' && (<View>
      <CustomText text={'Reason/Remark'} textType={Strings.maintext}/>
      <CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} onChangeValue={(value,index,data)=>{if (index == (data.length)-1){this.setState({modal_visible: true});}else{this.setState({reason_val:value})}}} value={this.state.reason_val}/>
      </View>)}
      <CustomButton title={'Update'} backgroundColor={Colors.darkSkyBlue}  onPress={()=>this.pickup_update()} />
      </View>
      </View>)}


     



{/*/////////////////////////////// Total & Payment Block //////////////////////////////////////////////// */}


<View>
<View style={{backgroundColor:Colors.white,flex:10,flexDirection:'row' ,marginTop:SECTION_MARGIN_TOP,padding:MAIN_VIEW_PADDING,alignItems:'center',}}>
              <CustomText  text={'Total & Payment'} textType={Strings.subtitle} flex={9} fontWeight={'bold'} />
              <Icon name={'md-arrow-dropdown'} style={{color:Colors.black,fontSize:FOURTH_FONT,flex:1,}}/>
              </View>
<View style={{ backgroundColor:Colors.white,flexGrow:1,paddingLeft:MAIN_VIEW_PADDING,paddingRight:MAIN_VIEW_PADDING,paddingBottom:MAIN_VIEW_PADDING}}>

<View style={{height:420}}>
<Grid ><Col><CustomText text={'COD Charge'} textType={Strings.subtext} color={Colors.black}/></Col>
        <Col><View style={styles.inputview}><CustomText text={this.state.pickup_details.finalCodCharge  } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
 <Grid ><Col></Col>
   <Col><CustomButton title={'Details'} marginTop={5} marginBottom={5} backgroundColor={Colors.darkSkyBlue} onPress={()=>{Actions.codcharges({order_id:this.state.order_id, order_type:this.state.order_type})}} /></Col></Grid>       
   <Grid ><Col><CustomText text={'Additional Charge'} textType={Strings.subtext} color={Colors.black}/></Col>
        <Col><View style={styles.inputview}><CustomText text={this.state.pickup_details.additionalCharges  } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
 <Grid ><Col></Col>
   <Col><CustomButton title={'Details'} marginTop={5} marginBottom={5} backgroundColor={Colors.darkSkyBlue} onPress={()=>Actions.additionalcharges({order_id:this.state.order_id, order_type:this.state.order_type})} /></Col></Grid>       

<Grid ><Col><CustomText text={'Delivery Charge'} textType={Strings.subtext} color={Colors.black}/></Col>
        <Col><View style={styles.inputview}><CustomText text={this.state.pickup_details.originalDeliveryCharge  } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
 <Grid ><Col><CustomText text={'Package Allowed'} textType={Strings.subtext} color={Colors.black}/></Col>
        <Col><View style={styles.inputview}><CustomText text={this.state.pickup_details.deliveryChargePackageDeduction   } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
 <Grid><Col><CustomText text={'Credit Allowed'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><View style={styles.inputview}><CustomText text={this.state.pickup_details.deliveryChargeCreditDeduction } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
  <Grid><Col><CustomText text={'Total'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><View style={styles.inputview}><CustomText text={this.state.pickup_details.deliveryChargeAfterDeductions  } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
       {/* <Grid><Col><CustomText text={'Additional Charge'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><View style={styles.inputview}><CustomInput flex={1} placeholder={`${this.state.pickup_details.additionalCharges}`} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text) =>{this.additional_Calculate(text); this.setState({amount_recieved:'',balance_amount:'',amount_to_pay:''})}} value={this.state.pickup_details.additionalCharges ? this.state.pickup_details.additionalCharges : 0 } /></View></Col></Grid>  */}
       <Grid><Col><CustomText text={'Sender Payment'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><View style={styles.inputview}><CustomText text={this.state.sender_payment } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
      </View>


      { this.state.pickup_details.payableBySender > 0 &&  (<View>
      <CustomText  text={'Payment Method'} textType={Strings.subtitle} flex={9} />
      <CustomDropdown data={myArray2} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} />

      <View style={{marginTop:SECTION_MARGIN_TOP,height:150}}>
      <Grid><Col><CustomText text={'Amount Recieved'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text) =>{this.balanceCalculate(text); this.setState({amount_recieved: text, errorTextamount_recieved:''})}} value={this.state.amount_recieved} /></Col></Grid>
       {!!this.state.errorTextamount_recieved && (<Text style={{ color: 'red' }}>{this.state.errorTextamount_recieved}</Text>)}
      <Grid><Col><CustomText text={'Balance Amount'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} value={this.state.balance_amount} /></Col></Grid>
       <Grid><Col><CustomText text={'Balance To Pay'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} value={this.state.amount_to_pay} /></Col></Grid>
       </View>
       <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue}  onPress={()=>this.cash_payment()} />
      
    </View>)}
    </View>
      </View>

      <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue}  onPress={()=>this.update_delivery_type()} />
      <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
          </View>
        </ScrollView>
        </Container>
    );

}
}

const styles=StyleSheet.create({
    modalview :{
      margin:SECTION_MARGIN_TOP,
      padding:SECTION_MARGIN_TOP,
      maxWidth:'60%',
      minWidth:'60%',
    },
    modalview1 :{
      padding:10 ,
      backgroundColor: Colors.white,
      marginTop:20,
      marginRight:20
      },
  iconstyle :{
    position: 'absolute',
    marginLeft: 250,
    color:'black',
    fontSize:22,
    marginTop:5
  },
  evenrowtext :{
    fontSize:14,
    color:Colors.subTextColor,
    backgroundColor:Colors.textBackgroundColor,
    paddingLeft:10,
    paddingTop:5,
    height:30,
    borderRadius:5
  },
  oddrowtext :{
    fontSize:14,
    color:Colors.subTextColor,
    borderColor:Colors.gray,
    borderWidth:1,
    paddingLeft:10,
    paddingTop:5,
    height:30,
    borderRadius:5
  },
  inputview :{
    backgroundColor:Colors.textBackgroundColor,
    height:40,
    alignItems:'flex-start',
    justifyContent:'center',
    marginTop:5,
  },
  inputviewaddress :{
    backgroundColor:Colors.textBackgroundColor,
    height:120,
    alignItems:'flex-start',
  },
  inputview2 :{
    backgroundColor:Colors.textBackgroundColor1,
    height:40,
    alignItems:'flex-start',
    justifyContent:'center'
  },
  });