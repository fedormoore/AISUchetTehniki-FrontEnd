import React, {useEffect, useState} from 'react';
import {Layout, Table, Button, Space, Tooltip, Modal, Empty, Spin} from 'antd';
import {PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined} from '@ant-design/icons';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import CounterpartyModal from "./modal/CounterpartyModal";

const columns = [
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
        width: '170px',
    },
    {
        title: 'ИНН',
        dataIndex: 'inn',
        key: 'inn',
        width: '150px',
    },
    {
        title: 'Телефон',
        dataIndex: 'telephone',
        key: 'telephone',
        width: '150px',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        width: '150px',
    },
    {
        title: 'Контактное лицо',
        dataIndex: 'contact',
        key: 'contact',
        width: '100px',
    },
];

let selectRowData = {};

const Counterparty = () => {

    const {counterpartyList, isLoading} = useSelector(state => state.counterparty)
    const {loadCounterparty} = useActions()
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState([]);

    useEffect(() => {
        loadCounterparty();
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
        loadCounterparty();
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
        columnWidth: 0,
        renderCell: () => "",
        hideSelectAll: true
    };

    return (
        <Layout id="main">
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
                <Table size="small" columns={columns} dataSource={counterpartyList} rowKey="id" bordered
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
                    <CounterpartyModal closeModal={closeModal} values={selectRowData}/>
                </Modal>
            </Spin>
        </Layout>
    );
};

export default Counterparty;