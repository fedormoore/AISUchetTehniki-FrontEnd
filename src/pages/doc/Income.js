import React, {useEffect, useState, useCallback, useRef} from 'react';
import {List, Row, Col, Form, Space, Tooltip, Button, Spin} from 'antd';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {DeleteOutlined, EditOutlined, PlusOutlined, SyncOutlined} from "@ant-design/icons";

let selectRowData = [];

const Income = () => {

    const {incomeList, isLoading} = useSelector(state => state.income)
    const {loadIncome} = useActions()

    const [selectRowIndex, setSelectRowIndex] = useState(null);

    const selectRowIndexRef = useRef();

    selectRowIndexRef.current = selectRowIndex;

    useEffect(() => {
        loadIncome();
    }, []);

    const onKeyDown = useCallback((event) => {
        console.log(selectRowIndexRef.current)
        console.log(incomeList.length)
        if (event.key === 'ArrowDown') {
            if (selectRowIndexRef.current <= incomeList.length - 2) {
                selectRowData = incomeList[selectRowIndexRef.current + 1];
                setSelectRowIndex(selectRowIndexRef.current + 1);
            }
        }
        if (event.key === 'ArrowUp') {
            if (selectRowIndexRef.current >= 1) {
                selectRowData = incomeList[selectRowIndexRef.current - 1];
                setSelectRowIndex(selectRowIndexRef.current - 1);
            }
        }
    }, [incomeList])

    const select = (index) => {
        document.addEventListener('keydown', onKeyDown);
        setSelectRowIndex(index);
        selectRowData = incomeList[index];
    }

    function dateFormat(date) {
        let dateOfyear = date.getFullYear() + ""; // год;

        let day = date.getDate(); // текущий день
        day = day < 10 ? "0" + day : day;

        let month = date.getMonth() + 1; //текущий месяцж
        month = month < 10 ? "0" + month : month;

        return day + "." + month + "." + dateOfyear;
    }

    const addRecord = () => {

    }

    const editRecord = () => {

    }

    const refresh = () => {
        document.removeEventListener('keydown', onKeyDown);
        setSelectRowIndex(null);
        selectRowData = [];
        loadIncome();
    }

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
                     maxWidth: '400px',
                     height: '100%',
                     overflow: 'auto',
                     // padding: '0 16px',
                     // border: '1px solid rgba(140, 140, 140, 0.35)',
                 }}
            >
                <Spin tip="Получение данных..." spinning={isLoading}>
                    <List
                        itemLayout="horizontal"
                        dataSource={incomeList}
                        renderItem={(item, index) => (
                            <List.Item className={selectRowIndex === index && 'ant-list-item-select'}
                                       onClick={() => select(index)}
                                       style={{paddingTop: '0px'}}
                            >
                                <Row>
                                    <Row style={{width: '100%'}}>
                                        <Col span={24}>
                                            {item.executed && <div style={{
                                                borderTopLeftRadius: '8px',
                                                borderTopRightRadius: '8px',
                                                background: "#77c383",
                                                textAlign: 'center'
                                            }}>Документ проведен {dateFormat(new Date(item.dataExecuted))}</div>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item style={{margin: '0'}}
                                                       label={"№ документа"}>{item.numberDoc}</Form.Item>
                                            <Form.Item style={{margin: '0'}}
                                                       label={"Дата документа"}>{dateFormat(new Date(item.dataDoc))}</Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item style={{margin: '0'}}
                                                       label={"№ контракта"}>{item.numberCon}</Form.Item>
                                            <Form.Item style={{margin: '0'}}
                                                       label={"Дата контракта"}>{dateFormat(new Date(item.dataCon))}</Form.Item>
                                            <Form.Item style={{margin: '0'}}
                                                       label="Сумма контракта">{item.sumCon}</Form.Item>
                                        </Col>
                                    </Row>
                                </Row>
                            </List.Item>
                        )}
                    />
                </Spin>
            </div>
        </>
    );
};

export default Income;