import React, { Component } from 'react';

import {
    Person,
} from 'blockstack';

import {
    Form, Group, Field, RadioGroup, Radio, DateTimePicker
} from 'react-uikits';

import styles from 'react-uikits/less/main.less';
import {NoticeCenter} from 'react-uikits';
import {moment} from 'moment';
import $ from 'jquery';

export default class Vote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vote : {
                vote_id : ''
                , vote_title : ''
                , vote_description : ''
                , vote_options : []
                , vote_auth : ''
                , vote_result : ''
                , endtime : ''
                , create_dt : ''
                , update_dt : ''
            }
        }
    }

    render() {
        const {userSession} = this.props;
        const {vote} = this.state;
        return (
            !userSession.isSignInPending() ?
                <Form id="voteForm" type="trim">
                    <Group label="投票标题:">
                        <Field>
                            <input id="vote_title" type="text"/>
                        </Field>
                    </Group>
                    <Group label="投票说明:">
                        <div className="field">
                            <textarea id="vote_description" />
                        </div>
                    </Group>
                    <Group label="投票选项:">
                        <Field>
                            <div className="dot input icon">
                                <input name="vote_option" type="text" />
                                <i className="icon">add</i>
                            </div>
                        </Field>
                    </Group>
                    <Group label="参与权限:">
                        <Field type="inline">
                            <RadioGroup defaultChecked={true} value={vote.vote_auth} onChange={value => this.setValue('vote_auth', value)}>
                                <Radio value="0">全部</Radio>
                                <Radio value="1">部分</Radio>
                            </RadioGroup>
                        </Field>
                    </Group>

                    <Group label="结束时间:">
                        <Field type="inline">
                            <DateTimePicker onChange={value => this.setValue('endtime', value)}/>
                        </Field>
                    </Group>
                    <Group label="投票后立即显示结果:">
                        <Field type="inline">
                            <RadioGroup defaultChecked={true} value={vote.vote_result} onChange={value => this.setValue('vote_result', value)}>
                                <Radio value="0">是</Radio>
                                <Radio value="1">否</Radio>
                            </RadioGroup>
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

    setValue(name, value) {
        const {vote} = this.state;
        switch (name) {
            case 'vote_result':
                vote.vote_result = value;
                break;
            case 'vote_auth':
                vote.vote_auth = value;
            case 'endtime':
                vote.endtime = new Date(value).getTime();
        }
        this.setState({
            vote : vote
        });
    }

    submit(e) {
        const {userSession} = this.props;
        const {vote} = this.state;
        vote.vote_id = new Date().getTime();
        vote.vote_title = $("#voteForm #vote_title").val();
        vote.vote_description = $("#voteForm #vote_description").val();

        var voteOption = {
            "vote_option_id": new Date().getTime(),
            "vote_option_content": $("#voteForm input[name='vote_option']").val(),
            "vote_option_sort":1,
            "vote_option_cnts":0
        };

        var voteOptionArray = new Array();
        voteOptionArray[0] = voteOption;
        vote.vote_options = voteOptionArray;

        const options = {encrypt:false}
        userSession.putFile('my.json', JSON.stringify(vote), options)
            .then(()=>{
                this.setState({
                    vote : vote
                })
            });

        NoticeCenter.show({
            title: '发起投票',
            content: '成功',
            delay: '500'
        });
    }

    cancel(e) {
        NoticeCenter.show({
            title: '返回',
            content: '完善中...'
        });
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
        this.fetchData();
    }

    fetchData() {
        const {userSession} = this.props;
        const options = {decrypt:false}
        userSession.getFile('my.json', options)
            .then((file) => {
                var vote = JSON.parse(file || '[]');

                if (vote.length != 0) {
                    this.setState({
                        vote:vote
                    });
                }

                $("#voteForm #vote_title").val(vote.vote_title);
                $("#voteForm #vote_description").val(vote.vote_description);
                if (vote.vote_options.length > 0) {
                    // for loop
                    $("#voteForm input[name = 'vote_option']").val(vote.vote_options[0].vote_option_content);
                }

            });
    }
}
