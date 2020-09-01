import React, { Component } from 'react'
import {Container, Row, Col, Button, ListGroup, ListGroupItem} from 'reactstrap'
import Exercise from './Exercise.jsx'
import '../css/exercises.css'


export default class Exercises extends Component {
    constructor(props){
        super(props)
        this.state = {
            showBtns: "UpperAndLower",
            showUpperBtns: false,
            showLowerBtns: false,
            exerciseList: this.props.exercises,
            showExercise: false,
            exerciseInfo: {}
        }
        this.onExerciseClick = this.onExerciseClick.bind(this)
        this.onUpperBodyClick = this.onUpperBodyClick.bind(this)
        this.onLowerBodyClick = this.onLowerBodyClick.bind(this)
        this.goBackClick = this.goBackClick.bind(this)
        this.onChestClick = this.onChestClick.bind(this)
        this.onBackClick = this.onBackClick.bind(this)
        this.onShouldersClick = this.onShouldersClick.bind(this)
        this.onArmsClick = this.onArmsClick.bind(this)
        this.onLegsClick = this.onLegsClick.bind(this)
        this.onCalvesClick = this.onCalvesClick.bind(this)

    }

    onExerciseClick = (exercise) => {
        console.log(exercise)
        // this.setState({showExercise: !this.state.showExercise, exerciseInfo: exercise})
    }

    onUpperBodyClick = () => {
        let {exercises} = this.props
        let upperBodyCheck = ["Chest","Back","Arms","Shoulders"]
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

    onAbsClick = () => {
        let {exercises} = this.props
        let Abs = []
        exercises.map((exercise)=> {
            if(exercise.category.name === "Abs") Abs.push(exercise)
        })
        this.setState({showBtns: "Core", exerciseList: Abs})
    }

    onChestClick = () => {
        let {exercises} = this.props
        let Chest = []
        exercises.map((exercise)=> {
            if(exercise.category.name === "Chest") Chest.push(exercise)
        })
        this.setState({exerciseList: Chest})
    }
    onBackClick = () => {
        let {exercises} = this.props
        let Back = []
        exercises.map((exercise)=> {
            if(exercise.category.name === "Back") Back.push(exercise)
        })
        this.setState({exerciseList: Back})
    }
    onShouldersClick = () => {
        let {exercises} = this.props
        let Shoulders = []
        exercises.map((exercise)=> {
            if(exercise.category.name === "Shoulders") Shoulders.push(exercise)
        })
        this.setState({exerciseList: Shoulders})
    }
    onArmsClick = () => {
        let {exercises} = this.props
        let Arms = []
        exercises.map((exercise)=> {
            if(exercise.category.name === "Arms") Arms.push(exercise)
        })
        this.setState({exerciseList: Arms})
    }
    onLegsClick = () => {
        let {exercises} = this.props
        let Legs = []
        exercises.map((exercise)=> {
            if(exercise.category.name === "Legs") Legs.push(exercise)
        })
        this.setState({exerciseList: Legs})
    }
    onCalvesClick = () => {
        let {exercises} = this.props
        let Calves = []
        exercises.map((exercise)=> {
            if(exercise.category.name === "Calves") Calves.push(exercise)
        })
        this.setState({exerciseList: Calves})
    }

    goBackClick = () => {
        this.setState({exerciseList: this.props.exercises, showBtns: "UpperAndLower"})
    }

    render() {
        const {toggleExercises} = this.props
        const {showExercise, exerciseInfo, showBtns, exerciseList} = this.state
        console.log(showExercise)
        return (
            <Container id="exercise-container">
                <Row>
                    {showBtns === "UpperAndLower" && 
                        <Col id="upperbtn-lowerbtn-col" >
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onUpperBodyClick}>Upper Body</Button>
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onLowerBodyClick}>Lower Body</Button>
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onAbsClick}>Core</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={toggleExercises}>&lt;-</Button>
                        </Col>
                    }
                    {showBtns === "Upper" &&
                        <Col id="upperbtn-col">
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onChestClick}>Chest</Button>
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onBackClick}>Back</Button>
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onShouldersClick}>Shoulders</Button>
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onArmsClick}>Arms</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={this.goBackClick}>&lt;-</Button>
                        </Col>
                    }
                    {showBtns === "Lower" &&
                        <Col id="lowerbtn-col">
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onLegsClick}>Upper Legs</Button>
                            <Button size="sm" style={{marginRight:'5px'}} onClick={this.onCalvesClick}>Calves</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={this.goBackClick}>&lt;-</Button>
                        </Col>
                    }
                    {showBtns === "Core" &&
                        <Col id="lowerbtn-col">
                            <Button size="sm" style={{marginRight:'5px'}} >Abs</Button>
                            <Button color="info" size="sm" style={{borderRadius:'50px'}} onClick={this.goBackClick}>&lt;-</Button>
                        </Col>
                    }

                </Row>
                <ListGroup id="exercise-col">
                        {exerciseList.map((exercise, id) => (
                            <ListGroupItem key={id} id="each-exercise-div" tag="button" onClick={()=>this.onExerciseClick(exercise)}> 
                                {exercise.name}
                            </ListGroupItem>
                        ))}
                </ListGroup>
                {/* {showExercise && <Exercise info={exerciseInfo}/>} */}
            </Container>
        )
    }
}
