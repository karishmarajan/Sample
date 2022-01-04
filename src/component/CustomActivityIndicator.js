import React from 'react';
import { View,} from 'react-native';
import PropTypes from "prop-types";
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

import Colors from '../constants/Colors';

export default class CustomActivityIndicator extends React.Component {

    //this.props.displayAlert

    render() {
        return (
            <View>
                {/* <BarIndicator animating={this.props.animation} color={Colors.navbarBackgroundColor} size={50} /> */}
                <UIActivityIndicator animating={true} color={Colors.darkSkyBlue} size={50} />
            </View>
        );
    }
}

CustomActivityIndicator.propTypes = {
    animation: PropTypes.bool,
}
