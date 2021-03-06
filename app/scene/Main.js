/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import DialogMessage from "../component/DialogMessage";
import TouchableButton from "../component/TouchableButton";
import * as AppConfig from "../config/AppConfig";
import TitleBar from "../component/TitleBar";
import {connect} from "react-redux";
import * as TestAction from "../actions/TestAction";
import * as AppStyles from '../config/AppStyles';
import ThemeButton from "../component/ThemeButton";

class Main extends Component {
    render() {
        return (
            <View>
                <TitleBar
                    title="主页"
                    showBack={false}
                    leftText="返回"
                    rightText="确定"
                    onPress={() => {
                        this.show();
                    }}/>

                <ThemeButton radius={5} text={this.props.text} onPress={() => {
                    Actions.loading();
                    this.props.getMoveList({});
                }}/>

                <ThemeButton
                    textColor={AppConfig.COLOR_BLACK}
                    backgroundColor={AppConfig.TEXT_COLOR_GRAY}
                    radius={5}
                    text="跳转页面"
                    onPress={() => {
                        Actions.main2();
                    }}/>

                <DialogMessage ref={(dialogbox) => {
                    this.dialogbox = dialogbox;
                }}/>
            </View>
        )
    }

    show() {
        this.dialogbox.confirm({
            title: 'title',//标题
            titleColor: AppConfig.COLOR_THEME,
            contentColor: AppConfig.TEXT_COLOR_GRAY,//内容颜色
            content: ['come on!'],//内容
            ok: {
                text: 'Y',
                callback: () => {
                    this.dialogbox.alert('Good!');
                },
            },//右边按钮
            cancel: {
                text: 'N',
                color: AppConfig.TEXT_COLOR_GRAY,
                callback: () => {
                    this.dialogbox.alert('Hurry up！');
                },
            },
            //左边按钮
        });
    }


}

export default connect(state => ({
    text: state.TestReducer.text,
}), dispatch => ({
    getMoveList: (data) => dispatch(TestAction.testGetMoves(data)),
}))(Main);