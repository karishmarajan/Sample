
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import * as Style from '../../constants/Style_constants';
import {Header} from 'react-native-elements';
//https://expo.github.io/vector-icons/   for icon directory
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Drawer from 'react-native-drawer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}
class HomeScreen extends React.Component{
  
  constructor()
  {
    super();
    this.state=({
      showNav : true,
    })
  }
 
  drawer_controller()
  {
    console.log(this.state.showNav)
    if(this.state.showNav == false)
    {
     
      this._drawer.close();
      this.setState({showNav:true});
    }else{
     
      this._drawer.open()
      this.setState({showNav:false});
    }
  }
  render()
  {
    return (
      <>
      
        {/* <StatusBar hidden={true} /> Enable for full screen view*/}  
        <SafeAreaView>
      
              {/* <Header
                statusBarProps={{translucent: true,backgroundColor:Style.PRIMARY_LIGHT}}
                containerStyle={{backgroundColor: Style.PRIMARY_DARK}}
                barStyle="light-content" // or directly
                placement="left"
                leftComponent={<TouchableOpacity onPress={()=> this.drawer_controller() }><Icon color={'white'} size={24} name={'menu'}></Icon></TouchableOpacity>}
                centerComponent={{ text: 'Home', style: { color: '#fff',fontSize:20, } }}
                rightComponent={<TouchableOpacity onPress={()=> alert('Do you want to logout ?')}><Icon color={'white'} size={24} name={'logout'}></Icon></TouchableOpacity>}/>
                 */}
                <Drawer
                    
                    type="overlay"
                    tapToClose={true}
                    styles={drawerStyles}
                    openDrawerOffset={0.2} // 20% gap on the right side of drawer
                    panCloseMask={0.2}
                    closedDrawerOffset={-3}
                    tweenHandler={(ratio) => ({
                      main: { opacity:(2-ratio)/2 }
                    })}
                    ref={(ref) => this._drawer = ref}
                    content={
                              <View style={{flex:1,backgroundColor:'red'}}>
                                    <Text style={{alignSelf:'center'}}>Hello</Text>
                              </View>
                            }
                    >
                   
                  </Drawer>
                        
               
              
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  keyboardShouldPersistTaps={'always'}>
                        <View>
                          <Text></Text>
                          {/* <Button onPress={()=>this.props.navigation.navigate('Page_two')} title={'click'}/> */}
                        </View>
                </ScrollView>
        </SafeAreaView>
      </>
    );
  }
  
};
const SlideOneTab = createStackNavigator(
  {
    SlideOne: SlideOne ,
   
  }
);
const SlideTwoTab = createStackNavigator(
  {
    SlideTwo: SlideTwo ,
    
  }
);

const MainApp = createMaterialTopTabNavigator(
  {
    'Slide one': SlideOneTab ,
    'Slide two': SlideTwoTab ,
  }
);
export default createAppContainer(MainApp);
