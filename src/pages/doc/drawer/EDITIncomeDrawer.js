import React, {useEffect, useState, useRef, useContext} from 'react';
import {Button, Col, DatePicker, Empty, Form, FormInstance, Input, Row, Select, Space, Table} from "antd";
import moment from "moment";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const column = [
    {
        title: 'Модель',
        dataIndex: ['model', 'name'],
        key: 'name',
        editable: true,
        inputType: 'select',
    },
    {
        title: 'Количество',
        dataIndex: 'count',
        key: 'count',
        editable: true,
        inputType: 'input',
    },
    {
        title: 'Стоимость',
        dataIndex: 'sum',
        key: 'sum',
        editable: true,
        inputType: 'input',
    },
];

const IncomeDrawer = (props) => {

    const [form] = Form.useForm();

    const [values, setValues] = useState(props.values);

    const {counterpartyList} = useSelector(state => state.counterparty)
    const {modelList} = useSelector(state => state.device)

    const {loadCounterparty, loadAllModel, saveIncome} = useActions()

    const [valuesDocSub, setValuesDocSub] = useState({});

    const EditableContext = React.createContext(null);

    const handleSave = (row) => {
        console.log(row)
        const newData = [...values.docSubs];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        setValues({...values, docSubs: newData})
    };

    const EditableRow = ({index, ...props}) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
                              title,
                              editable,
                              children,
                              dataIndex,
                              record,
                              handleSave,
                              inputType,
                              ...restProps
                          }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);

        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({[dataIndex]: record[dataIndex]});
        };

        const save = async () => {
            try {
                const values = await form.validateFields();

                toggleEdit();
                handleSave({...record, ...values});
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };
        const saveSelect = async (objectValues) => {
            try {
                toggleEdit();
                handleSave({...record, model:objectValues.object});
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };


        let childNode = children;

        const inputNode = inputType === 'select' ? (
            <Select
                ref={inputRef}
                showSearch
                // value={!valuesDocSub.model ? null : valuesDocSub.model.name}
                onChange={(value, objectValues) => saveSelect(objectValues)}
            >
                {modelList.map((line) => {
                    return (
                        <Select.Option value={line.name} key={line.id} object={line}>
                            {line.name}
                        </Select.Option>
                    );
                })}
            </Select>
        ) : (
            <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
        );

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{margin: 0}}
                    name={dataIndex}
                    // initialValue={!valuesDocSub.mode ? null : valuesDocSub.model.name}
                >
                    {inputNode}
                </Form.Item>

            ) : (
                <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = column.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                inputType: col.inputType,
                handleSave: handleSave,
            }),
        };
    })

    const localDateFormat = "DD.MM.YYYY";
    const toServerDateFormat = "YYYY-MM-DD";

    useEffect(() => {
        loadCounterparty();
        loadAllModel();
        // eslint-disable-next-line
    }, [])

    const save = () => {
        console.log(values)
        // form.validateFields()
        //     .then(() => {
        //         (async function () {
        //             const result = await saveIncome(values);
        //             if (result.isOk) {
        //                 form.resetFields();
        //                 props.closeModal();
        //             } else {
        //                 // setError(result.message);
        //             }
        //         })();
        //     })
    }

    const selectRow = (record, index) => {
        // console.log(index)
        setValuesDocSub(record);
    }

    const saveDocSub = () => {
        if (values.docSubs.some(el => el.id === valuesDocSub.id)) {
            const myNewArray = values.docSubs.map((content) => {
                if (content.id === valuesDocSub.id) {
                    return valuesDocSub
                }
                return content
            })
            setValues({...values, docSubs: myNewArray})
        }
    }

    return (
        <div>
            <Form form={form} layout="vertical">
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
                                onChange={(date, dateString) => setValues({
                                    ...values,
                                    dataDoc: moment(moment(dateString), toServerDateFormat)
                                })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
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
                    <Col span={12}>
                        <Form.Item
                            label="Дата контракта"
                            name="dataCon"
                            initialValue={moment(moment(values.dataCon), localDateFormat)}
                            rules={[{required: true, message: 'Пожалуйста укажите дату контракта'}]}
                        >
                            <DatePicker
                                format={localDateFormat}
                                style={{width: '100%'}}
                                onChange={(date, dateString) => setValues({
                                    ...values,
                                    dataCon: moment(moment(dateString), toServerDateFormat)
                                })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
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
                    <Col span={12}>
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

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            label="Оборудование"
                            name="name"
                            initialValue={!valuesDocSub.mode ? null : valuesDocSub.model.name}
                            // rules={[{required: true, message: 'Пожалуйста укажите номер документа'}]}
                        >
                            <div>
                                <Select
                                    showSearch
                                    value={!valuesDocSub.model ? null : valuesDocSub.model.name}
                                    onChange={(value, objectValues) => setValuesDocSub({
                                        ...valuesDocSub,
                                        model: objectValues.object
                                    })}
                                >
                                    {modelList.map((line) => {
                                        return (
                                            <Select.Option value={line.name} key={line.id} object={line}>
                                                {line.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Количество"
                            name="count"
                            // initialValue={valuesDocSub.count}
                            // rules={[{required: true, message: 'Пожалуйста укажите количество'}]}
                        >
                            <div>
                                <Input
                                    onChange={e => setValuesDocSub({...valuesDocSub, count: e.target.value})}
                                    value={valuesDocSub.count}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Стоимость"
                            name="sum"
                            // initialValue={valuesDocSub.sum}
                            // rules={[{required: true, message: 'Пожалуйста укажите стоимость'}]}
                        >
                            <div>
                                <Input
                                    onChange={e => setValuesDocSub({...valuesDocSub, sum: e.target.value})}
                                    value={valuesDocSub.sum}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label=" ">
                            <Button onClick={() => saveDocSub()}>
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

                <Table
                    size="small"
                    dataIndex
                    columns={columns} dataSource={values.docSubs} rowKey="id" bordered
                    locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных"/>}}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    onRow={(record, index) => ({
                        onClick: () => {
                            selectRow(record, index);
                        }
                    })}
                    defaultExpandAllRows={true}
                    scroll={{y: '100vh', x: 0}}
                    pagination={false}
                    style={{height: '220px'}}
                >
                </Table>

                <Space>
                    <Button onClick={() => save()} type="primary">
                        Сохранить
                    </Button>
                    <Button onClick={() => props.closeModal()}>Cancel</Button>
                </Space>
            </Form>
        </div>
    );
};

export default IncomeDrawer;