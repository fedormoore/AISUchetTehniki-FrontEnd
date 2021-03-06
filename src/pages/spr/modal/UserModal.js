import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, Input, Row, Space, Spin, TreeSelect} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const UserModal = (props) => {

    const [values, setValues] = useState(props.values);
    const {isSaving} = useSelector(state => state.user)
    // const {locationList} = useSelector(state => state.location)
    const {saveUser, loadLocation} = useActions();
    const [error, setError] = useState();
    const [locationListTree, setLocationListTree] = useState();

    useEffect(() => {
        (async function () {
            const result = await loadLocation();
            if (result.isOk) {
                renderTreeNode(result.data);
            } else {
                setError(result.message);
            }
        })();
        // eslint-disable-next-line
    }, [])

    const submitForm = () => {
        (async function () {
            const result = await saveUser(values);
            if (result.isOk) {
                props.closeModal();
            } else {
                setError(result.message);
            }
        })();
    }

    const closeModal = () => {
        props.closeModal();
    }

    const renderTreeNode = (locationList) => {
        let treeNode = [];
        locationList.forEach((parent, index) => {
            treeNode.push({title:parent.name, value:parent.name, obj:parent, children:renderChild(parent)})
        })
        setLocationListTree(treeNode)
    }

    const renderChild = (parent) => {
        let child = [];
        if (parent.child) {
            parent.child.forEach((item, index) => {
                child.push({title:item.name, value:item.name,  obj:item, children:renderChild(item)});
            })
        }
        return child;
    }

    function onSelect(value, node) {
        setValues({...values, location:node.obj})
    }

    return (
        <Spin tip="Сохранение данных..." spinning={isSaving}>
            <Form onFinish={submitForm}>
                {error &&
                <Alert message={error} type="error"/>
                }
                <Form.Item label="Кабинет">
                    <TreeSelect
                        showSearch
                        // value={values.location.name}
                        value={!values.location ? null : values.location.name}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeDefaultExpandAll
                        onSelect={onSelect}
                        treeData={locationListTree}
                    >
                    </TreeSelect>
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    // name="email"
                >
                    <Input
                        onChange={e => setValues({...values, email: e.target.value})}
                        value={values.email || ""}
                    />
                </Form.Item>
                <Form.Item
                    label="Фамилия"
                    // name="lastName"
                >
                    <Input
                        onChange={e => setValues({...values, lastName: e.target.value})}
                        value={values.lastName}
                    />
                </Form.Item>
                <Form.Item
                    label="Имя"
                    // name="firstName"
                >
                    <Input
                        onChange={e => setValues({...values, firstName: e.target.value})}
                        value={values.firstName}
                    />
                </Form.Item>
                <Form.Item
                    label="Отчество"
                    // name="middleNames"
                >
                    <Input
                        onChange={e => setValues({...values, middleNames: e.target.value})}
                        value={values.middleNames}
                    />
                </Form.Item>
                <Form.Item
                    label="Телефон"
                    // name="telephone"
                >
                    <Input
                        onChange={e => setValues({...values, telephone: e.target.value})}
                        value={values.telephone}
                    />
                </Form.Item>
                <Row justify="end">
                    <Space>
                        <Form.Item>
                            <Button type="default" onClick={() => closeModal()}>
                                Отмена
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Space>
                </Row>
            </Form>
        </Spin>
    );
};

export default UserModal;