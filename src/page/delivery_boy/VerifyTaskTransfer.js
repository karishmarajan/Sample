import React, { Component } from 'react';
import { ScrollView,StyleSheet} from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Badge,Grid,Col,Row,} from 'native-base';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import { SECTION_MARGIN_TOP, SHORT_BORDER_WIDTH, SHORT_BORDER_RADIUS, MAIN_VIEW_PADDING, NORMAL_FONT, BORDER_WIDTH , TEXT_PADDING_RIGHT , SECOND_FONT , CAMERA_SIZE ,COLUMN_PADDING , SHORT_BUTTON_HEIGHT , SIXTH_FONT} from '../../constants/Dimen';


export default class SelfAssign extends React.Component {

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

render(){
  var left = (
    <Left style={{ flex: 1 }}>
      <Button onPress={() => Actions.pop()} transparent>
        <Icon style={{ color:Colors.navbarIconColor}} name='md-close' />
        </Button>
    </Left>
  );
    


    return(
     
      <Container>
      
      <View style={{position:'absolute'}}>
       <Menu
          ref={this.setMenuRef}>
          <MenuItem onPress={this.hideMenu}>Save</MenuItem>
          <MenuItem onPress={this.hideMenu}>Delete</MenuItem>
        </Menu>
        </View>

        <Navbar left={left}  title="Verify Task Transferred" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:COLUMN_PADDING}}>
        <View style={{ backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING,borderRadius:SHORT_BORDER_RADIUS, marginTop:SECTION_MARGIN_TOP}}>
   
      

        {/*////////////////////// Selecting Order id Block //////////////////////////////////////////////// */}

        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,alignItems:'center',justifyContent:'space-between',padding:TEXT_PADDING_RIGHT,backgroundColor:Colors.scanBackground}}>
        <CustomText text={'Add order by scanning'} textType={Strings.subtext}  color={Colors.darkSkyBlue}/>
        <Icon style={{ color:Colors.darkSkyBlue}} name='ios-barcode' />
          </View>

          <CustomText text={'or'} textType={Strings.subtext} color={Colors.black} textAlign={'center'}/>

        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between',}}>
        <CustomInput backgroundColor={Colors.white} placeholder={'Enter Order Id here'}  />
        <CustomButton title={'ADD'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT}/>
        </View>
      
        </View>

        {/*////////////////////// Delivery Sheet Block //////////////////////////////////////////////// */}


<View style={{flexDirection:'row',backgroundColor:Colors.aash,height:CAMERA_SIZE,marginTop:SECTION_MARGIN_TOP,padding:10}}>
<CustomText text={'SCANNED ORDERS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
<CustomText text={'Transferring to : '} textType={Strings.subtext} color={Colors.grayTextColor} />
<Text style={{fontSize:SECOND_FONT,textAlignVertical:'center',paddingTop:TEXT_PADDING_RIGHT,fontStyle:'italic',flex:1,color:Colors.grayTextColor}}>#8237399</Text>
</View>


{/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}

        <View>
        <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}} style={{backgroundColor:Colors.white}}>
    
          
          
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'SERIAL NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>1</Text></Row></Col></Grid>
        <Grid ><Col ><View style={styles.headingstyles}><CustomText text={'ORDER ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'CUSTOMER NAME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>Vivek</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'ADDRESS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>FortKochi</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'LOCATION'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'MOBILE NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'DATE & TIME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'ATTEMPT'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>2</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'DELIVERY TYPE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>COD</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={'TOTAL'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}><Text style={styles.textstyles}>12345678</Text></Row></Col></Grid>
        <Grid ><Col><View style={styles.headingstyles}><CustomText text={''} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/></View>
        <Row style={styles.content}>
          <View style={{flexDirection:'column',paddingLeft:COLUMN_PADDING,textAlignVertical:'center'}}>
     <Icon name="remove-circle" style={{color:Colors.red,paddingLeft:SECTION_MARGIN_TOP,paddingRight:SECTION_MARGIN_TOP,fontSize:SIXTH_FONT}}/>
          </View>
        </Row>
        </Col></Grid>
        </ScrollView>
        </View>





        </View>
        </ScrollView>
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
headingstyles : {
  backgroundColor:Colors.white,
  paddingLeft:5,
  paddingRight:5,
  height:50,
  borderBottomWidth:4,
  borderColor:Colors.textBackgroundColor,
  textAlign:'center',
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