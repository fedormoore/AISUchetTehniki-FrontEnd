import React, {useEffect, useState} from 'react';
import {Layout, Table, Button, Space, Tooltip, Modal, Empty, Spin} from 'antd';
import {PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined} from '@ant-design/icons';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import DeviceTypeModal from "./modal/DeviceTypeModal";

const columns = [
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Уровень',
        dataIndex: 'level',
        key: 'level',
    },
];

let selectRowData = {};

const DeviceType = () => {

    const {deviceTypeList, isLoading} = useSelector(state => state.deviceType)
    const {loadDeviceType} = useActions()
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState([]);
    const [disableButtonEditDelete, setDisableButtonEditDelete] = useState(false);

    useEffect(() => {
        loadDeviceType();
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
        loadDeviceType();
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
        if (record.level === 'Global') {
            setDisableButtonEditDelete(true);
        } else {
            setDisableButtonEditDelete(false);
        }
    }

    const rowSelection = {
        selectedRowKeys,
        columnWidth: 0,
        renderCell: () => "",
        hideSelectAll:true
    };

    return (
        <Layout id="main">
            <Spin tip="Получение данных..." spinning={isLoading}>
                <Space>
                    <Tooltip title="Добавить">
                        <Button type="primary" icon={<PlusOutlined/>}
                                onClick={() => addRecord()}/>
                    </Tooltip>
                    <Tooltip title="Редактировать">
                        <Button type="primary" icon={<EditOutlined/>} disabled={!selectedRowKeys.length || disableButtonEditDelete}
                                onClick={() => editRecord()}/>
                    </Tooltip>
                    <Tooltip title="Удалить">
                        <Button type="primary" icon={<DeleteOutlined/>} disabled={!selectedRowKeys.length || disableButtonEditDelete}/>
                    </Tooltip>
                    <Tooltip title="Обновить">
                        <Button type="primary" icon={<SyncOutlined/>}
                                onClick={() => refresh()}
                        />
                    </Tooltip>
                </Space>
                <Table size="small"
                       columns={columns} dataSource={deviceTypeList} rowKey="id"
                       locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>}}
                       rowSelection={rowSelection}
                       onRow={(record) => ({
                           onClick: () => {
                               selectRow(record);
                           },
                       })}
                       scroll={{x:'100vh', y: '100vh'}}
                       pagination={false}
                       style={{height:'95%', width:'100%'}}
                />
                <Modal
                    title="Добавить запись"
                    visible={modalVisible}
                    footer={null}
                    closable={false}
                    destroyOnClose={true}
                >
                    <DeviceTypeModal closeModal={closeModal} values={selectRowData}/>
                </Modal>
            </Spin>
        </Layout>
    );
};

export default DeviceType;