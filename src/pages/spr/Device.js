import React, {useEffect, useState} from 'react';
import {Layout, Table, Button, Space, Tooltip, Modal, Empty, Spin} from 'antd';
import {PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined} from '@ant-design/icons';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import FirmModal from "./modal/FirmModal";
import ModelModal from "./modal/ModelModal";

const columnsFirm = [
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

const columnsModel = [
    {
        title: 'Тип оборудования',
        dataIndex: ['deviceType', 'name'],
        key: 'name',
    },
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
    },
];

let selectFirmRowData = {};
let selectModelRowData = {};

const Device = () => {

    const {firmList, isLoadingFirm, modelList, isLoadingModel} = useSelector(state => state.device)
    const {loadFirm, loadModel} = useActions()
    const [modalFirmVisible, setModalFirmVisible] = useState(false);
    const [modalModelVisible, setModalModelVisible] = useState(false);
    const [selectedFirmRowKeys, setSelectedFirmRowKey] = useState([]);
    const [selectedModelRowKeys, setSelectedModelRowKey] = useState([]);
    const [disableButtonEditDelete, setDisableButtonEditDelete] = useState(false);

    useEffect(() => {
        loadFirm();
        // eslint-disable-next-line
    }, []);

    const addFirmRecord = () => {
        selectFirmRowData = {};
        setSelectedFirmRowKey([]);
        setModalFirmVisible(true);
    }

    const editFirmRecord = () => {
        setModalFirmVisible(true);
    }

    const refreshFirm = () => {
        loadFirm();
        selectFirmRowData = {};
        setSelectedFirmRowKey([]);
    }

    const closeFirmModal = () => {
        setModalFirmVisible(false);
    }

    const selectFirmRow = (record) => {
        selectFirmRowData = record;
        const selectedRowKey = [record.id];
        setSelectedFirmRowKey(selectedRowKey);
        if (record.level === 'Global') {
            setDisableButtonEditDelete(true);
        } else {
            setDisableButtonEditDelete(false);
        }
        loadModel(record.id);
    }

    const rowFirmSelection = {
        selectedRowKeys: selectedFirmRowKeys,
        columnWidth: 0,
        renderCell: () => "",
        hideSelectAll: true
    };

    const addModelRecord = () => {
        selectModelRowData = {};
        setSelectedModelRowKey([]);
        setModalModelVisible(true);
    }

    const editModelRecord = () => {
        setModalModelVisible(true);
    }

    const closeModelModal = () => {
        setModalModelVisible(false);
    }

    const selectModelRow = (record) => {
        selectModelRowData = record;
        const selectedRowKey = [record.id];
        setSelectedModelRowKey(selectedRowKey);
    }

    const rowModelSelection = {
        selectedRowKeys: selectedModelRowKeys,
        columnWidth: 0,
        renderCell: () => "",
        hideSelectAll: true
    };

    return (
        <Layout>
            <Layout className="main">
                <Spin tip="Получение данных..." spinning={isLoadingFirm}>
                    <Space>
                        <Tooltip title="Добавить">
                            <Button type="primary" icon={<PlusOutlined/>} onClick={() => addFirmRecord()}/>
                        </Tooltip>
                        <Tooltip title="Редактировать">
                            <Button type="primary" icon={<EditOutlined/>}
                                    disabled={!selectedFirmRowKeys.length || disableButtonEditDelete}
                                    onClick={() => editFirmRecord()}/>
                        </Tooltip>
                        <Tooltip title="Удалить">
                            <Button type="primary" icon={<DeleteOutlined/>}
                                    disabled={!selectedFirmRowKeys.length || disableButtonEditDelete}/>
                        </Tooltip>
                        <Tooltip title="Обновить">
                            <Button type="primary" icon={<SyncOutlined/>}
                                    onClick={() => refreshFirm()}
                            />
                        </Tooltip>
                    </Space>
                    <Table size="small"
                           columns={columnsFirm} dataSource={firmList} rowKey="id"
                           locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>}}
                           rowSelection={rowFirmSelection}
                           onRow={(record) => ({
                               onClick: () => {
                                   selectFirmRow(record);
                               },
                           })}
                           scroll={{x: '100vh', y: '100vh'}}
                           pagination={false}
                           style={{height: '93%', width: '100%'}}
                    />
                    <Modal
                        title="Добавить запись"
                        visible={modalFirmVisible}
                        footer={null}
                        closable={false}
                        destroyOnClose={true}
                    >
                        <FirmModal closeModal={closeFirmModal} values={selectFirmRowData}/>
                    </Modal>
                </Spin>
            </Layout>

            <Layout className="main">
                <Spin tip="Получение данных..." spinning={isLoadingModel}>
                    <Space>
                        <Tooltip title="Добавить">
                            <Button type="primary" icon={<PlusOutlined/>} disabled={!selectedFirmRowKeys.length}
                                    onClick={() => addModelRecord()}
                            />
                        </Tooltip>
                        <Tooltip title="Редактировать">
                            <Button type="primary" icon={<EditOutlined/>} disabled={!selectedModelRowKeys.length}
                                    onClick={() => editModelRecord()}/>
                        </Tooltip>
                        <Tooltip title="Удалить">
                            <Button type="primary" icon={<DeleteOutlined/>} disabled={!selectedModelRowKeys.length}/>
                        </Tooltip>
                        <Tooltip title="Обновить">
                            <Button type="primary" icon={<SyncOutlined/>} disabled={!selectedFirmRowKeys.length}/>
                        </Tooltip>
                    </Space>
                    <Table size="small"
                           columns={columnsModel} dataSource={modelList} rowKey="id"
                           locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>}}
                           rowSelection={rowModelSelection}
                           onRow={(record) => ({
                               onClick: () => {
                                   selectModelRow(record);
                               },
                           })}
                           scroll={{x: '100vh', y: '100vh'}}
                           pagination={false}
                           style={{height: '93%', width: '100%'}}
                    />
                    <Modal
                        title="Добавить запись"
                        visible={modalModelVisible}
                        footer={null}
                        closable={false}
                        destroyOnClose={true}
                    >
                        <ModelModal closeModal={closeModelModal} parentRec={selectFirmRowData}
                                    values={selectModelRowData}/>
                    </Modal>
                </Spin>
            </Layout>
        </Layout>
    );
};

export default Device;