import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Row, Select, Space, TreeSelect} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const RegistryDrawer = (props) => {

        const [values, setValues] = useState(props.values);

        const {userList} = useSelector(state => state.user)
        const {locationList} = useSelector(state => state.location)
        const {budgetAccountList} = useSelector(state => state.budgetAccount)

        const {loadLocationTree, loadUser, loadBudgetAccount, saveRegistry} = useActions()

        useEffect(() => {
            loadUser();
            loadLocationTree();
            loadBudgetAccount();
            // eslint-disable-next-line
        }, [])

        const save = () => {
            // formMain.validateFields()
            //     .then(() => {
            (async function () {
                const result = await saveRegistry(values);
                if (result.isOk) {
                    // formMain.resetFields();
                    props.closeDrawer();
                }
            })();
            //     })
        }

        return (
            <div>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Инвентарный номер"
                                name="invNumber"
                                initialValue={values.invNumber}
                            >
                                <Input
                                    onChange={e => setValues({...values, invNumber: e.target.value})}
                                    value={values.invNumber || ""}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Расположение"
                            >
                                <TreeSelect
                                    showSearch
                                    value={!values.location ? null : values.location.name}
                                    treeDefaultExpandAll
                                    onSelect={(value, node) => setValues({...values, location: node.obj})}
                                    treeData={locationList}
                                >
                                </TreeSelect>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Сотрудник"
                                initialValue={!values.user ? null : values.user.lastName}
                            >
                                <Select
                                    showSearch
                                    value={!values.user ? null : values.user.lastName}
                                    onChange={(value, objectValues) => setValues({
                                        ...values,
                                        user: objectValues.object
                                    })}
                                >
                                    {userList.map((line) => {
                                        return (
                                            <Select.Option
                                                value={line.lastName + " " + line.firstName + " " + line.middleNames}
                                                key={line.id} object={line}>
                                                {line.lastName + " " + line.firstName + " " + line.middleNames}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Бюджетный счет"
                                initialValue={!values.budgetAccount ? null : values.budgetAccount.name}
                            >
                                <Select
                                    showSearch
                                    value={!values.budgetAccount ? null : values.budgetAccount.name}
                                    onChange={(value, objectValues) => setValues({
                                        ...values,
                                        budgetAccount: objectValues.object
                                    })}
                                >
                                    {budgetAccountList.map((line) => {
                                        return (
                                            <Select.Option
                                                value={line.code + " " + line.name}
                                                key={line.id} object={line}>
                                                {line.code + " " + line.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Space>
                        <Button onClick={() => save()} type="primary">
                            Сохранить
                        </Button>
                        <Button onClick={() => props.closeDrawer()}>Cancel</Button>
                    </Space>
                </Form>
            </div>
        );
    }
;

export default RegistryDrawer;