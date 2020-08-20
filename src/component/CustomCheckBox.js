
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button, ListItem, CheckBox } from 'native-base';
import { TouchableOpacity } from 'react-native';
// Our custom files and classes import
import { Text, View } from 'react-native';


export default class CustomCheckBox extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row', marginTop: 3, marginBottom: 3 }}>
                <CheckBox  style={{alignSelf:'center'}} onPress={this.props.onPress} color={this.props.color} checked={this.props.checked} />
                <Text style={{ marginLeft: 16, fontSize: this.props.fontSize, padding: 3, fontWeight: this.props.fontWeight, alignSelf: 'center' }}>{this.props.title}</Text>
            </View>

        );
    }
}

