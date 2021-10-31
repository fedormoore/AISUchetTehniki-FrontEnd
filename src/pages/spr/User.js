import React, {useEffect, useState} from 'react';
import {Layout, Table, Button, Space, Tooltip, Modal} from 'antd';
import {PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined} from '@ant-design/icons';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import UserModal from "./modal/UserModal";

const columns = [
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Фамилия',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Имя',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Отчество',
        dataIndex: 'middleNames',
        key: 'middleNames',
    },
    {
        title: 'Телефон',
        dataIndex: 'telephone',
        key: 'telephone',
    },
];

const User = () => {

    const {info, error, userList, isLoading} = useSelector(state => state.user)
    const {loadUser, saveUser} = useActions()
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, []);

    const addNewEvent = (values) => {
        setModalVisible(false);
        saveUser(values);
    }

    return (
        <Layout>
            <Space>
                <Tooltip title="Добавить">
                    <Button type="primary" icon={<PlusOutlined/>} onClick={() => setModalVisible(true)}/>
                </Tooltip>
                <Tooltip title="Редактировать">
                    <Button type="primary" icon={<EditOutlined/>}/>
                </Tooltip>
                <Tooltip title="Удалить">
                    <Button type="primary" icon={<DeleteOutlined/>}/>
                </Tooltip>
                <Tooltip title="Обновить">
                    <Button type="primary" icon={<SyncOutlined/>}/>
                </Tooltip>
            </Space>
            <Table columns={columns} dataSource={userList} rowKey="id"/>
            <Modal
                title="Добавить запись"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <UserModal submit={addNewEvent}/>
            </Modal>
        </Layout>
    );
};

export default User;