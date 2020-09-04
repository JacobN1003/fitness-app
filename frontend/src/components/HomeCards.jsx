import React, { Component } from 'react'
import {Col, Card, CardImg, CardImgOverlay, CardBody, CardTitle} from 'reactstrap'
import exercisesImg from "../imgs/exercises.jpg"
import equipmentImg from "../imgs/equipment.jpg"
import nutritionImg from "../imgs/nutrition.jpg"
import '../css/homecard.css'
    

export default class HomeCards extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        const {toggleExercises, toggleEquipment} = this.props
        return (
            <div>
                <Col id="card-container" sm="12" md={{ size: 6, offset: 3 }}>
                        <div className="exercises-div" onClick={toggleExercises}>
                            <Card id="each-card">
                                <CardImg id="card-img" top width="100%" src={exercisesImg} alt="workouts"/>
                                <CardImgOverlay >
                                    <CardBody id="card-body">
                                        <CardTitle id="card-title">Exercises</CardTitle>
                                    </CardBody>
                                </CardImgOverlay>
                            </Card>
                        </div>
                        <br/>
                        <div className="equipment-div" onClick={toggleEquipment}>
                            <Card id="each-card">
                                <CardImg id="card-img" top width="100%" src={equipmentImg} alt="workouts"/>
                                <CardImgOverlay >
                                    <CardBody id="card-body">
                                        <CardTitle id="card-title">Equipment</CardTitle>
                                    </CardBody>
                                </CardImgOverlay>
                            </Card>
                        </div>
                        <br/>
                        <div className="nutrition-div" >
                            <Card id="each-card">
                                <CardImg id="card-img" top width="100%" src={nutritionImg} alt="workouts"/>
                                <CardImgOverlay >
                                    <CardBody id="card-body">
                                        <CardTitle id="card-title">Nutrition</CardTitle>
                                    </CardBody>
                                </CardImgOverlay>
                            </Card>
                        </div>
                    </Col>
            </div>
        )
    }
}
