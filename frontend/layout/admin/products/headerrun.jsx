import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd'
function HeaderRun() {
    const [data, setData] = useState("")
    const host = import.meta.env.VITE_API_URL_BACKEND
    const admin = import.meta.env.VITE_ADMIN
    function handdleSubmit(e) {
        e.preventDefault()
        const action = `${host}/${admin}/changerobux`
        try {
            fetch(action, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        } catch (error) {
            console.log("error")
        }
    }
    function handdleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <form action="" onSubmit={handdleSubmit} style={{textAlign: "center"}}>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" className="form-control" name="mar" onChange={handdleChange} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <Button color="default" htmlType="submit" variant="outlined">
                    Cập Nhật
                </Button>
            </form>
        </>

    );
};

export default HeaderRun;