import React, { Component } from 'react';
import { ScrollView, StyleSheet, AsyncStorage, FlatList ,Linking, Platform, BackHandler, Modal , Switch} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Button, Left, Icon, Right, Text, Input, TextInput, Grid, Col, Row, SearchBar, Item, View, Badge, Body, Toast } from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import { SECTION_MARGIN_TOP, COLUMN_PADDING, SHORT_BUTTON_HEIGHT, LOGIN_FIELD_HEIGHT, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,CLOSE_SIZE,CLOSE_WIDTH } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import CustomCheckBox from '../../component/CustomCheckBox';
import CustomAlertComponent from '../../component/CustomAlertComponent';

import session, { KEY } from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { PICKUP_ORDERS, PICKUP_ORDER_UPDATE , PICKUP_STATUS_CLOSE, GET_PICKUP_BY_SCAN} from '../../constants/Api';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import RNPrint from 'react-native-print';
import _ from "lodash"
import { RNCamera } from 'react-native-camera';


const myArray1 = [{ name: "Order No.", value: "Order No." }, { name: "CustomerName", value: "CustomerName" },];
const myArray = [{ name: "ASSIGNED", value: "ASSIGNED" }, { name: "ALL", value: "ALL" }, { name: "ATTEMPT_FAILED", value: "ATTEMPT FAILED" }, { name: "COLLECTED", value: "COLLECTED" }];



export default class PickUp extends React.Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
    this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
    this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
   
  }
  onPressAlertPositiveButton() {
    this.pickup_update_collect(this.state.pickup_details.orderId);
    Actions.pickup();

  }
  onPressAlertNegativeButton() {
  this.setState({alert_visible:false})
  Actions.pickup();
  }
 state = {
    filterType: Strings.status,
    search: '',
    pickup_list: [],
    pickup_ids:[],
    checked: [],
    offset: 0,
    status_type: Strings.assigned,
    selectedPrinter: null,
    search_critieria:'Order No.',
    pickup_list_search:[],
    isSearch:false,
    searchText:'',
    modalVisible:false,
    pickup_details:[],
    orderId_type:'',
    torch_enable:RNCamera.Constants.FlashMode.off,
    predefinedpin:'',
    allChecked: false,
    quick_scan:false,
    scan_title:'',
    alert_visible:false,
    alert_title:'Alert',
    alert_message:'Do you want to change status to collected ?',
    order_id:'',
    camera: {
      type: RNCamera.Constants.Type.back,
flashMode: RNCamera.Constants.FlashMode.auto,
    }

  };
  


  componentDidMount() {
    this.fetch_pickup_orders(Strings.assigned) ;
    this.toggleScan();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  toggleScan(val){
    if(val === true){
      setTimeout(()=>{this.setState({scan_title:"Quick Scan"})},1000)
    }else{
      setTimeout(()=>{this.setState({scan_title:"Normal Scan"})},1000)
    }
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
      setTimeout(()=>{ this.fetch_pickup_orders_by_scan('PREDEFINED_ORDER_ID');},1000);

    }else
    {
      this.setState({orderId_type:'ORDER_ID'})
      setTimeout(()=>{this.fetch_pickup_orders_by_scan('ORDER_ID');},1000);
    }
  }
}
  }
  return;
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

/////////////////////////////// All Checkbox checking function ///////////////////////////////////////////////////////////////////////////////////
selectAllItem(){
  var i ;
  const { checked } = this.state;
  for(i=0;i<this.state.pickup_ids.length;i++){
   var item=this.state.pickup_ids[i];
   if(!checked.includes(item)){
    this.checkItem(item);
   }
  }
}
 
deselectAllItem(){
  var i ;
  for(i=0;i<this.state.checked.length;i++){
  this.setState({checked:[]});
  }
}

////////////////////////////////////// Pickup CloseAll function ////////////////////////////////////////////////////////////////////////////////////
  
pickup_close_all() {
  
  let body = {
    "orderIds": this.state.checked,
    "status": "CLOSED"
  };

  Api.fetch_request(PICKUP_STATUS_CLOSE, 'PUT', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        this.fetch_pickup_orders(this.state.status_type)

      }
      else {
        console.log('Failed');
        
      }
    })
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

