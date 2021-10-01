import React, { Component } from 'react';
import { ScrollView, StyleSheet, AsyncStorage, TouchableOpacity, Linking, Platform, FlatList, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Button, Left, Icon, Right, View, Badge, Body, Toast } from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import CustomCheckBox from '../../component/CustomCheckBox';
import { SECTION_MARGIN_TOP, COLUMN_PADDING, SHORT_BUTTON_HEIGHT, FOURTH_FONT, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,CLOSE_SIZE,CLOSE_WIDTH } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session, { KEY } from '../../session/SessionManager';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import Api from '../../component/Fetch';
import { PREDEFINED_ID_STATUS, UPDATE_PDOID_STATUS , PDOID_LIST_BY_STATUS, UPDATE_PDOID_PAYMENT_STATUS} from '../../constants/Api';
import RNPrint from 'react-native-print';
import _ from "lodash";
import { RNCamera } from 'react-native-camera';


const myArray = [{ name: "PENDING", value: "Assign Pending" }, { name: "ASSIGNED", value: "Assigned" } , { name: "ASSIGNED", value: "Reassign" } , { name: "PENDING", value: "Reassign Pending" } , { name: "PAYMENT_PENDING", value: "Payment Pending" }, { name: "ACCEPTED", value: "Re-assign Accepted" },];



export default class PredefinedOrder extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
 this.state = {
    predefined_status_list: [],
    delivery_ids:[],
    modalVisible:false,
    delivery_details:[],
    orderId_type:'',
    torch_enable:RNCamera.Constants.FlashMode.off,
    predefinedpin:'',
    pdoid_status:'',
    status_type:'',
    camera: {
      type: RNCamera.Constants.Type.back,
flashMode: RNCamera.Constants.FlashMode.auto,
    }
  };
}

  componentDidMount() {
    console.log("PAGE===================================>")
    this.fetch_predefined_orders("PENDING")
    setTimeout(()=>{this.setState({loader:false})},1000);
  }

  //////////////////////////////  Toggle torch function   ////////////////////////////////////////////////////////////////////

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
//////////////////////////////////////////////////////////////////////////////////////////////////////
isCharacterALetter(char) {
  return (/[a-zA-Z]/).test(char)
}
 ////////////////////////////////////// Scanning barcode function ////////////////////////////////////////

 onBarCodeRead(scanResult) {
  console.warn(scanResult.type);
  console.warn(scanResult.data);
  if (scanResult.data != null) {
if (!this.barcodeCodes.includes(scanResult.data)) {
  this.barcodeCodes.push(scanResult.data);
  setTimeout(()=>{this.setState({predefinedpin:scanResult.data,modalVisible:false})},100);
    
    console.log("SCANNEDDDDDDDDDD",this.state.predefinedpin)
  console.warn('onBarCodeRead call');
  if(scanResult.data != null){
    if(this.isCharacterALetter((scanResult.data).charAt(0)) === true )
    {
      this.setState({orderId_type:'PREDEFINED_ORDER_ID'})
      setTimeout(()=>{ this.fetch_delivery_orders_by_scan('PREDEFINED_ORDER_ID');},1000);

    }else
    {
      this.setState({orderId_type:'ORDER_ID'})
      setTimeout(()=>{ this.fetch_delivery_orders_by_scan('ORDER_ID');;},1000);
    }
  }
}
  }
  return;
}

///////////////////////////////////// PDOID payment status update function ////////////////////////////////////////////////////////////////////////////////////
  
pdoid_payment_status_update(id) {
  
 
  Api.fetch_request(UPDATE_PDOID_PAYMENT_STATUS+id+'/COMPLETED', 'PUT', '')
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        Toast.show({ text: result.message, type: 'success' });

        this.fetch_predefined_orders(this.state.status_type);

      }
      else {
        console.log('Failed');
        Toast.show({ text: result.message, type: 'warning' });

      }
    })
}


////////////////////////////////////// PDOID status update function ////////////////////////////////////////////////////////////////////////////////////
  
