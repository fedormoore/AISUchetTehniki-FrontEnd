import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {Button, Drawer, Empty, Input, Layout, Space, Spin, Table, Tooltip} from "antd";
import {EditOutlined, SyncOutlined, FilterOutlined} from "@ant-design/icons";
import RegistryDrawer from "./drawer/RegistryDrawer";

import get from "lodash.get";

const columns = [
    {
        title: 'Тип оборудования',
        dataIndex: ['model', 'deviceType', 'name'],
        key: ['model', 'deviceType', 'name'],
        width: '160px',
    },
    {
        title: 'Производитель',
        dataIndex: ['model', 'firm', 'name'],
        key: ['model', 'firm', 'name'],
        // width:'100px'
    },
    {
        title: 'Модель',
        dataIndex: ['model', 'name'],
        key: ['model', 'name'],
        // width:'100px'
    },
    {
        title: 'Инвентарный номер',
        dataIndex: ['invNumber'],
        key: 'invNumber',
        // width:'100px'
    },
    {
        title: 'Расположение',
        dataIndex: ['location', 'name'],
        key: ['location', 'name'],
        // width:'100px'
    },
    {
        title: 'Сотрудник',
        dataIndex: ['user', 'lastName'],
        key: 'lastName',
        // width:'100px'
    },
    {
        title: 'Бюджетный счет',
        dataIndex: ['budgetAccount', 'name'],
        key: 'name',
        // filteredValue: searchText.hasOwnProperty('budgetAccount') ? [searchText.budgetAccount] : [],
        // onFilter: (value, record) => {
        //     return get(record, ['budgetAccount', 'name']) ? get(record, ['budgetAccount', 'name']).toString().toLowerCase().includes(searchText.budgetAccount.toLowerCase()) : '';
        // },
        // width:'100px'
    },
];

let selectRowData = [];

const Registry = () => {

    const {registryList, isLoading} = useSelector(state => state.registry)
    const {loadRegistry} = useActions()
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [searchText, setSearchText] = useState({});

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

    const mergedColumns = columns.map((col) => {
        return (
            <Table.ColumnGroup
                title={col.title}
                dataIndex={col.dataIndex}
                key={col.dataIndex}>

                {isFilter &&
                <Table.Column
                    title={(
                        <Input onChange={(event) => {
                            setSearchText({...searchText, [col.dataIndex]: event.target.value});
                        }}/>
                    )}
                    dataIndex={col.dataIndex}
                    key={col.dataIndex}
                    filteredValue={searchText.hasOwnProperty([col.dataIndex]) ? [searchText[col.dataIndex]] : []}
                    onFilter={(value, record) => {
                        return get(record, col.dataIndex) ? get(record, col.dataIndex).toString().toLowerCase().includes(searchText[col.dataIndex].toLowerCase()) : '';
                    }}
                />
                }
            </Table.ColumnGroup>
        );
    });

    return (
        <Layout>
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
                    <Tooltip title="Фильтр">
                        <Button type="primary" icon={<FilterOutlined/>}
                                onClick={() => setIsFilter(!isFilter)}
                        />
                    </Tooltip>
                </Space>
                <Layout className="main">
                    <Table
                        size="small"
                        locale={{
                            emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>
                        }}
                        // columns={columns}
                        dataSource={registryList}
                        rowKey="id"
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record) => ({
                            onClick: () => {
                                selectRow(record);
                            },
                            onDoubleClick: event => {
                                editRecord()
                            },
                            onContextMenu: event => {
                                console.log(3)
                            },
                        })}
                        scroll={{x: '100vh', y: '100vh'}}
                        pagination={false}
                        style={{height: '100', width: '100%'}}
                    >
                        {mergedColumns}
                    </Table>
                </Layout>
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