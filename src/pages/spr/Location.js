import React, {useEffect, useState} from 'react';
import {Layout, Table, Button, Space, Tooltip, Modal, Empty, Spin} from 'antd';
import {PlusOutlined, SisternodeOutlined, EditOutlined, DeleteOutlined, SyncOutlined} from '@ant-design/icons';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import LocationModal from "./modal/LocationModal";

const columns = [
    {
        title: 'Тип',
        dataIndex: 'type',
        key: 'id',
    },
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'id',
    },
];

let selectRowData = {};
let selectParent = null;
let titleModal = 'Добавить страну';

const Location = () => {

    const {locationList, isLoading} = useSelector(state => state.location)
    const {loadLocation} = useActions()
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState([]);

    useEffect(() => {
        loadLocation();
        // eslint-disable-next-line
    }, []);

    const addRecord = () => {
        selectParent = null
        selectRowData = {};
        setSelectedRowKey([]);
        setModalVisible(true);
    }

    const addTreeRecord = () => {

        if (selectParent.type === 'country') {
            titleModal = 'Добавить субъект'
        }
        if (selectParent.type === 'subject') {
            titleModal = 'Добавить город'
        }
        if (selectParent.type === 'city') {
            titleModal = 'Добавить адрес'
        }
        if (selectParent.type === 'address') {
            titleModal = 'Добавить этаж'
        }
        if (selectParent.type === 'floor') {
            titleModal = 'Добавить кабинет'
        }

        selectRowData = {};
        setModalVisible(true);
    }

    const editRecord = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const refresh = () => {
        loadLocation();
        selectParent = null
        selectRowData = {};
        setSelectedRowKey([]);
    }

    const selectRow = (record) => {
        selectParent = record;
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
                    <Tooltip title="Добавить в состав">
                        <Button type="primary" icon={<SisternodeOutlined/>} disabled={!selectedRowKeys.length}
                                onClick={() => addTreeRecord()}/>
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
                <Table columns={columns} dataSource={locationList} rowKey="id" bordered
                       locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>}}
                       childrenColumnName={"locations"}
                       rowSelection={rowSelection}
                       onRow={(record) => ({
                           onClick: () => {
                               selectRow(record);
                           },
                       })}
                />
                <Modal
                    title={titleModal}
                    visible={modalVisible}
                    footer={null}
                    closable={false}
                    destroyOnClose={true}
                >
                    <LocationModal closeModal={closeModal} parent={selectParent} values={selectRowData}/>
                </Modal>
            </Spin>
        </Layout>
    );
};

export default Location;