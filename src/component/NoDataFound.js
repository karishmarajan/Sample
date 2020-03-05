import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';

export default class NoDataFound extends React.Component {

    //this.props.displayAlert

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 16, opacity: .7 }} source={require('../../assets/icons/no_data.png')} />
                <Text style={{ alignSelf: 'center', color: Colors.navbarBackgroundColor, fontSize: 21, fontWeight: '600', opacity: .7 }}>{Strings.no_data_found}</Text>
            </View>
        );
    }
}