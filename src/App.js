import React from 'react';
import './App.css';

import {Layout} from 'antd';
import TopMenu from "./components/TopMenu";
import AppRouter from "./components/AppRouter";
import LeftMenu from "./components/LeftMenu";

const {Content} = Layout;

function App() {

    return (
        <Layout>
            <TopMenu/>
            <Layout>
                <LeftMenu/>
                <Content className="h100">
                    <AppRouter/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
