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
import { SECTION_MARGIN_TOP, COLUMN_PADDING, SHORT_BUTTON_HEIGHT, LOGIN_FIELD_HEIGHT, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,CLOSE_SIZE,CLOSE_WIDTH } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session, { KEY } from '../../session/SessionManager';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import Api from '../../component/Fetch';
import { PREDEFINED_ID_STATUS, DELIVERY_STATUS_UPDATE , DELIVERY_STATUS_CLOSE, GET_DELIVERY_BY_SCAN} from '../../constants/Api';
import RNPrint from 'react-native-print';
import _ from "lodash";
import { RNCamera } from 'react-native-camera';


const myArray = [{ name: "PENDING", value: "Assign Pending" }, { name: "ASSIGNED", value: "Assigned" } , { name: "Reassign", value: "Reassign" } , { name: "Reassign Pending", value: "Reassign Pending" } , { name: "Payment Pending", value: "Payment Pending" }, { name: "Re-assign Accepted", value: "Re-assign Accepted" }, { name: "Used", value: "Used" }, { name: "Unused", value: "Unused" }];



export default class PredefinedOrder extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
 this.state = {
    filterType: Strings.status,
    search: '',
    predefined_status_list: [],
    delivery_ids:[],
    checked: [],
    status_type: Strings.assigned,
    loader:true,
    selectedPrinter: null,
    search_critieria:'Order No.',
    pickup_list_search:[],
    isSearch:false,
    searchText:'',
    modalVisible:false,
    delivery_details:[],
    orderId_type:'',
    torch_enable:RNCamera.Constants.FlashMode.off,
    predefinedpin:'',
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

  ////////////////////////////////////// Delivery order by scanning fetching function ///////////////////////////////////////////////////////////////////////////////////

  fetch_delivery_orders_by_scan(type) {

    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

      Api.fetch_request(GET_DELIVERY_BY_SCAN + this.state.predefinedpin +'/orderIdType/' + type, 'GET', '')
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
            this.setState({ delivery_details: result.payload })

            if(this.state.delivery_details.deliveryBoy.personId == data.personId)
{
  Actions.deliveryoutdetails({delivery_id:this.state.delivery_details.deliveryId});
}else{
  Toast.show({text:'This is not your order',type:'warning'})
}
          }
          else {
            console.log('Failed');
            this.setState({ delivery_details: ''})
            Toast.show({text:result.message,type:'warning'})
   
          }
        })
      }));
  }

/////////////////////////////// Checkbox checking function ///////////////////////////////////////////////////////////////////////////////////
  
checkItem = (item) => {
  const { checked } = this.state;
  console.log(item)
  if (!checked.includes(item)) {

    setTimeout(()=>{this.setState({ checked: [...this.state.checked, item] })},100);
    // setTimeout(()=>{ alert(this.state.checked)},3000);
   
  } else {
    setTimeout(()=>{this.setState({ checked: checked.filter(a => a !== item) })},100);
  }
  console.log(checked)
};



////////////////////////////////////// Delivery CloseAll function ////////////////////////////////////////////////////////////////////////////////////
  
delivery_close_all() {
  
  let body = {
    "orderIds": this.state.checked,
    "status": "CLOSED"
  };

  Api.fetch_request(DELIVERY_STATUS_CLOSE, 'PUT', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        this.fetch_delivery_orders(this.state.status_type);

      }
      else {
        console.log('Failed');
        
      }
    })
}

//////////////////////////////// Word capitalizing function /////////////////////////////////////////////////////////////////////////////////////////////

 capitalizeName(name) {
  return name.replace(/\b(\w)/g, s => s.toUpperCase());
}



  
////////////////////////////////////// Delivery order fetching function ///////////////////////////////////////////////////////////////////////////////////
 
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
            this.setState({ delivery_list: ''})
          }
        })
    }));
  }


  ///////////////////////////////// Delivery order update function //////////////////////////////////////////////////////////////////////////////////////// 
 
 delivery_status_update(id) {

  let body = {

    "deliveryFailedReason": '',
    "deliveryStatus": 'CLOSED',
    "orderId": id

  };

  Api.fetch_request(DELIVERY_STATUS_UPDATE, 'PUT', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {
        console.log('Success:', JSON.stringify(result));
      this.fetch_delivery_orders(this.state.status_type);
      }
      else {
        console.log('Failed');
      }
    })

}

