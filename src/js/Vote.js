import React, { Component } from 'react';

import {
    Person,
} from 'blockstack';

import {
    Form, Group, Field, Radio, DateTimePicker
} from 'react-uikits';

import styles from 'react-uikits/less/main.less';
import $ from 'jquery';

export default class Vote extends Component {
    constructor(props) {
        super(props);
    }

    formateDate(date){
        date = String(date);
        const year = date.substr(0, 4);
        const month = date.substr(4, 2);
        const day = date.substr(6, 2);
        return Date.parse(year + '/' + month + '/' + day);
    }

    render() {
        const {userSession, handleSignOut} = this.props;
        const { person } = this.state;
        return (

            !userSession.isSignInPending() ?
                <Form type="trim">
                    <Group label="投票标题:">
                        <Field>
                            <input type="text"/>
                        </Field>
                    </Group>
                    <Group label="投票标题:">
                        <Field>
                            <input type="text"/>
                        </Field>
                    </Group>
                    <Group label="投票说明:">
                        <div className="field">
                            <textarea></textarea>
                        </div>
                    </Group>
                    <Group label="投票选项:">
                        <Field>
                            <div className="dot input icon">
                                <input type="text" />
                                <i className="icon">add</i>
                            </div>
                        </Field>
                    </Group>
                    <Group label="参与权限:">
                        <Field type="inline">
                            <Radio value={false}>全部</Radio>
                            <Radio value={true}>部分</Radio>
                        </Field>
                    </Group>

                    <Group label="结束时间:">
                        <Field type="inline">
                            <DateTimePicker onChange={val => console.log(val)}/>
                        </Field>
                    </Group>
                    <Group label="投票后立即显示结果:">
                        <Field type="inline">
                            <Radio value={false}>全部</Radio>
                            <Radio value={true}>部分</Radio>
                        </Field>
                    </Group>
                    <div className="d-flex justify-content-center">
                        <button className="dot blue" onClick={e=>this.submit(e)}>发起</button>
                        <button className="dot gray" onClick={e=>this.cancel(e)}>返回</button>
                        <button className="dot gray" onClick={e=>this.logout(e)}>退出</button>
                    </div>
                </Form> : null
        );
    }

    submit(e) {
        alert('submit function todo');
    }

    cancel(e) {
        alert('cancel function todo');
    }

    logout(e) {
        const {handleSignOut} = this.props;
        handleSignOut(e);
    }

    componentWillMount() {

        console.log("componentWillMound");

        const { userSession } = this.props;
        this.setState({
            person: new Person(userSession.loadUserData().profile),
        });
    }

    componentDidMount() {

        console.log("did mount");
        const {handleSignOut} = this.props;

        $("#logoutBtn").click(function() {
            console.log("quit");
            handleSignOut.bind(this);
        });
    }
}
