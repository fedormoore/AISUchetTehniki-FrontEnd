import React, {useEffect, useState} from 'react';
import {Layout, Table, Button, Space, Tooltip, Modal, Empty, Spin, Row, Col} from 'antd';
import {PlusOutlined, SisternodeOutlined, EditOutlined, DeleteOutlined, SyncOutlined} from '@ant-design/icons';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import LocationModal from "./modal/LocationModal";

const columns = [
    {
        title: 'Тип',
        dataIndex: 'type',
        key: 'id',
    },
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'id',
    },
];

let selectRowData = [];
let titleModal = 'Добавить страну';

const Location = () => {

    const {locationList, isLoading} = useSelector(state => state.location)
    const {loadLocation} = useActions()
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKey] = useState(null);
    const [disableAddTree, setDisableAddTree] = useState(false)

    useEffect(() => {
        if (locationList.length===0) {
            loadLocation()
        }
        // eslint-disable-next-line
    }, []);

    const addRecord = () => {
        selectRowData = {type: 'country'};
        setSelectedRowKey([]);
        setModalVisible(true);
    }

    const addTreeRecord = () => {
        if (selectRowData.type === 'floor') {
            titleModal = 'Добавить кабинет'
            selectRowData = {type: 'cabinet', parent: selectRowData};
        }
        if (selectRowData.type === 'address') {
            titleModal = 'Добавить этаж'
            selectRowData = {type: 'floor', parent: selectRowData};
        }
        if (selectRowData.type === 'city') {
            titleModal = 'Добавить адрес'
            selectRowData = {type: 'address', parent: selectRowData};
        }
        if (selectRowData.type === 'subject') {
            titleModal = 'Добавить город'
            selectRowData = {type: 'city', parent: selectRowData};
        }
        if (selectRowData.type === 'country') {
            titleModal = 'Добавить субъект'
            selectRowData = {type: 'subject', parent: selectRowData};
        }

        setModalVisible(true);
    }

    const editRecord = () => {
        selectRowData = {...selectRowData, parent: selectRowData.parent};
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const refresh = () => {
        loadLocation();
        selectRowData = [];
        setSelectedRowKey([]);
    }

    const selectRow = (record, index) => {
        selectRowData = record;
        setSelectedRowKey(record.id);

        if (selectRowData.type === 'cabinet') {
            setDisableAddTree(true);
        } else {
            setDisableAddTree(false);
        }
    }

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
                            <Tooltip title="Добавить в состав">
                                <Button type="dashed" ghost icon={<SisternodeOutlined/>}
                                        disabled={selectedRowKeys === null || disableAddTree}
                                        onClick={() => addTreeRecord()}/>
                            </Tooltip>
                            <Tooltip title="Редактировать">
                                <Button type="dashed" ghost icon={<EditOutlined/>} disabled={selectedRowKeys === null}
                                        onClick={() => editRecord()}/>
                            </Tooltip>
                            <Tooltip title="Удалить">
                                <Button type="dashed" ghost icon={<DeleteOutlined/>}
                                        disabled={selectedRowKeys === null}/>
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
            {isLoading ?
                <Table key="loading-not-done"
                       size="small"
                       locale={{
                           emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>
                       }}
                />
                :
                <Table key="loading-done"
                       size="small"
                       locale={{
                           emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>
                       }}
                       rowClassName={(record, index) => record.id === selectedRowKeys ? 'row-select' : index % 2 ? 'row0' : 'row1'}
                       columns={columns} dataSource={locationList} rowKey="id" bordered
                       childrenColumnName={"children"}
                       onRow={(record, index) => ({
                           onClick: () => {
                               selectRow(record, index);
                           },
                           onDoubleClick: event => {
                               editRecord()
                           },
                       })}
                       defaultExpandAllRows={true}
                       scroll={{y: '100vh'}}
                       pagination={false}
                       style={{height: '95%'}}
                />
            }
            <Modal
                title={titleModal}
                visible={modalVisible}
                footer={null}
                closable={false}
                destroyOnClose={true}
            >
                <LocationModal closeModal={closeModal} values={selectRowData}/>
            </Modal>
        </Spin>
    );
};

export default Location;