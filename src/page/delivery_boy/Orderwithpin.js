///////////////////////////////////////////////edited Nishanth///////////////////////////


import React from 'react';
import {Modal, ScrollView,AsyncStorage, TouchableOpacity, DatePickerAndroid, TimePickerAndroid, Keyboard ,Switch} from 'react-native';
import { Container, View, Button, Left, Icon,Text,Toast,StyleSheet, Right} from 'native-base';
import { Actions } from 'react-native-router-flux';
import CustomMandatory from '../../component/CustomMandatory';
import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP, SHORT_BUTTON_HEIGHT, TEXT_PADDING_RIGHT, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING, BORDER_WIDTH, SHORT_BORDER_WIDTH, SHORT_BORDER_RADIUS, NORMAL_FONT,CLOSE_SIZE,CLOSE_WIDTH } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomCheckBox from '../../component/CustomCheckBox';
import CustomSearchBox from '../../component/CustomSearchBox';
import { RNCamera } from 'react-native-camera';
import { KEY, KEY1 } from '../../session/SessionManager';
import Api from '../../component/Fetch';
import {PREORDER_WITH_PIN,ALL_USERS,PAYER_PAYMENT, VALIDATE_PDOID, UPDATE_PDOID_PAYMENT_STATUS, ASSIGN_SINGLE_ORDER} from '../../constants/Api';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import SideMenuDrawer from '../../component/SideMenuDrawer';

export default class orderwithpin extends React.Component {



  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
  
    ///////////////////////////////////////// Declaring state variables ///////////////////////////////////////////////////////////////////////////////////
  
   this.state ={
    
      personId:'',
      customer_id:'',
      customer_type:'',
      order_details_list:[],
      active:'REQUESTED',
      errorTextpreid: '',
      errorTextsender_pincode: '',
      errorTextreciever_pincode: '',
      hasError: false,
      predefinedpin:'',
      sender_pincode:'',
      reciever_pincode:'',
      customertype:'',
      modalVisible:false,
      toggle:true,
      bullet:false,
      additional_charge_toggle:false,
      cod_toggle:false,
      quick_order:'',
      additional_charge:'',
      cod:'',
      collected_toggle:false,
      users:[],
      checked_customer:false,
      torch_enable:RNCamera.Constants.FlashMode.off,
      customerIdentityType:'',
      assign:false,
      customer:false,
      btn_assign:false,
      btn_pay:false,
      sender_name:'',
      pdoid_assign_id:'',
      payment:'',
      camera: {
        type: RNCamera.Constants.Type.back,
	flashMode: RNCamera.Constants.FlashMode.auto,
      }

    }
  }
    ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////
    componentDidMount() {
        AsyncStorage.getItem(KEY).then((value => {
          let data = JSON.parse(value);

           this.setState({personId:data.personId})

         console.log('KKKKKKKKKKKKKK',data) 
      }));
            this.fetch_customers_list();

      }

///////////////////////////////////////////////////////////////////////////////////////////
      toggleTorch()
{
    let tstate = this.state.torch_enable;
    if (tstate == RNCamera.Constants.FlashMode.off){
       tstate = RNCamera.Constants.FlashMode.torch;
    } else {
       tstate = RNCamera.Constants.FlashMode.off;
    }
    this.setState({torch_enable:tstate})
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
        customers.push({name:result.payload[i].firstName+' '+result.payload[i].lastName, id: result.payload[i].userId });

      //  customers.push({name: result.payload[i].userId+' - '+ result.payload[i].firstName+' '+result.payload[i].lastName +' - '+result.payload[i].mobileNumber, id: result.payload[i].userId });
     }
     this.setState({ users: customers });
    }
    else{
      console.log('Failed');
    }
})
 
}

 //////////////////////////////// Scanning Barcode function ///////////////////////////////////////////////////////////////////

  onBarCodeRead(scanResult) {
    console.warn(scanResult.type);
    console.warn(scanResult.data);
    if (scanResult.data != null) {
	if (!this.barcodeCodes.includes(scanResult.data)) {
	  this.barcodeCodes.push(scanResult.data);
      this.setState({modalVisible:false,predefinedpin:scanResult.data})
      console.log("SCANNEDDDDDDDDDD",this.state.predefinedpin)
	  console.warn('onBarCodeRead call');
	}
    }
    return;
  }

