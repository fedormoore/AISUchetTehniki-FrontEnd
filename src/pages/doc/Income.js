import React, {useEffect, useState} from 'react';
import {Button, Col, Drawer, Empty, Input, Row, Space, Spin, Table, Tooltip} from 'antd';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {DeleteOutlined, EditOutlined, PlusOutlined, SyncOutlined} from "@ant-design/icons";
import IncomeDrawer from "./drawer/IncomeDrawer";
import moment from "moment";

const columnsMain = [
    {
        title: 'Статус',
        dataIndex: ['executed'],
        key: 'executed',
        width: 150,
        className: 'cellPadding',
        render: (text, row, index) => {
            if (text) {
                return (
                    <div style={{
                        padding: '0px',
                        background: "#77c383",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        height: '100%'
                    }}>
                        <Row>
                            <Col span={24}>Документ проведен</Col>
                            <Col span={24}>{moment(row.dataExecuted).format("DD.MM.YYYY")}</Col>
                        </Row>
                    </div>
                )
            } else {
                return (
                    <div style={{
                        background: "#d1d2d1",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        height: '100%'
                    }}>Черновик</div>
                )
            }
        },
    },
    {
        title: 'Реквизиты документа',
        key: 'detailsDocument',
        width: 200,
        render: (text, row, index) => {
            return (
                <Row>
                    <Col span={24}>№ {row.numberDoc}</Col>
                    <Col span={24}>Дата {moment(row.dataDoc).format("DD.MM.YYYY")}</Col>
                </Row>
            )
        }
    },
    {
        title: 'Реквизиты контракта',
        key: 'detailsContract',
        render: (text, row, index) => {
            return (
                <Row>
                    <Col span={24}>№ {row.numberCon}</Col>
                    <Col span={24}>Дата {moment(row.dataCon).format("DD.MM.YYYY")}</Col>
                    <Col span={24}>Сумма {row.sumCon}</Col>
                    <Col span={24}>Поставщик {row.counterparty.name}</Col>
                </Row>
            )
        }
    }
];

let selectRowData = [];

const columnsSubs = [
    {
        title: 'Тип оборудования',
        dataIndex: ['model', 'deviceType', 'name'],
        key: 'name',
        width: 150,
    },
    {
        title: 'Производитель',
        dataIndex: ['model', 'firm', 'name'],
        key: 'name',
        width: 150,
    },
    {
        title: 'Модель',
        dataIndex: ['model', 'name'],
        key: 'name',
        width: 150,
    },
    {
        title: 'Количество',
        dataIndex: 'count',
        key: 'count',
        width: 150,
    },
    {
        title: 'Стоимость',
        dataIndex: 'sum',
        key: 'sum',
        width: 150,
    },
];

const Income = () => {

    const [height, setHeight] = useState(window.innerHeight - 118);

    const [selectedRowKeys, setSelectedRowKey] = useState(null);

    const [isFilter, setIsFilter] = useState(false);
    const [searchText, setSearchText] = useState({});

    const [disableButtonEditDelete, setDisableButtonEditDelete] = useState(false);

    const {incomeList, isLoading} = useSelector(state => state.income)
    const {loadIncome} = useActions()

    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        let a = () => setHeight(window.innerHeight - 118);
        window.addEventListener('resize', a);
        return () => {
            window.removeEventListener('resize', a);
        };
    }, [height]);

    useEffect(() => {
        if (incomeList.length === 0) {
            loadIncome();
        }
        // eslint-disable-next-line
    }, []);

    const addRecord = () => {
        selectRowData = {docSubs: []};
        setDrawerVisible(true);
    }

    const editRecord = () => {
        if (!disableButtonEditDelete) {
            setDrawerVisible(true);
        }
    }

    const refresh = () => {
        setSelectedRowKey(null);
        selectRowData = [];
        loadIncome();
    }

    const selectRow = (record, index) => {
        selectRowData = record;
        setSelectedRowKey(index);

        if (record.executed) {
            setDisableButtonEditDelete(true);
        } else {
            setDisableButtonEditDelete(false);
        }
    }

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    const mergedColumns = columnsMain.map((col) => {
        return (
            <Table.ColumnGroup
                title={col.title}
                dataIndex={col.dataIndex}
                key={col.key}
                render={col.render}
                width={col.width}
            >
                {isFilter &&
                <Table.Column
                    title={(
                        <Input size="small" onChange={(event) => {
                            setSearchText({...searchText, text: event.target.value});
                        }}/>
                    )}
                    key={col.key}
                    render={col.render}
                    width={col.width}

                    filteredValue={searchText.hasOwnProperty("text") ? [searchText.text] : []}
                    onFilter={(value, record) => {
                        console.log({...record})
                        return record ? record.toString().toLowerCase().includes(searchText.text.toLowerCase()) : '';
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
                    <Col span={12}>
                        <Space>
                            <Tooltip title="Добавить">
                                <Button type="dashed" ghost icon={<PlusOutlined/>} onClick={() => addRecord()}/>
                            </Tooltip>
                            <Tooltip title="Редактировать">
                                <Button type="dashed" ghost icon={<EditOutlined/>}
                                        disabled={selectedRowKeys === null || disableButtonEditDelete}
                                        onClick={() => editRecord()}/>
                            </Tooltip>
                            <Tooltip title="Удалить">
                                <Button type="dashed" ghost icon={<DeleteOutlined/>}
                                        disabled={selectedRowKeys === null || disableButtonEditDelete}/>
                            </Tooltip>
                            <Tooltip title="Обновить">
                                <Button type="dashed" ghost icon={<SyncOutlined/>}
                                        onClick={() => refresh()}
                                />
                            </Tooltip>
                        </Space>
                    </Col>
                    <Col span={12}>
                        {/*{pagin()}*/}
                    </Col>
                </Row>
            </div>
            <Table
                size="small"
                rowKey="id"
                bordered
                locale={{
                    emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      description="Нет данных"/>
                }}
                rowClassName={(record, index) => index === selectedRowKeys ? 'row-select' : index % 2 ? 'row0' : 'row1'}
                dataSource={incomeList}
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
                expandable={{
                    expandedRowRender: record => (
                        <Table key="loading-done"
                               size="small"
                               locale={{
                                   emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                     description="Нет данных"/>
                               }}
                               columns={columnsSubs} dataSource={record.docSubs}
                               rowKey="id" bordered
                               defaultExpandAllRows={true}
                               pagination={false}
                        />)
                    ,
                    // rowExpandable: record => record.name !== 'Not Expandable',
                }}
                scroll={{x: 'max-content', y: 'max-content'}}
                pagination={{defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: false}}

                style={{
                    maxHeight: `${height}px`,
                    minHeight: `${height}px`
                }}
            >
                {mergedColumns}
            </Table>
            <Drawer
                title="Добавить запись"
                width={'100%'}
                onClose={() => closeDrawer()}
                visible={drawerVisible}
                // bodyStyle={{paddingBottom: 80}}
                destroyOnClose={true}
            >
                <IncomeDrawer closeModal={() => closeDrawer()} values={selectRowData}/>
            </Drawer>
        </Spin>
    );

};

export default Income;