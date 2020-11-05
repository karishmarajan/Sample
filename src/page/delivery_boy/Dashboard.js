import React, { Component } from 'react';
import { TouchableOpacity,StyleSheet,ScrollView,BackHandler } from 'react-native';
import { Container, View, Button, Left, Right, Icon, Text,Grid,Col,Row,Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';



import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomButton from '../../component/CustomButton';
import CustomCheckBox from '../../component/CustomCheckBox';
import CustomSubButton from '../../component/CustomSubButton';
import { SECTION_MARGIN_TOP, SCREEN_HEIGHT } from '../../constants/Dimen';
import CustomText from '../../component/CustomText';
import SideMenuDrawer from '../../component/SideMenuDrawer';

export default class Dashboard extends React.Component {



  render() {
  
    var left = (
      <Left  style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon style={{ color:Colors.navbarIconColor }} name='ios-menu' />
          </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button  transparent>
          <Icon style={{ color:Colors.navbarIconColor }} name='ios-chatbubbles' />
        </Button>
        <Button  transparent>
         <Icon style={{color:Colors.navbarIconColor }} name='ios-notifications' />
         <Badge style={{width: 10, backgroundColor: 'orange',height:12,marginTop:20,borderRadius:10}} 
                            textStyle={{color: 'white', fontSize: 20, lineHeight: 20}}></Badge>
        </Button>
      </Right>
    );

    return (
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>
          <Navbar left={left} right={right} title="Dashboard"/>
          <ScrollView contentContainerStyle={{flexGrow:1}}>

           {/*////////////////////// main view //////////////////////////////////////////////// */}

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:20}}>


            {/*////////////////////// Amount Collected block //////////////////////////////////////////////// */}

          <View style={{ backgroundColor:Colors.white,marginTop:SECTION_MARGIN_TOP,height:120,borderRadius:10,padding:10}}>
          <CustomText text={'Amount collected today'} textType={Strings.maintext}/>
           <Text style={{fontSize:20,fontWeight:'bold',marginLeft:5}}>Rs:1,00,000</Text>
           <Text style={{fontSize:12,textDecorationLine:'underline',color:Colors.darkSkyBlue,marginTop:30,marginLeft:5}}>View Details</Text>
          </View>


          {/*////////////////////// Order Transfer Block //////////////////////////////////////////////// */}

          <View style={{ backgroundColor:Colors.white,marginTop:SECTION_MARGIN_TOP,height:120,borderRadius:10,paddingLeft:10,paddingTop:10}}>
          <CustomText text={'Order Transfer Status:'} textType={Strings.maintext} fontWeight={'bold'} />
          <CustomText text={'Waiting for your Approval'} textType={Strings.maintext} />
          <View style={{flex:1,flexDirection:'row'}}>
              <CustomButton title={'Reject'} backgroundColor={Colors.red} width={80} height={30} borderRadius={4}/>
              <CustomButton title={'Accept'} backgroundColor={Colors.green} width={80} height={30} marginLeft={20} borderRadius={4}/>
          </View>
          </View>


          {/*////////////////////// Today List Block //////////////////////////////////////////////// */}
       
<View style={{flexDirection:'row',marginTop:10}}>
<CustomText text={'Today'} textType={Strings.title}/>
 <Text style={{marginTop:10,fontSize:16,fontFamily:'normal',fontWeight:'bold'}}>{`   ${moment().format('DD')}th ${moment().format(`MMM YYYY`)}`}</Text></View>
 <View style={{ backgroundColor:Colors.white,height:260,borderRadius:10,justifyContent:'center',padding:10,flexDirection:'row'}}>
{/* <View style={{height:150}}>
 <Grid ><Col style={styles.content}><CustomText text={'Pending Orders'} textType={Strings.maintext} fontSize={16}/></Col>
        <Col style={styles.content}><Text style={{fontSize:14,color:Colors.subTextColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>23</Text></Col></Grid>
 <Grid ><Col style={styles.content}><CustomText text={'Rejected Orders'} textType={Strings.maintext} fontSize={16}/></Col>
        <Col style={styles.content}><Text style={{fontSize:14,color:Colors.subTextColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>5</Text></Col></Grid>
 <Grid><Col style={styles.content}><CustomText text={'Delivered Orders'} textType={Strings.maintext} fontSize={16}/></Col>
       <Col style={styles.content}><Text style={{fontSize:14,color:Colors.subTextColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>71</Text></Col></Grid>
 <Grid><Col style={styles.content}><CustomText text={'Total Orders'} textType={Strings.maintext} fontSize={16}/></Col>
       <Col style={styles.content}><Text style={{fontSize:14,color:Colors.subTextColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>100</Text></Col></Grid>
       </View> */}

           <View style={{height:240,fontSize:22,borderColor:Colors.lightborderColor,borderWidth:0.5,marginBottom:10}}>
             <View style={{backgroundColor:Colors.rowBackgroundColor,padding:20,}}><Text>{'Pending Orders'}</Text></View>
             <View style={{backgroundColor:Colors.white,padding:20}}><Text>{'Rejected Orders'}</Text></View>
             <View style={{backgroundColor:Colors.rowBackgroundColor,padding:20}}><Text>{'Delivered Orders'}</Text></View>
             <View style={{backgroundColor:Colors.white,padding:20}}><Text>{'Total Orders'}</Text></View>
        </View>
        <View style={{height:240,fontSize:22,borderColor:Colors.lightborderColor,borderWidth:0.5}}>
             <View style={{backgroundColor:Colors.rowBackgroundColor,padding:20,width:150}}><Text style={{textAlign:'center'}}>{'23'}</Text></View>
             <View style={{backgroundColor:Colors.white,padding:20}}><Text style={{textAlign:'center'}}>{'5'}</Text></View>
             <View style={{backgroundColor:Colors.rowBackgroundColor,padding:20}}><Text style={{textAlign:'center'}}>{'71'}</Text></View>
             <View style={{backgroundColor:Colors.white,padding:20}}><Text style={{textAlign:'center'}}>{'100'}</Text></View>
        </View>

          </View>


{/*////////////////////// Task Assigned Block //////////////////////////////////////////////// */}

<ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}} style={{marginTop:SECTION_MARGIN_TOP,}}>
<View style={{height:550,padding:10,backgroundColor:Colors.white,width:'100%',flexGrow:1,}}>
  
