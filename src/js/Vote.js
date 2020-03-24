import React, { Component } from 'react';

import {
    Person,
} from 'blockstack';

import {
    Form, Group, Field, Fields, CheckBox, Radio, DatePicker, DropDown, Item
    , TimeInput, DateTimePicker, TimePicker
} from 'react-uikits';

export default class Vote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voteTitle : ''
            , voteDescription : ''
            , voteOptions : []
            , voteEndTime : 0
            , voteJoinAuth : ''
        };
    }

    formateDate(date){
        date = String(date);
        const year = date.substr(0, 4);
        const month = date.substr(4, 2);
        const day = date.substr(6, 2);
        return Date.parse(year + '/' + month + '/' + day);
    }

    render() {
        const {userSession, pageType} = this.props;
        const { person } = this.state;
        return (

            !userSession.isSignInPending() ?
                <Form onSubmit={e => this.submit(e)}>
                    <Group label="name:">
                        <Field>
                            <input type="text"/>
                        </Field>
                    </Group>
                    <Group label="fields-4:">
                        <Fields size={4}>
                            <Field>
                                <label className="dot checkbox">
                                    <input type="checkbox" className="original"/>
                                    <span>原生checkbox</span>
                                </label>
                            </Field>
                            <Field>
                                <label className="dot radio">
                                    <input type="radio" className="original"/>
                                    <span>原生radio</span>
                                </label>
                            </Field>
                            <Field>
                                <CheckBox name="name">checkbox</CheckBox>
                            </Field>
                            <Field>
                                <Radio value={true}>radio</Radio>
                            </Field>
                        </Fields>
                    </Group>
                    <Group label="inline field:">
                        <Field type="inline">
                            <label className="dot checkbox">
                                <input type="checkbox" className="original"/>
                                <span>原生checkbox</span>
                            </label>
                            <label className="dot radio">
                                <input type="radio" className="original"/>
                                <span>原生radio</span>
                            </label>
                            <CheckBox name="name">checkbox</CheckBox>
                            <Radio value={true}>radio</Radio>
                            <div className="dot icon input">
                                <input type="text"/>
                                <i className="icon">email</i>
                            </div>
                        </Field>
                    </Group>
                    <Group label="fields-2:">
                        <Fields size={2}>
                            <Field label="nickname:">
                                <input type="text"/>
                            </Field>
                            <Field label="password:">
                                <div className="dot fluid icon input">
                                    <input type="password"/>
                                    <i className="icon">lock</i>
                                </div>
                            </Field>
                        </Fields>
                    </Group>
                    <Group label="fields:">
                        <Fields>
                            <Field size={3} label="f-3">
                                <DropDown name="国家" onChange={val => console.log(val)}>
                                    <Item name="中国" value="china"></Item>
                                    <Item name="美国" value="america"></Item>
                                    <Item name="英国" value="england"></Item>
                                    <Item name="法国" value="france"></Item>
                                    <Item name="德国" value="germany"></Item>
                                    <Item name="日本" value="japan"></Item>
                                </DropDown>
                            </Field>
                            <Field size={6} label="f-6:">
                                <input type="date"/>
                            </Field>
                            <Field size={1} className="text-center" label="f-1:">
                                to
                            </Field>
                            <Field size={6} label="f-6:">
                                <DatePicker onChange={val => console.log(val)}/>
                            </Field>
                        </Fields>
                        <Field type="inline" label="inline:">
                            <select name="" id="">
                                <option value="a">ember</option>
                                <option value="b">react</option>
                                <option value="c">angular</option>
                            </select>
                            <input type="url"/>
                            <span>to</span>
                            <div className="dot icon input">
                                <input type="url"/>
                                <i className="icon">security</i>
                            </div>
                        </Field>
                    </Group>
                    <Group label="address:">
                        <div className="field">
                            <textarea></textarea>
                        </div>
                    </Group>
                    <Group label="contry:">
                        <Field>
                            <DropDown multi={true} name="国家" onChange={val => console.log(val)}>
                                <Item name="中国" value="china"></Item>
                                <Item name="美国" value="america"></Item>
                                <Item name="英国" value="england"></Item>
                                <Item name="法国" value="france"></Item>
                                <Item name="德国" value="germany"></Item>
                                <Item name="澳大利亚" value="australia"></Item>
                                <Item name="日本" value="japan"></Item>
                                <Item name="韩国" value="korea"></Item>
                            </DropDown>
                        </Field>
                    </Group>
                    <Group label="fields-3 time:">
                        <Fields size={3}>
                            <Field>
                                <DateTimePicker onChange={val => console.log(val)}/>
                            </Field>
                            <Field>
                                <TimePicker onChange={val => console.log(val)}/>
                            </Field>
                            <Field>
                                <TimeInput onChange={val => console.log(val)}/>
                            </Field>
                        </Fields>
                    </Group>
                    <Group label="inline time:">
                        <Field type="inline">
                            <DateTimePicker onChange={val => console.log(val)}/>
                            <TimePicker onChange={val => console.log(val)}/>
                            <TimeInput onChange={val => console.log(val)}/>
                        </Field>
                    </Group>
                    <Group label="button group:">
                        <Field>
                            <div className="dot button-group">
                                <input type="button" className="yellow button" value="button"/>
                                <div className="dot labeled green button">
                                    <i className="icon">photo</i>
                                </div>
                                <div className="dot icon blue button">
                                    <i className="icon">phone</i>
                                    button
                                </div>
                            </div>
                        </Field>
                    </Group>
                    <Group label="search:">
                        <Fields size={2}>
                            <Field>
                                <div className="dot fluid input">
                                    <input type="text"/>
                                    <div className="action">
                                        <button>Go</button>
                                    </div>
                                </div>
                            </Field>
                            <Field>
                                <div className="dot round fluid input">
                                    <input type="email"/>
                                    <div className="action">
                                        <button>email</button>
                                    </div>
                                </div>
                            </Field>
                        </Fields>
                    </Group>
                    <Group type="action">
                        <button className={'button'}>submit</button>
                    </Group>
                </Form> : null
                // !userSession.isSignInPending() ?
                // <div className="container container-form">
                //     <div className="input-group">
                //         <div className="input-group-prepend">
                //             <span className="input-group-text w140">标题</span>
                //         </div>
                //         <input type="text" aria-label="First name" className="form-control" placeholder="投票的标题"/>
                //     </div>
                //     <br/>
                //     <div className="input-group">
                //         <div className="input-group-prepend">
                //             <span className="input-group-text w140">说明</span>
                //         </div>
                //         <textarea className="form-control" aria-label="With textarea" placeholder="投票的说明"></textarea>
                //     </div>
                //     <br/>
                //     <div className="input-group mb-3">
                //         <div className="input-group-prepend">
                //             <span className="input-group-text w140">选项</span>
                //         </div>
                //         <input type="text" className="form-control" placeholder="投票选项"/>
                //         <button className="btn btn-outline-secondary btn-form" type="button" id="button-addon2">+</button>
                //     </div>
                //     <br/>
                //     <div className="input-group">
                //         <div className="input-group-prepend">
                //             <span className="input-group-text w140">参与权限</span>
                //         </div>
                //         <div className="w10"></div>
                //         <div className="form-check form-check-inline">
                //             <input className="form-check-input" type="radio" id="inlineCheckbox1" value="option1"/>
                //                 <label className="form-check-label" htmlFor="inlineCheckbox1">全部</label>
                //         </div>
                //         <div className="form-check form-check-inline">
                //             <input className="form-check-input" type="radio" id="inlineCheckbox2" value="option2"/>
                //                 <label className="form-check-label" htmlFor="inlineCheckbox2">部分</label>
                //         </div>
                //     </div>
                //     <br/>
                //     <div className="input-group">
                //         <div className="input-group-prepend">
                //             <span className="input-group-text w140">结束时间</span>
                //         </div>
                //
                //         <Datetime locale='zh-ch'/>
                //
                //         <div className='input-group date' id='endTime'>
                //             <input type='text' className="form-control"/>
                //             <span className="input-group-addon">
                //                 <span className="glyphicon glyphicon-time"></span>
                //             </span>
                //         </div>
                //     </div>
                //     <br/>
                //     <div className="input-group">
                //         <div className="input-group-prepend">
                //             <span className="input-group-text w140">投票后立即显示结果</span>
                //         </div>
                //         <div className="w10"></div>
                //         <div className="form-check form-check-inline">
                //             <input className="form-check-input" type="radio" id="inlineCheckbox1" value="option1"/>
                //             <label className="form-check-label" htmlFor="inlineCheckbox1">是</label>
                //         </div>
                //         <div className="form-check form-check-inline">
                //             <input className="form-check-input" type="radio" id="inlineCheckbox2" value="option2"/>
                //             <label className="form-check-label" htmlFor="inlineCheckbox2">否</label>
                //         </div>
                //     </div>
                //     <br/>
                //     <div className="d-flex justify-content-center">
                //         <button type="button" className="btn btn-primary" onClick={e => this.submit(e)}>确认</button>
                //         <div className="w45"></div>
                //         <button type="button" className="btn btn-secondary" onClick={e => this.cancel(e)}>返回</button>
                //     </div>
                // </div> : null
        );
    }

    timeChange(e) {

    }
    submit(e) {
        alert('submit');
    }

    cancel(e) {
        alert('cancel');
    }

    handleNewStatusChange(e) {
        // 监听变化
        this.setState({
            newState : e.target.value
        });

    }

    handleNewStatusSubmit(e) {
        this.saveNewStatus(this.state.newState);
        this.setState({
            newState:""
        });
    }

    saveNewStatus(stateText) {
        const {userSession} = this.props
        // 定义格式
        let status = {
            text:stateText.trim()
            , create_dt: Date.now()
        }

        const options = {encrypt:false}
        userSession.putFile('status.json', JSON.stringify(status), options)
            .then(()=>{
                this.setState({
                    newStatus:status.text
                })
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {userSession} = this.props;
        const options = {decrypt:false}
        userSession.getFile('status.json', options)
            .then((file) => {
                var status = JSON.parse(file || '[]');
                this.setState({
                    status:status
                })
            });
    }

    componentWillMount() {

        console.log("componentWillMound");

        const { userSession } = this.props;
        this.setState({
            person: new Person(userSession.loadUserData().profile),
        });
    }

}