///////////////////////////////////// PDOID payment status update function ////////////////////////////////////////////////////////////////////////////////////
  
pdoid_payment_status_update() {
  
 
  Api.fetch_request(UPDATE_PDOID_PAYMENT_STATUS+this.state.pdoid_assign_id+'/COMPLETED', 'PUT', '')
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        Toast.show({ text: result.message, type: 'success' });

        this.setState({btn_pay:false})

      }
      else {
        console.log('Failed');
        Toast.show({ text: result.message, type: 'warning' });

      }
    })
}

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
 assign_customer(){

if(this.state.sender_name === ''){
  Toast.show({ text:"select sender" , type: 'warning' });
return;
}

  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = {
      "assigneeId": this.state.customer_id,
      "assigneeName": this.state.sender_name,
      "assigneeUserType": "CUSTOMER",
      "assignerId": data.personId,
      "assignerName": data.firstName+''+data.lastName,
      "assignerUserType": "DELIVERY_BOY",
      "customerIdentityType": this.state.customerIdentityType,
      "preorderId": this.state.predefinedpin
    }
  
  
    Api.fetch_request(ASSIGN_SINGLE_ORDER, 'PUT', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
          console.log('Success:', JSON.stringify(result));
          this.setState({btn_assign:false})
          Toast.show({ text:result.message , type: 'success' });

        }
        else {
          console.log(result.message,'Failed');
          Toast.show({ text:result.message , type: 'warning' });
  
  
        }
      })
    }));
  }
 

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
 validate_pdoid(text){
  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = {
      "assigneeId": data.personId,
      "assigneeUserType": "DELIVERY_BOY",
      "preorderId": this.state.predefinedpin
    }
  
    console.log('BODY ORDERWITH PIN:',body);
  
    Api.fetch_request(VALIDATE_PDOID, 'POST', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
          console.log('Success:', JSON.stringify(result));
          this.setState({pdoid_assign_id:result.payload.preorderAssignId,payment:result.payload.rate})
          if(result.payload.assigneeUserType == 'DELIVERY_BOY' && result.payload.paymentStatus =='PENDING'){
            Toast.show({ text:'Assign customer first' , type: 'success' });
            this.setState({assign:true,customer:false,btn_assign:true,btn_pay:true})
         
          }else if(result.payload.assigneeUserType == 'CUSTOMER' && result.payload.paymentStatus =='PENDING'){
            this.setState({assign:true,customer:true,sender_name:result.payload.assigneeName,customer_id:result.payload.assigneeId,btn_assign:false,btn_pay:true})

            }else{
            this.setState({assign:true,customer:true,sender_name:result.payload.assigneeName,customer_id:result.payload.assigneeId,btn_assign:false,btn_pay:false})
          }
        }
        else {
          console.log(result.message,'Failed');
          Toast.show({ text:result.message , type: 'warning' });
  
  
        }
      })
    }));
  }
  

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
 submit(){
console.log('CCCCCCCCC',this.state.customertype)
if(this.state.predefinedpin==="") {
    this.setState({hasError: true, errorTextpreid: 'Please enter preorder ID !'});
    return;
  }
  if(this.state.sender_pincode==="") {
    this.setState({hasError: true, errorTextsender_pincode: 'Please enter pincode !'});
    return;
  }
  if(this.state.reciever_pincode==="") {
    this.setState({hasError: true, errorTextreciever_pincode: 'Please enter pincode !'});
    return;
  }
  if(this.state.btn_assign===true){
    Toast.show({ text: 'Assignment not completed', type: 'warning' });
return;
  }
  if(this.state.btn_pay===true){
    Toast.show({ text: 'Payment not completed', type: 'success' });
return;
  }

  let body = {
      "additionalCharges": this.state.additional_charge ? this.state.additional_charge : 0 ,
      "createdAtOfficeId": 0,
      "creatorId": parseInt(this.state.personId),
      "creatorUserType": "DELIVERY_AGENT",
      "customerId": this.state.customer_id ? this.state.customer_id : null,
      "customerIdentityType": this.state.customerIdentityType ? this.state.customerIdentityType : null,
      "deliveryAgentId": 0,
      "deliveryCharge": this.state.payment,
      "deliveryPincode": this.state.reciever_pincode,
      "deliveryType": this.state.bullet == true ? "BULLET" : "NORMAL",
      "finalCodCharge": this.state.cod ? this.state.cod :0,
      "isAtDeliveryAgent": false,
      "isAtOffice": false,
      "isManualPickup": false,
      "pickupPincode": this.state.sender_pincode,
      "preDefinedOrderId": this.state.predefinedpin,
    }


  Api.fetch_request(PREORDER_WITH_PIN, 'PUT', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {
        Toast.show({ text: 'Order Created', type: 'success' });
        console.log('Success:', JSON.stringify(result));
        
        this.setState({reciever_pincode:''})
        this.setState({predefinedpin:'',cod:''})
Actions.dashboard();
      }
      else {
        console.log(result.message,'Failed');
        Toast.show({ text:result.message , type: 'warning' });


      }
    })
}


  /////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////
  
    render() {
      var left = (
          <Left style={{ flex: 1 }}>
            <Button width={CLOSE_WIDTH} onPress={() => Actions.pop()} transparent>
              <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='md-close' />
              </Button>
          </Left>
        );
        var right = (
          <Left style={{ flex: 1 }}>
            <Button width={CLOSE_WIDTH} onPress={() => this.setState({modalVisible:false})} transparent>
              <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='md-close' />
              </Button>
          </Left>
        );
        var torch = (
          <Right style={{ flex: 1 }}>
            <Button width={CLOSE_WIDTH} onPress={() => this.toggleTorch()} transparent>
              <Icon style={{ color:Colors.navbarIconColor,fontSize:22}} name='ios-flash' />
              </Button>
          </Right>
        );

      return (
       
        <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
          <Container>
            <Navbar  title="Order with pin" left={left}/>
            <KeyboardAvoidingScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps = 'always'>
  
  {/* ///////////////////////////////////////////////////////////////////////// */}

<Modal     animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        
        >

<View style={styles.container}>
   
<Navbar  title="Scanning" left={right} right={torch}/>
       
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            defaultTouchToFocus
            flashMode={this.state.torch_enable}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
	  {/* <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text> */}
	</View>
	{/* <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={() => { console.log('scan clicked'); }}
            style={styles.enterBarcodeManualButton}
            title="Enter Barcode"
           />
	</View> */}
      </View>



</Modal>


  
             {/*////////////////////// main view //////////////////////////////////////////////// */}
  
         <View padding={30}>

         {/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'Collected'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) =>{ this.setState({collected_toggle: value})}}
          value={this.state.collected_toggle}
        />
           </View> */}

         <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'Quick Order'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) =>{ this.setState({toggle: value});if(value==false){this.setState({additional_charge_toggle:false,cod_toggle:false,bullet:false})}}}
          value={this.state.toggle}
        />
           </View>

       
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Preorder Id'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1}   borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) =>{this.setState({predefinedpin: text , errorTextpreid:""});this.validate_pdoid(text)}} value={this.state.predefinedpin} />
        {!!this.state.errorTextpreid && (<Text style={{color: 'red'}}>{this.state.errorTextpreid}</Text>)}
        <CustomButton title={'Scan code'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.setState({modalVisible:true})} />
       
        {/* <View style={{marginTop:SECTION_MARGIN_TOP, flexDirection:'row'}}>
          <CustomCheckBox color={Colors.buttonBackgroundColor} onPress={()=>{if(this.state.checked_customer==true){this.setState({checked_customer:false})}else{this.setState({checked_customer:true})}}} checked={this.state.checked_customer}/>
          <CustomText text={'Assign Customer'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'} paddingLeft={1} mTop={5} />
        </View>

        {this.state.checked_customer === true && ( <View>
        <CustomText text={'Sender Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
    <CustomSearchBox  placeholder={'Select'} onTextChange={(text)=>this.setState({customer_id: text})}  value={this.state.customer_id}  onItemSelect={(item) =>{ if(item.id.charAt(0)=='B'){this.setState({customer_id:item.id.replace('B', ''),customerIdentityType:"BRANCH_USER"})}else{this.setState({customer_id:item.id , customerIdentityType:"COMMON_USER"})}}} items={this.state.users} />
      </View>)} */}
{this.state.assign == true && (<View>
  {this.state.customer == false && (<View>
        <CustomText text={'Sender Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
    <CustomSearchBox  placeholder={'Select'} onTextChange={(text)=>this.setState({sender_name: text})}  value={this.state.sender_name}  onItemSelect={(item) =>{ if(item.id.charAt(0)=='B'){this.setState({customer_id:item.id.replace('B', ''),customerIdentityType:"BRANCH_USER", sender_name:item.name})}else{this.setState({customer_id:item.id , customerIdentityType:"COMMON_USER", sender_name:item.name})}}} items={this.state.users} />
      </View>)}

      {this.state.customer == true && (<View>
        <CustomText text={'Sender Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} value={this.state.sender_name} />
      </View>)}

      <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingHorizontal:10}}>
      {this.state.btn_assign === true && (<View style={{flex:2,marginRight:10}}><CustomButton title={'Assign'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.assign_customer()} /></View>)}
      {this.state.btn_pay === true && (<View style={{flex:2}}><CustomButton title={'Pay  Rs'+this.state.payment} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.pdoid_payment_status_update()} /></View>)}
     </View>
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Source Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_pincode: text , errorTextsender_pincode:""})} value={this.state.sender_pincode} />
        {!!this.state.errorTextsender_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextsender_pincode}</Text>)}

        <View style={{flexDirection:'row'}}>
        <CustomText text={'Destination Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({reciever_pincode: text , errorTextreciever_pincode:""})} value={this.state.reciever_pincode} />
        {!!this.state.errorTextreciever_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextreciever_pincode}</Text>)}
      
       
        {this.state.toggle === false && (<View>
<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'Bullet'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) => {this.setState({bullet: value,additional_charge_toggle:value});}}
          value={this.state.bullet}
        />
           </View>

          {this.state.bullet === true &&(<View>  
            <CustomText text={'Additional Charges may apply'} textType={Strings.subtext} color={Colors.black} />
          </View>)}
           <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'Additional Charge'} keyboardType={"number-pad"} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) => this.setState({additional_charge_toggle: value})}
          value={this.state.additional_charge_toggle}
        />
           </View>
          {this.state.additional_charge_toggle == true &&(<View>
            <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({additional_charge: text , })} value={this.state.additional_charge} />
          </View>)} 
           <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'COD'} keyboardType={"number-pad"} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) => this.setState({cod_toggle: value})}
          value={this.state.cod_toggle}
        />
           </View>
           {this.state.cod_toggle == true &&(<View>
            <CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({cod: text , })} value={this.state.cod} />
           </View>)}

</View>)}
        <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.submit()} />
       </View>)}
        </View>
                </KeyboardAvoidingScrollView>
          </Container>
          </SideMenuDrawer>
      );
    }
  
  
  }
  
//   const styles=StyleSheet.create({
  
//        viewstyle:{
//          padding:20,
//              },
  
//   });
  
const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
};