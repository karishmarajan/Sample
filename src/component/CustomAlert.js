import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';

export default class CustomAlert extends React.Component {



  render() {
    return (
      <Modal
        visible={this.props.displayAlert}
        transparent={true}
        animationType={"fade"}>
        <View style={styles.mainOuterComponent}>
          <View style={styles.mainContainer}>
          
            {/* Second Row - Alert Message Text */}
            {
                this.props.displayAlertIcon
                &&
                <Icon size={22} style={{color:'white',alignSelf:'center'}} name='notifications-active' />
              }
            <View style={styles.middlePart}>
              <Text style={styles.alertMessageTextStyle}>
                {`${this.props.alertMessageText}`}
              </Text>
            </View>
        
          </View>
        </View>
      </Modal>
    );
  }
}

CustomAlert.propTypes = {
  displayAlert: PropTypes.bool,
  displayAlertIcon: PropTypes.bool,
  alertTitleText: PropTypes.string,
  alertMessageText: PropTypes.string,
  displayPositiveButton: PropTypes.bool,
  positiveButtonText: PropTypes.string,
  displayNegativeButton: PropTypes.bool,
  negativeButtonText: PropTypes.string,
  onPressPositiveButton : PropTypes.func,
  onPressNegativeButton : PropTypes.func,
}

// export default CustomAlertComponent;

const styles = StyleSheet.create({
  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088'
  },
  mainContainer: {
    flexDirection: 'column',
    height: '15%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.navbarBackgroundColor,
    // borderWidth: 2,
    // borderColor: '#FF0000',
    borderRadius: 10,
    padding: 10,
  },
  middlePart: {
    flex: 1,
    width: '100%',
    justifyContent:'center',
    color: '#FFFFFF',
    fontSize: 16,
    alignItems: 'center',
  },

  alertMessageTextStyle: {
    color: Colors.alertTitleTextColor,
    justifyContent:'center',
    fontSize: 16,
  },



});