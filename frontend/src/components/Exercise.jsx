import React, { Component } from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, ListGroup, ListGroupItem,
Row, Input } from 'reactstrap'
import '../css/exercise.css'
import axios from 'axios'

export default class Exercise extends Component {
    constructor(props){
        super(props)
        this.state ={
            isOpen: this.props.isOpen,
            added: false,
            openWorkouts: false,
            openNewWorkout: false,
            newWorkoutName: ""
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.formatDescription = this.formatDescription.bind(this)
        this.addExercise = this.addExercise.bind(this)
        this.createWorkout = this.createWorkout.bind(this)
        this.toggleWorkouts = this.toggleWorkouts.bind(this)
        this.toggleNewWorkoutModal = this.toggleNewWorkoutModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) =>{
        let name = e.target.name 
        let value = e.target.value
        this.setState({[name]: value})
    }

    toggleNewWorkoutModal = () =>{
        this.setState({openNewWorkout: !this.state.openNewWorkout})
    }

    toggleWorkouts = () =>{
        this.setState({openWorkouts: !this.state.openWorkouts})
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    formatDescription = (data) => {
        let newdata = data.slice(3,-4)
        for(let i = 0; i < 2; i++) newdata = newdata.replace('<p>', '')
        for(let i = 0; i < 2; i++) newdata = newdata.replace('</p>', '')
        for(let i = 0; i < 2; i++) newdata = newdata.replace('<em>', '')
        for(let i = 0; i < 2; i++) newdata = newdata.replace('</em>', '')
        return newdata
    }

    addExercise = (workout) =>{
        let {info, userInfo} = this.props
        axios.put('add_exercise', {"username": userInfo.user.username, "workout": workout, "exercise": info})
            .then(response => {
                this.props.updateUser(response.data.data.value)
            })
            this.setState({added: true, openWorkouts: false})
    }

    createWorkout = () =>{
        let {userInfo} = this.props
        let {newWorkoutName} = this.state
        axios.put('create_workout', {"username": userInfo.user.username, "new_workout": newWorkoutName})
            .then(response => {
                this.props.updateUser(response.data.data.value)
            })
            this.setState({added: true})
    }

    render() {
        const {info, fromProfile, userInfo, isLoggedIn} = this.props
        let {added, openWorkouts, openNewWorkout} = this.state
        console.log(userInfo)
        return (
            <div id="exercise">
                <Modal toggle={this.toggleModal} isOpen={this.state.isOpen} >
                    <ModalHeader toggle={this.toggleModal} charCode="x">{info.name}</ModalHeader>
                    <ModalBody id="modal_body">
                        <p>Description:</p>
                        {this.formatDescription(info.description)}
                        <hr/>
                        <p>Muscles:</p> 
                        {info.muscles.map((muscle,id) => (
                            <ul key={id}> {muscle.name} </ul>
                        ))}
                        {info.muscles_secondary.map((muscle,id) => (
                            <ul key={id}> {muscle.name} </ul>
                        ))}
                        <hr/>
                        <p>Equipment:</p>
                        {info.equipment.map((equipment,id) => (
                            <ul key={id}> {equipment.name} </ul>
                        ))}
                    </ModalBody>
                    {!fromProfile && isLoggedIn && userInfo.user.username !== undefined &&
                        <ModalFooter>
                            <Button 
                            disabled={added}
                            color={added ? "success" : "primary"} 
                            onClick={this.toggleWorkouts} >
                                {added ? "Personal Workouts Updated!":"Add To Your Workouts"}
                            </Button>
                        </ModalFooter>}
                </Modal>
                
                <Modal isOpen={openWorkouts}>
                    <ModalHeader>{userInfo.user.username + "'s Personal Workouts"}</ModalHeader>
                    <ModalBody>
                        <h3 style={{textAlign:"center"}}>Add to..</h3>
                        <ListGroup>
                            {userInfo.user.workouts.length === 0 ? 
                            <div>
                                <p style={{color:"darkgrey", textAlign:"center"}}>You Don't Have Any Personal Workouts..</p>
                            </div>
                             :
                            userInfo.user.workouts.map((workout, id) => (
                                <Row key={id} >
                                    <ListGroupItem 
                                        style={{backgroundColor:"lightgrey"}} 
                                        tag="button" 
                                        onClick={()=>this.addExercise(workout.name)}> 
                                            {workout.name}
                                    </ListGroupItem>
                                </Row>
                            ))}
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleNewWorkoutModal}>Create A New Workout</Button>
                        <Button onClick={this.toggleWorkouts} >Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={openNewWorkout}>
                    <ModalHeader>Create A Personal Workout</ModalHeader>
                    <ModalBody>
                        <Input name="newWorkoutName" onChange={this.handleChange} placeholder="name your workout.."/>
                        <Button color="primary" onClick={this.createWorkout}>Create</Button>
                        <Button onClick={this.toggleNewWorkoutModal} >Cancel</Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
