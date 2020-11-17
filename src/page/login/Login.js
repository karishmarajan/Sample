// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler,Image, ToastAndroid } from 'react-native';
import { ScrollView,Keyboard,StyleSheet } from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input, Text,TextInput } from 'native-base';
import { Actions, Scene } from 'react-native-router-flux';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';


// Our custom files and classes import
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import NoDataFound from '../../component/NoDataFound';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import CustomButton from '../../component/CustomButton';
import { SECTION_MARGIN_TOP ,FIELD_MARGIN_TOP, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,TEXT_PADDING_LEFT, SHORT_BUTTON_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, NORMAL_FONT,COLUMN_PADDING ,AMOUNT_BLOCK_HIEGHT,SECOND_FONT,LOGIN_FIELD_HEIGHT, FOURTH_FONT} from '../../constants/Dimen';



export default class Login extends Component {


  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: '',
      password: '',
      hasError: false,
      errorText: '',
    };
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick  );
  };

  handleBackButtonClick() {
    Actions.pop();
    return true;
}
  
   




 


  render() {
    return(
      <Container style={{backgroundColor:Colors.white}}>
        <KeyboardAvoidingScrollView keyboardShouldPersistTaps={'always'}>
        <Image source={require('../../assets/logo.png')} style={{height:TOTAL_BLOCK,width:360,marginTop:TEXT_PADDING_LEFT,}}/>

{/*////////////////////// Login Block //////////////////////////////////////////////// */}

          <View style={{flex:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>   
          <CustomText text={'Login'} textType={Strings.titlelarge}/>
          <View  style={{marginTop:TEXT_FIELD_HIEGHT}}>
            <CustomInput keyboardType={'email-address'} placeholder={'Username'} icon_name={'ios-person'} icon_color={Colors.placeholderTextColor} icon_fontsize={FOURTH_FONT} placeholderTextColor={Colors.placeholderTextColor} fontSize={18} showIcon={true} height={LOGIN_FIELD_HEIGHT} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop_text={FIELD_MARGIN_TOP} flex={1}/>
          </View>
          <View  style={styles.input}>
            <CustomInput secureTextEntry={true} placeholder={'Password'} icon_name={'ios-lock'} icon_color={Colors.placeholderTextColor} icon_fontsize={FOURTH_FONT} placeholderTextColor={Colors.placeholderTextColor} fontSize={18} showIcon={true} height={LOGIN_FIELD_HEIGHT} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop_text={FIELD_MARGIN_TOP} flex={1}/>
          </View>
          <View style={{marginTop:LOGIN_FIELD_HEIGHT}}>
            <CustomButton  title={'LOGIN'} fontSize={FOURTH_FONT} height={LOGIN_FIELD_HEIGHT} onPress={()=>Actions.reset('dashboard')} borderRadius={SHORT_BLOCK_BORDER_RADIUS}/>
          </View>
          </View>


     
          {/* <View style={{ flex:1,justifyContent:'center',alignItems: 'center', paddingLeft: 30, paddingRight: 50}}>
          <Text style={{fontSize: 28, textAlign: 'left', color: Colors.navbarBackgroundColor,fontFamily:'arial',marginBottom: 35,marginRight:160}}>Login </Text>
          <View style={{height: 50,marginLeft:10,marginRight:10,borderRadius: 10 ,backgroundColor : Colors.loginBackgroundColor  }}>
            <Item>
                <Icon active name='ios-person' style={{color:Colors.placeholderTextColor}} />
                <Input placeholder='Email' onChangeText={(text) => this.setState({email: text})} keyboardType="email-address" placeholderTextColor={Colors.placeholderTextColor}/>
            </Item>
        </View>    
            <View style={{textAlign: 'center',height: 50,width:300,borderRadius: 10 ,backgroundColor :Colors.loginBackgroundColor ,marginTop:15 }}>
            <Item>
                <Icon active name='ios-lock' style={{color:Colors.placeholderTextColor}} />
                <Input placeholder='Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor={Colors.placeholderTextColor}  />
            </Item>
            </View>
            
              <Button onPress={()=>this.login()} style={{backgroundColor: Colors.buttonBackgroundColor, marginTop: 40,width:300,justifyContent: 'center',height:50,borderRadius:10}}>
                <Text style={{color:Colors.white,alignItems: 'center',fontSize:18,fontFamily:'lucida grande'}}>LOGIN</Text>
              </Button>
          </View> */}
        </KeyboardAvoidingScrollView>
      </Container>
    );
  }
 

  login() {
    if(this.state.email===""||this.state.password==="") {
      this.setState({hasError: true, errorText: 'Please fill all fields !'});
      return;
    }
    if(!this.verifyEmail(this.state.email)) {
      this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
      return;
    }
    if(this.state.password.length < 6) {
      this.setState({hasError: true, errorText: 'Passwords must contains at least 6 characters !'});
      return;
    }
  }
  //   this.setState({hasError: true, errorText: 'Invalid username or password !'});
  // }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  }

  const styles=StyleSheet.create({
    input :{
      marginTop:SECTION_MARGIN_TOP,
    },
  });