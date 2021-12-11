import React from 'react';

import {Layout, Menu} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {routeNames} from "../routes";

const SiderMenu = () => {

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
                            <Menu.Item key="10" onClick={() => router.push(routeNames.LOCATION)}>Адреса и кабинеты</Menu.Item>
                            <Menu.Item key="11" onClick={() => router.push(routeNames.USER)}>Сотрудники</Menu.Item>
                            <Menu.Item key="12" onClick={() => router.push(routeNames.DEVICE_TYPE)}>Тип оборудования</Menu.Item>
                            <Menu.Item key="13" onClick={() => router.push(routeNames.DEVICE)}>Оборудования</Menu.Item>
                            <Menu.Item key="14" onClick={() => router.push(routeNames.COUNTERPARTY)}>Контрагенты</Menu.Item>
                            <Menu.Item key="15" onClick={() => router.push(routeNames.BUDGET_ACCOUNT)}>Учетный счет бюджета</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub2" icon={<LaptopOutlined/>} title="Документы">
                            <Menu.Item key="20" onClick={() => router.push(routeNames.INCOME)}>Поступления</Menu.Item>
                            <Menu.Item key="21">Списать</Menu.Item>
                            <Menu.Item key="22">Утилизировать</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="100" onClick={() => router.push(routeNames.REGISTRY)}>Реестр оборудования</Menu.Item>
                        <Menu.SubMenu key="sub3" icon={<NotificationOutlined/>} title="Отчеты">
                            <Menu.Item key="30">Генерация штрих-кодов</Menu.Item>
                            <Menu.Item key="31" onClick={() => router.push(routeNames.REPORT_LOCATION_REGISTRY)}>Оборудование по кабинетам</Menu.Item>
                            <Menu.Item key="32" onClick={() => router.push(routeNames.REPORT_USER)}>Сотрудники</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Sider>
            }
        </>
    );
};

export default SiderMenu;