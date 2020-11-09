import React, { Component } from 'react'
import {Container, Row, Col, Card, CardImg, CardImgOverlay, CardTitle, Button} from 'reactstrap'
import equipmentImg from "../imgs/equipment.jpg"
import '../css/equipment.css'
import EachEquipment from './EachEquipment.jsx'

export default class Equipment extends Component {
    constructor(props){
        super(props)
        this.state={
            equipment: [],
            equipInfo: {},
            showInfo: false
        }
        this.eachEquipment = this.eachEquipment.bind(this)
    }

    eachEquipment = (equipment) => {
        this.setState({showInfo: !this.state.showInfo, equipInfo: equipment})
    }

    render() {
        const {equipment, toggleEquipment} = this.props
        const {equipInfo, showInfo} = this.state
        console.log(equipInfo)
        return (
            <div id="outer-container">
                <Container id="equipment-container">
                    <Row style={{textAlign:"center"}}>
                        <Button color="info" size="sm" style={{borderRadius:'10px', marginRight: '10px'}} onClick={toggleEquipment}>&lt;-</Button>
                    </Row>
                    <br/>
                    <Row id="equipment-row" md="3">
                            {equipment.map((equipment, id)=>(
                                <div key={id}>
                                    <Col key={id} sm="12">
                                        <Card id="each-card" key={id} onClick={()=>this.eachEquipment(equipment)}>
                                            <CardImg width="100%" src={equipmentImg} alt="default alt thing" />
                                            <CardImgOverlay>
                                                <CardTitle>{equipment.name}</CardTitle>
                                            </CardImgOverlay>
                                        </Card>
                                    </Col>
                                    <br/>
                                </div>
                            ))}
                    </Row>
                </Container>
                <EachEquipment toggle={this.eachEquipment} showInfo={showInfo} equipInfo={equipInfo}/>
            </div>
        )
    }
}
