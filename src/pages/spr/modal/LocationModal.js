import React, {useState} from 'react';
import {Alert, Button, Form, Input, Row, Space, Spin} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const LocationModal = (props) => {

    const parent = props.parent;
    const [values, setValues] = useState(props.values);
    const {isSaving} = useSelector(state => state.location)
    const {saveLocation} = useActions();
    const [error, setError] = useState();

    const submitForm = () => {
        let temp =values;

        if (parent === null) {
            temp = {...temp, type: 'country'}
        }else {
            if (parent.type === 'country') {
                temp = {...temp, type: 'subject', location: parent}
            }
            if (parent.type === 'subject') {
                temp = {...temp, type: 'city', location: parent}
            }
            if (parent.type === 'city') {
                temp = {...temp, type: 'address', location: parent}
            }
            if (parent.type === 'address') {
                temp = {...temp, type: 'floor', location: parent}
            }
            if (parent.type === 'floor') {
                temp = {...temp, type: 'cabinet', location: parent}
            }
        }

        (async function () {
            const result = await saveLocation(temp);
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

    return (
        <Spin tip="Сохранение данных..." spinning={isSaving}>
            <Form onFinish={submitForm} onLoadStart={() => console.log("111")}>
                {error &&
                <Alert message={error} type="error"/>
                }
                <Form.Item
                    label="Наименование"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста укажите наименование'
                        }
                    ]}
                >
                    <Input
                        onChange={e => setValues({...values, name: e.target.value})}
                        value={values.name}
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

export default LocationModal;