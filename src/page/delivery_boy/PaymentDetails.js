import React, { Component, } from 'react';
import { Modal,StyleSheet,ScrollView,FlatList ,AsyncStorage , } from 'react-native';
import { Container, View, Button, Left, Right, Icon, Text,Grid,Col,Row,Badge, Segment } from 'native-base';
import { Actions } from 'react-native-router-flux';




import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomButton from '../../component/CustomButton';
import CustomCheckBox from '../../component/CustomCheckBox';
import CustomSubButton from '../../component/CustomSubButton';
import { SECTION_MARGIN_TOP,FIELD_MARGIN_TOP, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, ORDER_BLOCK_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SHORT_BUTTON_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, NORMAL_FONT,COLUMN_PADDING ,AMOUNT_BLOCK_HIEGHT,SECOND_FONT,LOGIN_FIELD_HEIGHT,FOURTH_FONT} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { PAYMENT_DETAILS, VIEW_PAYMENT_BY_PAYMENTID, EDIT_PAYMENT_DETAILS } from '../../constants/Api';
import CustomInput from '../../component/CustomInput';
import CustomAlert from '../../component/CustomAlert';





export default class PaymentDetails extends React.Component {

  ///////////////////////////////////////// Declaring state variables ///////////////////////////////////////////////////////////////////////////////////

  state ={
    payment_details :[],
    payment_details2 :[],
    edit_details:[],
    modal_visible:false,

  }

  ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

  componentDidMount(){
   AsyncStorage.getItem(KEY).then((value => {

      let data = JSON.parse(value);
      if(this.props.order_id){
        this.fetch_payment_details(this.props.order_id);

      }else{
        this.fetch_payment_details2(this.props.payment_id)
      }
   
  }));
  }
   //////////////////////////////////////////// Payment details by id fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
   fetch_payment_edit_details(id){

    Api.fetch_request(EDIT_PAYMENT_DETAILS+id,'GET','')
    .then(result => {
     
      if (result.error != true) {
  
        console.log('Success:', JSON.stringify(result))
        this.setState({ edit_details: result.payload ,modal_visible:true})

      }
      else {
        console.log('Failed');
        this.setState({ edit_details: ''})
      }
  })
  
   }
  //////////////////////////////////////////// Payment details fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
  fetch_payment_details(id){

  Api.fetch_request(PAYMENT_DETAILS+id+'/DELIVERY_CHARGE','GET','')
  .then(result => {
   
    if (result.error != true) {

      console.log('Success:', JSON.stringify(result))
      this.setState({ payment_details: result.payload })
    }
    else {
      console.log('Failed');
      this.setState({ payment_details: ''})
    }
})

 }

