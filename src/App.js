import React, {useEffect} from 'react';
import './App.css';

import {Layout} from 'antd';
import TopMenu from "./components/TopMenu";
import AppRouter from "./components/AppRouter";
import LeftMenu from "./components/LeftMenu";
import {checkAuth} from "./utils/network";

const {Content} = Layout;

function App() {

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            checkAuth();
        }
    }, [])

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
