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
import { USED_UNUSED_PDOID, UPDATE_PDOID_STATUS , PDOID_LIST_BY_STATUS, UPDATE_PDOID_PAYMENT_STATUS} from '../../constants/Api';
import RNPrint from 'react-native-print';
import _ from "lodash";
import { RNCamera } from 'react-native-camera';

const myArray = [{ name: "USED", value: "USED" }, { name: "UNUSED", value: "UNUSED" } ,];


export default class UsedUnusedPDOID extends React.Component {
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
      pdoid_status:'USED',
      status_type:'USED',
      bool:true,
      personId:'',
   };
  }

   ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////
   componentDidMount() {
    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);
      this.setState({personId:data.personId})
   
  }));
        this.fetch_predefined_orders('USED');

  }
   
////////////////////////////////////// PDOID fetching function ///////////////////////////////////////////////////////////////////////////////////
 
fetch_predefined_orders(status_type) {

  this.setState({ status_type: status_type })

  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);


    Api.fetch_request(USED_UNUSED_PDOID+this.props.pre_assign_id+'/'+status_type+'/'+this.state.bool, 'GET', '')
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          this.setState({ predefined_status_list: result.payload })


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

  if(this.state.status_type == 'USED' && this.state.pdoid_status =='USED' ){
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
        <View style={styles.cell}><CustomText text={'Order ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assignee'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Used Date '} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Status'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

      </View>
    )
   
  }
  else{
    return(
    <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
       <View style={styles.cell}><CustomText text={'Order ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assignee'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Assigned Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        {this.props.status === 'RE_ASSIGN' &&(<View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>)}   
        {this.props.status === 'ASSIGNED' &&(<View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>)}      
   
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>      

  </View>
    )
  }
}  //////////////////////////////////// Delivery orders body part ///////////////////////////////////////////////////////////////////////////////////

_body = (item) => {
  if(this.state.status_type == 'USED' && this.state.pdoid_status =='USED' ){
    return (

    <View style={{ flexDirection: 'row',}}>
     
     <View style={styles.cell2}><CustomText text={item.preDefinedOrderId ? item.preDefinedOrderId: Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.assigneeName ? item.assigneeName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.assignedDate ? item.assignedDate :Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.orderCreatedDate ? item.orderCreatedDate :Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.preDefinedOrderStatus ? item.preDefinedOrderStatus :Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><Button  transparent onPress={()=>Actions.trackorder({pre_order_id:item.preDefinedOrderId})}><Icon style={{ color: Colors.black,fontSize:30,paddingLeft:30 }} name='ios-eye' /></Button></View>

      <View style={styles.cell2}><Button  transparent onPress={()=>Actions.customeraddress({cus_id:item.assigneeId, cus_type:item.customerIdentityType})}><Icon style={{ color: Colors.black,fontSize:30,paddingLeft:30 }} name='ios-person' /></Button></View>
     

    </View>

  )
}

  else{
    return(
      <View style={{ flexDirection: 'row'}}>

<View style={styles.cell2}><CustomText text={item.preDefinedOrderId ? item.preDefinedOrderId: Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.assigneeName ? item.assigneeName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.assignedDate ? item.assignedDate :Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><Button  transparent onPress={()=>Actions.trackorder({pre_order_id:item.preDefinedOrderId})}><Icon style={{ color: Colors.black,fontSize:30,paddingLeft:30 }} name='ios-eye' /></Button></View>

      {this.props.status === 'RE_ASSIGN' &&(<View style={styles.cell2}><CustomButton title={'CreateOrder'} backgroundColor={Colors.darkSkyBlue} fontSize={14} marginTop={10} marginLeft={10} marginRight={10} marginBottom={10}  text_color={Colors.white} onPress={()=>Actions.orderwithpin({pre_id:item.preDefinedOrderId, rate:item.bulkPredefinedOrderResponse.rate})} /></View>)}
      {item.assigneeId == this.state.personId && (<View>
      {this.props.status === 'ASSIGNED' &&(<View style={styles.cell2}><CustomButton title={'CreateOrder'} backgroundColor={Colors.darkSkyBlue} fontSize={14} marginTop={10} marginLeft={10} marginRight={10} marginBottom={10}  text_color={Colors.white} onPress={()=>Actions.orderwithpin({pre_id:item.preDefinedOrderId, rate:item.bulkPredefinedOrderResponse.rate})} /></View>)}
</View>)}
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
        <Navbar left={left} title="Predefined ID" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>

        {/* { this.state.loader === true && (<View style={{alignItems:'center'}}>
        <CustomActivityIndicator/>
        </View>)} */}



         
          {/*////////////////////// Print Button Block //////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, backgroundColor: Colors.aash,}}>
            <View style={{ flex: 2 , paddingRight:200}}><CustomDropdown data={myArray} height={SHORT_BUTTON_HEIGHT} backgroundColor={Colors.aash} onChangeValue={(value, index, data) => { this.setState({ offset: 0 }); setTimeout(() => { this.fetch_predefined_orders(data[index]['name']) }, 100); }} /></View>
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
    backgroundColor:Colors.buttonBackgroundColor


  },

  cell2: {
    
    width: 130,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor:Colors.white,
    justifyContent:'center',
    borderColor:Colors.aash,
    borderBottomWidth:3,
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