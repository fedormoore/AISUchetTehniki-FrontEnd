import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {Button, Col, Drawer, Empty, Input, Pagination, Row, Space, Spin, Table, Tooltip} from "antd";
import {EditOutlined, FilterOutlined, SyncOutlined} from "@ant-design/icons";
import RegistryDrawer from "./drawer/RegistryDrawer";

import get from "lodash.get";

const columns = [
    {
        title: 'Тип оборудования',
        dataIndex: ['model', 'deviceType', 'name'],
        key: ['model', 'deviceType', 'name'],
        type: 'string',
        width: '190px',
    },
    {
        title: 'Производитель',
        dataIndex: ['model', 'firm', 'name'],
        key: ['model', 'firm', 'name'],
        type: 'string',
        width: '140px'
    },
    {
        title: 'Модель',
        dataIndex: ['model', 'name'],
        key: ['model', 'name'],
        type: 'string',
        width: '250px'
    },
    {
        title: 'Инвентарный номер',
        dataIndex: ['invNumber'],
        key: 'invNumber',
        type: 'integer',
        width: '160px'
    },
    {
        title: 'Расположение',
        dataIndex: ['location', 'name'],
        key: ['location', 'name'],
        type: 'string',
        width: '120px'
    },
    {
        title: 'Сотрудник',
        dataIndex: ['user', 'lastName'],
        key: 'lastName',
        type: 'string',
        width: '100px'
    },
    {
        title: 'Бюджетный счет',
        dataIndex: ['budgetAccount', 'name'],
        key: 'name',
        type: 'string',
        width: '160px'
    },
];

let selectRowData = [];

const Registry = () => {

    const [height, setHeight] = useState(window.innerHeight - 118);

    const {registryList, isLoading} = useSelector(state => state.registry)
    const {loadRegistry} = useActions()
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState(null);
    const [isFilter, setIsFilter] = useState(false);
    const [searchText, setSearchText] = useState({});
    const [pagin, setPagin] = useState({
        offset: 0,
        currentPageElements: [],
        elementsPerPage: 20,
        pagesCount: 1,
        allElements: [],
        totalElementsCount: 0
    });
    const [allElements, setAllElements] = useState({});

    useEffect(() => {
        let a = () => setHeight(window.innerHeight - 118);
        window.addEventListener('resize', a);
        return () => {
            window.removeEventListener('resize', a);
        };
    }, [height]);

    useEffect(() => {
        (async function () {
            const result = await loadRegistry();
            if (result.isOk) {
                const allElements = result.data;
                const totalElementsCount = result.data.length;
                const pagesCount= Math.ceil(totalElementsCount / pagin.elementsPerPage)
                const currentPageElements = allElements.slice(pagin.offset, pagin.offset + pagin.elementsPerPage);
                setPagin({...pagin, currentPageElements: currentPageElements})
            }
        })();
        // loadRegistry();
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
                showSorterTooltip={false}
                sorter={(a, b) => {
                    if (a && get(a, col.dataIndex) && get(a, col.dataIndex).length && b && get(b, col.dataIndex) && get(b, col.dataIndex) && get(b, col.dataIndex).length) {
                        if (col.type === 'string') {
                            return get(a, col.dataIndex).length - get(b, col.dataIndex).length;
                        } else {
                            return get(a, col.dataIndex) - get(b, col.dataIndex);
                        }
                    } else if (a && get(a, col.dataIndex) && get(a, col.dataIndex).length) {
                        return -1;
                    } else if (b && get(b, col.dataIndex) && get(b, col.dataIndex).length) {
                        return 1;
                    }
                    return 0;
                }}
                width={col.width}
            >
                {isFilter &&
                <Table.Column
                    width={col.width}
                    title={(
                        <Input size="small" onChange={(event) => {
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
        <Spin tip="Получение данных..." spinning={isLoading}>
            <div className='panelButtonTable'>
                <Row>
                    <Col span={16}>
                        <Space>
                            <Tooltip title="Редактировать">
                                <Button type="dashed" ghost icon={<EditOutlined/>}
                                        disabled={selectedRowKeys === null}
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
                    </Col>
                    <Col span={8}>
                        <Pagination
                            style={{
                                float: 'right',
                            }}
                            defaultCurrent={1} defaultPageSize={20} showSizeChanger={false} total={registryList.length}
                            onChange={(page, pageSize) => {
                                console.log(page)
                                setPagin(page);
                            }}/>
                    </Col>
                </Row>
            </div>
            <Table
                size="small"
                locale={{
                    emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      description="Нет данных"/>
                }}
                rowClassName={(record, index) => index === selectedRowKeys ? 'row-select' : index % 2 ? 'row0' : 'row1'}
                dataSource={registryList.slice(0, 0 + 20)}
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
                scroll={{x: 'max-content', y: 'max-content'}}
                // pagination={{defaultCurrent: 2, defaultPageSize: 20, showSizeChanger: false}}
                pagination={false}
                style={{maxHeight: `${height}px`}}
            >
                {mergedColumns}
            </Table>

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
    );
};

export default Registry;