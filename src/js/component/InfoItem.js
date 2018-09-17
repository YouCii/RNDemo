import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import Colors from "../../res/style/colors";
import NormalDivider from "./NormalDivider";
import PropTypes from 'prop-types'

export default class InfoItem extends Component {

    constructor() {
        super();
        this.state = {
            info: "%^&*", // 基本不会重复的默认校验值
        };
    }

    /**
     * 必须是这种形式, 否则外部调用时获取不到
     */
    getContent = () => {
        return this.state.info === "%^&*" ? this.props.content : this.state.info;
    };

    render() {
        return <View style={[{
            minHeight: 48,
            flexDirection: 'column',
            backgroundColor: Colors.lightBlueGray
        }, this.props.style]}>

            <View style={styles.itemView}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>

                <TextInput
                    style={styles.content}
                    underlineColorAndroid={Colors.transparent}
                    defaultValue={this.props.content}
                    editable={this.props.editable}
                    multiline={true}
                    onChangeText={(text) => this.state.info = text}
                />

                <View style={{width: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {!this.props.necessaryParams || !this.props.editable ? null :
                        <Text style={{color: Colors.red, textAlign: 'center', paddingTop: 2}}> * </Text>
                    }
                </View>
            </View>

            {!this.props.showBottomDivider ? null : <NormalDivider style={{marginLeft: 25}}/>}

        </View>
    }
}

InfoItem.defaultProps = {
    content: "",
    showBottomDivider: true,
    necessaryParams: false,
    editable: false,
};

InfoItem.propTypes = {
    title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    itemView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },

    title: {
        fontSize: 16,
        color: Colors.black,
    },

    content: {
        flex: 1,
        textAlign: 'right',
        color: Colors.darkGray,
        marginLeft: 20,
    },
});