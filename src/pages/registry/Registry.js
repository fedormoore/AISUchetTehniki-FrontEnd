import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {Drawer, Spin} from "antd";
import RegistryDrawer from "./drawer/RegistryDrawer";
import TableComp from "../../components/table/TableComp";

const columns = [
    {
        title: 'Тип оборудования',
        dataIndex: ['model', 'deviceType', 'name'],
        key: ['model', 'deviceType', 'name'],
        width: '190px',
    },
    {
        title: 'Производитель',
        dataIndex: ['model', 'firm', 'name'],
        key: ['model', 'firm', 'name'],
        width: '140px'
    },
    {
        title: 'Модель',
        dataIndex: ['model', 'name'],
        key: ['model', 'name'],
        width: '250px'
    },
    {
        title: 'Инвентарный номер',
        dataIndex: ['invNumber'],
        key: 'invNumber',
        width: '160px'
    },
    {
        title: 'Расположение',
        dataIndex: ['location', 'name'],
        key: ['location', 'name'],
        width: '120px'
    },
    {
        title: 'Сотрудник',
        dataIndex: ['user', 'lastName'],
        key: 'lastName',
        width: '100px'
    },
    {
        title: 'Бюджетный счет',
        dataIndex: ['budgetAccount', 'name'],
        key: 'name',
        width: '160px'
    },
];

let selectRowData = [];

const Registry = React.memo(() => {

    const {registryList, isLoading} = useSelector(state => state.registry)
    const {loadRegistry} = useActions()

    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        if (registryList.length===0) {
            loadRegistry()
        }
        // eslint-disable-next-line
    }, []);

    const selectRecord = (values) => {
        selectRowData = values;
    }

    const editRecord = () => {
        setDrawerVisible(true);
    }

    const refreshRecords = () => {
        loadRegistry();
        selectRowData = [];
    }

    const closeDrawer = () => {
        setDrawerVisible(false);
    }

    return (
        <Spin tip="Получение данных..." spinning={isLoading}>
            <TableComp columns={columns} dataSource={registryList} selectRecord={selectRecord} editRecord={editRecord} refreshRecords={refreshRecords}/>
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
});

export default Registry;