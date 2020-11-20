import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet,BackHandler,Modal } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Grid,Col,Input,Badge, Row} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomSubButton from '../../component/CustomSubButton';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, COLUMN_PADDING,TEXT_PADDING_RIGHT, CREDIT_FIELD_HEIGHT,FOURTH_FONT,SHORT_BUTTON_HEIGHT,SHORT_BORDER_RADIUS, NORMAL_FONT, THIRD_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import CustomRadioButton from '../../component/CustomRadioButton';
import CustomCheckBox from '../../component/CustomCheckBox';


const myArray2=[{name:"Cash" , value:"Cash"},{name:"Credit card" , value:"Credit card"},{name:"Debit card" , value:"Debit card"},{name:"Paytm" , value:"Paytm"}];
const array_cus_type=[{name:"Individual" , value:"Individual"},{name:"Business" , value:"Business"},];
const array_service_type=[{name:"Return" , value:"Return"},{name:"a" , value:"b"},];
const array_place_category=[{name:"Municipality" , value:"Municipality"},{name:"Corporation" , value:"Corporation"},,{name:"panchayath" , value:"panchayath"},];
const array_document_type=[{name:"Document" , value:"Document"},{name:"Non Document" , value:"Non Document"},];
const array_subcategory_type=[{name:"Select a category" , value:"Select a category"},{name:"a" , value:"a"},];

export default class DeliveryOutDetails extends React.Component {

  state = {
    modal_visible: false,
    reason:'',
    reason_val:'',
    modal_view: false,
  };

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
         <CustomButton title={'Print'}  text_color={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={THIRD_FONT} marginRight={COLUMN_PADDING} marginTop={BORDER_WIDTH}  />
        </Right>
      );


    return(
  
        <Container>

{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} right={right} title="Manual Pickup" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>

{/*/////////////////////////// Sender Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Sender Details'} textType={Strings.subtitle} />
        </View>
        <CustomText text={'Mobile Number'} textType={Strings.subtext} color={Colors.black} />
        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white}  />
        <CustomButton title={'SEND OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT}/>
        </View>
        <CustomText text={'Enter OTP'} textType={Strings.subtext} color={Colors.black}/>
        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between'}}>
        <CustomInput backgroundColor={Colors.white}  />
        <CustomButton title={'VERIFY OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT}/>
        </View>

          <CustomText text={'Customer Type'} textType={Strings.subtext} color={Colors.black} />
          <CustomDropdown data={array_cus_type} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} />
          
          <CustomText text={'Customer Name'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />
         
          <CustomText text={'Delivery Type'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />
         
          <CustomText text={'Service Type'} textType={Strings.subtext} color={Colors.black}/>
        <CustomDropdown data={array_service_type} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} />

</View>


{/*/////////////////////////// Sender Address //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Sender Address'} textType={Strings.subtitle} />
        </View>
    

        <CustomText text={'House Number / Building Name'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'State'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'City'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />
          
          <CustomText text={'Road Name, Area , Colony'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />
         
          <CustomText text={'District'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />
         
          <CustomText text={'Select from below'} textType={Strings.subtext} color={Colors.black}/>
        <CustomDropdown data={array_place_category} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} />

        <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

</View>


{/*/////////////////////////// Receiver Details & Address //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Receiver Details & Address'} textType={Strings.subtitle} />
        </View>
    
        <CustomText text={'Reciever Name'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'Receiver Phone Number'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'Proof to be produced'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'Can be delivered to'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'Reciever Address'} textType={Strings.subtext} color={Colors.black}/>
          <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Local'} selectedColor={Colors.darkSkyBlue} selected={true}/>
         <CustomRadioButton title={'Global'} selectedColor={Colors.darkSkyBlue} selected={false}/>
         </View>

        <CustomText text={'House Number / Building Name'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'State'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'City'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />
          
          <CustomText text={'Road Name, Area , Colony'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />
         
          <CustomText text={'District'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />
         
          <CustomText text={'Select from below'} textType={Strings.subtext} color={Colors.black}/>
        <CustomDropdown data={array_place_category} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} />

        <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

</View>


{/*/////////////////////////// Package Details & Quality Check Block //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Package Details & Quality Check'} textType={Strings.subtitle} />
        </View>

        <CustomText text={'Document / Non Document'} textType={Strings.subtext} color={Colors.black}/>
        <CustomDropdown data={array_document_type} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} />
    
        <CustomText text={'Subcategory'} textType={Strings.subtext} color={Colors.black}/>
        <CustomDropdown data={array_subcategory_type} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} marginTop={BORDER_WIDTH} />
<View>
    <Grid>
        <Col><Row><CustomText text={'Weight'} textType={Strings.subtext} color={Colors.black}/></Row>
        <Row><CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} marginRight={10} /></Row></Col>
       
        <Col><Row><CustomText text={'Width'} textType={Strings.subtext} color={Colors.black}/></Row>
        <Row><CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} marginRight={10} /></Row></Col>
        
        <Col><Row><CustomText text={'Height'} textType={Strings.subtext} color={Colors.black}/></Row>
        <Row><CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} /></Row></Col>
    </Grid>
</View>
       

