import React, { Component } from 'react';
import { ScrollView,StyleSheet,Modal } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Grid,Col,} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP,LOGIN_FIELD_HEIGHT, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SIGNATURE_VIEW_HEIGHT,TOTAL_BLOCK, CREDIT_FIELD_HEIGHT,TEXT_MARGIN_TOP, CAMERA_SIZE,FOURTH_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { PICKUP_DETAILS , } from '../../constants/Api';


const myArray=[{name:"Select a Status" , value:"Select a Status"},{name:"Delivered" , value:"Delivered"},{name:"Undelivered" , value:"Undelivered"}];
const myArray1=[{name:"Select/Enter a Reason" , value:"Select/Enter here"},{name:"a" , value:"a"},{name:"b" , value:"b"},{name:"Enter a Reason" , value:"Enter a Reason"}];
const myArray2=[{name:"Cash" , value:"Cash"},{name:"Credit card" , value:"Credit card"},{name:"Debit card" , value:"Debit card"},{name:"Paytm" , value:"Paytm"}];

export default class PickupDetails extends React.Component {

  state = {
    modal_visible: false,
    reason:'',
    reason_val:'',
    modal_view: false,
    pickup_details:[],
    ishidden :true,

  };


  componentDidMount() {
    
    this.fetch_pickup_details(this.props.delivery_id);
  }

  //////////////////////////////////////////// Delivery out details fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
 fetch_pickup_details(id){

  // alert(id)

  Api.fetch_request(PICKUP_DETAILS+id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));
      this.setState({pickup_details : result.payload})
    
    }
    else{
      console.log('Failed');
    }
})

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
    
          {/* <Button onPress={() => this.setState({modal_view:true})} transparent> */}
            <Icon style={{color:Colors.navbarIconColor }} name='md-more' />
          {/* </Button> */}
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

{/* <Modal visible={this.state.modal_view1} supportedOrientations={['landscape']} transparent>
<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.transparent }}>
    <View style={{ backgroundColor: Colors.white, alignSelf: 'center', marginTop:SECTION_MARGIN_TOP }}>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>  
        <View style={styles.modalview}>
        <CustomText text={'Notify Customer'} textType={Strings.subtext} />
        <CustomText text={'Call Customer'} textType={Strings.subtext} />
        <CustomText text={'Print'} textType={Strings.subtext} />
        </View>
        </View>
    </View>
</View>
</Modal> */}

{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} right={right} title="PickUp Details" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>

{/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Address & Reciever Details'} textType={Strings.subtitle} fontWeight={'bold'} />
        </View>

        <CustomText text={'Deliver To'} textType={Strings.subtext} color={Colors.black}/>
        <View style={styles.inputview}><CustomText text={this.state.pickup_details.canBeDeliveredTo ? this.state.pickup_details.canBeDeliveredTo : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Receiver Name'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.contactPersonName ? this.state.pickup_details.contactPersonName : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Customer Id'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.canBeDeliveredTo ? this.state.pickup_details.canBeDeliveredTo : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Mobile No.'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.contactPersonNumber ? this.state.pickup_details.contactPersonNumber : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.localBodyType ? this.state.pickup_details.localBodyType : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Address'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputviewaddress}>
            <CustomText text={this.state.pickup_details.addressLine1 ? this.state.pickup_details.addressLine1 : Strings.na} textType={Strings.subtext} color={Colors.black}/>
            <CustomText text={this.state.pickup_details.addressLine2 ? this.state.pickup_details.addressLine2 : Strings.na} textType={Strings.subtext} color={Colors.black}/>
            <CustomText text={this.state.pickup_details.city ? this.state.pickup_details.city : Strings.na} textType={Strings.subtext} color={Colors.black}/>
          </View>
</View>


{/*////////////////////// Order Status Block //////////////////////////////////////////////// */}

<View style={{backgroundColor:Colors.white,flex:10,flexDirection:'row' ,marginTop:SECTION_MARGIN_TOP,padding:MAIN_VIEW_PADDING,alignItems:'center',}}>
              <CustomText  text={'Status Update'} textType={Strings.subtitle} flex={9} fontWeight={'bold'}/>
              <Icon name={'md-arrow-dropdown'} style={{color:Colors.black,fontSize:FOURTH_FONT,flex:1,}}/>
              </View>
<View style={{ backgroundColor:Colors.white,flexGrow:1,paddingLeft:MAIN_VIEW_PADDING,paddingRight:MAIN_VIEW_PADDING,paddingBottom:MAIN_VIEW_PADDING}}>

      <CustomText text={'Status'} textType={Strings.maintext}/> 
      <CustomDropdown data={myArray} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP}/>
 
      <CustomText text={'Reason/Remark'} textType={Strings.maintext}/>
      <CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} onChangeValue={(value,index,data)=>{if (index == (data.length)-1){this.setState({modal_visible: true});}}} value={this.state.reason_val}/>
      </View>


