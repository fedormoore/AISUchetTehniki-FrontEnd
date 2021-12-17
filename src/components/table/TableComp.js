import React, {useEffect, useState} from 'react';
import {Button, Col, Empty, Input, Row, Space, Table, Tooltip} from "antd";
import get from "lodash.get";
import {DeleteOutlined, EditOutlined, FilterOutlined, PlusOutlined, SyncOutlined} from "@ant-design/icons";

const TableComp = (props) => {

    const columns = props.columns;
    const dataSource = props.dataSource;
    const addRecord = props.addRecord;
    const selectRecord = props.selectRecord;
    const editRecord = props.editRecord;
    const deletedRecord = props.deletedRecord;
    const refresh = props.refreshRecords;
    const he = props.height;

    const [height, setHeight] = useState(window.innerHeight - 118);

    const [selectedRowKeys, setSelectedRowKey] = useState(null);

    const [isFilter, setIsFilter] = useState(false);
    const [searchText, setSearchText] = useState({});

    const [disableButtonEditDelete, setDisableButtonEditDelete] = useState(false);

    useEffect(() => {
        let a = () => setHeight(window.innerHeight - 118);
        window.addEventListener('resize', a);
        return () => {
            window.removeEventListener('resize', a);
        };
    }, [height]);

    const mergedColumns = columns.map((col) => {
        return (
            <Table.ColumnGroup
                title={col.title}
                dataIndex={col.dataIndex}
                key={col.dataIndex}
                showSorterTooltip={false}
                sorter={(a, b) => {
                    if (a && get(a, col.dataIndex) && get(a, col.dataIndex).length && b && get(b, col.dataIndex) && get(b, col.dataIndex) && get(b, col.dataIndex).length) {
                        return get(a, col.dataIndex).length - get(b, col.dataIndex).length;
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

    const addButtonVisible = () => {
        if (addRecord !== undefined) {
            return (
                <Tooltip title="Добавить">
                    <Button type="dashed" ghost icon={<PlusOutlined/>}
                            onClick={() => addRecord()}/>
                </Tooltip>
            )
        }
    }

    const deletedButtonVisible = () => {
        if (deletedRecord !== undefined) {
            return (
                <Tooltip title="Удалить">
                    <Button type="dashed" ghost icon={<DeleteOutlined/>}
                            disabled={selectedRowKeys === null || disableButtonEditDelete}
                            onClick={() => deletedRecord()}
                    />
                </Tooltip>
            )
        }
    }

    const selectRow = (record, index) => {
        selectRecord(record);
        setSelectedRowKey(index);

        if (record.level === 'Global') {
            setDisableButtonEditDelete(true);
        } else {
            setDisableButtonEditDelete(false);
        }
    }

    const refreshRecords = () => {
        refresh();
        setSelectedRowKey(null);
    }

    return (
        <div>
            <div className='panelButtonTable'>
                <Row>
                    <Col span={12}>
                        <Space>
                            {addButtonVisible()}
                            <Tooltip title="Редактировать">
                                <Button type="dashed" ghost icon={<EditOutlined/>}
                                        disabled={selectedRowKeys === null || disableButtonEditDelete}
                                        onClick={() => editRecord()}
                                />
                            </Tooltip>
                            {deletedButtonVisible()}
                            <Tooltip title="Обновить">
                                <Button type="dashed" ghost icon={<SyncOutlined/>}
                                        onClick={() => refreshRecords()}
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
                dataSource={dataSource}
                onRow={(record, index) => ({
                    onClick: (e) => {
                        selectRow(record, index);
                    },
                    onDoubleClick: () => {
                        editRecord()
                    },
                    onContextMenu: () => {
                        console.log(3)
                    },
                })}
                scroll={{x: 'max-content', y: 'max-content'}}
                pagination={{defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: false}}

                style={{maxHeight: `${he!==undefined ? (height/he)-20 :height}px`, minHeight: `${he!==undefined ? (height/he)-30 :height}px`}}
            >
                {mergedColumns}
            </Table>
        </div>
    );
};

export default TableComp;