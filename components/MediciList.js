import React, { useContext } from "react";
import Medicine from "./Medicine";
import { Col,Row,Container } from "react-bootstrap";
import Mcontext from "../Store/Mcontext";
const MedicineList =()=>{
    const ctx=useContext(Mcontext)
    return (
        <>
    <section className="h-100 text-center w-100 mt-6" id="cart" style={{marginTop:'62px'}}>
    <h1
        className="text-center fw-bold mb-5"
        style={{ fontFamily: "Metal Mania" }}
    >
        Medicines
    </h1>
  
  <Container>

            <Container sm={2} md={3}>
                <Row>
                    <Col>
                        <h3 className="fw-bold">Item</h3>
                    </Col>
                    <Col>
                        <h3 className="fw-bold">Description</h3>
                    </Col>
                    <Col>
                        <h3 className="fw-bold">Price</h3>
                    </Col>
                    <Col>
                        <h3 className="fw-bold">Quantity</h3>
                    </Col>
                </Row>
                {ctx.store.map((item, index) => (

                    <Medicine key={index} name={item.name} price={item.price} id={item.id} amount={item.amount} description={item.description}
                    />
                ))}
            </Container>
    </Container>
</section>
</>
    )
}
export default MedicineList;