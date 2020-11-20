import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Button, Left, Icon,Right,Text, Input,TextInput,Grid,Col,Row,SearchBar,Item, View,Badge, Body} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import { SECTION_MARGIN_TOP,COLUMN_PADDING,SHORT_BUTTON_HEIGHT, LOGIN_FIELD_HEIGHT, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import CustomDropdown from '../../component/CustomDropdown';

const myArray1=[{name:"Order No." , value:"Order No."},{name:"PENDING" , value:"CANCELLED"},{name:"DELIVERED" , value:"102"},{name:"PICKUP FOR THE SAME CUSTOMER" , value:"102"}];
const myArray=[{name:"PENDING" , value:"PENDING"},{name:"ALL" , value:"ALL"},{name:"CANCELLED" , value:"CANCELLED"},{name:"DELIVERED" , value:"DELIVERED"}]; 

// import SearchBar from 'react-native-search-bar';
// import { SearchBar } from 'react-native-elements';


export default class DeliveryFirst extends React.Component {
    state = {
        search: '',
      };
    
      updateSearch = (search) => {
        this.setState({ search });
      };

render(){
  var left = (
    <Left style={{ flex: 1 }}>
      <Button onPress={() => Actions.pop()} transparent>
        <Icon style={{ color:Colors.navbarIconColor}} name='ios-close' />
        </Button>
    </Left>
  );
      
      var right = (
        <Right style={{ flex: 1 }}>
          <Button  transparent>
            <Icon style={{ color:Colors.navbarIconColor }} name='ios-chatbubbles' />
          </Button>
          <Button  transparent>
            <Icon style={{ color:Colors.navbarIconColor }} name='ios-notifications' />
            <Badge style={{width: 10, backgroundColor: 'orange',height:12,marginTop:20,borderRadius:10}} 
                            textStyle={{color: 'white', fontSize: 20, lineHeight: 20}}></Badge>
          </Button>
        </Right>
      );
     
    return(
      
      <Container>
        <Navbar left={left} right={right} title="Delivery Out" />
 <Container horizontal={true} style={{flexDirection:'column',padding:10,backgroundColor:Colors.textBackgroundColor}}>

{/*////////////////////// Order and Searchbar Block //////////////////////////////////////////////// */}

<View style={{flexDirection:'row',justifyContent:'space-between',textAlignVertical:'center'}}>
<View style={{flex:2}}><CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white} fontSize={14} paddingBottom={SECTION_MARGIN_TOP} marginRight={10} /></View>
<View style={{flex:3,marginLeft:20}}><CustomInput placeholder={'Search here'} icon_name={'ios-search'} icon_color={Colors.navbarIconColor}  icon_fontsize={18}   placeholderTextColor={Colors.navbarIconColor} fontSize={14} showIcon={true} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} marginTop={5}  /></View>
          </View>

{/*////////////////////// Manual Pickup Button Block //////////////////////////////////////////////// */}

<View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,backgroundColor:Colors.aash,}}>
<View style={{flex:4}}><CustomDropdown data={myArray} height={SHORT_BUTTON_HEIGHT} backgroundColor={Colors.aash}  /></View>
<View style={{flex:2,}}><CustomButton title={'Print'} backgroundColor={Colors.darkSkyBlue}  height={SHORT_BUTTON_HEIGHT} fontSize={16} marginRight={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} /></View>
</View>


