import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet,BackHandler,Modal, Dimensions } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Grid,Col,Input,Badge} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomSubButton from '../../component/CustomSubButton';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP,FIELD_MARGIN_TOP, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SIGNATURE_VIEW_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, ORDER_BLOCK ,CLOSE_SIZE,CLOSE_WIDTH} from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';


const myArray=[{name:"Select a Status" , value:"Select a Status"},{name:"Delivered" , value:"Delivered"},{name:"Undelivered" , value:"Undelivered"}];
const myArray1=[{name:"Select/Enter a Reason" , value:"Select/Enter a Reason"},{name:"a" , value:"a"},{name:"b" , value:"b"},{name:"Enter a Reason" , value:"Enter a Reason"}];

export default class Delivery extends React.Component {

  state = {
    modal_visible: false,
    reason:'',
    reason_val:'',
  };

render(){
    var left = (
        <Left style={{ flex: 1 }}>
          <Button  width={CLOSE_WIDTH}  onPress={() => Actions.pop()} transparent>
            <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='ios-close' />
            </Button>
        </Left>
      );
      var right = (
        <Right style={{ flex: 1 }}>
          <Button transparent>
            <Icon style={{color:Colors.navbarIconColor}} name='ios-chatbubbles' />
          </Button>
          <Button  transparent>
            <Icon style={{color:Colors.navbarIconColor }} name='ios-notifications' />
            <Badge style={{width: 10, backgroundColor: 'orange',height:12,marginTop:SECTION_MARGIN_TOP,borderRadius:10}} 
                            textStyle={{color: 'white', fontSize:SECTION_MARGIN_TOP, lineHeight: SECTION_MARGIN_TOP}}></Badge>
          </Button>
        </Right>
      );


    return(
  
        <Container>

 {/*////////////////////////////////////// Modal Block //////////////////////////////////////////////// */}

 <Modal visible={this.state.modal_visible} supportedOrientations={['landscape']} transparent>
<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.transparent }}>
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

{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} right={right} title="Delivery" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*//////////////////////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>

        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,justifyContent:'space-evenly'}}>
        <CustomSubButton title={'Notify'}/>
        <CustomSubButton title={'Call'}/>
        <CustomSubButton title={'Print'}/>
        </View>
        
        <View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>

{/*///////////////////////////// Customer Details //////////////////////////////////////////////// */}

        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP}}>
          <CustomText  text={'Delivery Details'} textType={Strings.subtitle} fontWeight={'bold'}/>
          <Icon name="md-close" style={styles.iconstyle} />
        </View>

          <CustomText text={'Cust. Name'} textType={Strings.maintext}/>
          <CustomInput flex={1} />
          <CustomText text={'Mobile No.'} textType={Strings.maintext}/>
          <CustomInput keyboardType={'number-pad'} flex={1}/>
          <CustomText text={'Location'} textType={Strings.maintext}/>
          <CustomInput flex={1}/>
          <CustomText text={'Address'} textType={Strings.maintext}/>
          <CustomInput height={ADDRESS_FIELD_HEIGHT} flex={1}/>


{/*////////////////////// Order Details block //////////////////////////////////////////////// */}

<View style={{height:ORDER_BLOCK,marginBottom:SECTION_MARGIN_TOP,marginTop:SECTION_MARGIN_TOP}}>
<CustomText  text={'Order No. 1'} textType={Strings.smalltitle} fontWeight={'bold'}/>
 <Grid ><Col><CustomText text={'Serial No.'} textType={Strings.subtext}/></Col>
        <Col><CustomInput height={SHORT_TEXT_FIELD_HIEGHT} keyboardType={'number-pad'} flex={1} paddingTop={TEXT_MARGIN_TOP}/></Col></Grid>
 <Grid ><Col><CustomText text={'Date and Time'} textType={Strings.subtext}/></Col>
        <Col><CustomInput height={SHORT_TEXT_FIELD_HIEGHT} flex={1} paddingTop={TEXT_MARGIN_TOP}/></Col></Grid>
 <Grid><Col><CustomText text={'Order No.'} textType={Strings.subtext}/></Col>
       <Col><CustomInput height={SHORT_TEXT_FIELD_HIEGHT} keyboardType={'number-pad'} flex={1} paddingTop={TEXT_MARGIN_TOP}/></Col></Grid>
 <Grid><Col><CustomText text={'Delivery Type'} textType={Strings.subtext}/></Col>
       <Col><CustomInput height={SHORT_TEXT_FIELD_HIEGHT} flex={1} paddingTop={TEXT_MARGIN_TOP}/></Col></Grid>
 <Grid><Col><CustomText text={'No. of Pieces'} textType={Strings.subtext}/></Col>
       <Col><CustomInput height={SHORT_TEXT_FIELD_HIEGHT} keyboardType={'number-pad'} flex={1} paddingTop={TEXT_MARGIN_TOP}/></Col></Grid>
 <Grid><Col><CustomText text={'Total'} textType={Strings.subtext}/></Col>
       <Col><CustomInput height={SHORT_TEXT_FIELD_HIEGHT} keyboardType={'number-pad'} flex={1} paddingTop={TEXT_MARGIN_TOP}/></Col></Grid>
       </View>


{/*////////////////////// Order Status Block //////////////////////////////////////////////// */}

<View style={{marginTop:SECTION_MARGIN_TOP}}>
      <CustomText text={'Status'} textType={Strings.maintext}/> 
      <CustomDropdown data={myArray} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.textBackgroundColor}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} />
 
      <CustomText text={'Reason'} textType={Strings.maintext}/>
      <CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.textBackgroundColor} borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} onChangeValue={(value,index,data)=>{if (index == (data.length)-1){this.setState({modal_visible: true});}}} value={this.state.reason_val}/>
      </View>


{/*////////////////////// Total Details Block //////////////////////////////////////////////// */}

<View style={{height:TOTAL_BLOCK,marginBottom:SECTION_MARGIN_TOP,marginTop:SECTION_MARGIN_TOP}}>
<CustomText text={'Total'} textType={Strings.smalltitle} fontWeight={'bold'}/>
<Grid ><Col><CustomText text={'No of Pieces'} textType={Strings.subtext}/></Col>
        <Col><Text style={styles.oddrowtext}>32</Text></Col></Grid>
 <Grid ><Col><CustomText text={'Credit Allowed'} textType={Strings.subtext}/></Col>
        <Col><Text style={styles.evenrowtext}>Rs: 5000</Text></Col></Grid>
 <Grid><Col><CustomText text={'Amount to collect'} textType={Strings.subtext}/></Col>
       <Col><Text style={styles.evenrowtext}>Rs: 1000</Text></Col></Grid>
 <Grid><Col><CustomText text={'Amount Recieved'} textType={Strings.subtext}/></Col>
       <Col><Text style={styles.oddrowtext}>Rs: 2000</Text></Col></Grid>
 <Grid><Col><CustomText text={'Balance Amount'} textType={Strings.subtext}/></Col>
       <Col><Text style={styles.oddrowtext}>Rs: 1000</Text></Col></Grid>
       </View>

{/*////////////////////// Customer Signature Block //////////////////////////////////////////////// */}


<CustomText  text={'Customer Signature'} textType={Strings.subtitle}/>
<View style={{ backgroundColor:Colors.signBackgroundColor,height:SIGNATURE_VIEW_HEIGHT,borderRadius:SHORT_BLOCK_BORDER_RADIUS,}}></View>
<CustomButton title={'Update'}/>
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
});