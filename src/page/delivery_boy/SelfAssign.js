import React, { Component } from 'react';
import { ScrollView} from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Badge} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomSubButton from '../../component/CustomSubButton';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import { SECTION_MARGIN_TOP } from '../../constants/Dimen';
import SideMenuDrawer from '../../component/SideMenuDrawer';

export default class SelfAssign extends React.Component {
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
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-chatbubbles' />
          </Button>
          <Button  transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-notifications' />
            <Badge style={{width: 10, backgroundColor: 'orange',height:12,marginTop:20,borderRadius:10}} 
                            textStyle={{color: 'white', fontSize: 20, lineHeight: 20}}></Badge>
          </Button>
        </Right>
      );

    return(
     
      <Container>
        <Navbar left={left} right={right} title="Self Assign" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:10}}>
        <View style={{ backgroundColor:Colors.white,marginTop:30,padding:10,height:160,borderRadius:5}}>
   
        <CustomButton title={'Barcode Scan'} backgroundColor={Colors.darkSkyBlue} width={120} height={30} fontSize={16} marginTop={10} borderRadius={4} />

        {/*////////////////////// Selecting Order id Block //////////////////////////////////////////////// */}

<View style={{marginTop:10}}>
        <CustomText text={'Enter Order Id'} textType={Strings.maintext}/>
        <View style={{borderWidth:1,borderColor:Colors.borderColor,height:45,marginRight:10,flexDirection:'row',borderRadius:5,padding:5,alignSelf:'center'}}>
        <CustomInput backgroundColor={Colors.white} height={30} placeholder={'#12345'} placeholderTextColor={Colors.grayTextColor} />
        <CustomButton title={'ADD'} height={35} marginRight={15} marginLeft={160} marginTop={1} borderRadius={4}/>
        </View>
        </View>
      
        </View>

         {/*////////////////////// Buttons Block  //////////////////////////////////////////////// */}

        <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-evenly'}}>
        <CustomSubButton title={'Delete'}/>
        <CustomSubButton title={'Save'}/>
        <CustomSubButton title={'Submit'}/>
        </View>


        </View>
        </ScrollView>
        </Container>
     
    );
}


}