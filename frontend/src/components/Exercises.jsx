import React, { Component } from 'react'
import {Container, Row, Col, Card, CardImg, CardImgOverlay, CardBody, CardTitle, Button, InputGroup, Input, InputGroupAddon} from 'reactstrap'
import exercisesImg from "../imgs/exercises.jpg"
import '../css/exercises.css'

export default class Exercises extends Component {
    constructor(props){
        super(props)
        this.state = {
            showUpperAndLowerBtns: true,
            showUpperBtns: false,
            showLowerBtns: false
        }
        this.onExerciseClick = this.onExerciseClick.bind(this)
        this.onUpperBodyClick = this.onUpperBodyClick.bind(this)
        this.onLowerBodyClick = this.onLowerBodyClick.bind(this)
        this.onBackClick = this.onBackClick.bind(this)
    }

    onExerciseClick = () => {
        console.log("exercise clicked")
    }

    onUpperBodyClick = () => {
        this.setState({showUpperAndLowerBtns:false, showUpperBtns: true})
    }

    onLowerBodyClick = () => {
        this.setState({showUpperAndLowerBtns:false, showLowerBtns: true})
    }

    onBackClick = () => {
        this.setState({
            showUpperAndLowerBtns: true,
            showUpperBtns: false,
            showLowerBtns: false
        })
    }



    render() {
        const {toggleExercises, exercises} = this.props
        const {showUpperAndLowerBtns, showUpperBtns, showLowerBtns} = this.state
        return (
            <Container id="exercise-container">
                <Row>
                    {showUpperAndLowerBtns && 
                        <Col id="upperbtn-lowerbtn-col" >
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onUpperBodyClick}>Upper Body</Button>
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onLowerBodyClick}>Lower Body</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={toggleExercises}>&lt;-</Button>
                        </Col>
                    }
                    {showUpperBtns &&
                        <Col id="upperbtn-col">
                            <Button size="sm" style={{marginRight:'5px'}}>Chest</Button>
                            <Button size="sm" style={{marginRight:'5px'}}>Back</Button>
                            <Button size="sm" style={{marginRight:'5px'}}>Shoulders</Button>
                            <Button size="sm" style={{marginRight:'5px'}}>Arms</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={this.onBackClick}>&lt;-</Button>
                        </Col>
                    }
                    {showLowerBtns &&
                        <Col id="lowerbtn-col">
                            <Button size="sm" style={{marginRight:'5px'}} >Upper Legs</Button>
                            <Button size="sm" style={{marginRight:'5px'}}>Calves</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={this.onBackClick}>&lt;-</Button>
                        </Col>
                    }
                </Row>
                <Row>
                    {exercises.map((exercise, id) => (
                        <Col id="exercise-col" key={id} sm="12" md="4">
                            <div id="each-exercise-div" onClick={this.onExerciseClick}>
                                <Card id="each-exercise" >
                                    <CardImg id="exercise-img" top width="100%" src={exercisesImg} alt="exercises"/>
                                    <CardImgOverlay id="exercise-img-overlay">
                                        <CardBody id="exercise-body">
                                            <CardTitle id="exercise-title">{exercise.name}</CardTitle>
                                        </CardBody>
                                    </CardImgOverlay>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}
