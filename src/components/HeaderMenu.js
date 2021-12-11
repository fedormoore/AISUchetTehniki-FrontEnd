import React from 'react';
import {useHistory, Link} from 'react-router-dom';
import {Layout, Menu, Button, Switch, Image, Row, Col, Typography} from "antd";

import Icon, {MenuOutlined, PlusOutlined, SettingOutlined} from '@ant-design/icons';
import {routeNames} from "../routes";
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";

import sun from '../resources/sun.png';
import moon from '../resources/moon.png';

const HeaderMenu = () => {

    const { SubMenu } = Menu;

    const {isDark} = useSelector(state => state.app)
    const {setIsDark} = useActions()

    const {isAuth} = useSelector(state => state.auth)
    const {isVisibleLeftMenu} = useSelector(state => state.app)
    const {logout, setIsVisibleLeftMenu} = useActions()
    const router = useHistory();

    return (
        <>
            {isAuth
                ?
                <Layout.Header
                    style={{
                        paddingLeft: '25px',
                        paddingRight: '25px'
                    }}
                >
                    <Row
                        style={{
                            height: '100%'
                        }}
                    >
                        <Col span={8}>
                            <Row
                                style={{
                                    height: '100%',
                                    alignItems: 'center'
                                }}
                            >
                                <Button
                                    type="dashed" ghost
                                    icon={<MenuOutlined/>}
                                    onClick={() => setIsVisibleLeftMenu(!isVisibleLeftMenu)}
                                />
                                <Typography.Title level={4}
                                                  style={{
                                                      marginLeft: '22px',
                                                      marginBottom: '0'
                                                  }}
                                >
                                    <a>АИС "Учет техники"</a>
                                </Typography.Title>
                            </Row>
                        </Col>
                        <Col span={8}>

                        </Col>
                        <Col span={8}>
                            <Row
                                style={{
                                    float: 'right',
                                    alignItems: 'center'
                                }}
                            >
                                <Button
                                    type="dashed" ghost
                                    onClick={() => {
                                        localStorage.setItem('isDark', !isDark)
                                        setIsDark(!isDark);
                                        window.location.reload()
                                    }}
                                    shape="circle"
                                    icon={isDark ? <Image
                                        width={25}
                                        src={sun}
                                        alt=""
                                        preview={false}
                                    /> : <Image
                                        width={25}
                                        src={moon}
                                        alt=""
                                        preview={false}
                                    />}
                                />
                                <Menu theme={"dark"} mode="horizontal" selectable={false}>
                                    <SubMenu key="SubMenu" title="Профиль">
                                            <Menu.Item
                                                key="setting:1"
                                                style={{
                                                    paddingRight: '25px'
                                                }}
                                                onClick={() => logout()}>Выход</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Row>
                        </Col>
                    </Row>
                </Layout.Header>
                :
                <Layout.Header>
                    <Menu theme={"dark"} mode="horizontal" selectable={false} style={{justifyContent: "end"}}>
                        <Menu.Item key="setting:1" onClick={() => router.push(routeNames.LOGIN)}>Логин</Menu.Item>
                        <Menu.Item key="setting:2"
                                   onClick={() => router.push(routeNames.REGISTRATION)}>Регистрация</Menu.Item>
                    </Menu>
                </Layout.Header>
            }
        </>
    );
};

export default HeaderMenu;