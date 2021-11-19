import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {Button, Drawer, Empty, Layout, Space, Spin, Table, Tooltip} from "antd";
import {EditOutlined, SyncOutlined} from "@ant-design/icons";
import RegistryDrawer from "./drawer/RegistryDrawer";

const columns = [
    {
        title: 'Тип оборудования',
        dataIndex: ['model', 'deviceType', 'name'],
        key: 'name',
    },
    {
        title: 'Производитель',
        dataIndex: ['model', 'firm', 'name'],
        key: 'name',
    },
    {
        title: 'Модель',
        dataIndex: ['model', 'name'],
        key: 'name',
    },
    {
        title: 'Инвентарный номер',
        dataIndex: ['invNumber'],
        key: 'invNumber',
    },
    {
        title: 'Расположение',
        dataIndex: ['location', 'name'],
        key: 'name',
    },
    {
        title: 'Сотрудник',
        dataIndex: ['user', 'lastName'],
        key: 'lastName',
    },
];

let selectRowData = [];

const Registry = () => {

    const {registryList, isLoading} = useSelector(state => state.registry)
    const {loadRegistry} = useActions()
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState([]);

    useEffect(() => {
        loadRegistry();
        // eslint-disable-next-line
    }, []);

    const editRecord = () => {
        // selectRowData = {...selectRowData, parent: selectRowData.parent};
        setSelectedRowKey([]);
        setDrawerVisible(true);
    }

    const closeDrawer = () => {
        setDrawerVisible(false);
    }

    const refresh = () => {
        loadRegistry();
        selectRowData = [];
        setSelectedRowKey([]);
    }

    const selectRow = (record) => {
        selectRowData = record;
        const selectedRowKey = [record.id];
        setSelectedRowKey(selectedRowKey);
    }

    const rowSelection = {
        selectedRowKeys,
        columnWidth: '1px',
        renderCell: () => "",
        hideSelectAll: true
    };

    return (
        <Layout id="main">
            <Spin tip="Получение данных..." spinning={isLoading}>
                <Space>
                    <Tooltip title="Редактировать">
                        <Button type="primary" icon={<EditOutlined/>} disabled={!selectedRowKeys.length}
                                onClick={() => editRecord()}/>
                    </Tooltip>
                    <Tooltip title="Обновить">
                        <Button type="primary" icon={<SyncOutlined/>}
                                onClick={() => refresh()}
                        />
                    </Tooltip>
                </Space>

                    <Table key="loading-done"
                           size="small"
                           locale={{
                               emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>
                           }}
                           columns={columns} dataSource={registryList} rowKey="id" bordered
                           rowSelection={rowSelection}
                           onRow={(record) => ({
                               onClick: () => {
                                   selectRow(record);
                               },
                           })}

                           scroll={{y: '100vh'}}
                           pagination={false}
                           style={{height: '95%'}}
                    />

                <Drawer
                    title="Добавить запись"
                    width={'100%'}
                    onClose={() => closeDrawer()}
                    visible={drawerVisible}
                    destroyOnClose={true}
                >
                    <RegistryDrawer closeDrawer={closeDrawer} values={selectRowData}/>
                </Drawer>

            </Spin>
        </Layout>
    );
};

export default Registry;