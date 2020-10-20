import React, { Component } from 'react';
import { ScrollView,Picker } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput} from 'native-base';

import Navbar from '../../component/Navbar';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';

export default class Delivery extends React.Component {
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

    return(
        <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Navbar left={left} right={right} title="Delivery" titleStyle={{ color: '#57b0fc'}} />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:'#f0f0f6'}}>
        <View style={{flexDirection:'row',width:300,marginTop:20,paddingLeft:20,justifyContent:'space-evenly'}}>
        <Button style={{backgroundColor:'#f0f0f6',height:30,marginTop:5,borderColor:'blue',borderWidth:1,width:80,justifyContent:'center'}}><Text uppercase={false}  style={{color:'blue'}}>Notify</Text></Button>
        <Button style={{backgroundColor:'#f0f0f6',height:30,marginTop:5,borderColor:'blue',borderWidth:1,width:80,justifyContent:'center'}}><Text uppercase={false} style={{color:'blue'}}>Call</Text></Button>
        <Button style={{backgroundColor:'wh#f0f0f6ite',height:30,marginTop:5,borderColor:'blue',borderWidth:1,width:80,justifyContent:'center'}}><Text uppercase={false} style={{color:'blue'}}>Print</Text></Button>
            </View>
            <View style={{ backgroundColor:'white',marginTop:20,height:1600,width:320,left:20,Right:20,padding:10}}>
            <View style={{flexDirection:'row',width:300,marginTop:10,paddingLeft:20}}>
            <Text style={{fontWeight:'bold'}}>Delivery Details</Text>
            <Icon name="md-close" style={{position: 'absolute',right: 20,top: 20,bottom: 0,color:'black'}} />
            </View>
            <Text style={{paddingLeft:5,paddingTop:20,fontSize:14}}>Cust. Name</Text>
          <View style={{height:45,width:300,padding:5}}><Input style={{borderColor:'#c4c4cb',backgroundColor:'#f0f0f6'}}/></View>
          <Text style={{paddingLeft:5,paddingTop:10,fontSize:14}}>Mobile No.</Text>
          <View style={{height:45,width:300,padding:5}}><Input style={{borderColor:'#c4c4cb',backgroundColor:'#f0f0f6'}}/></View>
          <Text style={{paddingLeft:5,paddingTop:10,fontSize:14}}>Location</Text>
          <View style={{height:45,width:300,padding:5}}><Input style={{borderColor:'#c4c4cb',backgroundColor:'#f0f0f6'}}/></View>
          <Text style={{paddingLeft:5,paddingTop:10,fontSize:14}}>Address</Text>
          <View style={{height:120,width:300,padding:5}}><Input style={{borderColor:'#c4c4cb',backgroundColor:'#f0f0f6'}}/></View>





          <Text style={{fontWeight:'bold',marginTop:30,fontStyle:'italic',fontSize:14,left:5,textDecorationLine:'underline'}}>Order No. 1</Text>
          <View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>Serial No.</Text>
        <Text style={{left:34,fontSize:14,color:'#696969',backgroundColor:Colors.textBackgroundColor,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}></Text>
</View>
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>Date and Time</Text>
        <Text style={{left:10,fontSize:14,color:'#696969',backgroundColor:Colors.textBackgroundColor,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}></Text>
</View>
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>Order No.</Text>
        <Text style={{left:37,fontSize:14,color:'#696969',backgroundColor:Colors.textBackgroundColor,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}></Text>
</View>
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>Delivery Type</Text>
        <Text style={{left:16,fontSize:14,color:'#696969',backgroundColor:Colors.textBackgroundColor,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}></Text>
</View>
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>No. of Pieces</Text>
        <Text style={{left:16,fontSize:14,color:'#696969',backgroundColor:Colors.textBackgroundColor,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}></Text>
</View>
<View style={{flexDirection:'row',marginTop:20}}>
        <Text style={{fontSize:14,color:'#696969'}}>Total</Text>
        <Text style={{left:64,fontSize:14,color:'#696969',backgroundColor:Colors.textBackgroundColor,width:180,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}></Text>
</View>




<Text style={{fontWeight:'bold',marginTop:30,fontStyle:'italic',fontSize:14,left:5,textDecorationLine:'underline'}}>Status Update</Text>
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




        <Text style={{fontWeight:'bold',marginTop:30,fontStyle:'italic',fontSize:14,left:5,textDecorationLine:'underline'}}>Total</Text>
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
        </ScrollView>
        </SideMenuDrawer>
    );
}


}