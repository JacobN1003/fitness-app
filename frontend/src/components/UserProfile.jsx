import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, 
    Collapse, InputGroup, ListGroup, ListGroupItem, Row, Col } from 'reactstrap'
import '../css/userprofile.css'
import Exercise from './Exercise.jsx'
import Ingredient from './Ingredient.jsx'
import axios from 'axios'

export default class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            new_username: "",
            new_password: "",
            new_email: "",
            showChangeUsername: false,
            showChangePassword: false,
            showChangeEmail: false,
            showError: false,
            error: "",
            showExercise: false,
            exerciseInfo: {},
            showMeal: false,
            mealInfo: {}
        }
        this.toggleChangeUsername = this.toggleChangeUsername.bind(this)
        this.toggleChangeEmail = this.toggleChangeEmail.bind(this)
        this.toggleChangePassword = this.toggleChangePassword.bind(this)
        this.submitNewUsername = this.submitNewUsername.bind(this)
        this.submitNewEmail = this.submitNewEmail.bind(this)
        this.submitNewPassword = this.submitNewPassword.bind(this)
        this.onExerciseClick = this.onExerciseClick.bind(this)
        this.onMealClick = this.onMealClick.bind(this)
        this.removeWorkout = this.removeWorkout.bind(this)
        this.removeFood = this.removeFood.bind(this)
    }

    componentDidUpdate(prevProps){
        if(this.props.userInfo !== prevProps.userInfo) console.log("stuff changed")
    }

    handleChange = (e) =>{
        let name = e.target.name 
        let value = e.target.value
        this.setState({[name]: value, showError: false})
    }

    toggleChangeUsername = () =>{
        this.setState({showChangeUsername: !this.state.showChangeUsername})
    }

    toggleChangeEmail = () =>{
        this.setState({showChangeEmail: !this.state.showChangeEmail})
    }

    toggleChangePassword = () =>{
        this.setState({showChangePassword: !this.state.showChangePassword})
    }

    submitNewUsername = () =>{
        this.setState({showChangeUsername: false})
    }

    submitNewEmail = () =>{
        this.setState({showChangeEmail: false})
    }

    submitNewPassword = () =>{
        this.setState({showChangePassword: false})
    }

    onExerciseClick = (each) =>{
        this.setState({showExercise: !this.state.showExercise, exerciseInfo: each})
    }

    onMealClick = (each) =>{
        this.setState({showMeal: !this.state.showMeal, mealInfo: each})
    }

    removeWorkout = (each) =>{
        let {userInfo} = this.props
        axios.put('remove_workout', {"username": userInfo.user.username, "workout": each.name})
            .then(response => {
                this.props.updateUser(response.data.data.value)
            })
    }

    removeFood = (each) =>{
        let {userInfo} = this.props
        axios.put('remove_food', {"username": userInfo.user.username, "food": each.name})
            .then(response => {
                this.props.updateUser(response.data.data.value)
            })

    }

    render() {
        let {showUserProfile, userInfo, toggle}=this.props
        let {showChangeUsername, showChangeEmail, showChangePassword, exerciseInfo, mealInfo, showExercise, showMeal}=this.state
        return (
            <Modal backdrop={true} isOpen={showUserProfile}>
                <ModalHeader toggle={toggle} charCode="x">
                    {userInfo.user.username}'s Profile
                </ModalHeader >
                <ModalBody id="user-profile-body" >
                    <Form>
                        <FormGroup>
                                                {/* userInfo.user.username */}
                            <Label>{"Username: "}{userInfo.user.username}</Label> 
                            <Button className="float-right" onClick={this.toggleChangeUsername}>
                                {showChangeUsername ? "Cancel" : "Change"}
                            </Button>
                            <Collapse isOpen={showChangeUsername}>
                                <br/>   
                                <InputGroup>
                                    <Input type="text" name="new_username" onChange={this.handleChange}/>
                                    <Button color="primary" onClick={this.submitNewUsername}>Save</Button>
                                </InputGroup>
                            </Collapse>
                        </FormGroup>
                        <FormGroup>
                            <Label>{"Password: "}{"******"}</Label>
                            <Button className="float-right" onClick={this.toggleChangePassword}>
                                {showChangePassword ? "Cancel" : "Change"}
                            </Button>
                            <Collapse isOpen={showChangePassword}>
                            <br/>
                                <InputGroup>
                                    <Input type="password" name="new_password" onChange={this.handleChange}/>
                                    <Button color="primary" onClick={this.submitNewPassword}>Save</Button>
                                </InputGroup>
                            </Collapse>
                        </FormGroup>
                        <FormGroup>
                            <Label>{"Email: "}{userInfo.user.email}</Label>
                            <Button className="float-right" onClick={this.toggleChangeEmail}>
                                {showChangeEmail ? "Cancel" : "Change"}
                            </Button>
                            <Collapse isOpen={showChangeEmail}>
                            <br/>
                                <InputGroup>
                                    <Input type="text" name="new_email" onChange={this.handleChange}/>
                                    <Button color="primary" onClick={this.submitNewEmail}>Save</Button>
                                </InputGroup>
                            </Collapse>
                        </FormGroup>
                    </Form>
                    
                    <div id="workouts-meals-container">
                        <hr/>
                        <Label>Personal Workouts</Label>
                        <ListGroup id="workouts-col">
                            {userInfo.user.workouts.map((each, id) => (
                                <Row id="row_layout" key={id} >
                                    <ListGroupItem 
                                        xs="10"
                                        style={{backgroundColor:"lightgrey"}} 
                                        id="workouts" 
                                        tag="button" 
                                        onClick={()=>this.onExerciseClick(each)}> 
                                            <span style={{}}>{each.name}</span>
                                    </ListGroupItem>
                                    <ListGroupItem id="workoutsx" xs="2" tag="button" onClick={()=>this.removeWorkout(each)}>x</ListGroupItem>
                                </Row>
                            ))}
                        </ListGroup>
                        {showExercise && <Exercise fromProfile={true} info={exerciseInfo} isOpen={showExercise}/>}
                        <br/>
                        <Label>Personal Meals</Label>
                        <ListGroup id="meals-col">
                            {userInfo.user.meals.map((each, id) => (
                                <Row id="row_layout" key={id} >
                                    <ListGroupItem 
                                        xs="10"
                                        style={{backgroundColor:"lightgrey"}} 
                                        id="meals" 
                                        tag="button" 
                                        onClick={()=>this.onMealClick(each)}> 
                                            <span>{each.name}</span>
                                    </ListGroupItem>
                                    <ListGroupItem id="mealsx" xs="2" tag="button" onClick={()=>this.removeFood(each)} >x</ListGroupItem>
                                </Row>
                                ))}
                        </ListGroup>
                        {showMeal && <Ingredient info={mealInfo} isOpen={showMeal}/>}
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
