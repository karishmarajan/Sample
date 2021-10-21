import React, { Component } from 'react';
import { ScrollView, StyleSheet, AsyncStorage, TouchableOpacity, Linking, Platform, FlatList, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Button, Left, Icon, Right, View, Text, Body, Toast } from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import CustomCheckBox from '../../component/CustomCheckBox';
import { SECTION_MARGIN_TOP, COLUMN_PADDING, BORDER_WIDTH, LOGIN_FIELD_HEIGHT, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,CLOSE_SIZE,CLOSE_WIDTH, MAIN_VIEW_PADDING } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session, { KEY } from '../../session/SessionManager';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import Api from '../../component/Fetch';
import { ADD_PAYMENT_BY_TYPE, PAYMENT_DETAILS , PDOID_LIST_BY_STATUS, UPDATE_PDOID_PAYMENT_STATUS} from '../../constants/Api';
import RNPrint from 'react-native-print';
import _ from "lodash";
import { RNCamera } from 'react-native-camera';



export default class AdditionalCharges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charges:[],
      predefinedpin:'',
      personId:'',
      officeId:'',
      additional_charge:'',
      errorTextadditional_charge:'',
      hasError:false,
      order_type:'',
   };
  }

   ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////
   componentDidMount() {
    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);
      this.setState({personId:data.personId, officeId:data.officeId})
   
  }));
        this.fetch_additionalCharge();

  }

  ///////////////////////////////////// PDOID payment status update function ////////////////////////////////////////////////////////////////////////////////////
  
pay_additional_charge() {
  
  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);


let body = {
  
    "officeId": data.officeId,
    "officeStaffId": data.personId,
    "officeStaffType": "DELIVERY_AGENT",
    "paymentStatus": "COMPLETED",
    "paymentType": "ADDITIONAL_CHARGE",
    "preorderAssignId": this.state.pdoid_assign_id
  
}


  Api.fetch_request(UPDATE_PDOID_PAYMENT_STATUS, 'PUT', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {

        console.log('Success:', JSON.stringify(result));
        Toast.show({ text: result.message, type: 'success' });


      }
      else {
        console.log('Failed');
        Toast.show({ text: result.message, type: 'warning' });

      }
    })
  }));

}


   ////////////////////////////////////// Additional charge adding function ///////////////////////////////////////////////////////////////////////////////////
 
add_additional_charge() {

    if (this.state.additional_charge === "") {
        this.setState({ hasError: true, errorTextadditional_charge: 'Please fill !' });
        return;
      }
      if (parseInt (this.state.additional_charge) <= 0) {
        this.setState({ hasError: true, errorTextadditional_charge: 'Please add valid charge !' });
        return;
      }

      let body = {
        
        "amountCollected": this.state.additional_charge,
        "officeId": this.state.officeId,
        "officeStaffId": this.state.personId,
        "officeStaffType": "DELIVERY_AGENT",
        "orderId": this.props.order_id,
        "orderType":this.props.order_type,
        "paymentType": "ADDITIONAL_CHARGE"
     
      };

      Api.fetch_request(ADD_PAYMENT_BY_TYPE, 'POST', '', JSON.stringify(body))
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
            Toast.show({ text: result.message, type: 'success' });
            this.fetch_additionalCharge();
            this.setState({additional_charge:''})
          }
          else {
            console.log('Failed');
            Toast.show({ text: result.message, type: 'warning' });
          }
        })
    
  }


////////////////////////////////////// PDOID fetching function ///////////////////////////////////////////////////////////////////////////////////
 
fetch_additionalCharge() {


    Api.fetch_request(PAYMENT_DETAILS+this.props.order_id+'/ADDITIONAL_CHARGE', 'GET', '')
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          this.setState({ charges: result.payload })


        }
        else {
          console.log('Failed');
          this.setState({ charges: ''})
          Toast.show({ text: result.message, type: 'warning' });
        }
      })
}


  //////////////////////////////////// Delivery orders body part ///////////////////////////////////////////////////////////////////////////////////

_body = (item) => {
    return (

    <View style={{ flexDirection: 'row',}}>
     
     <View style={styles.cell1}><CustomText text={item.amountCollected ? item.amountCollected: Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
    { item.paymentStatus == null && ( <View style={styles.cell2}><CustomButton title={'PAY'} backgroundColor={Colors.darkSkyBlue} fontSize={14} marginTop={5} marginLeft={5} marginRight={5} marginBottom={5} text_marginbottom={3} text_margintop={3} paddingBottom={3} paddingTop={3} text_color={Colors.white} onPress={()=>this.pay_additional_charge()} /></View> )}
    { item.paymentStatus == 'COMPLETED' && ( <View style={styles.cell2}><CustomButton title={'DETAILS'} backgroundColor={Colors.darkSkyBlue} fontSize={14} marginTop={5} marginLeft={5} marginRight={5} marginBottom={5}  text_color={Colors.white} onPress={()=>Actions.orderwithpin({pre_id:item.preDefinedOrderId, rate:item.bulkPredefinedOrderResponse.rate})} /></View>)}

      <View style={styles.cell2}><CustomButton title={'EDIT'} backgroundColor={Colors.darkSkyBlue} fontSize={14} marginTop={5} marginLeft={5} marginRight={5} marginBottom={5}  text_color={Colors.white} onPress={()=>Actions.orderwithpin({pre_id:item.preDefinedOrderId, rate:item.bulkPredefinedOrderResponse.rate})} /></View>
     

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
        <Navbar left={left} title="Additional Charges" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: MAIN_VIEW_PADDING, backgroundColor: Colors.textBackgroundColor }}>
<View style={{padding:MAIN_VIEW_PADDING,backgroundColor:Colors.white}}>
<CustomText text={'Additional Charge'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text) =>{this.setState({additional_charge: text, errorTextadditional_charge:''})}} value={this.state.additional_charge} />
{!!this.state.errorTextadditional_charge && (<Text style={{ color: 'red' }}>{this.state.errorTextadditional_charge}</Text>)}

<CustomButton title={'ADD'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.add_additional_charge()} />
</View>
    
          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}

          <View style={{marginTop:SECTION_MARGIN_TOP}}>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                data={this.state.charges}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) => this._body(item)}
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

  cell1: {
    
    width: 120,
    padding: 3,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor:Colors.white,
    justifyContent:'center',
    borderColor:Colors.aash,
    borderBottomWidth:5,
  },

  cell2: {
    
    width: 80,
    padding: 3,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor:Colors.white,
    justifyContent:'center',
    borderColor:Colors.aash,
    borderBottomWidth:5,
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