pdoid_status_update(id,status) {
  
 
  Api.fetch_request(UPDATE_PDOID_STATUS+id+'/assignment-status/'+status, 'PUT', '')
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        this.fetch_predefined_orders(this.state.status_type);
        Toast.show({ text: result.message, type: 'success' });

      }
      else {
        console.log('Failed');
        Toast.show({ text: result.message, type: 'warning' });

      }
    })
}

//////////////////////////////// Word capitalizing function /////////////////////////////////////////////////////////////////////////////////////////////

 capitalizeName(name) {
  return name.replace(/\b(\w)/g, s => s.toUpperCase());
}



  
////////////////////////////////////// PDOID fetching function ///////////////////////////////////////////////////////////////////////////////////
 
fetch_predefined_orders(status_type) {

    this.setState({ status_type: status_type })

    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

      let body = {
        
          "assigneeId": data.personId,
          "assigneeUserType": "DELIVERY_BOY",
          "assignmentStatus": status_type
     
      };

      Api.fetch_request(PREDEFINED_ID_STATUS, 'POST', '', JSON.stringify(body))
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));

            const newArray = [];
            result.payload.forEach(obj => {
              if (!newArray.some(o => o.orderId === obj.orderId)) {
                newArray.push({ ...obj })
                this.state.delivery_ids.push(obj.orderId);
              }
        
            });
            this.setState({ predefined_status_list: newArray })

          }
          else {
            console.log('Failed');
            this.setState({ predefined_status_list: ''})
            Toast.show({ text: result.message, type: 'warning' });
          }
        })
    }));
  }

////////////////////////////////////// PDOID fetching function ///////////////////////////////////////////////////////////////////////////////////
 
fetch_predefined_orders2(status_type) {

  this.setState({ status_type: status_type })

  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = {
      
        "assigneeId": data.personId,
        "assignerUserType": "DELIVERY_BOY",
        "preOrderAssignStatusFilter": status_type
   
    };

    Api.fetch_request(PDOID_LIST_BY_STATUS, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));

          const newArray = [];
          result.payload.forEach(obj => {
            if (!newArray.some(o => o.orderId === obj.orderId)) {
              newArray.push({ ...obj })
              this.state.delivery_ids.push(obj.orderId);
            }
      
          });
          this.setState({ predefined_status_list: newArray })

        }
        else {
          console.log('Failed');
          this.setState({ predefined_status_list: ''})
          Toast.show({ text: result.message, type: 'warning' });
        }
      })
  }));
}



