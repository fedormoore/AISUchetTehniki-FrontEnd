import React, {useEffect, useState} from 'react';
import {Modal, notification, Spin} from 'antd';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import CounterpartyModal from "./modal/CounterpartyModal";
import TableComp from "../../components/table/TableComp";

const columns = [
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
        width: '170px',
    },
    {
        title: 'ИНН',
        dataIndex: 'inn',
        key: 'inn',
        width: '150px',
    },
    {
        title: 'Телефон',
        dataIndex: 'telephone',
        key: 'telephone',
        width: '150px',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        width: '150px',
    },
    {
        title: 'Контактное лицо',
        dataIndex: 'contact',
        key: 'contact',
        width: '100px',
    },
];

let selectRowData = {};

const Counterparty = () => {

    const {counterpartyList, isLoading} = useSelector(state => state.counterparty)
    const {loadCounterparty, saveCounterparty} = useActions()

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (counterpartyList.length === 0) {
            loadCounterparty()
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
                    const result = await saveCounterparty(selectRowData);
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
        loadCounterparty();
        selectRowData = {};
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <Spin tip="Получение данных..." spinning={isLoading}>
            <TableComp columns={columns} dataSource={counterpartyList.filter(sub => sub.deleted !== true)}
                       addRecord={addRecord} selectRecord={selectRecord} editRecord={editRecord}
                       deletedRecord={deletedRecord} refreshRecords={refreshRecords}/>
            <Modal
                title="Добавить запись"
                visible={modalVisible}
                footer={null}
                closable={false}
                destroyOnClose={true}
            >
                <CounterpartyModal closeModal={closeModal} values={selectRowData}/>
            </Modal>
        </Spin>
    );
};

export default Counterparty;