////////////////////////////////////// Pickup order fetching function ///////////////////////////////////////////////////////////////////////////////////

  fetch_pickup_orders(status_type) {

    this.setState({ status_type: status_type })

    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

      let body = {
        
        "filterType": status_type != Strings.all ? this.state.filterType : Strings.all,
        "status": status_type == Strings.all ? '0' : status_type,
        "personId": data.personId

      };

      Api.fetch_request(PICKUP_ORDERS, 'POST', '', JSON.stringify(body))
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
            const newArray = [];
            result.payload.forEach(obj => {
              if (!newArray.some(o => o.orderId === obj.orderId)) {
                newArray.push({ ...obj })
                this.state.pickup_ids.push(obj.orderId);
              }
        
            });

            this.setState({ pickup_list: newArray })

          }
          else {
            console.log('Failed');
            this.setState({ pickup_list: ''})
            
   
          }
        })
    }));
  }
  ////////////////////////////////////// Pickup order by scanning fetching function ///////////////////////////////////////////////////////////////////////////////////

  fetch_pickup_orders_by_scan(type) {

    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

      Api.fetch_request(GET_PICKUP_BY_SCAN + this.state.predefinedpin +'/orderIdType/' + type, 'GET', '')
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
            this.setState({ pickup_details: result.payload })

            if(this.state.pickup_details.deliveryBoy.personId == data.personId)
            ///////////////////////// Editted for quick scan ////////////////////////////////////////////////////////////////////
{
  if(this.state.scan_title ==='Quick Scan' && parseInt(this.state.pickup_details.payableBySender) > 0 ){
  Actions.pickupdetails({pickup_id:this.state.pickup_details.pickupId});
}else if(this.state.scan_title ==='Normal Scan'){
  Actions.pickupdetails({pickup_id:this.state.pickup_details.pickupId});
}else{
  this.setState({alert_visible:true})
// this.pickup_update_collect(this.state.pickup_details.orderId);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
}else{
  Toast.show({text:'This is not your order',type:'warning'})
}
          }
          else {
            console.log('Failed');
            this.setState({ pickup_details: ''})
            Toast.show({text:result.message,type:'warning'})
   
          }
        })
      }));
  }

  ///////////////////////////////// Pickup order update function //////////////////////////////////////////////////////////////////////////////////////// 
 
  pickup_update_collect(order_id) {

    let body = {

  "orderId": order_id,
  "pickupFailedReason": '',
  "pickupStatus": 'COLLECTED'

    };

    Api.fetch_request(PICKUP_ORDER_UPDATE, 'PUT', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

         this.setState({final_cod_charge:result.payload.finalCodCharge})
          console.log('Success:', JSON.stringify(result));
          Toast.show({ text: result.message, type: 'success' });
         this.setState({alert_visible:false});
         this.fetch_pickup_orders(Strings.assigned) ;

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
  /////////////////////////////////// Searching with order no /////////////////////edited Nishanth/////////////////////////////////////////

  searchtext(text){

  
 /*  let res=_.filter(this.state.delivery_list, obj=>obj.orderId==text);

  this.setState({pickup_list_search:res}) */
  const textData = text.toUpperCase();
  console.log('values from textbox:', textData.toUpperCase() )
  if (textData  == '' || null) {
     console.log("EMPTY")
  }
  else {

      console.log('text data in else part are:',textData  )
  
      const MainData = this.state.pickup_list.filter((item)=> {
        console.log("==>",item.orderId)
        const itemData=`${item.preDefinedOrderId?item.preDefinedOrderId:item.orderId}`;
          
          return itemData.indexOf(textData) > -1;
      }
 
      );
      console.log('maindata:', MainData)
      if (MainData == '') {
         console.log("NODART")
         Toast.show({text:'Not Found',type:'warning'})
      }
      else {
       /*    this.setState({ itemalert: false }) */
          this.setState({
            pickup_list_search : MainData,
            
          });
          console.log("DATA FOUND")
      }
  }

  }

   /////////////////////////////////// Searching with Customer name ////////////////////////////edited Nishanth//////////////////////////////////

   searchtext_name(text){
    const textData = text.toLowerCase();
    const textData1 =text.toUpperCase()
    console.log('values from textbox:', textData.toUpperCase() )
    if (textData  == '' || null) {
       console.log("EMPTY")
    }
    else {
  
        console.log('text data in else part are:',textData  )
    
        const MainData = this.state.pickup_list.filter((item)=> {
          console.log("==>",item.contactPersonName)
            const itemData=`${item.contactPersonName}`;
            
            return itemData.indexOf(textData || textData1) > -1;
        }
   
        );
        console.log('maindata:', MainData)
        if (MainData == '') {
           console.log("NODART")
        }
        else {
         /*    this.setState({ itemalert: false }) */
            this.setState({
              pickup_list_search : MainData,
              
            });
            console.log("DATA FOUND")
        }
    }
     
  }

   ///////////////////////////////// Pickup order update function //////////////////////////////////////////////////////////////////////////////////////// 
 
   pickup_update(id) {

    let body = {

  "orderId": id,
  "pickupFailedReason": "",
  "pickupStatus": "CLOSED"


    };

    Api.fetch_request(PICKUP_ORDER_UPDATE, 'PUT', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

         this.setState({final_cod_charge:result.payload.finalCodCharge})
          console.log('Success:', JSON.stringify(result));
          
          this.fetch_pickup_orders(this.state.status_type)
        

        }
        else {
          console.log('Failed');
          
        }
      })

}

