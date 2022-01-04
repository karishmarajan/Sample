import React, { Component } from 'react';
import { ScrollView, StyleSheet, AsyncStorage, } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Button, Left, Icon, View,  } from 'native-base';

import Navbar from '../component/Navbar';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import CustomText from '../component/CustomText';
import CustomInput from '../component/CustomInput';
import { COLUMN_PADDING, MAIN_VIEW_PADDING, CLOSE_WIDTH } from '../constants/Dimen';
import session, { KEY } from '../session/SessionManager';
import CustomButton from '../component/CustomButton';





export default class Profile extends React.Component {
  constructor(props) {
    super(props);
 this.state = {
   personId:'',
   officeId:'',
   first_name:'',
   last_name:'', 
  };
}

  componentDidMount() {
    AsyncStorage.getItem(KEY).then((value => {
        let data = JSON.parse(value);

        this.setState({personId:''+data.personId, officeId:''+data.officeId, first_name:data.firstName, last_name:data.lastName})
    }));
  }


////////////////////////////////////// Render function //////////////////////////////////////////////////////////////////////////////////////

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button  width={CLOSE_WIDTH}  onPress={() => Actions.pop()} transparent>
          <Icon style={{ color: Colors.navbarIconColor,fontSize:22 }} name='md-arrow-round-back' />
        </Button>
      </Left>
    );

  
    return (

      <Container>
        <Navbar left={left} title="Profile" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>
        


         
          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}
 
          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING}}>
              
          <CustomText text={'Person Id'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.personId} />
          <CustomText text={'First Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.first_name} />
        <CustomText text={'Last Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.last_name} />
        <CustomText text={'Office Id'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.officeId} />
        

        <CustomButton title={'Log out'}  height={60} fontSize={18} marginTop={70} onPress={()=>{session.logout()}}/>
          </View>
        </ScrollView>
      </Container>


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
    backgroundColor:Colors.buttonBackgroundColor


  },
  cell2: {
    flex:1,
    width: 130,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRightWidth: 0.3,
    backgroundColor:Colors.white,
    justifyContent:'center'


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