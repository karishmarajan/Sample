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
import { SECTION_MARGIN_TOP, COLUMN_PADDING, SHORT_BORDER_WIDTH, SHORT_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,CLOSE_SIZE,CLOSE_WIDTH } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session, { KEY } from '../../session/SessionManager';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import Api from '../../component/Fetch';
import { PREORDER_TRACKING, UPDATE_PDOID_STATUS , PDOID_LIST_BY_STATUS, UPDATE_PDOID_PAYMENT_STATUS} from '../../constants/Api';
import RNPrint from 'react-native-print';
import _ from "lodash";
import { RNCamera } from 'react-native-camera';




export default class TrackOrderId extends React.Component {
  constructor(props) {
    super(props);
 this.state = {
    predefined_details: [],
    predefinedpin:this.props.pre_order_id ? this.props.pre_order_id :'',
    customer_id:'',
    customer_identity_type:'',
    errorTextpreid:'',

  };
}

  componentDidMount() {
    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);
  
    this.track_preorder();
  }));
  }

  
///////////////////////////////////// PDOID fetching function ///////////////////////////////////////////////////////////////////////////////////
 
track_preorder(text) {

  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

  let body = {
    
    // "customerIdentityType": this.state.customer_identity_type,
    "preDefinedOrderId": this.props.pre_order_id ?this.props.pre_order_id : text,
    "preorderUserType": "DELIVERY_AGENT",
    "userId": data.personId

  };

  Api.fetch_request(PREORDER_TRACKING, 'POST', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result))
        this.setState({ predefined_details: result.payload })

      }
      else {
        console.log('Failed');
        this.setState({ predefined_details: ''})
        Toast.show({ text: result.message, type: 'warning' });
      }
    })
  }));
}







//////////////////////////////////// Delivery orders header part ///////////////////////////////////////////////////////////////////////////////////

  _header = () => {

      return(
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
         <View style={styles.cell}><CustomText text={'Status'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Date'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Time'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
       
      </View>
        )
  }


  ///////`///////////////////////////// Delivery orders body part ///////////////////////////////////////////////////////////////////////////////////

  _body = (item, index) => {
    return(
      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 ,borderTopWidth:0.3}}>
      
      <View style={styles.cell2}><CustomText text={item.status ? item.status : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.createdDate ? item.createdDate : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell2}><CustomText text={item.createdTime ? item.createdTime : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
</View>
      )
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
        <Navbar left={left} title="Track Order" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>
        

          {/*////////////////////// Print Button Block //////////////////////////////////////////////// */}

            <CustomText text={'Order ID'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
            <CustomInput flex={1}   borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) =>{ this.setState({predefinedpin: text , errorTextpreid:""}); this.track_preorder(text);}} value={this.state.predefinedpin} />
          

          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}
 
          <View style={{marginTop:SECTION_MARGIN_TOP}}>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                data={this.state.predefined_details}
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