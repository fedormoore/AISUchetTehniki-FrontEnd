import React, {useEffect, useState} from 'react';
import {Modal, notification, Spin} from 'antd';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import DeviceTypeModal from "./modal/DeviceTypeModal";
import TableComp from "../../components/table/TableComp";

const columns = [
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
        width: '160px'
    },
    {
        title: 'Уровень',
        dataIndex: 'level',
        key: 'level',
        width: '160px'
    },
];

let selectRowData = {};

const DeviceType = () => {

    const {deviceTypeList, isLoading} = useSelector(state => state.deviceType)
    const {loadDeviceType, saveDeviceType} = useActions()

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (deviceTypeList.length === 0) {
            loadDeviceType()
        }
        // eslint-disable-next-line
    }, []);

    const addRecord = () => {
        selectRowData = {};
        setModalVisible(true);
    }

    const selectRecord = (values) => {
        selectRowData = values;
    }

    const editRecord = () => {
        setModalVisible(true);
    }

    const deletedRecord = () => {
        Modal.confirm({
            title: 'Вы точно хотите удалить запись?',
            cancelText: 'Нет',
            okText: 'Да',
            okType: 'danger',
            onOk: () => {
                (async function () {
                    selectRowData = {...selectRowData, deleted: true}
                    const result = await saveDeviceType(selectRowData);
                    if (!result.isOk) {
                        notification['error']({
                            message: 'Ошибка',
                            description: result.message,
                            className: 'custom-class',
                            style: {
                                width: 300,
                            },
                        });
                    }
                })();
            }
        })
    }

    const refreshRecords = () => {
        loadDeviceType();
        selectRowData = {};
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <Spin tip="Получение данных..." spinning={isLoading}>
            <TableComp columns={columns} dataSource={deviceTypeList.filter(sub => sub.deleted !== true)} addRecord={addRecord} selectRecord={selectRecord}
                       editRecord={editRecord} deletedRecord={deletedRecord} refreshRecords={refreshRecords}/>
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