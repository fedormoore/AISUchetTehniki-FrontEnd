import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {Button, Drawer, Empty, Input, Layout, Space, Spin, Table, Tooltip} from "antd";
import {EditOutlined, FilterOutlined, SyncOutlined} from "@ant-design/icons";
import RegistryDrawer from "./drawer/RegistryDrawer";

import get from "lodash.get";

const columns = [
    {
        title: 'Тип оборудования',
        dataIndex: ['model', 'deviceType', 'name'],
        key: ['model', 'deviceType', 'name'],
        width: '190px',
    },
    {
        title: 'Производитель',
        dataIndex: ['model', 'firm', 'name'],
        key: ['model', 'firm', 'name'],
        width:'140px'
    },
    {
        title: 'Модель',
        dataIndex: ['model', 'name'],
        key: ['model', 'name'],
        width:'250px'
    },
    {
        title: 'Инвентарный номер',
        dataIndex: ['invNumber'],
        key: 'invNumber',
        width:'160px'
    },
    {
        title: 'Расположение',
        dataIndex: ['location', 'name'],
        key: ['location', 'name'],
        width:'120px'
    },
    {
        title: 'Сотрудник',
        dataIndex: ['user', 'lastName'],
        key: 'lastName',
        width:'100px'
    },
    {
        title: 'Бюджетный счет',
        dataIndex: ['budgetAccount', 'name'],
        key: 'name',
        width:'160px'
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
    const [selectedRowKeys, setSelectedRowKey] = useState(null);
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
        setSelectedRowKey(null);
        setDrawerVisible(false);
    }

    const refresh = () => {
        loadRegistry();
        selectRowData = [];
        setSelectedRowKey(null);
    }

    const selectRow = (record, index) => {
        selectRowData = record;
        setSelectedRowKey(index);
    }

    const mergedColumns = columns.map((col) => {
        return (
            <Table.ColumnGroup
                title={col.title}
                dataIndex={col.dataIndex}
                key={col.dataIndex}
                width={col.width}>
                {isFilter &&
                <Table.Column
                    width={col.width}
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
                <Space style={{background:'#0091EA', padding:'5px', borderTopLeftRadius:'5px', borderTopRightRadius:'5px'}}>
                    <Tooltip title="Редактировать">
                        <Button type="dashed" ghost icon={<EditOutlined/>} disabled={selectedRowKeys===null}
                                onClick={() => editRecord()}/>
                    </Tooltip>
                    <Tooltip title="Обновить">
                        <Button type="dashed" ghost icon={<SyncOutlined/>}
                                onClick={() => refresh()}
                        />
                    </Tooltip>
                    <Tooltip title="Фильтр">
                        <Button type="dashed" ghost icon={<FilterOutlined/>}
                                onClick={() => {
                                    setIsFilter(!isFilter);
                                    setSearchText({});
                                }}
                        />
                    </Tooltip>
                </Space>
                <Layout className="main">
                    <Table
                        size="small"
                        locale={{
                            emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>
                        }}
                        rowClassName={(record, index) => index === selectedRowKeys ? 'row-select':index % 2 ? 'row0':'row1'}
                        dataSource={registryList}
                        rowKey="id"
                        bordered
                        onRow={(record, index) => ({
                            onClick: (e) => {
                                selectRow(record, index);
                            },
                            onDoubleClick: event => {
                                editRecord()
                            },
                            onContextMenu: event => {
                                console.log(3)
                            },
                        })}
                        scroll={{x: '100vh', y: '100vh'}}
                        // pagination={false}
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