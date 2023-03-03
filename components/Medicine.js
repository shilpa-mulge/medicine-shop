import React from "react";
import { Col,Row } from "react-bootstrap";
import MedicineForm from "./MedicineForm";
const Medicine=props=>{
   return (
    <>
     <hr />
            <Row key={props.id} className="justify-content-center align-items-center">
                <Col><p>{props.name}</p>
                </Col>
                <Col><p>{props.description}</p>
                </Col>
                <Col>
                    <h3 className="fw-bold">
                       {props.price}
                    </h3>
                </Col>
                <Col>
                    <MedicineForm name={props.name} description={props.description} price={props.price}/>
                </Col>
            </Row>
        </>
    );   
}
export default Medicine;