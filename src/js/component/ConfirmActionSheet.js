import ActionSheet from "react-native-actionsheet";
import React, {Component} from "react";
import PropTypes from 'prop-types'

export default class ConfirmActionSheet extends Component {

    show = () => {
        this.refs.actionSheet.show();
    };

    render() {
        return <ActionSheet
            ref={'actionSheet'}
            title={this.props.title}
            options={['确定', '取消']}
            cancelButtonIndex={1}
            onPress={(index) => {
                if (index === 0) {
                    this.props.onConfirm.call()
                }
            }}
        />
    }
}

ConfirmActionSheet.propTypes = {
    title: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired
};