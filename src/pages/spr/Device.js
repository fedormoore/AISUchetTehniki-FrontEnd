import React, {useEffect, useState} from 'react';
import {Layout, Modal, notification, Spin} from 'antd';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import FirmModal from "./modal/FirmModal";
import TableComp from "../../components/table/TableComp";
import ModelModal from "./modal/ModelModal";

const columnsFirm = [
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Уровень',
        dataIndex: 'level',
        key: 'level',
    },
];

const columnsModel = [
    {
        title: 'Тип оборудования',
        dataIndex: ['deviceType', 'name'],
        key: 'name',
    },
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
    },
];

let selectFirmRowData = {};
let selectModelRowData = {};

const Device = () => {

    const {firmList, isLoadingFirm, modelList, isLoadingModel} = useSelector(state => state.device)
    const {loadFirm, loadModel, saveFirm, saveModel} = useActions()

    const [modalFirmVisible, setModalFirmVisible] = useState(false);
    const [modalModelVisible, setModalModelVisible] = useState(false);

    useEffect(() => {
        loadFirm();
        // eslint-disable-next-line
    }, []);

    const addFirmRecord = () => {
        selectFirmRowData = {};
        setModalFirmVisible(true);
    }

    const selectFirmRecord = (values) => {
        selectFirmRowData = values;
        selectModelRowData = {};
        loadModel(values.id);
    }

    const editFirmRecord = () => {
        setModalFirmVisible(true);
    }

    const deletedFirmRecord = () => {
        Modal.confirm({
            title: 'Вы точно хотите удалить запись?',
            cancelText: 'Нет',
            okText: 'Да',
            okType: 'danger',
            onOk: () => {
                (async function () {
                    selectFirmRowData = {...selectFirmRowData, deleted: true}
                    const result = await saveFirm(selectFirmRowData);
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

    const refreshFirm = () => {
        loadFirm();
        selectFirmRowData = {};
    }

    const closeFirmModal = () => {
        setModalFirmVisible(false);
    }

    const addModelRecord = () => {
        selectModelRowData = {};
        setModalModelVisible(true);
    }

    const selectModelRecord = (values) => {
        selectModelRowData = values;
    }

    const editModelRecord = () => {
        setModalModelVisible(true);
    }

    const deletedModelRecord = () => {
        Modal.confirm({
            title: 'Вы точно хотите удалить запись?',
            cancelText: 'Нет',
            okText: 'Да',
            okType: 'danger',
            onOk: () => {
                (async function () {
                    selectModelRowData = {...selectModelRowData, deleted: true}
                    const result = await saveModel(selectModelRowData);
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

    const refreshModel = () => {
        loadModel(selectFirmRowData.id);
        selectModelRowData = {};
    }

    const closeModelModal = () => {
        setModalModelVisible(false);
    }

    return (
        <Layout>
            <Spin tip="Получение данных..." spinning={isLoadingFirm}>
                <TableComp columns={columnsFirm} dataSource={firmList.filter(sub => sub.deleted !== true)} addRecord={addFirmRecord}
                           selectRecord={selectFirmRecord} editRecord={editFirmRecord} deletedRecord={deletedFirmRecord} refreshRecords={refreshFirm} height={2}/>
                <Modal
                    title="Добавить запись"
                    visible={modalFirmVisible}
                    footer={null}
                    closable={false}
                    destroyOnClose={true}
                >
                    <FirmModal closeModal={closeFirmModal} values={selectFirmRowData}/>
                </Modal>
            </Spin>

            <Spin tip="Получение данных..." spinning={isLoadingModel}>
                <TableComp columns={columnsModel} dataSource={modelList.filter(sub => sub.deleted !== true)} addRecord={addModelRecord}
                           selectRecord={selectModelRecord} editRecord={editModelRecord} deletedRecord={deletedModelRecord} refreshRecords={refreshModel} height={2}/>
                <Modal
                    title="Добавить запись"
                    visible={modalModelVisible}
                    footer={null}
                    closable={false}
                    destroyOnClose={true}
                >
                    <ModelModal closeModal={closeModelModal} parentRec={selectFirmRowData}
                                values={selectModelRowData}/>
                </Modal>
            </Spin>
        </Layout>
    );
};

export default Device;