///////////////////////////////////// Pickup order header part ///////////////////////////////////////////////////////////////////////////////////////////
  _header = () => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
        <View style={styles.cell1}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        {/* <View style={styles.cell}><CustomText text={'SERIAL NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View> */}
        <View style={styles.cell}><CustomText text={'ORDER ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'CONTACT NAME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'ADDRESS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'LOCATION'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'MOBILE NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'DATE & TIME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'ATTEMPT'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'DELIVERY TYPE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'TOTAL'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        {/* <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View> */}
       
      </View>
    )
  }

  ///////////////////////////////////// Pickup order body part ///////////////////////////////////////////////////////////////////////////////////////////

  _body = (item) => {
    // if(item.pickupStatus == 'COLLECTED'){
    //   this.state.pickup_ids.push(item.orderId);
    //   // alert(this.state.pickup_ids)
    // }
   
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
        {/* <View style={styles.cell1}><Icon name='arrow-up' style={{ fontSize: 14 }} /></View> */}
        <View style={styles.cell1}>{item.pickupStatus == 'COLLECTED' && (<View><CustomCheckBox color={Colors.buttonBackgroundColor} onPress={()=>this.checkItem(item.orderId)} checked={this.state.checked.includes(item.orderId)}/></View>)}</View>
        {/* <View style={styles.cell}><CustomText text={item.serialId ? item.serialId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View> */}
        <View style={styles.cell}><CustomText text={item.preDefinedOrderId?item.preDefinedOrderId:item.orderId ? item.orderId :Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.contactPersonName ? item.contactPersonName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.addressLine1 ? item.addressLine1 : Strings.na} textType={Strings.subtext}  color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  <CustomText text={item.addressLine2 ? item.addressLine2 : Strings.na} textType={Strings.subtext}  color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  <CustomText text={item.city ? item.city : Strings.na} textType={Strings.subtext}  color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  </View>
        <View style={styles.cell}><CustomText text={item.gmapLink ? item.gmapLink : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.contactPersonNumber ? item.contactPersonNumber : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.pickupDate ? item.pickupDate : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  <CustomText text={item.pickupTime ? item.pickupTime : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  </View>
        <View style={styles.cell}><CustomText text={item.pickupStatus ? item.pickupStatus : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.attempt ? item.attempt : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.deliveryType ? item.deliveryType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.total ? item.total : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

        <View style={styles.cell}>
          <View>
            <CustomButton title={'Notify'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5}  text_color={Colors.darkSkyBlue} />
            <CustomButton title={'Call'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5}  text_color={Colors.darkSkyBlue} onPress={()=>this.dialCall(item.contactPersonNumber)}/>
            <CustomButton title={'Details'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5}  text_color={Colors.darkSkyBlue} onPress={() => Actions.pickupdetails({pickup_id:item.pickupId})} />
          </View>
        </View>
        {/* <View style={styles.cell}>
          {item.pickupStatus == 'COLLECTED' && (<View>
            <CustomButton title={'Close'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={30} marginBottom={5}  text_color={Colors.darkSkyBlue} onPress={()=>this.pickup_update(item.orderId)} />
            </View>)}
         </View> */}

      </View>


    )
  }

////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////////

render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button  width={CLOSE_WIDTH}  onPress={() => Actions.pop()} transparent>
          <Icon style={{ color: Colors.navbarIconColor,fontSize:CLOSE_SIZE }} name='ios-close' />
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
          <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='md-close' />
          </Button>
      </Left>
    );
    return (

      <Container>



        <Navbar left={left} right={right} title="Pickup" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>

{/* //////////////////////////  Scan Modal ///////////////////////////////////////////////////////////////////////////////////////// */}
       
        <Modal     animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        >

<View style={styles.container}>
   
<Navbar  title={this.state.scan_title} left={modal_view} right={torch}/>
       
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

          {/* ////////////////////////////////////// Manual Pickup Button ///////////////////////////////////////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', textAlignVertical: 'center',backgroundColor:Colors.white,height:40,borderRadius:SHORT_BLOCK_BORDER_RADIUS,padding:10,borderWidth:1,borderColor:Colors.darkSkyBlue}}>
            <View  style={{ flex: 9 }}><CustomText text={'Manual Pickup'} textType={Strings.maintext} onPress={()=>Actions.ordercreation()} mTop={1} color={Colors.darkSkyBlue}/></View>
            <View style={{ flex: 1, marginLeft: SECTION_MARGIN_TOP }}><Icon name={'ios-arrow-forward'} style={{color:Colors.darkSkyBlue,fontSize:16,flex:1,}} onPress={()=>Actions.ordercreation()}/></View>
          </View>


          {/*////////////////////// Order and Searchbar Block //////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', textAlignVertical: 'center',marginTop:SECTION_MARGIN_TOP }}>
            <View style={{ flex: 2 }}><CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white} fontSize={14} paddingBottom={SECTION_MARGIN_TOP} onChangeValue={(value,index,data)=>{this.setState({search_critieria:value})}} value={this.state.search_critieria} /></View>
           {(this.state.search_critieria === 'Order No.' && <View style={{ flex: 3, marginLeft: SECTION_MARGIN_TOP }}><CustomInput placeholder={'Search here with no'}  icon_name={'ios-search'} onChangeText={(text)=>{this.searchtext(text); this.setState({isSearch:true}); if(text==''){this.setState({isSearch:false})}}} icon_color={Colors.navbarIconColor} icon_fontsize={18} placeholderTextColor={Colors.navbarIconColor} fontSize={14} showIcon={true} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} marginTop={5} flex={1} /></View>)}

           {(this.state.search_critieria === 'CustomerName' && <View style={{ flex: 3, marginLeft: SECTION_MARGIN_TOP }}><CustomInput placeholder={'Search here with name'} icon_name={'ios-search'} onChangeText={(text)=>{this.searchtext_name(text); this.setState({isSearch:true}); if(text==''){this.setState({isSearch:false})}}} icon_color={Colors.navbarIconColor} icon_fontsize={18} placeholderTextColor={Colors.navbarIconColor} fontSize={14} showIcon={true} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} marginTop={5} flex={1} /></View>)}
          </View>

         

        {this.state.status_type == 'COLLECTED' &&(  <View style={{ flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, }}>
            <View style={{ flex: 2 }}><CustomButton title={'Select All '} backgroundColor={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={16} marginRight={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} onPress={()=>this.selectAllItem()} /></View>
            <View style={{ flex: 2 }}><CustomButton title={'Deselect All '} backgroundColor={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={16} marginRight={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} onPress={()=>this.deselectAllItem()} /></View>
            <View style={{ flex: 2, }}><CustomButton title={'Close All '} backgroundColor={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={16} marginRight={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} onPress={()=>this.pickup_close_all()} /></View>
          </View>)}

          
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1, marginTop:SECTION_MARGIN_TOP}}>
           <CustomText text={'Quick Scan'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) => {this.setState({quick_scan: value,});this.toggleScan(value);}}
          value={this.state.quick_scan}
        />
           </View>

          {/*////////////////////// Print Button Block //////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, backgroundColor: Colors.aash, }}>
            <View style={{ flex: 4 }}><CustomDropdown data={myArray} height={SHORT_BUTTON_HEIGHT} backgroundColor={Colors.aash} onChangeValue={(value, index, data) => { this.setState({ offset: 0 }); setTimeout(() => { this.fetch_pickup_orders(data[index]['name']) }, 100); }} /></View>
            <View style={{ flex: 2, }}><CustomButton title={'Scan'} backgroundColor={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={16} marginRight={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} onPress={()=>this.setState({modalVisible:true})} /></View>
          </View>

          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}

          <View >
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                data={this.state.isSearch ? this.state.pickup_list_search : this.state.pickup_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body(item)}
                ListHeaderComponentStyle={styles.header}
              />
            </ScrollView>
            <CustomAlertComponent
              displayAlert={this.state.alert_visible}
              displayAlertIcon={true}
              alertTitleText={this.state.alert_title}
              alertMessageText={this.state.alert_message}
              displayPositiveButton={true}
              positiveButtonText={'YES'}
              displayNegativeButton={true}
              negativeButtonText={'NO'}
              onPressPositiveButton={this.onPressAlertPositiveButton}
              onPressNegativeButton={this.onPressAlertNegativeButton}
            />

            <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP,marginBottom:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
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