//////////////////////////////////// Delivery orders header part ///////////////////////////////////////////////////////////////////////////////////

  _header = () => {

    if(this.state.status_type == 'Reassign Pending' ){
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
    else if(this.state.status_type == 'Used'){
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
        <View style={styles.cell}><CustomText text={'Order ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
       <View style={styles.cell}><CustomText text={'Used Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View> 
       <View style={styles.cell}><CustomText text={'Address'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
       <View style={styles.cell}><CustomText text={'Status'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
       <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
      </View>
        )
    }
    else if(this.state.status_type == 'Unused'){
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
        <View style={styles.cell}><CustomText text={'Order ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
       <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
      </View>
        )
    }
    else if(this.state.status_type == 'Payment Pending'){
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
    else if(this.state.status_type == 'Assign Pending'){
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
        <View style={styles.cell}><CustomText text={'Order ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'No of Order ID '} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Range'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
       
      </View>
        )
    }
    else if(this.state.status_type == 'ASSIGNED'){
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
        <View style={styles.cell}><CustomText text={'Order ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'No of Order ID '} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
          <View style={styles.cell}><CustomText text={'Range'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      </View>
        )
    }
    else if(this.state.status_type == 'Unused'){
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
        <View style={styles.cell}><CustomText text={'Order ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned By'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
       <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        {/* <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View> */}
       
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


  //////////////////////////////////// Delivery orders body part ///////////////////////////////////////////////////////////////////////////////////

  _body = (item) => {

    if(this.state.status_type == 'Reassign Pending' || this.state.status_type == 'Payment Pending'){
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
       
       
        <View style={styles.cell}><CustomText text={item.assignerName ? item.assignerName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.addressLine1 ? item.addressLine1 : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.availableFromId ? item.availableFromId +"-"+ item.availableToId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.assignerUserType ? item.assignerUserType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
       

      </View>

    )
  }
  else if(this.state.status_type == 'Used'){
    return(
      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
      <View style={styles.cell}><CustomText text={item.assignerName ? item.assignerName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={item.addressLine1 ? item.addressLine1 : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={item.availableFromId ? item.availableFromId +"-"+ item.availableToId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={item.assignerUserType ? item.assignerUserType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      </View>
      )
  }
    else{
      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
        <View style={styles.cell}><CustomText text={item.assignerName ? item.assignerName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.addressLine1 ? item.addressLine1 : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.availableFromId ? item.availableFromId +"-"+ item.availableToId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.assignerUserType ? item.assignerUserType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        </View>
      )
    }
  }

////////////////////////////////////// Render function //////////////////////////////////////////////////////////////////////////////////////

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button  width={CLOSE_WIDTH}  onPress={() => Actions.pop()} transparent>
          <Icon style={{ color: Colors.navbarIconColor,fontSize:CLOSE_SIZE }} name='md-arrow-round-back' />
        </Button>
      </Left>
    );

    var right = (
      <Right style={{ flex: 1 }}>
        <Button  transparent onPress={()=>Actions.chat()}>
          <Icon style={{ color: Colors.navbarIconColor }} name='ios-chatbubbles' />
        </Button>
        <Button  transparent onPress={()=>Actions.notification()}>
          <Icon style={{ color: Colors.navbarIconColor }} name='ios-notifications' />
          <Badge style={{ width: 10, backgroundColor: 'orange', height: 12, marginTop: 20, borderRadius: 10 }}
            textStyle={{ color: 'white', fontSize: 20, lineHeight: 20 }}></Badge>
        </Button>
      </Right>
    );
    var torch = (
      <Right style={{ flex: 1 }}>
        <Button width={CLOSE_WIDTH} onPress={() => this.toggleTorch()} transparent>
          <Icon style={{ color:Colors.navbarIconColor,fontSize:22}} name='ios-flash' />
          </Button>
      </Right>
    );
    var modal_view = (
      <Left style={{ flex: 1 }}>
        <Button width={CLOSE_WIDTH} onPress={() => this.setState({modalVisible:false})} transparent>
          <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='ios-close' />
          </Button>
      </Left>
    );
    return (

      <Container>
        <Navbar left={left} right={right} title="Predefined Order Id" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>

        {/* { this.state.loader === true && (<View style={{alignItems:'center'}}>
        <CustomActivityIndicator/>
        </View>)} */}

{/* //////////////////////////  Scan Modal ///////////////////////////////////////////////////////////////////////////////////////// */}
       
<Modal     animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        >

<View style={styles.container}>
   
<Navbar  title="Scanning" left={modal_view} right={torch}/>
       
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


        

          {/*////////////////////// Print Button Block //////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, backgroundColor: Colors.aash, }}>
            <View style={{ flex: 4 }}><CustomDropdown data={myArray} height={SHORT_BUTTON_HEIGHT} backgroundColor={Colors.aash} onChangeValue={(value, index, data) => { this.setState({ offset: 0 }); setTimeout(() => { this.fetch_predefined_orders(data[index]['name']) }, 100); }} /></View>
            <View style={{ flex: 3 }}><CustomButton title={'Track Order ID'} text_color={Colors.darkSkyBlue} backgroundColor={Colors.white} height={SHORT_BUTTON_HEIGHT} fontSize={16} marginRight={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} onPress={()=>this.setState({modalVisible:true})} /></View>
          </View>

          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}
 
          <View>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                data={this.state.predefined_status_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body(item)}
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