import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Layout, Menu, Button} from "antd";

import {MenuOutlined, SettingOutlined} from '@ant-design/icons';
import {routeNames} from "../routes";
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";

const TopMenu = () => {

    const {isAuth} = useSelector(state => state.auth)
    const {isVisibleLeftMenu} = useSelector(state => state.app)
    const {logout, setIsVisibleLeftMenu} = useActions()
    const router = useHistory();

    return (
        <Layout.Header>
            {isAuth
                ?
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Button
                        type="primary"
                        icon={<MenuOutlined/>}
                        onClick={() => setIsVisibleLeftMenu(!isVisibleLeftMenu)}
                    />
                    <Menu theme={"dark"} mode="horizontal" selectable={false}>
                        <Menu.SubMenu key="SubMenu" icon={<SettingOutlined/>} title="Профиль"
                                      style={{width: 150, float: "right"}}>
                            <Menu.Item key="setting:1" onClick={() => logout()}>Выход</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
                :
                <Menu theme={"dark"} mode="horizontal" selectable={false} style={{justifyContent: "end"}}>
                    <Menu.Item key="setting:1" onClick={() => router.push(routeNames.LOGIN)}>Логин</Menu.Item>
                    <Menu.Item key="setting:2"
                               onClick={() => router.push(routeNames.REGISTRATION)}>Регистрация</Menu.Item>
                </Menu>
            }
        </Layout.Header>
    );
};

export default TopMenu;