import React from "react";
import {StatusBar, StyleSheet, Text, View} from "react-native";
import Colors from "../../res/style/colors";

export default class PublicComponent {
    /**
     * 初始化标题栏
     */
    static initTitleBar(title: String) {
        return <View style={styles.headerContainer}>
            <Text style={styles.headTitle}> {title} </Text>
        </View>
    }

    /**
     * 初始化状态栏
     * 两种定义方法的方式
     */
    static initStatusBar = () => {
        return <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.transparent}
            translucent={true}
        />
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.titleBar,
        paddingTop: 10, // 空出状态栏高度, 以便下方大体居中
        height: 48,
    },
    headTitle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        color: Colors.white,
        textAlign: 'center'
    },
});