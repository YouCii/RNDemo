import React, {Component} from 'react';
import CardView from 'react-native-cardview'
import {View, Text, Image} from 'react-native'
import Colors from "../../res/style/colors";
import PropTypes from 'prop-types';

/**
 * 展示用户基本信息的卡片样式
 */
export default class UserInfoCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardView
                style={[{
                    height: 120,
                    margin: 5,
                    backgroundColor: Colors.white
                }, this.props.style]}
                cornerRadius={3}
                cardElevation={3}
                cardMaxElevation={3}>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 20,
                    marginTop: 20,
                    marginRight: 30,
                    marginBottom: 30, // 因为CardView的bug, 要加上CardView的上下margin
                }}>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: Colors.black,
                            fontWeight: 'bold'
                        }}> {this.props.name} </Text>
                        <Text> {this.props.post} </Text>
                        <Text> {this.props.department} </Text>
                    </View>

                    <Image
                        resizeMode={'contain'}
                        style={{
                            width: 65,
                            height: 65,
                            borderRadius: 1.5,
                            alignSelf: "center",
                        }}
                        source={{uri: 'https://avatar-static.segmentfault.com/268/384/2683843113-5b50384d50c03_big64'}}
                    />
                </View>

            </CardView>
        )
    }
}

UserInfoCard.propTypes = {
    name: PropTypes.string.isRequired,          // 用户名
    post: PropTypes.string.isRequired,          // 职位
    department: PropTypes.string.isRequired,    // 部门
};