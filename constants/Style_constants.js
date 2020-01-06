import {StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const PRIMARY_DARK =  '#4c4cff';
export const PRIMARY_LIGHT = '#6666ff';
export const ACCENT_COLOR =  '#8000ff';
export const styles = StyleSheet.create({
    
    title24: {
     fontSize: 24 ,
     alignSelf:'center',
     color:'black'
    },
    title18: {
        fontSize: 18 ,
        alignSelf:'center',
        color:'black'
       },
    title24_bold: {
        fontSize: 24 ,
        fontWeight:'bold',
        alignSelf:'center',
        color:'black'
       },
    title18_bold: {
           fontSize: 18 ,
           alignSelf:'center',
           fontWeight:'bold',
           color:'black'
          },
    paragraph16: {
        fontSize: 16 ,
        alignSelf:'center',
        color:'black'
        
    },
    paragraph14: {
        fontSize: 14 ,
        alignSelf:'center',
        color:'black'
        
    },
    main_container: {
      flex: 1,
      padding:16
    },
    
  });