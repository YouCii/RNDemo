import {StyleSheet} from "react-native";
import Colors from "./colors";

const PublicStyles = StyleSheet.create({
    screenView: {
        flex: 1,
        flexDirection: 'column',        // 纵向排列
        justifyContent: 'flex-start',   // 从上到下
        alignItems: 'stretch',          // 左右拉伸填充
        backgroundColor: Colors.background,
    },

    settingItemStyle: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingLeft: 16,
        paddingRight: 5,
    }
});

export default PublicStyles