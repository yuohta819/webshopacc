import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

function MarqueeText() {
    const [data, setData] = useState("")
    const host = import.meta.env.VITE_API_URL_BACKEND
    const action = `${host}/robux`
    try {
        fetch(action)
            .then(res => res.json())
            .then(data => {
                data.map((item, index) => {
                    setData(item.mar)
                })
            })
    } catch (error) {
        console.log("error")
    } 
    return (
        <Marquee speed={50} gradient={false} style={{ marginTop: "20px" }}>
            {data}
        </Marquee>
    );
};

export default MarqueeText;