import React, { Component , useState } from 'react';
import { ScrollView,Picker,StyleSheet } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput} from 'native-base';

import Navbar from '../../component/Navbar';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';

import DropDownPicker from 'react-native-dropdown-picker';



export default class StatusUpdate extends React.Component {

render(){
    var left = (
        <Left style={{ flex: 1 }}>
          <Button onPress={() => this._sideMenuDrawer.open()} transparent>
            <Icon style={{ color: '#bdbcca' }} name='ios-menu' />
          </Button>
        </Left>
      );
      var right = (
        <Right style={{ flex: 1 }}>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color: '#bdbcca' }} name='ios-chatbubbles' />
          </Button>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color: '#bdbcca' }} name='ios-notifications' />
          </Button>
        </Right>
      );
    //   const [selectedValue, setSelectedValue] = useState("java");
    return(
        <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Navbar left={left} right={right} title="Status Update" titleStyle={{ color: '#57b0fc'}} />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:'#f0f0f6'}}>
        <View style={{ backgroundColor:'white',marginTop:30,flexGrow:1,width:330,left:15,Right:15,padding:10}}>
        <View style={{padding:10}}>
        <Button style={{justifyContent:'center',width:120,height:30,backgroundColor:'#165bd6'}}><Text uppercase={false} style={{ fontSize:14}}>Barcode Scan</Text></Button>
        <View style={{marginTop:10,flex:1,flexDirection:'row'}}>
        <Text style={{fontStyle:'italic',color:'#696969'}}>Customer Name: </Text>
        <Text style={{left:10}}>Alex</Text>
        </View>
        <View style={{marginTop:10,flex:1,flexDirection:'row'}}>
        <Text style={{fontStyle:'italic',color:'#696969'}}>Receiver ID: </Text>
        <Text style={{left:10}}>#1234567</Text>
        </View>
        <Text style={{marginTop:20,fontFamily:'lucida grande'}}>Status</Text>
        
      <Picker 
        selectedValue="Select a Status"
        style={{ height: 50, width: 300,backgroundColor:Colors.backgroundColor,borderColor:'black',borderWidth:1 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Select a Status" value="java" />
        <Picker.Item label="a" value="js" />
        <Picker.Item label="b" value="js" />
        <Picker.Item label="c" value="js" />
      </Picker>
 
      <Text style={{marginTop:10,fontFamily:'lucida grande'}}>Reason</Text>
      <Picker 
        selectedValue="Select a Status"
        style={{ height: 50, width: 300,backgroundColor:Colors.backgroundColor,borderColor:'black',borderWidth:1 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Select/Enter a Reason" value="java" />
        <Picker.Item label="a" value="js" />
        <Picker.Item label="b" value="js" />
        <Picker.Item label="c" value="js" />
      </Picker>
  
       
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>No of Pieces</Text>
        <Text style={{left:44,fontSize:14,color:'#696969',borderColor:Colors.borderColor,borderWidth:1,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>32</Text>
</View>
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>Credit Allowed</Text>
        <Text style={{left:34,fontSize:14,color:'#696969',backgroundColor:Colors.textBackgroundColor,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 5000</Text>
</View>
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>Amount to collect</Text>
        <Text style={{left:16,fontSize:14,color:'#696969',backgroundColor:Colors.textBackgroundColor,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 1000</Text>
</View>
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>Amount Recieved</Text>
        <Text style={{left:18,fontSize:14,color:'#696969',borderColor:Colors.borderColor,borderWidth:1,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 2000</Text>
</View>
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>Balance Amount</Text>
        <Text style={{left:24,fontSize:14,color:'#696969',borderColor:Colors.borderColor,borderWidth:1,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 1000</Text>
</View>

<Text style={{marginTop:30}}>Customer Signature</Text>
<View style={{ backgroundColor:'#e7e7e7',height:150,width:300,Right:20,borderRadius:5,padding:10}}>
</View>
<Button style={{borderColor:'#c4c4cb',height:40,backgroundColor:'#3b3954',justifyContent: 'center',borderRadius:5,width:300,padding:5,marginTop:20}}>
          <Text uppercase={false} style={{color: '#fdfdfd',fontSize:14,fontFamily:'lucida grande'}}>Submit</Text></Button>
        </View>
        </View>
        </View>

        </ScrollView>
        </SideMenuDrawer>
    );
}

}
