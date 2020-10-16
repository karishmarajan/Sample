
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
// Our custom files and classes import
import { Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { Dropdown } from 'react-native-material-dropdown';
export default class CustomDropdown extends Component {
    render() {

        const styles = {
            input: {
                height: this.props.height ? this.props.height : 50,
                width: this.props.width,
                borderWidth: .5,
                marginTop: 6,
                marginBottom: 6,
                borderRadius: 6,
                justifyContent: 'center',
                paddingBottom: 16,
                paddingLeft: 6,
                paddingRight: 6,
                borderColor: Colors.accentColor,
            }
        };

        let data = [];
        data = this.props.data;




        return (

            <View style={styles.input}>

                <Dropdown

                    style={{ marginBottom: 6, alignSelf: 'center', }}
                    baseColor={'gray'}
                    fontSize={this.props.fontSize}
                    selectedItemColor={Colors.primaryColor}
                    itemColor={Colors.secondaryColor}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    data={data}
                    dropdownPosition={this.props.position ? this.props.position : 0}
                    value={this.props.value ? this.props.value : data.length != 0 ? data[0]['value'] : ''}
                    onChangeText={this.props.onChangeValue}




                >

                </Dropdown>



            </View>

        );
    }
}


