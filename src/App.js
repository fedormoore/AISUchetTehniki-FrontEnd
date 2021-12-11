import React, {useEffect} from 'react';
import {Layout} from 'antd';
import HeaderMenu from "./components/HeaderMenu";
import AppRouter from "./components/AppRouter";
import SiderMenu from "./components/SiderMenu";
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
            <HeaderMenu/>
            <Layout>
                <SiderMenu/>
                <Content className="contentH100">
                    <AppRouter/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