  //////////////////////////////////////////// Payment details by id fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
  fetch_payment_details2(id){

    Api.fetch_request(VIEW_PAYMENT_BY_PAYMENTID+id,'GET','')
    .then(result => {
     
      if (result.error != true) {
  
        console.log('Success:', JSON.stringify(result))
        this.setState({ payment_details2: result.payload })
      }
      else {
        console.log('Failed');
        this.setState({ payment_details2: ''})
      }
  })
  
   }
  
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 _body = (item) => {
  return (

    <View style={{ backgroundColor:Colors.white,borderRadius:MAIN_BLOCK_BORDER_RADIUS,padding:COLUMN_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Order Id'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.orderId ? item.orderId :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Created By'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.createdOfficeStaffName ? item.createdOfficeStaffName :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Creator Id'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.createdOfficeStaffId ? item.createdOfficeStaffId :'N/A' }  textType={Strings.maintext}/></View>
    </View>
   
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Created Date'} fontWeight={'bold'}  textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.createdDate ? item.createdDate :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Rate'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.amountCollected ? 'Rs. '+item.amountCollected :'N/A' }  textType={Strings.maintext}/></View>
    </View>

    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Collected By'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.completedOfficeStaffName? item.completedOfficeStaffName :'N/A' }  textType={Strings.maintext}/></View>
    </View>

    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Collected Date'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.updatedDate ? item.updatedDate :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    {item.edited === true && (<View style={{flex:2,marginLeft:5}}><CustomButton title={'View Edit Details'} marginTop={1} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.fetch_payment_edit_details(item.paymentId)} /></View>)}

    </View>



  )
}
 
///////////////////////////////////// Pickup order header part ///////////////////////////////////////////////////////////////////////////////////////////
_header1 = () => {
  return (

    <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
      <View style={styles.cell}><CustomText text={'SL NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'OPERATION'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'AMOUNT'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'USER'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'STAFF TYPE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'USER ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={'DATE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>     
    </View>
  )
}

///////////////////////////////////// Pickup order body part ///////////////////////////////////////////////////////////////////////////////////////////

_body1 = (item, index) => {
 
  return (

    <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
      <View style={styles.cell}><CustomText text={index+1} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={item.paymentOperation ? item.paymentOperation : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={item.amount ? item.amount : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={item.officeStaffName ? item.officeStaffName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={item.officeStaffType ? item.officeStaffType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={item.officeStaffId ? item.officeStaffId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      <View style={styles.cell}><CustomText text={item.createdDate ? item.createdDate : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

    </View>


  )
}


/////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////

  render() {
  
    var left = (
      <Left  style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon style={{ color:Colors.navbarIconColor }} name='md-arrow-round-back' />
          </Button>
      </Left>
    );
   

    return (
     
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>

{/*////////////////////////////////////// Modal Block //////////////////////////////////////////////// */}

<Modal visible={this.state.modal_visible} supportedOrientations={['landscape']} transparent>
<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.transparent, }}>
<View style={{flex:1}}><Button onPress={()=>this.setState({modal_visible:false})} transparent>
        <Icon name="md-close" style={{color:Colors.black,marginTop:30}} />
        </Button></View>
    <View style={{ backgroundColor: Colors.white, alignSelf: 'center', marginLeft:30, marginRight:30,marginTop:60,marginBottom:60 }}>
    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white ,padding:20}}>

    <FlatList
                data={this.state.edit_details}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header1}
                renderItem={({ item, index }) => this._body1(item, index)}
                ListHeaderComponentStyle={styles.header}
              />
</ScrollView>
    </View>
</View>
</Modal>


          <Navbar left={left} title="Payment Details"/>
          <ScrollView contentContainerStyle={{flexGrow:1}}>



        {/*////////////////////// main view //////////////////////////////////////////////// */}

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:MAIN_VIEW_PADDING}}>


        {/*////////////////////// Details block //////////////////////////////////////////////// */}


        
{this.props.order_id &&(<View>
         
          <FlatList
                data={this.state.payment_details}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) => this._body(item)}
              />
</View>)}


{this.props.payment_id && (<View style={{ backgroundColor:Colors.white,borderRadius:MAIN_BLOCK_BORDER_RADIUS,padding:COLUMN_PADDING,marginTop:SECTION_MARGIN_TOP}}>
  <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Order Id'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={this.state.payment_details2.orderId ? this.state.payment_details2.orderId :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Created By'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={this.state.payment_details2.createdOfficeStaffName ? this.state.payment_details2.createdOfficeStaffName :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Creator Id'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={this.state.payment_details2.createdOfficeStaffId ? this.state.payment_details2.createdOfficeStaffId :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Created Date'} fontWeight={'bold'}  textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={this.state.payment_details2.createdDate ? this.state.payment_details2.createdDate :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Rate'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={this.state.payment_details2.amountCollected ? 'Rs. '+this.state.payment_details2.amountCollected :'N/A' }  textType={Strings.maintext}/></View>
    </View>

    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Collected By'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={this.state.payment_details2.completedOfficeStaffName? this.state.payment_details2.completedOfficeStaffName :'N/A' }  textType={Strings.maintext}/></View>
    </View>

    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Collected Date'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={this.state.payment_details2.updatedDate ? this.state.payment_details2.updatedDate :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    {this.state.payment_details2.edited === true && (<View style={{flex:2,marginLeft:5,marginTop:SECTION_MARGIN_TOP}}><CustomButton title={'View Edit Details'} marginTop={1} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.fetch_payment_edit_details(this.state.payment_details2.paymentId)} /></View>)}

    </View>)}




          <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
              </View>
              </ScrollView>
        </Container>
        </SideMenuDrawer>
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