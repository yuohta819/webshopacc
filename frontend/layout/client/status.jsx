import React from 'react';
import { Steps } from 'antd';
import { useEffect, useState } from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
function Status() {
    const [data, setData] = useState([])
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/bills`
    const link = import.meta.env.VITE_FACEBOOK
    const token = sessionStorage.getItem("token-account")
    const [step, setStep] = useState(0)
    const { Text, Link } = Typography;
    const description = 'This is a description.';
    useEffect(() => {
        fetch(action, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
                "Content-type": "application/json"
            }

        })
            .then(res => res.json())
            .then(data => {
                const newData = data.map((item) => ({
                    ...item,
                    key: item._id
                }))
                setData(newData)
                
            })
    }, [])
    return (
        <>
            {data.map((order ,index) => (
                <div className="title" key={index+1}>
                    <Text type="secondary" style={{marginBottom: 50}}>{order.work}</Text>
                    <Steps
                        style={{ marginBottom: 100 }}
                        size="small"
                        current={parseInt(order.first)}
                        items={[
                            {
                                title: 'Waiting',
                                icon: <SolutionOutlined />
                            },
                            {
                                title: 'In Progress',
                                icon: <LoadingOutlined />
                            },
                            {
                                title: 'Finished',
                                icon: <SmileOutlined />
                            },
                        ]}
                    />
                </div>
            ))}

        </>
    )
}

export default Status;