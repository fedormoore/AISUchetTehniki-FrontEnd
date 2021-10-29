import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Layout, Menu, Button, Drawer} from "antd";

import {MenuOutlined, SettingOutlined} from '@ant-design/icons';
import {routeNames} from "../routes";
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";

const Navbar = () => {

    const {isAuth} = useSelector(state => state.auth)
    const {logout} = useActions()
    const router = useHistory();

    const [visible, setVisible] = useState(false);

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
                        onClick={() => setVisible(true)}
                    />
                    <Menu theme={"dark"} mode="horizontal" selectable={false}>
                        <Menu.SubMenu key="SubMenu" icon={<SettingOutlined/>} title="Профиль"
                                      style={{width: 150, float: "right"}}>
                            <Menu.Item key="setting:1" onClick={() => logout()}>Выход</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                    <Drawer
                        title="Topics"
                        placement="left"
                        onClick={() => setVisible(false)}
                        onClose={() => setVisible(false)}
                        visible={visible}
                    >

                    </Drawer>
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

export default Navbar;