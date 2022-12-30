import { StyleSheet } from "react-native";
import Color from "../../Utils/Color";

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:Color.CLOUD_WHITE,
    },
    container:{
        paddingHorizontal:20,
        paddingTop:20
    },
    headerText:{
        fontSize:20,
        fontWeight:'bold',
        color:Color.BLACK,
        marginBottom:10,
    }
});
export default styles