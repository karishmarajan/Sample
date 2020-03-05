import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
export default class CustomActivityIndicator extends React.Component {

    //this.props.displayAlert

    render() {
        return (
            <View>
                <BarIndicator animating={this.props.animation} color={Colors.navbarBackgroundColor} size={50} />
            </View>
        );
    }
}

CustomActivityIndicator.propTypes = {
    animation: PropTypes.bool,
}
