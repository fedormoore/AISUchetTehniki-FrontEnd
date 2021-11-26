import React, {useEffect, useState} from 'react';
import {Button, Col, DatePicker, Empty, Form, Input, InputNumber, Row, Select, Space, Spin, Table} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import moment from "moment";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

let editingSub = {};
let recordIndex = 0;
let isNewRecord = false;

const IncomeDrawer = (props) => {

        const [formSub] = Form.useForm();

        const [editingKey, setEditingKey] = useState('');
        const isEditing = (record) => record.recordIndex === editingKey;

        const columns = [
            {
                title: 'Тип оборудования',
                dataIndex: ['model', 'deviceType', 'name'],
                key: 'name',
                editable: false,
            },
            {
                title: 'Производитель',
                dataIndex: ['model', 'firm', 'name'],
                key: 'name',
                editable: false,
            },
            {
                title: 'Модель',
                dataIndex: ['model', 'name'],
                key: 'name',
                editable: true,
                inputType: 'select'
            },
            {
                title: 'Количество',
                dataIndex: 'count',
                key: 'count',
                width: '120px',
                editable: true,
                inputType: 'number'
            },
            {
                title: 'Стоимость',
                dataIndex: 'sum',
                key: 'sum',
                width: '120px',
                editable: true,
                inputType: 'number'
            },
            {
                title: 'Действия',
                width: '90px',
                render: (_, record) => {
                    const editable = isEditing(record);

                    return editable ? (
                        <>
                            <CheckOutlined onClick={() => saveSub(record.recordIndex)}/>
                            <CloseOutlined onClick={() => cancel(record.recordIndex)}
                                           style={{color: 'red', marginLeft: 12}}/>
                        </>
                    ) : (
                        editingKey !== '' ? (
                            <></>
                        ) : (
                            <>
                                <PlusOutlined onClick={() => addSubTree(record.recordIndex)}/>
                                <EditOutlined onClick={() => edit(record)}
                                              style={{marginLeft: 12}}/>
                                <DeleteOutlined disabled={editingKey !== ''} onClick={() => onDeleteSub(record)}
                                                style={{color: 'red', marginLeft: 12}}/>
                            </>
                        )
                    );
                }
            }
        ];

        const mergedColumns = columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });

        const EditableCell = ({
                                  editing,
                                  dataIndex,
                                  title,
                                  inputType,
                                  record,
                                  index,
                                  children,
                                  ...restProps
                              }) => {

            const inputNode = inputType === 'number' ? (
                <InputNumber
                    onChange={e => {
                        editingSub = {...editingSub, [dataIndex]: e};
                    }}
                />
            ) : (
                <Select
                    showSearch
                    dropdownMatchSelectWidth={false}
                    onChange={(value, objectValues) => editingSub = {...editingSub, model: objectValues.object}}
                >
                    {modelList.map((line, index) => {
                        return (
                            <Select.Option value={line.deviceType.name + " " + line.firm.name + " " + line.name}
                                           key={line.id} object={line}>
                                {line.deviceType.name + " " + line.firm.name + " " + line.name}
                            </Select.Option>
                        );
                    })}
                </Select>
            )

            return (
                <Form form={formSub} component={false}>
                    <td {...restProps} >
                        {editing ? (
                            <Form.Item
                                name={dataIndex}
                                style={{
                                    margin: 0,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: `Пожалуйста укажите ${title}!`,
                                    },
                                ]}
                            >
                                {inputNode}
                            </Form.Item>
                        ) : (
                            children
                        )}
                    </td>
                </Form>
            );
        };

        const addSub = () => {
            isNewRecord = true;
            formSub.setFieldsValue({
                count: '',
                sum: '',
                model: ''
            });

            const newRecord = {
                recordIndex: recordIndex,
                count: '', sum: '', model: {}
            };

            editingSub = newRecord;

            const docSubs = [...values.docSubs];
            docSubs.push(newRecord)

            setValues({...values, docSubs: docSubs})

            setEditingKey(recordIndex);
            recordIndex++;
        }

        const addSubTree = async (id) => {
            isNewRecord = true
            formSub.setFieldsValue({
                count: '',
                sum: '',
                model: ''
            });

            const newRecord = {
                recordIndex: recordIndex,
                count: '', sum: '', model: {name: ''}
            };

            editingSub = newRecord;

            const newData = [...values.docSubs];

            const updateTreeTable = function (data, id) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].recordIndex === id) {
                        if (data[i].children !== undefined) {
                            const newData = [...data[i].children];
                            newData.push(newRecord)
                            data[i] = {...data[i], children: newData};
                        } else {
                            data[i] = {...data[i], children: [newRecord]};
                        }
                        break;
                    } else if (data[i].hasOwnProperty('children')) {
                        updateTreeTable(data[i].children, id);
                    }
                }
            };
            updateTreeTable(newData, id);

            setValues({...values, docSubs: newData})
            setEditingKey(recordIndex);
            recordIndex++;
        };

        const edit = (record) => {
            editingSub = record;
            formSub.setFieldsValue({
                ...record
            });
            setEditingKey(record.recordIndex);
        };

        const cancel = (id) => {
            if (isNewRecord) {
                const newData = JSON.parse(JSON.stringify(values.docSubs));
                const updateTreeTable = function (data, id) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].recordIndex === id) {
                            data.splice(i, 1);
                            break;
                        } else if (data[i].hasOwnProperty('children')) {
                            updateTreeTable(data[i].children, id);
                        }
                    }
                };
                updateTreeTable(newData, id);
                setValues({...values, docSubs: newData})
                isNewRecord = false;
            }
            setEditingKey('');
        };

        const saveSub = async (id) => {
            formSub.validateFields()
                .then(() => {
                    const newData = JSON.parse(JSON.stringify(values.docSubs));
                    const updateTreeTable = function (data, id, editingSub) {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].recordIndex === id) {
                                data[i] = {...data[i], ...editingSub};
                                break;
                            } else if (data[i].hasOwnProperty('children')) {
                                updateTreeTable(data[i].children, id, editingSub);
                            }
                        }
                    };
                    updateTreeTable(newData, id, editingSub);
                    setValues({...values, docSubs: newData})
                    setEditingKey('');
                })
        };

        const [formMain] = Form.useForm();

        const [values, setValues] = useState(props.values);

        const {counterpartyList} = useSelector(state => state.counterparty)
        const {modelList} = useSelector(state => state.device)

        const {loadCounterparty, loadAllModel, saveIncome} = useActions()

        const localDateFormat = "DD.MM.YYYY";

        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            loadCounterparty();
            loadAllModel();

            const newData = JSON.parse(JSON.stringify(values.docSubs));

            function updateTreeTable(data) {
                for (let i = 0; i < data.length; i++) {
                    data[i] = {...data[i], recordIndex: recordIndex};
                    recordIndex++;
                    if (data[i].hasOwnProperty('children')) {
                        updateTreeTable(data[i].children);
                    }
                }
            };
            updateTreeTable(newData);

            setValues({...values, docSubs: newData})

            setIsLoading(false)
            // eslint-disable-next-line
        }, [])

        const save = () => {
            formMain.validateFields()
                .then(() => {
                    (async function () {
                        const result = await saveIncome(values);
                        if (result.isOk) {
                            formMain.resetFields();
                            props.closeModal();
                        }
                    })();
                })
        }

        const onDeleteSub = (record) => {
            // Modal.confirm({
            //     title: 'Вы точно хотите удалить запись?',
            //     okText: 'Да',
            //     okType: 'danger',
            //     cancelText: 'Нет',
            //     onOk: () => {
            //         setDocSubs(prevState => {
            //             return prevState.filter(sub => sub.id !== record.id)
            //         })
            //     }
            // })
        }

        return (
            <div>
                <Form form={formMain} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Статус документа"
                                initialValue={values.executed ? 'Ввод завершен' : 'Черновик'}
                            >
                                <Select
                                    value={values.executed ? 'Ввод завершен' : 'Черновик'}
                                    onChange={value => {
                                        setValues({
                                            ...values,
                                            executed: value === 'Ввод завершен' ? true : false
                                        })
                                    }
                                    }
                                >
                                    <Select.Option value={'Черновик'} key={'0'}>
                                        {'Черновик'}
                                    </Select.Option>
                                    <Select.Option value={'Ввод завершен'} key={'1'}>
                                        {'Ввод завершен'}
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Дата проведения"
                                name="dataExecuted"
                                initialValue={moment(moment(values.dataExecuted), localDateFormat)}
                                // rules={[{required: true, message: 'Пожалуйста укажите дату документа'}]}
                            >
                                <DatePicker
                                    format={localDateFormat}
                                    style={{width: '100%'}}
                                    onChange={(date) => setValues({
                                        ...values,
                                        dataExecuted: date
                                    })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Номер документа"
                                name="numberDoc"
                                initialValue={values.numberDoc}
                                rules={[{required: true, message: 'Пожалуйста укажите номер документа'}]}
                            >
                                <Input
                                    onChange={e => setValues({...values, numberDoc: e.target.value})}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Дата документа"
                                name="dataDoc"
                                initialValue={moment(moment(values.dataDoc), localDateFormat)}
                                rules={[{required: true, message: 'Пожалуйста укажите дату документа'}]}
                            >
                                <DatePicker
                                    format={localDateFormat}
                                    style={{width: '100%'}}
                                    onChange={(date) => setValues({
                                        ...values,
                                        dataDoc: date
                                    })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={5}>
                            <Form.Item
                                label="Номер контракта"
                                name="numberCon"
                                initialValue={values.numberCon}
                                rules={[{required: true, message: 'Пожалуйста укажите номер контракта'}]}
                            >
                                <Input
                                    onChange={e => setValues({...values, numberCon: e.target.value})}
                                    value={values.numberCon}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="Дата контракта"
                                name="dataCon"
                                initialValue={moment(moment(values.dataCon), localDateFormat)}
                                rules={[{required: true, message: 'Пожалуйста укажите дату контракта'}]}
                            >
                                <DatePicker
                                    format={localDateFormat}
                                    style={{width: '100%'}}
                                    onChange={(date) => setValues({
                                        ...values,
                                        dataCon: date
                                    })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="Сумма контракта"
                                name="sumCon"
                                initialValue={values.sumCon}
                                rules={[{required: true, message: 'Пожалуйста укажите сумму контракта'}]}
                            >
                                <Input
                                    onChange={e => setValues({...values, sumCon: e.target.value.replace(',', '.')})}
                                    value={values.sumCon}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item
                                label="Поставщик"
                                name="counterparty"
                                initialValue={!values.counterparty ? null : values.counterparty.name}
                                rules={[{required: true, message: 'Пожалуйста укажите поставщика'}]}
                            >
                                <Select
                                    showSearch
                                    value={!values.counterparty ? null : values.counterparty.name}
                                    onChange={(value, objectValues) => setValues({
                                        ...values,
                                        counterparty: objectValues.object
                                    })}
                                >
                                    {counterpartyList.map((line) => {
                                        return (
                                            <Select.Option value={line.name} key={line.id} object={line}>
                                                {line.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Spin tip="Получение данных..." spinning={isLoading}>
                        <Button disabled={editingKey !== ''} onClick={() => addSub()}>Добавить</Button>

                        {isLoading ?
                            <Table key="loading-not-done"
                                   size="small"
                                   rowKey='recordIndex'
                                   locale={{
                                       emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>
                                   }}
                            />
                            :
                            <Table
                                key="loading-done"
                                size="small"
                                rowKey='recordIndex'
                                columns={mergedColumns} dataSource={values.docSubs} bordered
                                locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>}}
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                rowClassName="editable-row"
                                defaultExpandAllRows={true}
                                scroll={{y: '100vh', x: 0}}
                                pagination={false}
                                style={{height: '480px'}}
                            />
                        }
                    </Spin>
                    <Space>
                        <Button onClick={() => save()} type="primary">
                            Сохранить
                        </Button>
                        <Button onClick={() => props.closeModal()}>Cancel</Button>
                    </Space>
                </Form>
            </div>
        );
    }
;

export default IncomeDrawer;