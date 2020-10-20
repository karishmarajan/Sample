import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput} from 'native-base';

import Navbar from '../../component/Navbar';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';

import SearchBar from 'react-native-search-bar';
// import { SearchBar } from 'react-native-elements';


export default class PickUp extends React.Component {
    state = {
        search: '',
      };
    
      updateSearch = (search) => {
        this.setState({ search });
      };

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
      const { search } = this.state;
    return(
        
        <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Navbar left={left} right={right} title="PickUp" titleStyle={{ color: '#57b0fc'}} />
 <Container horizontal={true} style={{flexDirection:'row'}}>
 <View style={{height:30,width:40,padding:5}}><Input style={{borderColor:'#c4c4cb',backgroundColor:'#f0f0f6'}}/></View>

        <SearchBar style={{height:30,width:40,padding:5}} ref="searchBar" placeholder="Search" color="red" onChangeText={this.updateSearch} value={search}/>

</Container>
        <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}}>
    
        </ScrollView>
        </SideMenuDrawer>


    );
}


}