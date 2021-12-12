import React, {useEffect, useState} from 'react';
import {Layout, Table, Button, Space, Tooltip, Modal, Empty, Spin, Input, Row, Col} from 'antd';
import {PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined, FilterOutlined} from '@ant-design/icons';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import DeviceTypeModal from "./modal/DeviceTypeModal";
import get from "lodash.get";

const columns = [
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
        type: 'string',
        width: '160px'
    },
    {
        title: 'Уровень',
        dataIndex: 'level',
        key: 'level',
        type: 'string',
        width: '160px'
    },
];

let selectRowData = {};

const DeviceType = () => {

    const [height, setHeight] = useState(window.innerHeight - 118);

    const {deviceTypeList, isLoading} = useSelector(state => state.deviceType)
    const {loadDeviceType} = useActions()

    const [modalVisible, setModalVisible] = useState(false);
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

    useEffect(() => {
        if (deviceTypeList.length === 0) {
            loadDeviceType()
        }
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
        loadDeviceType();
        selectRowData = {};
        setSelectedRowKey([]);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const selectRow = (record, index) => {
        selectRowData = record;
        setSelectedRowKey(index);

        if (record.level === 'Global') {
            setDisableButtonEditDelete(true);
        } else {
            setDisableButtonEditDelete(false);
        }
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
                    <Col span={12}>
                        <Space>
                            <Tooltip title="Добавить">
                                <Button type="dashed" ghost icon={<PlusOutlined/>}
                                        onClick={() => addRecord()}/>
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
            <Table size="small"
                   rowKey="id"
                   bordered
                   locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>}}
                   rowClassName={(record, index) => index === selectedRowKeys ? 'row-select' : index % 2 ? 'row0' : 'row1'}
                   dataSource={deviceTypeList}
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
                   pagination={{defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: false}}
                   style={{maxHeight: `${height}px`}}
            >
                {mergedColumns}
            </Table>
            <Modal
                title="Добавить запись"
                visible={modalVisible}
                footer={null}
                closable={false}
                destroyOnClose={true}
            >
                <DeviceTypeModal closeModal={closeModal} values={selectRowData}/>
            </Modal>
        </Spin>
    );
};

export default DeviceType;