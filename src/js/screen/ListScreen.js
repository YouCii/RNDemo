import React from "react";
import {
    FlatList, StyleSheet, TouchableWithoutFeedback,
    Text, View,
} from 'react-native';
import BaseScreen from "../base/BaseScreen";
import PublicComponent from "../component/PublicComponent";
import PublicStyles from "../../res/style/styles";
import Colors from "../../res/style/colors";
import InputDialog from "../component/InputDialog";
import ToastUtils from '../utils/ToastUtils'

export default class ListScreen extends BaseScreen {

    render() {
        const title = this.props.navigation.getParam("title", "default");
        return (
            <View style={PublicStyles.screenView}>
                {PublicComponent.initStatusBar()}
                {PublicComponent.initTitleBar('ListView')}
                <FlatList
                    data={[
                        {key: 'modal实现的输入对话框'},
                        {key: 'TabView + Gallery'},
                        {key: title},
                        {key: title},
                        {key: title},
                        {key: title},
                    ]}
                    renderItem={({item, index}) =>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                switch (index) {
                                    case 0:
                                        this.refs.dialog.showDialog(true);
                                        break;
                                    case 1:
                                        this.props.navigation.navigate('Tab');
                                        break;
                                    default:
                                        break;
                                }
                            }}
                        >
                            <View style={styles.item}>
                                <Text>{item.key}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                />
                <InputDialog
                    ref={'dialog'}
                    title={'请输入'}
                    onConfirm={(inputText) => {
                        if (!inputText) {
                            ToastUtils.showShortToast("不能输入空值")
                        } else {
                            this.refs.dialog.showDialog(false);
                        }
                    }}
                />
            </View>
        );
    }
}

/**
 * 继承自BaseScreen, 用于控制是否允许Android-Back按键的返回功能
 * @link BaseScreen.defaultProps
 */
ListScreen.defaultProps = {
    disableBack: true
};

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        height: 48,
        paddingLeft: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.gray,
    },
});