{/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:10}}>
<View style={{ backgroundColor:Colors.signBackgroundColor,flexGrow:1,padding:MAIN_VIEW_PADDING}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Order No. 1'} textType={Strings.subtitle} fontWeight={'bold'} />
        </View>

        <CustomText text={'Serial No.'} textType={Strings.subtext} color={Colors.black}/>
        <View style={styles.inputview2}><CustomText text={this.state.pickup_details.serialId ? this.state.pickup_details.serialId : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Order No.'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.orderId ? this.state.pickup_details.orderId : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Date And Time'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} backgroundColor={Colors.textBackgroundColor1} />
          <CustomText text={'Seller ID'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput keyboardType={'number-pad'} flex={1} backgroundColor={Colors.textBackgroundColor1}/>
          <CustomText text={'Delivery Type'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.deliveryType ? this.state.pickup_details.deliveryType : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Credit Allowed'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} backgroundColor={Colors.textBackgroundColor1}/>
          <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.localBodyType ? this.state.pickup_details.localBodyType : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
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


{/*////////////////////// Proof Upload Block //////////////////////////////////////////////// */}

<View style={{backgroundColor:Colors.white,flex:10,flexDirection:'row' ,marginTop:SECTION_MARGIN_TOP,padding:MAIN_VIEW_PADDING,alignItems:'center',}}>
              <CustomText  text={'Proof Upload & Receiver Signature'} textType={Strings.subtitle} flex={9} fontWeight={'bold'}/>
              <Icon name={'md-arrow-dropdown'} style={{color:Colors.black,fontSize:FOURTH_FONT,flex:1,}}/>
              </View>
<View style={{ backgroundColor:Colors.white,flexGrow:1,paddingLeft:MAIN_VIEW_PADDING,paddingRight:MAIN_VIEW_PADDING,paddingBottom:MAIN_VIEW_PADDING}}>
<CustomText text={'Proof to be produced'} textType={Strings.subtext} color={Colors.black}/>
<View style={styles.inputview}><CustomText text={this.state.pickup_details.proofToBeProduced ? this.state.pickup_details.proofToBeProduced : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Proof Upload'} textType={Strings.subtext} color={Colors.black}/>

          <View style={{height:ADDRESS_FIELD_HEIGHT,backgroundColor:Colors.lightBackgroundColor,borderColor:Colors.lightborderColor,borderWidth:0.5,alignItems:'center',flex:1}}>
              <Icon name='ios-camera' style={{fontSize:CAMERA_SIZE,flex:1,marginTop:SECTION_MARGIN_TOP}}/>
          </View>
          <CustomButton title={'Capture Customer Photo'} text_color={Colors.darkSkyBlue} backgroundColor={Colors.white} borderColor={Colors.darkSkyBlue} borderWidth={1} marginTop={1} fontSize={14} />

          <View style={{height:ADDRESS_FIELD_HEIGHT,backgroundColor:Colors.lightBackgroundColor,borderColor:Colors.lightborderColor,borderWidth:0.5,alignItems:'center',flex:1,marginTop:SECTION_MARGIN_TOP}}>
              <Icon name='ios-camera' style={{fontSize:CAMERA_SIZE,flex:1,marginTop:SECTION_MARGIN_TOP}}/>
          </View>
          <CustomButton title={'Capture ID Card'} text_color={Colors.darkSkyBlue} backgroundColor={Colors.white} borderColor={Colors.darkSkyBlue} borderWidth={1} marginTop={1} fontSize={14} />
         
          <View style={{height:ADDRESS_FIELD_HEIGHT,backgroundColor:Colors.lightBackgroundColor,borderColor:Colors.lightborderColor,borderWidth:0.5,alignItems:'center',flex:1,marginTop:SECTION_MARGIN_TOP}}>
              <Icon name='ios-camera' style={{fontSize:CAMERA_SIZE,flex:1,marginTop:SECTION_MARGIN_TOP}}/>
          </View>
          <CustomButton title={'Capture Signature'} text_color={Colors.darkSkyBlue} backgroundColor={Colors.white} borderColor={Colors.darkSkyBlue} borderWidth={1} marginTop={1} fontSize={14} />

          <CustomText  text={'Receiver Signature'} textType={Strings.subtext} color={Colors.black} mTop={SECTION_MARGIN_TOP}/>
<View style={{ backgroundColor:Colors.signBackgroundColor,height:SIGNATURE_VIEW_HEIGHT,}}></View>
      </View>

{/*////////////////////// Total & Payment Block //////////////////////////////////////////////// */}

<View hide={this.state.ishidden} style={{backgroundColor:Colors.white,flex:10,flexDirection:'row' ,marginTop:SECTION_MARGIN_TOP,padding:MAIN_VIEW_PADDING,alignItems:'center',}}>
              <CustomText  text={'Total & Payment'} textType={Strings.subtitle} flex={9} fontWeight={'bold'} />
              <Icon name={'md-arrow-dropdown'} style={{color:Colors.black,fontSize:FOURTH_FONT,flex:1,}}/>
              </View>
<View style={{ backgroundColor:Colors.white,flexGrow:1,paddingLeft:MAIN_VIEW_PADDING,paddingRight:MAIN_VIEW_PADDING,paddingBottom:MAIN_VIEW_PADDING}}>

<View style={{height:CREDIT_FIELD_HEIGHT}}>
<Grid ><Col><CustomText text={'Other Charge'} textType={Strings.subtext} color={Colors.black}/></Col>
        <Col><View style={styles.inputview}><CustomText text={this.state.pickup_details.deliveryCharge ? this.state.pickup_details.deliveryCharge : Strings.na } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
 <Grid ><Col><CustomText text={'Delivery Charge'} textType={Strings.subtext} color={Colors.black}/></Col>
        <Col><View style={styles.inputview}><CustomText text={this.state.pickup_details.deliveryCharge ? this.state.pickup_details.deliveryCharge : Strings.na } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
 <Grid><Col><CustomText text={'Credit Allowed'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} /></Col></Grid>
       <Grid><Col><CustomText text={'Amount to Collect'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><View style={styles.inputview}><CustomText text={this.state.pickup_details.total ? this.state.pickup_details.total : Strings.na } textType={Strings.subtext} color={Colors.black}/></View></Col></Grid>
      </View>

      <CustomText  text={'Payment Method'} textType={Strings.subtitle} flex={9} />
      <CustomDropdown data={myArray2} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} />

      <View style={{marginTop:SECTION_MARGIN_TOP,height:ADDRESS_FIELD_HEIGHT}}>
      <Grid><Col><CustomText text={'Amount Recieved'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} /></Col></Grid>
      <Grid><Col><CustomText text={'Balance Amount'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} /></Col></Grid>
       </View>

       <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue}  />


      </View>

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
        maxWidth:'60%',
        minWidth:'60%',
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
    justifyContent:'center'
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