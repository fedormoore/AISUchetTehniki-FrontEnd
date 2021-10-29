import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const LeftMenu = () => {
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default LeftMenu;