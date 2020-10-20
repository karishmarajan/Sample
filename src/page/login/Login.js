/**
* This is the Login Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { ScrollView,Keyboard,StyleSheet } from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input, Text,TextInput } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../../constants/Colors';
import Navbar from '../../component/Navbar';
import Strings from '../../constants/Strings';
import NoDataFound from '../../component/NoDataFound';
import CustomInput from '../../component/CustomInput';
import  CustomTextInput  from '../../component/CustomTextInput';

export default class Login extends Component {

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        hasError: false,
        errorText: ''
      };
  }

  


  render() {
    return(
      <Container style={{backgroundColor: '#ffffff'}}>
        {/* <Navbar left={left} title={Strings.login} /> */}
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <Text style={{fontSize: 42, textAlign: 'left', width: '100%' , paddingTop: 60, paddingLeft: 30, color: Colors.navbarBackgroundColor}}>Epex </Text>
          <View style={{ flex:1,justifyContent:'center',alignItems: 'center', paddingLeft: 30, paddingRight: 50}}>
            <View style={{marginBottom: 35, width: '100%'}}>
              <Text style={{fontSize: 28, textAlign: 'left', width: '100%', color: Colors.navbarBackgroundColor,fontFamily:'arial'}}>Login </Text>
            </View>
            <View style={{textAlign: 'center',height: 50,width:300,borderRadius: 10 ,backgroundColor : "#f9fafc"  }}>
            <Item>
                <Icon active name='ios-person' style={{color: '#447cdc'}} />
                <Input placeholder='Email' onChangeText={(text) => this.setState({email: text})} keyboardType="email-address" placeholderTextColor="#447cdc" />
            </Item>
            </View>
            <View style={{textAlign: 'center',height: 50,width:300,borderRadius: 10 ,backgroundColor : "#f9fafc" ,marginTop:15 }}>
            <Item>
                <Icon active name='ios-lock' style={{color: '#447cdc'}} />
                <Input placeholder='Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#447cdc"  />
            </Item>
            </View>
            {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
            <View style={styles.loginTextSection}>
              <Button onPress={()=>Actions.index()} style={{backgroundColor: Colors.buttonBackgroundColor, marginTop: 40,width:300,justifyContent: 'center',height:50,borderRadius:10,}}>
                <Text style={{color: '#fdfdfd', textAlign: 'center',alignItems: 'center',fontSize:18,fontFamily:'lucida grande'}}>LOGIN</Text>
              </Button>
              {/* <CustomInput  title="SIGN UP" /> */}
            </View>

 {/* <View style={styles.passwordContainer}>
 <Icon
    name='ios-person'
    color='#000'
    size={14}
  />
  <Input
    style={styles.inputStyle}
      autoCorrect={false}
      placeholder="Password"
      value={this.state.password}
      onChangeText={(text) => this.setState({password: text})}
       secureTextEntry={true}
       underlineColorAndroid="transparent"
    />
 
</View> */}
          </View>
        </ScrollView>
      </Container>
    );
  }

  login() {
    if(this.state.email===""||this.state.name===""||this.state.username===""||this.state.password===""||this.state.rePassword==="") {
      this.setState({hasError: true, errorText: 'Please fill all fields !'});
      return;
    }
    if(!this.verifyEmail(this.state.email)) {
      this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
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
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    paddingBottom: 10,
    borderRadius: 25,
  },
  inputStyle: {
    
    flex: 1,
  },
  loginButtonSection: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'30'
 }
})