          <CustomText text={'Number of Pieces'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'Load Charge'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} />

          <CustomText text={'Quality Check'} textType={Strings.subtext} color={Colors.black}/>
          <View style={{flexDirection:'row',}}>
         <CustomRadioButton title={'Hard'} selectedColor={Colors.darkSkyBlue} selected={true}/>
         <CustomRadioButton title={'Fragile'} selectedColor={Colors.darkSkyBlue} selected={false}/>
         </View>

         <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,flex:7}}>
         <View style={{flex:6}}><CustomText text={'1. Sample text content'} textType={Strings.subtext} color={Colors.black} /></View>  
        <View style={{flex:1}}><CustomCheckBox color={Colors.black} checked={true} /></View>
</View>
        <View style={{flexDirection:'row',flex:7}}>
         <View style={{flex:6}}><CustomText text={'2. Sample text content'} textType={Strings.subtext} color={Colors.black} /></View>  
        <View style={{flex:1}}><CustomCheckBox color={Colors.black} checked={true} /></View>
</View>
        <View style={{flexDirection:'row',flex:7}}>
         <View style={{flex:6}}><CustomText text={'3. Sample text content'} textType={Strings.subtext} color={Colors.black} /></View>  
        <View style={{flex:1}}><CustomCheckBox color={Colors.black} checked={true} /></View>
         </View>

</View>



{/*////////////////////// Total & Payment Block //////////////////////////////////////////////// */}

<View style={{backgroundColor:Colors.white,flex:10,flexDirection:'row' ,marginTop:SECTION_MARGIN_TOP,padding:MAIN_VIEW_PADDING,alignItems:'center',}}>
              <CustomText  text={'Total & Payment'} textType={Strings.subtitle} flex={9} />
              <Icon name={'md-arrow-dropdown'} style={{color:Colors.black,fontSize:FOURTH_FONT,flex:1,}}/>
              </View>
<View style={{ backgroundColor:Colors.white,flexGrow:1,paddingLeft:MAIN_VIEW_PADDING,paddingRight:MAIN_VIEW_PADDING,paddingBottom:MAIN_VIEW_PADDING}}>

<View style={{height:CREDIT_FIELD_HEIGHT}}>
<Grid ><Col><CustomText text={'Other Charge'} textType={Strings.subtext} color={Colors.black}/></Col>
        <Col><CustomInput flex={1} /></Col></Grid>
 <Grid ><Col><CustomText text={'Delivery Charge'} textType={Strings.subtext} color={Colors.black}/></Col>
        <Col><CustomInput flex={1} /></Col></Grid>
 <Grid><Col><CustomText text={'Credit Allowed'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} /></Col></Grid>
       <Grid><Col><CustomText text={'Amount to Collect'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} /></Col></Grid>
      </View>

      <CustomText  text={'Payment Method'} textType={Strings.subtitle} flex={9} />
      <CustomDropdown data={myArray2} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} />

      <View style={{marginTop:SECTION_MARGIN_TOP,height:ADDRESS_FIELD_HEIGHT}}>
      <Grid><Col><CustomText text={'Amount Recieved'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={1} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} /></Col></Grid>
      <Grid><Col><CustomText text={'Balance Amount'} textType={Strings.subtext} color={Colors.black}/></Col>
       <Col><CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={1} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} /></Col></Grid>
       </View>

      </View>

      <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue}  />
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
  });