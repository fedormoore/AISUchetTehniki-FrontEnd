import React, {useEffect, useState} from 'react';
import {Modal, notification, Spin} from 'antd';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import UserModal from "./modal/UserModal";
import TableComp from "../../components/table/TableComp";

const columns = [
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        width: '170px',
    },
    {
        title: 'Фамилия',
        dataIndex: 'lastName',
        key: 'lastName',
        width: '150px',
    },
    {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
        width: '150px',
    },
    {
        title: 'Отчество',
        dataIndex: 'middleNames',
        key: 'middleNames',
        width: '150px',
    },
    {
        title: 'Телефон',
        dataIndex: 'telephone',
        key: 'telephone',
        width: '150px',
    },
    {
        title: 'Кабинет',
        dataIndex: ['location', 'name'],
        key: 'name',
        width: '100px',
    },
];

let selectRowData = {};

const User = () => {

    const {userList, isLoading} = useSelector(state => state.user)
    const {loadUser, saveUser} = useActions()

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (userList.length === 0) {
            loadUser();
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
                    const result = await saveUser(selectRowData);
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
        loadUser();
        selectRowData = [];
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <Spin tip="Получение данных..." spinning={isLoading}>
            <TableComp columns={columns} dataSource={userList.filter(sub => sub.deleted !== true)} addRecord={addRecord} selectRecord={selectRecord} editRecord={editRecord} deletedRecord={deletedRecord} refreshRecords={refreshRecords}/>
            <Modal
                title="Добавить запись"
                visible={modalVisible}
                footer={null}
                closable={false}
                destroyOnClose={true}
            >
                <UserModal closeModal={closeModal} values={selectRowData}/>
            </Modal>
        </Spin>
    );
};

export default User;