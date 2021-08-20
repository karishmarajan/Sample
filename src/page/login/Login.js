// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, BackHandler,Image, ToastAndroid } from 'react-native';
import { ScrollView,StyleSheet } from 'react-native';
import { Container, View,Text,Toast } from 'native-base';
import { Actions, Scene } from 'react-native-router-flux';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';


// Our custom files and classes import
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import NoDataFound from '../../component/NoDataFound';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import CustomButton from '../../component/CustomButton';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import CustomAlert from '../../component/CustomAlert';
import Fetch from '../../component/Fetch';
import { SECTION_MARGIN_TOP ,FIELD_MARGIN_TOP, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,TEXT_PADDING_LEFT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, NORMAL_FONT,COLUMN_PADDING ,AMOUNT_BLOCK_HIEGHT,SECOND_FONT,LOGIN_FIELD_HEIGHT, FOURTH_FONT} from '../../constants/Dimen';
import Api from '../../component/Fetch';
import { LOGIN } from '../../constants/Api';
import session,{USER_ID} from '../../session/SessionManager';

let user_id;
let office_id;

export default class Login extends Component {


 

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      username: '',
      password: '',
      hasError: false,
      errorTextuser: '',
      errorTextpass: '',
      loader:false,
      alert_visible:false,
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

{/*/////////////////////////////////////////// Acivity indicator Block //////////////////////////////////////////////// */}

        { this.state.loader === true && (<View style={{alignItems:'center'}}>
        <CustomActivityIndicator/>
        </View>)}

        <CustomAlert
        displayAlert={this.state.alert_visible}
        alertMessageText={'Login Success'}
        displayAlertIcon={true}
   
      />

        {/*/////////////////////////////////////////// Login image Block //////////////////////////////////////////////// */}

        <Image source={require('../../assets/logo.png')} style={{height:TOTAL_BLOCK,marginTop:TEXT_PADDING_LEFT,width:360}}/>


      

{/*/////////////////////////////////////////// Login Block //////////////////////////////////////////////// */}

          <View style={{flex:1,padding:MAIN_VIEW_PADDING,marginTop:SECTION_MARGIN_TOP}}>   
          <CustomText text={'Login'} textType={Strings.titlelarge}/>

          <View  style={{marginTop:TEXT_FIELD_HIEGHT}}>
            <CustomInput  placeholder={'Username'} icon_name={'ios-person'} icon_color={Colors.placeholderTextColor} icon_fontsize={FOURTH_FONT} placeholderTextColor={Colors.placeholderTextColor} fontSize={FOURTH_FONT} showIcon={true} height={LOGIN_FIELD_HEIGHT} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop_text={FIELD_MARGIN_TOP} onChangeText={(text) => this.setState({username: text, errorTextuser:''})} value={this.state.username}  flex={1}/>
            {!!this.state.errorTextuser && (<Text style={{color: 'red'}}>{this.state.errorTextuser}</Text>)}
          </View>
         
          <View  style={styles.input}>
            <CustomInput secureTextEntry={true} placeholder={'Password'} icon_name={'ios-lock'} icon_color={Colors.placeholderTextColor} icon_fontsize={FOURTH_FONT} placeholderTextColor={Colors.placeholderTextColor} fontSize={FOURTH_FONT} showIcon={true} height={LOGIN_FIELD_HEIGHT} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop_text={FIELD_MARGIN_TOP} onChangeText={(text) => this.setState({password: text, errorTextpass:''})} value={this.state.password} flex={1}/>
            {!!this.state.errorTextpass && (<Text style={{color: 'red'}}>{this.state.errorTextpass}</Text>)}
          </View>

          <View style={{marginTop:LOGIN_FIELD_HEIGHT}}>
            <CustomButton  title={'LOGIN'} fontSize={FOURTH_FONT} height={LOGIN_FIELD_HEIGHT} onPress={()=>this.login()} borderRadius={SHORT_BLOCK_BORDER_RADIUS}/>
          </View>
          <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
          </View>
        </KeyboardAvoidingScrollView>
      </Container>
    );
  }
 

  login() {

    if(this.state.username==="") {
      this.setState({hasError: true, errorTextuser: 'Please fill  !' });
      return;
    }
    if(this.state.password==="") {
      this.setState({hasError: true, errorTextpass: 'Please fill  !'} );
      return;
    }

    let body={
      "userName" :this.state.username,
      "password" : this.state.password,
      "isWeb" : "false"
  
  };
    
  this.setState({loader:true});
  setTimeout(()=>{this.setState({loader:false})},2000);

    Api.fetch_request(LOGIN,'POST','',JSON.stringify(body))
    .then(result => {
     

      if(result.error != true){
      console.log('Success:', JSON.stringify(result));


      this.setState({alert_visible:true})
      setTimeout(()=>{this.setState({alert_visible:false})},2000);

      user_id=result.payload.personId;
      office_id=result.payload.officeId;
      

     session.login(JSON.stringify(result.payload));
   

    Actions.dashboard();

      }
      else{
        console.log('Failed');
        Toast.show({ text: "Login Failed ! Invalid username or password", type: 'warning' });
        Actions.login();
      }
    })
   
   
  }

  }

  const styles=StyleSheet.create({
    input :{
      marginTop:SECTION_MARGIN_TOP,
    },
  });