//////////////////////////////////// Delivery orders header part ///////////////////////////////////////////////////////////////////////////////////

  _header = () => {

    if(this.state.status_type == 'PENDING' && this.state.pdoid_status =='Reassign Pending' ){
      return (

        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
          <View style={styles.cell}><CustomText text={'SLNO'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Re-Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Re-Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'No of Order ID '} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'User Type'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'User ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'User Name'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Range'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
         
        </View>
      )
     
    }
    
    else if(this.state.status_type == 'PAYMENT_PENDING' && this.state.pdoid_status =='Payment Pending'){
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
       <View style={styles.cell}><CustomText text={'SLNO'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Re-Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Re-Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'No of Order ID '} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'User Type'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'User ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'User Name'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Range'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
         
      </View>
        )
    }
    else if(this.state.status_type == 'ASSIGNED' && this.state.pdoid_status =='Reassign'){
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
               <View style={styles.cell}><CustomText text={'Sl No'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>

        <View style={styles.cell}><CustomText text={'Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'No of Order ID '} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Range'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
       
      </View>
        )
    }
    else if(this.state.status_type == 'ASSIGNED' && this.state.pdoid_status =='Assigned'){
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
                <View style={styles.cell}><CustomText text={'Sl No'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>

        <View style={styles.cell}><CustomText text={'Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'No of Order ID '} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Range'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      </View>
        )
    }
    else if(this.state.status_type == 'PENDING' && this.state.pdoid_status =='Assign Pending'){
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
        <View style={styles.cell}><CustomText text={'Sl No'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'No of Order ID '} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Range'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
       
      </View>
        )
    }
    
    else{
      return(
      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
      <View style={styles.cell}><CustomText text={'SLNO'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'No of Order ID '} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
     <View style={styles.cell}><CustomText text={'Used Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View> 
     <View style={styles.cell}><CustomText text={'Status'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
     <View style={styles.cell}><CustomText text={'Range'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
     <View style={styles.cell}><CustomText text={'Office Name'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'User Name'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
      {/* <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View> */}
     
    </View>
      )
    }
  }


  ///////`///////////////////////////// Delivery orders body part ///////////////////////////////////////////////////////////////////////////////////

  _body = (item, index) => {
    if(this.state.status_type == 'PENDING' && this.state.pdoid_status =='Reassign Pending' ){
      return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
       
       <View style={styles.cell2}><CustomText text={index + 1} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell2}><CustomText text={item.assignerName ? item.assignerName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell2}><CustomText text={parseInt(item.availableToId)-parseInt(item.availableFromId)} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell2}><CustomText text={item.availableFromId ? item.prefix+item.availableFromId +"-"+ item.prefix+item.availableToId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell2}><CustomText text={item.assignerUserType ? item.assignerUserType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
       

      </View>

    )
  }
  
  else if(this.state.status_type == 'ASSIGNED' && this.state.pdoid_status =='Assigned'){
    return(
      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
           <View style={styles.cell2}><CustomText text={index + 1} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

      <View style={styles.cell2}><CustomText text={item.assignerName ? item.assignerName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.updatedDate ? item.updatedDate : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

      <View style={styles.cell2}><CustomText text={parseInt(item.availableToId)-parseInt(item.availableFromId)} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.availableFromId ? item.prefix+item.availableFromId +"-"+ item.prefix+item.availableToId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><Button  transparent onPress={()=>this.pdoid_status_update(item.preorderAssignId,'ASSIGNED')}><Icon style={{ color: Colors.black,fontSize:30,paddingLeft:30 }} name='ios-eye' /></Button></View>
    <View style={styles.cell2}><Button  transparent onPress={()=>this.pdoid_status_update(item.preorderAssignId,'REJECTED')}><Icon style={{ color: Colors.black ,fontSize:26,paddingLeft:30}} name='ios-barcode' /></Button></View>
      </View>
      )
  }
  else if(this.state.status_type == 'ASSIGNED' && this.state.pdoid_status =='Reassign'){
    return(
      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
      
      <View style={styles.cell2}><CustomText text={index + 1} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.assignerName ? item.assignerName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.updatedDate ? item.updatedDate : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

      <View style={styles.cell2}><CustomText text={parseInt(item.availableToId)-parseInt(item.availableFromId)} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.availableFromId ? item.prefix+item.availableFromId +"-"+ item.prefix+item.availableToId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomButton title={'Assign'} showIcon={true} icon_name={'ios-person'} icon_color={Colors.white} icon_fontsize={FOURTH_FONT} backgroundColor={Colors.darkSkyBlue} fontSize={14} marginTop={20} marginLeft={20} marginRight={20} marginBottom={20}  text_color={Colors.white} onPress={()=>Actions.assignpredefined({assigned_id:item.preorderAssignId, PDOID:parseInt(item.availableToId)-parseInt(item.availableFromId), available_from:item.assignedFromId})} /></View>
      <View style={styles.cell2}><Button  transparent onPress={()=>this.pdoid_status_update(item.preorderAssignId,'ASSIGNED')}><Icon style={{ color: Colors.black,fontSize:30,paddingLeft:30 }} name='ios-eye' /></Button></View>
    <View style={styles.cell2}><Button  transparent onPress={()=>this.pdoid_status_update(item.preorderAssignId,'REJECTED')}><Icon style={{ color: Colors.black ,fontSize:26,paddingLeft:30}} name='ios-barcode' /></Button></View>
      </View>
      )
  }
  else if(this.state.status_type == 'PAYMENT_PENDING' && this.state.pdoid_status =='Payment Pending'){
    return(
      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
            <View style={styles.cell2}><CustomText text={index + 1} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

      <View style={styles.cell2}><CustomText text={item.assignerName ? item.assignerName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={parseInt(item.availableToId)-parseInt(item.availableFromId)} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.availableFromId ? item.prefix+item.availableFromId +"-"+ item.prefix+item.availableToId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.assignerUserType ? item.assignerUserType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      </View>
      )
  }
  else if(this.state.status_type == 'PENDING' && this.state.pdoid_status =='Assign Pending'){
    return(
      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
            <View style={styles.cell2}><CustomText text={index + 1} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

      <View style={styles.cell2}><CustomText text={item.assignerName ? item.assignerName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={parseInt(item.availableToId)-parseInt(item.availableFromId)} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.availableFromId ? item.prefix+item.availableFromId +"-"+ item.prefix+item.availableToId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.assignerUserType ? item.assignerUserType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
    <View style={styles.cell2}><Button  transparent onPress={()=>this.pdoid_status_update(item.preorderAssignId,'ASSIGNED')}><Icon style={{ color: Colors.black,fontSize:30,paddingLeft:30 }} name='ios-checkmark' /></Button></View>
    <View style={styles.cell2}><Button  transparent onPress={()=>this.pdoid_status_update(item.preorderAssignId,'REJECTED')}><Icon style={{ color: Colors.black ,fontSize:20,paddingLeft:30}} name='md-close' /></Button></View>
    </View>
      )
  }
    else{
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
              <View style={styles.cell2}><CustomText text={index + 1} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

        <View style={styles.cell2}><CustomText text={item.assignerName ? item.assignerName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell2}><CustomText text={parseInt(item.availableToId)-parseInt(item.availableFromId)} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell2}><CustomText text={item.availableFromId ? item.prefix+item.availableFromId +"-"+ item.prefix+item.availableToId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell2}><CustomText text={item.assignerUserType ? item.assignerUserType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        </View>
      )
    }
  }

////////////////////////////////////// Render function //////////////////////////////////////////////////////////////////////////////////////

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button  width={CLOSE_WIDTH}  onPress={() => Actions.pop()} transparent>
          <Icon style={{ color: Colors.navbarIconColor,fontSize:22 }} name='md-arrow-round-back' />
        </Button>
      </Left>
    );

  
    return (

      <Container>
        <Navbar left={left} title="Predefined Order Id" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>
        

          {/*////////////////////// Print Button Block //////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, backgroundColor: Colors.aash, }}>
            <View style={{ flex: 4 }}><CustomDropdown data={myArray} height={SHORT_BUTTON_HEIGHT} backgroundColor={Colors.aash} onChangeValue={(value, index, data) => { this.setState({ offset: 0 }); setTimeout(() => { {if(value=='Assign Pending' || value=='Assigned' || value=='Reassign'){this.fetch_predefined_orders(data[index]['name']);}else{this.fetch_predefined_orders2(data[index]['name'])}; this.setState({pdoid_status:value})} }, 100); }} /></View>
            <View style={{ flex: 3 }}><CustomButton title={'Track Order ID'} text_color={Colors.darkSkyBlue} backgroundColor={Colors.white} height={SHORT_BUTTON_HEIGHT} fontSize={16} marginRight={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} onPress={()=>this.setState({modalVisible:true})} /></View>
          </View>

          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}
 
          <View>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                data={this.state.predefined_status_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item ,index}) => this._body(item,index)}
                ListHeaderComponentStyle={styles.header}
              />

            </ScrollView>
            <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP ,marginBottom:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
          </View>
        </ScrollView>
      </Container>


    );
  }


}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  header: {
    backgroundColor: Colors.aash,

  },
  cell: {
    width: 130,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRightWidth: 0.3,
    backgroundColor:Colors.buttonBackgroundColor


  },
  cell2: {
    flex:1,
    width: 130,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRightWidth: 0.3,
    backgroundColor:Colors.white,
    justifyContent:'center'


  },
  cell1: {
    width: 50,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRightWidth: 0.3,


  },

  body: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingLeft: COLUMN_PADDING,
    paddingRight: COLUMN_PADDING,
    borderBottomWidth: 5,
    borderColor: Colors.textBackgroundColor1,

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
  },

});