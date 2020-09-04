import React, { Component } from 'react'
import {Container, Row, Col, Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap'
import equipmentImg from "../imgs/equipment.jpg"
import '../css/equipment.css'

export default class Equipment extends Component {
    constructor(props){
        super(props)
        this.state={
            equipment: []
        }
        this.eachEquipment = this.eachEquipment.bind(this)
    }

    eachEquipment = (data) => {
        console.log(data)
    }

    render() {
        const {equipment} = this.props
        console.log(equipment)
        return (
            <div id="outer-container">
                <p id="title">Equipment</p>
                <Container id="equipment-container">
                    <Row id="equipment-row" md="3">
                            {equipment.map((equipment, id)=>(
                                <div key={id}>
                                    <Col key={id} sm="12">
                                        <Card id="each-card" key={id} onClick={()=>this.eachEquipment(equipment)}>
                                            <CardImg width="100%" src={equipmentImg} alt="default alt thing" />
                                            <CardImgOverlay>
                                                <CardTitle>{equipment}</CardTitle>
                                            </CardImgOverlay>
                                        </Card>
                                    </Col>
                                    <br/>
                                </div>
                            ))}
                    </Row>
                </Container>
            </div>
        )
    }
}