{/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}

        <View>
        <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}} style={{backgroundColor:Colors.white}}>
    
          
          
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'SERIAL NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>1234567890</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col ><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'ORDER ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>12345</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'CUSTOMER NAME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>Vivek</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>Vivek</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'ADDRESS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>FortKochi</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>FortKochi</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'LOCATION'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'MOBILE NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'DATE & TIME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'ATTEMPT'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>2</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>1</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'DELIVERY TYPE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>COD</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>other</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={'TOTAL'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={{backgroundColor:Colors.aash,paddingLeft:5,paddingRight:5}}><CustomText text={''} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}>
          <View style={{flexDirection:'column',paddingLeft:10,textAlignVertical:'center'}}>
          <CustomButton title={'Notify'} backgroundColor={Colors.darkSkyBlue}  height={20} fontSize={14}  marginTop={1} marginBottom={5}/>
          <CustomButton title={'Call'} backgroundColor={Colors.white}  height={20} fontSize={14}  marginTop={1} marginBottom={5} textDecorationLine={'underline'} text_color={Colors.darkSkyBlue}/>
          <CustomButton title={'Details'} backgroundColor={Colors.white}  height={20} fontSize={14}  marginTop={1} marginBottom={5} textDecorationLine={'underline'} text_color={Colors.darkSkyBlue} onPress={()=>Actions.deliveryoutdetails()}/>
          </View>
        </Row>
        <Row style={styles.content}>
        <View style={{flexDirection:'column',paddingLeft:10,textAlignVertical:'center'}}>
          <CustomButton title={'Notify'} backgroundColor={Colors.darkSkyBlue}  height={20} fontSize={14}  marginTop={1} marginBottom={5}/>
          <CustomButton title={'Call'} backgroundColor={Colors.white}  height={20} fontSize={14}  marginTop={1} marginBottom={5} textDecorationLine={'underline'} text_color={Colors.darkSkyBlue}/>
          <CustomButton title={'Details'} backgroundColor={Colors.white}  height={20} fontSize={14}  marginTop={1} marginBottom={5} textDecorationLine={'underline'} text_color={Colors.darkSkyBlue} onPress={()=>Actions.delivery()}/>
          </View>
        </Row>
        </Col></Grid>
        

{/* <View style={{flex:1,flexDirection:'column',height:100}}> */}
{/* <View style={{flex:1,flexDirection:'row'}}>
<Grid style={{flex:1}}>
<Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10,textAlign:'center'}}><CustomText  textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:COLUMN_PADDING,paddingRight:COLUMN_PADDING}}><CustomText text={'SERIAL NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'ORDER ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'CUSTOMER NAME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'ADDRESS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'LOCATION'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'MOBILE NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'DATE & TIME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'ATTEMPT'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'DELIVERY TYPE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText text={'TOTAL'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
  <Col style={{backgroundColor:Colors.aash,paddingLeft:10,paddingRight:10}}><CustomText  textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></Col>
</Grid>
</View>
<View style={{flex:1,flexDirection:'row'}}>
<Grid tyle={{flex:1}}>
<Col ><Icon  name='align-top'  color={Colors.borderColor}/></Col>
  <Col style={styles.content}><Text>1234567890</Text></Col>
  <Col style={styles.content}><Text>12345</Text></Col>
  <Col style={styles.content}><Text>Vivek</Text></Col>
  <Col style={styles.content}><Text>FortKochi</Text></Col>
  <Col style={styles.content}><Text>12345678</Text></Col>
  <Col style={styles.content}><Text>12345678</Text></Col>
  <Col style={styles.content}><Text>12345678</Text></Col>
  <Col style={styles.content}><Text>12345678</Text></Col>
  <Col style={styles.content}><Text>12345678</Text></Col>
</Grid>
</View> */}
{/* </View> */}
        </ScrollView>
        </View>
        </Container>
        </Container>


    );
}


}

const styles=StyleSheet.create({
  textinput :{
    fontSize:14,
    color:Colors.subTextColor,
    backgroundColor:Colors.textBackgroundColor,
    paddingLeft:10,
    paddingTop:6,
    height:30,
    borderRadius:5,
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},

content: {
    minWidth: '100%',
    maxWidth: '100%',
    height: 100,
    top: 5,
    padding: 5,
    color:Colors.grayTextColor,
    borderBottomWidth:5,
    borderColor:Colors.textBackgroundColor,
  
},
textstyles : {
fontSize:14,
},
header: {
  minWidth: '100%',
  maxWidth: '100%',
  height: 30,
  justifyContent:'center',
  padding: 5,
  borderWidth: 0.6,
  borderColor: Colors.borderColor
},
});