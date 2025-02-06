import React, { useEffect, useState } from 'react';
import { Table, Steps, Typography } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined } from '@ant-design/icons';

const { Text } = Typography;

function Status() {
    const [data, setData] = useState([]);
    const host = import.meta.env.VITE_API_URL_BACKEND;
    const action = `${host}/bills`;
    const token = sessionStorage.getItem("token-account");

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
                }));
                setData(newData);
            });
    }, []);

    const columns = [
        { title: 'Công việc', dataIndex: 'work', key: 'work' },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => (
                <Steps
                    size="small"
                    current={parseInt(record.first)}
                    items={[
                        { title: 'Waiting', icon: <SolutionOutlined /> },
                        { title: 'In Progress', icon: <LoadingOutlined /> },
                        { title: 'Finished', icon: <SmileOutlined /> }
                    ]}
                />
            )
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            bordered
        />
    );
}

export default Status;
