import React, { Component } from 'react';
import { ScrollView,StyleSheet} from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Badge,Grid,Col,Row,} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomSubButton from '../../component/CustomSubButton';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import { SECTION_MARGIN_TOP, SHORT_BORDER_WIDTH, SHORT_BORDER_RADIUS } from '../../constants/Dimen';
import SideMenuDrawer from '../../component/SideMenuDrawer';


export default class SelfAssign extends React.Component {
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
          <Button  transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='md-more' />
          </Button>
        </Right>
      );

    return(
     
      <Container>
        <Navbar left={left} right={right} title="Self Assign" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:10}}>
        <View style={{ backgroundColor:Colors.white,marginTop:30,padding:20,borderRadius:SHORT_BORDER_RADIUS}}>
   
      

        {/*////////////////////// Selecting Order id Block //////////////////////////////////////////////// */}

        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between',padding:5,backgroundColor:Colors.scanBackground}}>
        <CustomText text={'Add order by scanning'} textType={Strings.subtext}  color={Colors.darkSkyBlue}/>
        <Icon style={{ color:Colors.darkSkyBlue}} name='ios-barcode' />
          </View>


        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between',marginTop:SECTION_MARGIN_TOP}}>
        <CustomInput backgroundColor={Colors.white} placeholder={'Enter Order Id here'}  />
        <CustomButton title={'ADD'} marginTop={1} height={30} borderRadius={SHORT_BORDER_RADIUS} fontSize={12} marginRight={5}/>
        </View>
      
        </View>

        {/*////////////////////// Delivery Sheet Block //////////////////////////////////////////////// */}


<View style={{flexDirection:'row',backgroundColor:Colors.aash,height:50,marginTop:SECTION_MARGIN_TOP}}>
<Text style={{fontSize:14,fontWeight:'bold',textAlignVertical:'center',paddingLeft:5}}>Delivery Sheet 1</Text>
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
          <View style={{flexDirection:'column',paddingLeft:10,textAlignVertical:'center'}}>
     <Icon name="remove-circle" style={{color:Colors.red,paddingLeft:20,paddingRight:20,fontSize:22}}/>
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