import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet,BackHandler,Modal } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Grid,Col,Input,Badge, Content, Card, CardItem, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomSubButton from '../../component/CustomSubButton';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP,SHORT_BUTTON_HEIGHT, MAIN_BLOCK_BORDER_RADIUS, SHORT_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,SECOND_FONT, SIGNATURE_VIEW_HEIGHT,COLUMN_PADDING, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, ORDER_BLOCK,FOURTH_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import CustomCheckBox from '../../component/CustomCheckBox';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import CustomSearchableDropdown from '../../component/CustomSearchableDropdown';


export default class StatusUpdateFirst extends React.Component {

  state = {
    modal_visible: false,
    modal_visible2: false,
   
  };

  
  render(){
      var left = (
          <Left style={{ flex: 1 }}>
            <Button onPress={() => Actions.pop()} transparent>
              <Icon style={{ color:Colors.navbarIconColor}} name='md-arrow-round-back' />
              </Button>
          </Left>
        );
  
  
      return(
    
          <Container>



               <Navbar left={left} title="Status Update" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

        
{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>
        <View style={{ backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING}}>

 {/*////////////////////////////////////// Modal Block first //////////////////////////////////////////////////////////////////////// */}

<Modal visible={this.state.modal_visible} supportedOrientations={['landscape']} transparent>
<View style={{backgroundColor:Colors.textBackgroundColor,margin:20,padding:10,justifyContent:'center',alignItems:'center',flex:1,flexGrow:1,flexDirection:'column'}}>

<View style={{flexDirection:'row',}}>
  <View style={{flex:4}}><CustomText text={'OTHER ORDERS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} /></View>
  <View style={{flex:1}}><Button onPress={() => this.setState({modal_visible:false})} transparent><Icon style={{ color:Colors.black, fontSize:18,}} name='md-close' /></Button></View>

</View>
<CustomText text={'Other deliveryout for the same customer id, please check the delivery address and add '} textType={Strings.subtext} color={Colors.grayTextColor}/> 

         <View style={{ flexDirection: 'row' ,marginTop:6}}>
         <View style={styles.cell1}><CustomText textType={Strings.smalltext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
         <View style={styles.cell}><CustomText text={'ORDER ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
         <View style={styles.cell}><CustomText text={'DELIVERY ADDRESS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        </View>

        <View style={{ flexDirection: 'row',  }}>
        <View style={styles.cell1}><CustomCheckBox color={Colors.buttonBackgroundColor}  checked={true} /></View>
        <View style={styles.cell}><CustomText text={'12345'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'fghjk ghjhg'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        </View>
        <View style={{ flexDirection: 'row', }}>
        <View style={styles.cell1}><CustomCheckBox color={Colors.buttonBackgroundColor}  checked={true} /></View>
        <View style={styles.cell}><CustomText text={'12345'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'fghjk ghjhg'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        </View>
        <View style={{ flexDirection: 'row',  }}>
        <View style={styles.cell1}><CustomCheckBox color={Colors.buttonBackgroundColor}  checked={true} /></View>
        <View style={styles.cell}><CustomText text={'12345'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'fghjk ghjhg'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        </View>

        <View style={{flex:1,flexDirection:'row',marginLeft:10,flex:8}}>
              <CustomButton title={'Cancel'} backgroundColor={Colors.darkSkyBlue}  height={SHORT_BUTTON_HEIGHT}  flex={1}/>
              <CustomButton title={'Add'} backgroundColor={Colors.darkSkyBlue}  height={SHORT_BUTTON_HEIGHT} marginLeft={SECTION_MARGIN_TOP}  flex={1} onPress={()=>{this.setState({modal_visible:false}); this.setState({modal_visible2:true})}}/>
            </View>

        </View>
       
</Modal>


 {/*////////////////////////////////////// Modal Block second //////////////////////////////////////////////////////////////////////// */}

 <Modal visible={this.state.modal_visible2} supportedOrientations={['landscape']} transparent>
<View style={{backgroundColor:Colors.textBackgroundColor,margin:20,padding:10,justifyContent:'center',alignItems:'center',flex:1,flexGrow:1,flexDirection:'column'}}>

<View style={{flexDirection:'row',}}>
  <View style={{flex:4}}><CustomText text={'Verify Added Orders'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} /></View>
  <View style={{flex:1}}><Button onPress={() => this.setState({modal_visible:false})} transparent><Icon style={{ color:Colors.black, fontSize:18,}} name='md-close' /></Button></View>

</View>


         <View style={{ flexDirection: 'row' ,marginTop:6}}>
        
         <View style={styles.cell}><CustomText text={'ORDER ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
         <View style={styles.cell}><CustomText text={'DELIVERY ADDRESS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
         <View style={styles.cell}><CustomText text={'STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
         <View style={styles.cell1}><Icon style={{color:Colors.darkSkyBlue,fontSize:16,marginTop:10}} name={'md-barcode'}/></View>
        </View>

        <View style={{ flexDirection: 'row',  }}>
        <View style={styles.cell}><CustomText text={'12345'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'fghjk ghjhg'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'VERIFIED'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell1}><CustomText textType={Strings.smalltext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        </View>
        <View style={{ flexDirection: 'row', }}>
        <View style={styles.cell}><CustomText text={'12345'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'fghjk ghjhg'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'VERIFIED'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell1}><CustomText textType={Strings.smalltext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        </View>
        <View style={{ flexDirection: 'row',  }}>
        <View style={styles.cell}><CustomText text={'12345'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'fghjk ghjhg'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'PENDING'} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

        <View style={styles.cell1}><CustomText textType={Strings.smalltext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        </View>

        <View style={{flex:1,flexDirection:'row',marginLeft:10,flex:8}}>
              <CustomButton title={'Verify'} backgroundColor={Colors.darkSkyBlue}  height={SHORT_BUTTON_HEIGHT}  flex={1}/>
              <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue}  height={SHORT_BUTTON_HEIGHT} marginLeft={SECTION_MARGIN_TOP}  flex={1} onPress={()=>{this.setState({modal_visible2:false}); Actions.statusupdate();}}/>
            </View>

        </View>
       
</Modal>

{/*////////////////////// Request Order Transfer Details //////////////////////////////////////////////// */}

<View style={{backgroundColor:Colors.white,flex:10,}}>
              <CustomText  text={'Scan Order'} textType={Strings.subtitle} flex={9} fontWeight={'bold'} />
              </View>

       <CustomText text={'Looks like you haven`t scanned any order yet. Scan the order for updating the status of the particular item.'} textType={Strings.subtext} color={Colors.grayTextColor}/> 
      
       <CustomButton title={'Barcode Scan'} fontSize={SECOND_FONT} showIcon={true} icon_name={'md-barcode'} icon_color={Colors.white} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.setState({modal_visible:true})} />
      
       <CustomText text={'or'} textType={Strings.subtext} color={Colors.black} textAlign={'center'}/>

       <CustomInput backgroundColor={Colors.white} placeholder={'Enter Order Id here'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} flex={1}/>
      
       </View>
        
        </View>
             </ScrollView>
              </Container>

      );
  }
}
const styles = StyleSheet.create({

  header: {
    backgroundColor: Colors.aash,

  },
  cell: {
    marginTop:3,
    width:130,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor:Colors.white,


  },
  cell1: {
    marginTop:3,
    width: 50,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor:Colors.white,


  },

  body: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingLeft: COLUMN_PADDING,
    paddingRight: COLUMN_PADDING,
    borderBottomWidth: 5,
    borderColor: Colors.textBackgroundColor1,

  },
  modalview :{
    margin:SECTION_MARGIN_TOP,
    padding:2,
    maxWidth:'60%',
    minWidth:'60%',
  },

});