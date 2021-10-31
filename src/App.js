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
    );
}

export default App;
