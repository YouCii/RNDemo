import React, {Component} from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import Constants from "../utils/Constants";
import Colors from "../../res/style/colors";
import PropTypes from 'prop-types';

export default class InputDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            inputValue: ''
        };
    }

    showDialog(visible: Boolean) {
        this.setState({modalVisible: visible})
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onShow={() => this.setState({inputValue: this.state.inputValue})}
                onRequestClose={() => this.showDialog(false)}
            >

                {/* 整体布局中点击取消对话框 */}
                <TouchableWithoutFeedback style={{flex: 1}} onPress={() => this.showDialog(false)}>
                    <View style={styles.view}>
                        {/*屏蔽对话框内部的点击取消事件*/}
                        <TouchableWithoutFeedback onPress={null}>
                            <View style={styles.dialog}>

                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                    {this.props.title}
                                </Text>

                                <TextInput
                                    style={{flex: 1}}
                                    underlineColorAndroid={Colors.transparent}
                                    multiline={true}
                                    placeholder={'请输入'}
                                    defaultValue={this.state.inputValue}
                                    onChangeText={(text) => {
                                        this.state.inputValue = text;
                                    }}
                                />

                                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            this.showDialog(false)
                                        }}>
                                        <Text>取消</Text>
                                    </TouchableOpacity>

                                    <View style={{width: 15}}/>

                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            Keyboard.dismiss();
                                            this.props.onConfirm(this.state.inputValue);
                                        }}>
                                        <Text style={{color: Colors.red}}>确定</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

InputDialog.propTypes = {
    title: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dialog: {
        width: 280,
        height: 150,
        position: 'absolute',
        top: Constants.height / 3,
        backgroundColor: Colors.white,
        flexDirection: 'column',
        borderRadius: 5,
        padding: 20,
    },
    button: {
        padding: 3
    },
});