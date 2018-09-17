import Colors from "../../res/style/colors";
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import React, {Component} from "react";
import PropTypes from 'prop-types'
import StringUtils from "../utils/StringUtils";

export default class TitleBar extends Component {

    render() {
        return <View style={[styles.headerContainer, {backgroundColor: Colors.titleBar}]}>

            {!this.props.onBackClick ? null :
                <TouchableWithoutFeedback onPress={() => this.props.onBackClick()}>
                    <View>
                        <Ionicons
                            style={{paddingLeft: 18, paddingTop: 5, paddingBottom: 5}}
                            name={'ios-arrow-back'}
                            size={30}
                            color={Colors.white}
                        />
                    </View>
                </TouchableWithoutFeedback>
            }

            <Text style={[styles.headTitle, {color: Colors.white}]}>
                {this.props.title}
            </Text>

            <View style={{flex: 1}}/>

            {!this.props.rightButton || !this.props.onRightClick ? null :
                <TouchableWithoutFeedback onPress={this.props.onRightClick}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {StringUtils.hasChinaChar(this.props.rightButton) ?
                            <Text style={styles.rightButton}>
                                {this.props.rightButton}
                            </Text>
                            :
                            <FontAwesome
                                name={this.props.rightButton}
                                size={20}
                                color={Colors.white}
                            />
                        }
                    </View>
                </TouchableWithoutFeedback>
            }
        </View>
    }
}

TitleBar.propTypes = {
    title: PropTypes.string.isRequired,

    rightButton: PropTypes.string,
    onRightClick: PropTypes.func,

    onBackClick: PropTypes.func,
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.titleBar,
        paddingTop: 14, // 空出状态栏高度, 以便下方大体居中
        paddingRight: 25,
        height: 64,
    },
    headTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 25,
        color: Colors.white,
        textAlign: 'center',
        alignSelf: 'center',
    },
    rightButton: {
        fontSize: 16,
        color: Colors.white,
        textAlign: 'center',
    },
});