<View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',width:300}}>
        <CustomText text={'Task Assigned'} textType={Strings.maintext} fontWeight={'bold'}/>
        <CustomSubButton title={'Save'}/>
        <CustomSubButton title={'Submit'}/> 
        </View>
       <View style={{flexGrow:1,flexDirection:'row'}}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{height:50,borderTopLeftRadius:5,borderTopRightRadius:8,backgroundColor:Colors.textBackgroundColor,marginTop:SECTION_MARGIN_TOP,marginRight:10,width:300}}>
        <View style={{flexDirection:'row',alignSelf:'center'}}>
        <CustomCheckBox title={'MY CART'} color={Colors.buttonBackgroundColor} checked={true} fontSize={12}/>
        <Text style={{fontSize:14,color:Colors.darkSkyBlue,marginLeft:10,marginTop:11}}>(50)</Text>
        <CustomButton title={'VERIFY'} height={30} marginLeft={70} marginRight={15} marginTop={10}/>
        </View>
        </View>

        <View style={{height:90,borderRadius:5,backgroundColor:Colors.gray,marginTop:SECTION_MARGIN_TOP,marginLeft:10,width:280}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP}}>
        <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor} /></Col>
        <Col><Row style={styles.contents}><CustomText text={'Order ID'} textType={Strings.maintext}/></Row>
        <Row style={styles.contents}><CustomText text={'Cust. Name'} textType={Strings.maintext}/></Row></Col>
        <Col><Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>12345</Text></Row>
        <Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>Vivek purush</Text></Row></Col></Grid>
        </View>
        </View>


        <View style={{height:90,borderRadius:5,backgroundColor:Colors.gray,marginTop:SECTION_MARGIN_TOP,marginLeft:10,width:280}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP}}>
        <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor}/></Col>
        <Col><Row style={styles.contents}><CustomText text={'Order ID'} textType={Strings.maintext}/></Row>
        <Row style={styles.contents}><CustomText text={'Cust. Name'} textType={Strings.maintext}/></Row></Col>
        <Col><Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>12345</Text></Row>
        <Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>Vivek purush</Text></Row></Col></Grid>
        </View>
        </View>

        <View style={{height:90,borderRadius:5,backgroundColor:Colors.gray,marginTop:SECTION_MARGIN_TOP,marginLeft:10,width:280}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP}}>
        <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor}/></Col>
        <Col><Row style={styles.contents}><CustomText text={'Order ID'} textType={Strings.maintext}/></Row>
        <Row style={styles.contents}><CustomText text={'Cust. Name'} textType={Strings.maintext}/></Row></Col>
        <Col ><Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>12345</Text></Row>
        <Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>Vivek purush</Text></Row></Col></Grid>
        </View>
        </View>

        <View style={{flex:1,flexDirection:'row',marginLeft:10}}>
              <CustomButton title={'Accept Selected'} backgroundColor={Colors.red} width={130} height={30} fontSize={14}/>
              <CustomButton title={'Reject Selected'} backgroundColor={Colors.green} width={130} height={30} marginLeft={10} fontSize={14}/>
            </View>

