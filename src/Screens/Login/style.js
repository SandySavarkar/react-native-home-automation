import { Platform, StyleSheet } from "react-native";
import Color from "../../utils/Color";
import ThemeUtils from "../../utils/ThemeUtils";

const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: Color.WHITE_SMOKE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBox: {
      marginVertical:Platform.OS==='ios'? ThemeUtils.relativeHeight(2):ThemeUtils.relativeHeight(1),
      backgroundColor: Color.WHITE,
      padding: ThemeUtils.relativeWidth(4),
      width: '90%',
      borderRadius: 8,
    },
    header: {
      fontSize: ThemeUtils.fontXXLarge,
      fontWeight: 'bold',
      color: Color.DARK_BLUE,
    },
    fieldView: {
      marginVertical: 20,
    },
    inputContainer: {
      marginVertical: Platform.OS==='ios'? ThemeUtils.relativeHeight(2):ThemeUtils.relativeHeight(1),
      justifyContent: 'center',
    },
    input: {
      borderBottomWidth: 1,
      fontSize: 16,
    },
    inputLogo: {
      height: 20,
      width: 20,
      position: 'absolute',
    },
    buttonText: {
      color: Color.WHITE,
      fontSize: 18,
      fontWeight: 'bold',
    },
    button: {
      marginVertical: 20,
      backgroundColor: Color.DARK_BLUE,
      borderRadius: 8,
      alignItems: 'center',
      paddingVertical: 10,
    },
  });
  
  export default styles;