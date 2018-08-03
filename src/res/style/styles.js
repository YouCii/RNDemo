import {StyleSheet} from "react-native";

const PublicStyles = StyleSheet.create({
    screenView: {
        flex: 1,
        flexDirection: 'column',        // 纵向排列
        justifyContent: 'flex-start',   // 从上到下
        alignItems: 'stretch',          // 左右拉伸填充
    }
});

export default PublicStyles