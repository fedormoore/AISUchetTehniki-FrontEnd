import React, {useEffect, useState} from 'react';
import {
    Drawer,
    Row,
    Col,
    Form,
    Space,
    Tooltip,
    Button,
    Spin,
    Collapse,
    Table,
    Empty
} from 'antd';
import moment from 'moment';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {DeleteOutlined, EditOutlined, PlusOutlined, SyncOutlined} from "@ant-design/icons";
import IncomeDrawer from "./drawer/IncomeDrawer";

let selectRowData = [];

const columns = [
    {
        title: 'Тип оборудования',
        dataIndex: ['model', 'deviceType', 'name'],
        key: 'name',
    },
    {
        title: 'Производитель',
        dataIndex: ['model', 'firm', 'name'],
        key: 'name',
    },
    {
        title: 'Модель',
        dataIndex: ['model', 'name'],
        key: 'name',
    },
    {
        title: 'Количество',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: 'Стоимость',
        dataIndex: 'sum',
        key: 'sum',
    },
];

const Income = () => {

    const {incomeList, isLoading} = useSelector(state => state.income)

    const {loadIncome} = useActions()

    const [selectRowIndex, setSelectRowIndex] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        loadIncome();
        // eslint-disable-next-line
    }, []);

    const addRecord = () => {
        selectRowData = {docSubs:[]};
        setVisible(true);
    }

    const editRecord = () => {
        setVisible(true);
    }

    const refresh = () => {
        setSelectRowIndex(null);
        selectRowData = [];
        loadIncome();
    }

    const onClickItem = (index) => {
        setSelectRowIndex(index);
        selectRowData = incomeList[index];
    }

    const closeDrawer = () => {
        setVisible(false);
    };

    return (
        <>
            <Space>
                <Tooltip title="Добавить">
                    <Button type="primary" icon={<PlusOutlined/>} onClick={() => addRecord()}/>
                </Tooltip>
                <Tooltip title="Редактировать">
                    <Button type="primary" icon={<EditOutlined/>} disabled={selectRowIndex === null}
                            onClick={() => editRecord()}/>
                </Tooltip>
                <Tooltip title="Удалить">
                    <Button type="primary" icon={<DeleteOutlined/>} disabled={selectRowIndex === null}/>
                </Tooltip>
                <Tooltip title="Обновить">
                    <Button type="primary" icon={<SyncOutlined/>}
                            onClick={() => refresh()}
                    />
                </Tooltip>
            </Space>

            <div id="scrollableDiv"
                 style={{
                     maxWidth: '100%',
                     height: '100%',
                     overflow: 'auto',
                 }}
            >
                <Spin tip="Получение данных..." spinning={isLoading}>
                    <Collapse bordered={false} accordion>
                        {incomeList.map((item, index) => {
                            return (
                                <Collapse.Panel key={index}
                                                className={selectRowIndex === index ? 'item-select' : 'item-non-select'}
                                                showArrow={false} header={
                                    <Row onClick={() => onClickItem(index)}>
                                        <Col span={4}>
                                            {item.executed ?
                                                <div style={{
                                                    background: "#77c383",
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    height: '100%'
                                                }}>Документ
                                                    проведен {moment(item.dataExecuted).format("DD.MM.YYYY")}</div>
                                                :
                                                <div style={{
                                                    background: "#d1d2d1",
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    height: '100%'
                                                }}>Черновик</div>
                                            }
                                        </Col>
                                        <Col span={8}>
                                            <Row>
                                                Реквизиты документа
                                            </Row>
                                            <Row>
                                                <Form.Item style={{margin: '0'}}
                                                           label={"№"}>{item.numberDoc}</Form.Item>
                                            </Row>
                                            <Row>
                                                <Form.Item style={{margin: '0'}}
                                                           label={"Дата"}>{moment(item.dataDoc).format("DD.MM.YYYY")}</Form.Item>
                                            </Row>
                                        </Col>
                                        <Col span={8}>
                                            <Row>
                                                Реквизиты контракта
                                            </Row>
                                            <Row>
                                                <Form.Item style={{margin: '0'}}
                                                           label={"№"}>{item.numberCon}</Form.Item>
                                            </Row>
                                            <Row>
                                                <Form.Item style={{margin: '0'}}
                                                           label={"Дата"}>{moment(item.dataCon).format("DD.MM.YYYY")}</Form.Item>
                                            </Row>
                                            <Row>
                                                <Form.Item style={{margin: '0'}}
                                                           label={"Сумма"}>{item.sumCon}</Form.Item>
                                            </Row>
                                            <Row>
                                                <Form.Item style={{margin: '0'}}
                                                           label={"Поставщик"}>{item.counterparty.name}</Form.Item>
                                            </Row>
                                        </Col>
                                    </Row>
                                }>
                                    <Table key="loading-done"
                                           size="small"
                                           locale={{
                                               emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                                 description="Нет данных"/>
                                           }}
                                           columns={columns} dataSource={item.docSubs}
                                           rowKey="id" bordered
                                           defaultExpandAllRows={true}
                                           scroll={{y: '100vh', x: 0}}
                                           pagination={false}
                                           style={{height: '220px'}}
                                    />
                                </Collapse.Panel>
                            )
                        })}
                    </Collapse>
                </Spin>
            </div>
            <Drawer
                title="Добавить запись"
                width={'100%'}
                onClose={() => closeDrawer()}
                visible={visible}
                // bodyStyle={{paddingBottom: 80}}
                destroyOnClose={true}
            >
                <IncomeDrawer closeModal={() => closeDrawer()} values={selectRowData}/>
            </Drawer>
        </>
    );

};

export default Income;