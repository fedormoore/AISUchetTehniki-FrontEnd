import React from 'react';

import {Layout, Menu} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {routeNames} from "../routes";

const LeftMenu = () => {

    const {isAuth} = useSelector(state => state.auth)
    const {isVisibleLeftMenu} = useSelector(state => state.app)
    const router = useHistory();

    return (
        <>
            {
                isAuth &&
                <Layout.Sider trigger={null} collapsible collapsed={isVisibleLeftMenu}>
                    <Menu
                        mode="inline"
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.SubMenu key="sub1" icon={<UserOutlined/>} title="Справочник">
                            <Menu.Item key="1" onClick={() => router.push(routeNames.LOCATION)}>Адреса и кабинеты</Menu.Item>
                            <Menu.Item key="2" onClick={() => router.push(routeNames.USER)}>Сотрудники</Menu.Item>
                            <Menu.Item key="3" onClick={() => router.push(routeNames.DEVICE_TYPE)}>Тип оборудования</Menu.Item>
                            <Menu.Item key="4" onClick={() => router.push(routeNames.DEVICE)}>Оборудования</Menu.Item>
                            <Menu.Item key="5" onClick={() => router.push(routeNames.COUNTERPARTY)}>Контрагенты</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub2" icon={<LaptopOutlined/>} title="Документы">
                            <Menu.Item key="6" onClick={() => router.push(routeNames.INCOME)}>Поступления</Menu.Item>
                            <Menu.Item key="7">Списать</Menu.Item>
                            <Menu.Item key="8">Утилизировать</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="9">Реестр оборудования</Menu.Item>
                        <Menu.SubMenu key="sub3" icon={<NotificationOutlined/>} title="Отчеты">
                            <Menu.Item key="10">Генерация штрих-кодов</Menu.Item>
                            <Menu.Item key="11" onClick={() => router.push(routeNames.REPORT_USER)}>Сотрудники</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Sider>
            }
        </>
    );
};

export default LeftMenu;