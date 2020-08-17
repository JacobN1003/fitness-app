import React, { Component } from 'react'
import {Container, Row, Col, Card, CardImg, CardImgOverlay, CardBody, CardTitle, Button, InputGroup, Input, InputGroupAddon} from 'reactstrap'
import exercisesImg from "../imgs/exercises.jpg"
import '../css/exercises.css'

export default class Exercises extends Component {
    constructor(props){
        super(props)
        this.state = {
            showBtns: "UpperAndLower",
            showUpperBtns: false,
            showLowerBtns: false,
            exerciseList: this.props.exercises
        }
        this.onExerciseClick = this.onExerciseClick.bind(this)
        this.onUpperBodyClick = this.onUpperBodyClick.bind(this)
        this.onLowerBodyClick = this.onLowerBodyClick.bind(this)
        this.goBackClick = this.goBackClick.bind(this)
    }

    onExerciseClick = (exercise) => {
        console.log(exercise)
    }

    onUpperBodyClick = () => {
        let {exercises} = this.props
        let upperBodyCheck = ["Chest","Back","Arms","Shoulders","Abs"]
        let upperBody = []
        exercises.map((exercise) => {
            if(upperBodyCheck.includes(exercise.category.name)) upperBody.push(exercise)
        })
        this.setState({showBtns: "Upper", exerciseList: upperBody})
    }

    onLowerBodyClick = () => {
        let {exercises} = this.props
        let lowerBodyCheck = ["Legs","Calves"]
        let lowerBody = []
        exercises.map((exercise) => {
            if(lowerBodyCheck.includes(exercise.category.name)) lowerBody.push(exercise)
        })
        this.setState({showBtns: "Lower", exerciseList: lowerBody})
    }

    goBackClick = () => {
        this.setState({exerciseList: this.props.exercises, showBtns: "UpperAndLower"})
    }

    render() {
        const {toggleExercises} = this.props
        const {showBtns, exerciseList} = this.state
        
        return (
            <Container id="exercise-container">
                <Row>
                    {showBtns === "UpperAndLower" && 
                        <Col id="upperbtn-lowerbtn-col" >
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onUpperBodyClick}>Upper Body</Button>
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onLowerBodyClick}>Lower Body</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={toggleExercises}>&lt;-</Button>
                        </Col>
                    }
                    {showBtns === "Upper" &&
                        <Col id="upperbtn-col">
                            <Button size="sm" style={{marginRight:'5px'}}>Chest</Button>
                            <Button size="sm" style={{marginRight:'5px'}}>Back</Button>
                            <Button size="sm" style={{marginRight:'5px'}}>Shoulders</Button>
                            <Button size="sm" style={{marginRight:'5px'}}>Arms</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={this.goBackClick}>&lt;-</Button>
                        </Col>
                    }
                    {showBtns === "Lower" &&
                        <Col id="lowerbtn-col">
                            <Button size="sm" style={{marginRight:'5px'}} >Upper Legs</Button>
                            <Button size="sm" style={{marginRight:'5px'}}>Calves</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={this.goBackClick}>&lt;-</Button>
                        </Col>
                    }
                </Row>
                <Row>
                    {exerciseList.map((exercise, id) => (
                        <Col id="exercise-col" key={id} sm="12" md="4">
                            <div id="each-exercise-div" onClick={()=>this.onExerciseClick(exercise)}>
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
