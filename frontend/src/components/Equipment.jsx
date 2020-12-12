import React, { Component } from 'react'
import {Container, Row, Col, Card, CardImg, CardImgOverlay, CardTitle, Button} from 'reactstrap'
import barbell from "../imgs/barbell.jpg"
import bench from "../imgs/bench.jpg"
import dumbbell from "../imgs/dumbbell.jpg"
import gymmat from "../imgs/gymmat.jpg"
import inclinebench from "../imgs/inclinebench.jpg"
import kettlebell from "../imgs/kettlebell.jpg"
import pullupbar from "../imgs/pullupbar.jpg"
import swissball from "../imgs/swissball.jpg"
import szbar from "../imgs/szbar.jpg"
import none from "../imgs/none.jpg"
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
        this.getImages = this.getImages.bind(this)
    }

    eachEquipment = (equipment) => {
        this.setState({showInfo: !this.state.showInfo, equipInfo: equipment})
    }

    getImages = (name) =>{
        switch(name){
            case "Barbell":
                return barbell
            case "Bench":
                return bench
            case "Dumbbell":
                return dumbbell
            case "Gym mat":
                return gymmat
            case "Incline bench":
                return inclinebench
            case "Kettlebell":
                return kettlebell
            case "none (bodyweight exercise)":
                return none
            case "Pull-up bar":
                return pullupbar
            case "Swiss Ball":
                return swissball
            case "SZ-Bar":
                return szbar
        }
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
                                        <Card id="each-equip" key={id} onClick={()=>this.eachEquipment(equipment)}>
                                            <CardImg width="100%" src={this.getImages(equipment.name)} alt="default alt thing" />
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