</ScrollView>
<View>

{/*////////////////////////////// Active Cart //////////////////////////////////////////////// */}

<View style={{height:50,borderTopLeftRadius:5,borderTopRightRadius:8,backgroundColor:Colors.textBackgroundColor,marginTop:SECTION_MARGIN_TOP,marginRight:10,width:300}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,width:250}}>
        <CustomCheckBox title={'ACTIVE'} color={Colors.buttonBackgroundColor} checked={true}/>
        </View>
        </View>
        <View style={{height:90,borderRadius:5,backgroundColor:Colors.lightgreen,marginTop:SECTION_MARGIN_TOP,marginLeft:10,width:280}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP}}>
        <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor}/></Col>
        <Col><Row style={styles.contents}><CustomText text={'Order ID'} textType={Strings.maintext}/></Row>
        <Row style={styles.contents}><CustomText text={'Cust. Name'} textType={Strings.maintext}/></Row></Col>
        <Col><Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>12345</Text></Row>
        <Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>Vivek purush</Text></Row></Col></Grid>
        </View>
        </View>
        </View>


{/*//////////////////////////////// Wrong Cart //////////////////////////////////////////////// */}


<View>
        <View style={{height:50,borderTopLeftRadius:5,borderTopRightRadius:8,backgroundColor:Colors.textBackgroundColor,marginTop:SECTION_MARGIN_TOP,marginRight:10,width:300}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,width:250}}>
        <CustomCheckBox title={'WRONG'} color={Colors.buttonBackgroundColor} checked={true}/>
        </View>
        </View>
        <View style={{height:90,borderRadius:5,backgroundColor:Colors.lightPink,marginTop:SECTION_MARGIN_TOP,marginLeft:10,width:280}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP}}>
        <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor}/></Col>
        <Col><Row style={styles.contents}><CustomText text={'Order ID'} textType={Strings.maintext}/></Row>
        <Row style={styles.contents}><CustomText text={'Cust. Name'} textType={Strings.maintext}/></Row></Col>
        <Col><Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>12345</Text></Row>
        <Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>Vivek purush</Text></Row></Col></Grid>
        </View>
        </View>
        </View>


{/*////////////////////////// Missing Cart//////////////////////////////////////////////// */}

<View>
        <View style={{height:50,borderTopLeftRadius:5,borderTopRightRadius:8,backgroundColor:Colors.textBackgroundColor,marginTop:SECTION_MARGIN_TOP,marginRight:10,width:300}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,width:250}}>
        <CustomCheckBox title={'MISSING'} color={Colors.buttonBackgroundColor} checked={true}/>
        </View>
        </View>
        <View style={{height:90,borderRadius:5,backgroundColor:Colors.darkPink,marginTop:SECTION_MARGIN_TOP,marginLeft:10,width:280}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP}}>
        <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor} /></Col>
        <Col><Row style={styles.contents}><CustomText text={'Order ID'} textType={Strings.maintext}/></Row>
        <Row style={styles.contents}><CustomText text={'Cust. Name'} textType={Strings.maintext}/></Row></Col>
        <Col><Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>12345</Text></Row>
        <Row style={styles.contents}><Text style={{fontSize:14,marginTop:5}}>Vivek purush</Text></Row></Col></Grid>
        </View>
        </View>
        </View>
        
        </View>
</View>
            </ScrollView>

              </View>
              </ScrollView>
        </Container>
        </SideMenuDrawer>
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
    minWidth: '30%',
    maxWidth: '50%',
    height: 70,
    top: 5,
    padding: 5,
    borderWidth: 0.6,
    borderColor: Colors.lightborderColor
},

contents: {
  minWidth: '30%',
  maxWidth: '70%',
  height: 30,
  
},

colstyle:{
  minWidth: '10%',
  maxWidth: '15%',
  padding:0,
}

});
