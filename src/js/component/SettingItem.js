import React, {Component} from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'
import Colors from "../../res/style/colors";
import NormalDivider from "./NormalDivider";
import Switch from 'react-native-switch-pro'
import PublicStyles from "../../res/style/styles";

/**
 * 应用常用的设置项, 如果两项之间没有空隙时, 可以隐藏第一个Item的下divider
 */
export default class SettingItem extends Component {
    render() {
        return <TouchableWithoutFeedback
            onPress={this.props.onPress}
        >
            <View style={[{
                flexDirection: 'column',
            }, this.props.style]}>
                <NormalDivider/>
                <View
                    style={PublicStyles.settingItemStyle}>

                    {!this.props.iconName ? null :
                        <MaterialCommunityIcons
                            name={this.props.iconName}
                            size={25}
                            color={Colors.darkBlue}
                            style={{marginRight: 8}}
                        />
                    }

                    <Text style={{
                        flex: 1,
                        fontSize: 16,
                        color: Colors.black,
                    }}> {this.props.text}</Text>

                    {this.props.onCheckChange ?
                        <Switch
                            value={this.props.isChecked}
                            onSyncPress={(isChecked) => this.props.onCheckChange(isChecked)}
                            backgroundActive={Colors.active}
                        />
                        :
                        <MaterialCommunityIcons
                            name={'chevron-right'}
                            size={30}
                            color={Colors.mediumGray}
                        />
                    }
                </View>
                {!this.props.showBottomDivider ? null : <NormalDivider/>}
            </View>
        </TouchableWithoutFeedback>
    }
}

SettingItem.defaultProps = {
    showBottomDivider: true
};

SettingItem.propTypes = {
    text: PropTypes.string.isRequired,
    iconName: PropTypes.string, // MaterialCommunityIcons.name
    onPress: PropTypes.func,
    showBottomDivider: PropTypes.bool, // 是否显示下面的divider

    /* 不显示右箭头, 换为CheckBox */
    onCheckChange: PropTypes.func,
    isChecked: PropTypes.bool,
};