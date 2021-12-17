import React, {useEffect, useState} from 'react';
import {Modal, notification, Spin} from 'antd';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import BudgetAccountModal from "./modal/BudgetAccountModal";
import TableComp from "../../components/table/TableComp";

const columns = [
    {
        title: 'Код',
        dataIndex: 'code',
        key: 'code',
        width: '170px',
    },
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
        width: '150px',
    }
];

let selectRowData = {};

const BudgetAccount = () => {

    const {budgetAccountList, isLoading} = useSelector(state => state.budgetAccount)
    const {loadBudgetAccount, saveBudgetAccount} = useActions()

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (budgetAccountList.length === 0) {
            loadBudgetAccount()
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
                    const result = await saveBudgetAccount(selectRowData);
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
        loadBudgetAccount();
        selectRowData = {};
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <Spin tip="Получение данных..." spinning={isLoading}>
            <TableComp columns={columns} dataSource={budgetAccountList.filter(sub => sub.deleted !== true)}
                       addRecord={addRecord} selectRecord={selectRecord} editRecord={editRecord}
                       deletedRecord={deletedRecord} refreshRecords={refreshRecords}/>
            <Modal
                title="Добавить запись"
                visible={modalVisible}
                footer={null}
                closable={false}
                destroyOnClose={true}
            >
                <BudgetAccountModal closeModal={closeModal} values={selectRowData}/>
            </Modal>
        </Spin>
    );
};

export default BudgetAccount;