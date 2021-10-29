import React, {useState} from 'react';
import './App.css';

import {Layout, Menu} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import TopMenu from "./components/TopMenu";
import AppRouter from "./components/AppRouter";
import {useSelector} from "react-redux";

const {SubMenu} = Menu;
const {Content, Sider} = Layout;


// import AppRouter from "./components/AppRouter";
// import TopMenu from "./components/TopMenu";
// import LeftMenu from "./components/LeftMenu";

function App() {

    const {isVisibleLeftMenu} = useSelector(state => state.app)

    return (
        <Layout>
            <TopMenu/>
            <Layout>
                <Sider trigger={null} collapsible collapsed={isVisibleLeftMenu}>
                    <Menu
                        mode="inline"
                        style={{height: '100%', borderRight: 0}}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="subnav 1">
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined/>} title="subnav 2">
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <AppRouter/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        // <Layout>
        //     <TopMenu/>
        //     <LeftMenu/>
        //
        //     {/*<Layout.Content>*/}
        //     {/*    <AppRouter/>*/}
        //     {/*</Layout.Content>*/}
        // </Layout>
    );
}

export default App;
