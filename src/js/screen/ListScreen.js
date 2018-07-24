import React from "react";
import BaseScreen from "../base/BaseScreen";
import PublicComponent from "../component/PublicComponent";
import PublicStyles from "../../res/style/styles";
import Colors from "../../res/style/colors";
import {
    FlatList, StyleSheet,
    Text, View,
} from 'react-native';

export default class ListScreen extends BaseScreen {

    render() {
        const title = this.props.navigation.getParam("title", "default");
        return (
            <View style={PublicStyles.screenView}>
                {PublicComponent.initStatusBar()}
                {PublicComponent.initTitleBar('ListView')}
                <FlatList
                    data={[
                        {key: title},
                        {key: title},
                        {key: title},
                        {key: title},
                        {key: title},
                        {key: title},
                    ]}
                    renderItem={({item}) =>
                        <View style={styles.item}>
                            <Text>{item.key}</Text>
                        </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        height: 48,
        paddingLeft: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.gray,
    },
});