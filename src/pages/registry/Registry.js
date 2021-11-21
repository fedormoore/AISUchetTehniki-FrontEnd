import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {Button, Drawer, Empty, Input, Layout, Space, Spin, Table, Tooltip} from "antd";
import {EditOutlined, SyncOutlined, SearchOutlined} from "@ant-design/icons";
import RegistryDrawer from "./drawer/RegistryDrawer";

import get from "lodash.get";

const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
        return (
            <>
                <Input
                    autoFocus
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({closeDropdown: false});
                    }}
                    onPressEnter={() => {
                        confirm();
                    }}
                    onBlur={() => {
                    }}
                ></Input>
                <Button
                    onClick={() => {
                        confirm();
                    }}
                    type="primary"
                >
                    Поиск
                </Button>
                <Button
                    onClick={() => {
                        clearFilters();
                    }}
                    type="primary"
                >
                    Очистить
                </Button>
            </>
        )
    },
    filterIcon: () => {
        return <SearchOutlined/>
    },
    onFilter: (value, record) => {
        return get(record, dataIndex) ? get(record, dataIndex).toString().toLowerCase().includes(value.toLowerCase()) : '';
    }
})

const FilterByNameInput = (
    (
        <div>
            <div>Name</div>
            <Input/>
        </div>
    )
);

const columns = [
    {
        title: FilterByNameInput,
        dataIndex: ['model', 'deviceType', 'name'],
        key: ['model', 'deviceType', 'name'],
        ...getColumnSearchProps(['model', 'deviceType', 'name'])
    },
    {
        title: 'Производитель',
        dataIndex: ['model', 'firm', 'name'],
        key: ['model', 'firm', 'name'],
        ...getColumnSearchProps(['model', 'firm', 'name'])
    },
    {
        title: 'Модель',
        dataIndex: ['model', 'name'],
        key: ['model', 'name'],
        ...getColumnSearchProps(['model', 'name'])
    },
    {
        title: 'Инвентарный номер',
        dataIndex: ['invNumber'],
        key: 'invNumber',
        ...getColumnSearchProps('invNumber')
    },
    {
        title: 'Расположение',
        dataIndex: ['location', 'name'],
        key: ['location', 'name'],
        ...getColumnSearchProps(['location', 'name'])
    },
    {
        title: 'Сотрудник',
        dataIndex: ['user', 'lastName'],
        key: 'lastName',
        ...getColumnSearchProps(['user', 'lastName'])
    },
    {
        title: 'Бюджетный счет',
        dataIndex: ['budgetAccount', 'name'],
        key: 'name',
        ...getColumnSearchProps(['budgetAccount', 'name'])
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
        setDrawerVisible(true);
    }

    const closeDrawer = () => {
        setSelectedRowKey([]);
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

                <div style={{height: '97%', width: '100%'}} onDoubleClick={() => editRecord()}>
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
                           scroll={{x: '100vh', y: '100vh'}}
                           pagination={false}
                           style={{height: '100%', width: '100%'}}
                    />
                </div>
                <Drawer
                    title={selectRowData.length !== 0 ? selectRowData.model.deviceType.name + " " + selectRowData.model.firm.name + " " + selectRowData.model.name : null}
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