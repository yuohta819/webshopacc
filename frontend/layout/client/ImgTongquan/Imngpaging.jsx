import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Pagination, Card, Row, Col } from "antd";
import { useEffect, useState } from "react";
import "../../../public/css/img.css"
const products = [
    { id: 1, image: "https://cdnmedia.baotintuc.vn/Upload/YZmStSDTjb0M07hFJ2gA/files/2021/11/15/roblox-161121.jpg" },
    { id: 2, image: "https://thanhnien.mediacdn.vn/Uploaded/truongnghi/2022_07_15/1-4624.jpg" },
    { id: 3, image: "https://www.xtmobile.vn/vnt_upload/news/01_2024/27/cach-choi-lien-minh-huyen-thoai-xtmobile.jpg" },
    { id: 4, image: "https://thanhnien.mediacdn.vn/Uploaded/truongnghi/2022_02_18/thumb-8631.jpg" },
    { id: 5, image: "https://i.ytimg.com/vi/zyiHZ4vDmPE/maxresdefault.jpg" },
    { id: 6, image: "https://cdn.tgdd.vn/Files/2023/10/29/1553450/1-301023-105735.jpg" },
];

const ProductsPagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 1;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        setTimeout(() => {
            setCurrentPage(currentPage + 1)
        }, 7000)
        if (currentPage == 6) {
            setCurrentPage(1)
        }
    }, [currentPage])
    const displayedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <Row gutter={[16, 16]} justify="center">
                {displayedProducts.map((product) => (
                    <div className="box-1">
                        <Col key={product.id} span={24} style={{ display: 'flex', justifyContent: "center" }}>
                            <Card
                                autoplay={true}
                                arrows
                                prevArrow={<LeftOutlined className="custom-arrow left-arrow" />}
                                nextArrow={<RightOutlined className="custom-arrow right-arrow" />}
                                cover={<img src={product.image} alt={product.name} />}
                                style={{ width: 1156 }}
                            >
                                {product.name}
                            </Card>
                        </Col>
                    </div>
                ))}
            </Row>

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={products.length}
                onChange={handlePageChange}
                style={{ marginTop: 20, textAlign: "center" }}
            />
        </div>
    );
};
export default ProductsPagination;
