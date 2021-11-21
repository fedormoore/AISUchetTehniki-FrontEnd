import React, {useEffect, useState} from 'react';
import {Layout, Table, Button, Space, Tooltip, Modal, Empty, Spin} from 'antd';
import {PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined} from '@ant-design/icons';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import UserModal from "./modal/UserModal";
import BudgetAccountModal from "./modal/BudgetAccountModal";

const columns = [
    {
        title: 'Код',
        dataIndex: 'code',
        key: 'code',
        width: '170px',
    },
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
        width: '150px',
    }
];

let selectRowData = {};

const BudgetAccount = () => {

    const {budgetAccountList, isLoading} = useSelector(state => state.budgetAccount)
    const {loadBudgetAccount} = useActions()
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState([]);

    useEffect(() => {
        loadBudgetAccount();
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
        loadBudgetAccount();
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
                <Table size="small"
                       columns={columns} dataSource={budgetAccountList} rowKey="id" bordered
                       locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>}}
                       rowSelection={rowSelection}
                       onRow={(record) => ({
                           onClick: () => {
                               selectRow(record);
                           }
                       })}
                       scroll={{x: '100vh', y: '100vh'}}
                       pagination={false}
                       style={{height: '95%', width: '100%'}}
                       rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                />
                <Modal
                    title="Добавить запись"
                    visible={modalVisible}
                    footer={null}
                    closable={false}
                    destroyOnClose={true}
                >
                    <BudgetAccountModal closeModal={closeModal} values={selectRowData}/>
                </Modal>
            </Spin>
        </Layout>
    );
};

export default BudgetAccount;