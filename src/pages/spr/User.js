import React, {useEffect, useState} from 'react';
import {Layout, Table, Button, Space, Tooltip, Modal, Empty, Spin} from 'antd';
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

let selectRowData = {};

const User = () => {

    const {userList, isLoading} = useSelector(state => state.user)
    const {loadUser} = useActions()
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState([]);

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    const addRecord = () => {
        selectRowData = {};
        setSelectedRowKey([]);
        setModalVisible(true);
    }

    const editRecord = () => {
        setModalVisible(true);
    }

    const refresh = () => {
        loadUser();
        selectRowData = {};
        setSelectedRowKey([]);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const selectRow = (record) => {
        selectRowData = record;
        const selectedRowKey = [record.id];
        setSelectedRowKey(selectedRowKey);
    }

    const rowSelection = {
        selectedRowKeys
    };

    return (
        <Layout>
            <Spin tip="Получение данных..." spinning={isLoading}>
                <Space>
                    <Tooltip title="Добавить">
                        <Button type="primary" icon={<PlusOutlined/>} onClick={() => addRecord()}/>
                    </Tooltip>
                    <Tooltip title="Редактировать">
                        <Button type="primary" icon={<EditOutlined/>} disabled={!selectedRowKeys.length}
                                onClick={() => editRecord()}/>
                    </Tooltip>
                    <Tooltip title="Удалить">
                        <Button type="primary" icon={<DeleteOutlined/>} disabled={!selectedRowKeys.length}/>
                    </Tooltip>
                    <Tooltip title="Обновить">
                        <Button type="primary" icon={<SyncOutlined/>}
                                onClick={() => refresh()}
                        />
                    </Tooltip>
                </Space>
                <Table columns={columns} dataSource={userList} rowKey="id" bordered
                       locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>}}
                       rowSelection={rowSelection}
                       onRow={(record) => ({
                           onClick: () => {
                               selectRow(record);
                           },
                       })}
                />
                <Modal
                    title="Добавить запись"
                    visible={modalVisible}
                    footer={null}
                    closable={false}
                    destroyOnClose={true}
                >
                    <UserModal closeModal={closeModal} values={selectRowData}/>
                </Modal>
            </Spin>
        </Layout>
    );
};

export default User;