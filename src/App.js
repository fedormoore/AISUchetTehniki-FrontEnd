import React, {useEffect} from 'react';
import './themes/AppLight2.css'
import {Layout} from 'antd';
import TopMenu from "./components/TopMenu";
import AppRouter from "./components/AppRouter";
import LeftMenu from "./components/LeftMenu";
import {checkAuth} from "./http/network";
import {useDispatch} from "react-redux";

const {Content} = Layout;

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Layout>
            <TopMenu/>
            <Layout>
                <LeftMenu/>
                <Content className="contentH100">
                    <AppRouter/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
