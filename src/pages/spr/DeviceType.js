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
];

let selectRowData = {};

const DeviceType = () => {

    const {deviceTypeList, isLoading} = useSelector(state => state.deviceType)
    const {loadDeviceType} = useActions()
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState([]);

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
    }

    const rowSelection = {
        selectedRowKeys,
        columnTitle: selectedRowKeys.length > 0 ? <div>XXX</div> : <></>,
        checkbox:false
        // getCheckboxProps: record => ({
        //
        //     disabled: record.disabled,
        //     visible: record.visible,
        // }),
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
                <Table columns={columns} dataSource={deviceTypeList} rowKey="id" pagination={false} scroll={{y:500}}
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
                    <DeviceTypeModal closeModal={closeModal} values={selectRowData}/>
                </Modal>
            </Spin>
        </Layout>
    );
};

export default DeviceType;