import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, 
    Collapse, InputGroup, ListGroup, ListGroupItem, Row, Col} from 'reactstrap'
import '../css/userprofile.css'
import Meal from './Meal.jsx'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Workout from './Workout.jsx'

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
            showWorkout: false,
            workoutInfo: {},
            showMeal: false,
            mealInfo: {},
            showPassword: false,
            showSuccess: false,
            successMessage: ""
        }
        this.toggleChangeUsername = this.toggleChangeUsername.bind(this)
        this.toggleChangeEmail = this.toggleChangeEmail.bind(this)
        this.toggleChangePassword = this.toggleChangePassword.bind(this)
        this.submitNewUsername = this.submitNewUsername.bind(this)
        this.submitNewEmail = this.submitNewEmail.bind(this)
        this.submitNewPassword = this.submitNewPassword.bind(this)
        this.onWorkoutClick = this.onWorkoutClick.bind(this)
        this.onMealClick = this.onMealClick.bind(this)
        this.removeWorkout = this.removeWorkout.bind(this)
        this.removeMeal = this.removeMeal.bind(this)
        this.showPassword = this.showPassword.bind(this)
        this.showError = this.showError.bind(this)
        this.toggleSuccess = this.toggleSuccess.bind(this)
        this.toggle = this.toggle.bind(this)
        this.toggleWorkoutModal = this.toggleWorkoutModal.bind(this)
        this.toggleMealModal = this.toggleMealModal.bind(this)
    }

    handleChange = (e) =>{
        let name = e.target.name 
        let value = e.target.value
        this.setState({[name]: value, showError: false, showSuccess: false})
    }

    toggleChangeUsername = () =>{
        this.setState({showChangeUsername: !this.state.showChangeUsername, showError: false, showSuccess: false})
    }

    toggleChangeEmail = () =>{
        this.setState({showChangeEmail: !this.state.showChangeEmail, showError: false, showSuccess: false})
    }

    toggleChangePassword = () =>{
        this.setState({showChangePassword: !this.state.showChangePassword, showError: false, showSuccess: false})
    }

    submitNewUsername = () =>{
        let {userInfo} = this.props
        axios.put('change_username', 
            {"username": userInfo.user.username, "updated_username": this.state.new_username})
            .then(response => {
                if(response.data.message === "ok"){ 
                    localStorage.setItem("username", this.state.new_username)
                    this.toggleSuccess()
                    this.setState({showChangeUsername: false, successMessage: response.data.success})
                    this.props.updateUser(response.data.data.value)
                }
                else {
                    this.showError()
                    this.setState({error: response.data.message})
                }
            })
    }

    submitNewEmail = () =>{
        let {userInfo} = this.props
        axios.put('change_email', 
            {"username": userInfo.user.username, "updated_email": this.state.new_email})
            .then(response => {
                if(response.data.message === "ok"){ 
                    this.toggleSuccess()
                    this.setState({showChangeEmail: false, successMessage: response.data.success})
                    this.props.updateUser(response.data.data.value)
                }
                else {
                    this.showError()
                    this.setState({error: response.data.message})
                }
            })
    }

    submitNewPassword = () =>{
        let {userInfo} = this.props
        axios.put('change_password', 
            {"username": userInfo.user.username, "updated_password": this.state.new_password})
            .then(response => {
                if(response.data.message === "ok"){ 
                    this.toggleSuccess()
                    this.setState({showChangePassword: false, successMessage: response.data.success})
                    this.props.updateUser(response.data.data.value)
                }
                else {
                    this.showError()
                    this.setState({error: response.data.message})
                }
            })
    }

    onWorkoutClick = (workout) =>{
        this.setState({showWorkout: !this.state.showWorkout, workoutInfo: workout})
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

    removeMeal = (each) =>{
        let {userInfo} = this.props
        axios.put('remove_food', {"username": userInfo.user.username, "food": each.name})
            .then(response => {
                this.props.updateUser(response.data.data.value)
            })
    }

    showPassword = () =>{
        this.setState({showPassword: !this.state.showPassword})
    }

    showError = () =>{
        this.setState({showError: true})
    }

    toggleSuccess = () => {
        this.setState({showSuccess: true})
    }

    toggle = () =>{
        this.props.toggle()
        this.setState({showSuccess: false})
    }

    toggleWorkoutModal = () =>{
        this.setState({showWorkout: !this.state.showWorkout})
    }

    toggleMealModal = () =>{
        this.setState({showMeal: !this.state.showMeal})
    }

    render() {
        let {showUserProfile, userInfo}=this.props
        let {showChangeUsername, showChangeEmail, showChangePassword, workoutInfo, mealInfo, 
            showWorkout, showMeal, showPassword, showError, error, showSuccess, successMessage}=this.state
        console.log("stuff did things..")
        return (
            <Modal backdrop={true} isOpen={showUserProfile}>
                <ModalHeader toggle={this.toggle} charCode="x">
                    {userInfo.user.username}'s Profile
                </ModalHeader >
                <ModalBody id="user-profile-body" >
                    <Form>
                        <FormGroup>
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
                                    <Input type={showPassword ? "password" : "text"} name="new_password" onChange={this.handleChange}/>
                                    <Button color="primary" onClick={this.submitNewPassword}>Save</Button>
                                    <Button color="warning" onClick={this.showPassword}>
                                        <FontAwesomeIcon icon={faEye}/>
                                    </Button>
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
                    
                    <Collapse isOpen={showError}>
                        <p style={{color:"red", textAlign:"center"}}>{error}</p>
                    </Collapse>

                    <Collapse isOpen={showSuccess}>
                        <p style={{color:"green", textAlign:"center"}}>{successMessage}</p>
                    </Collapse>
            
                    <br/>
                    <div id="workouts-meals-container">
                        <hr/>
                        <h3>Personal Workouts</h3>
                        <ListGroup id="workouts-col">
                            {userInfo.user.workouts.length === 0 ? 
                            <p style={{color:"darkgrey", textAlign:"center"}}>No workouts created..</p> :
                            userInfo.user.workouts.map((each, id) => (
                                <Row id="row_layout" key={id} >
                                    <ListGroupItem 
                                        xs="10"
                                        style={{backgroundColor:"lightgrey"}} 
                                        id="workouts" 
                                        tag="button" 
                                        onClick={()=>this.onWorkoutClick(each)}> 
                                            <span style={{}}>{each.name}</span>
                                    </ListGroupItem>
                                    <ListGroupItem id="workoutsx" xs="2" tag="button" onClick={()=>this.removeWorkout(each)}>
                                        <p style={{fontWeight:"800", paddingTop:"15px", color:"white"}}>X</p>
                                    </ListGroupItem>
                                </Row>
                            ))}
                        </ListGroup>
                        {showWorkout && <Workout toggleModal={this.toggleWorkoutModal} userInfo={userInfo} fromProfile={true} workoutInfo={workoutInfo} isOpen={showWorkout}/>}
                        
                        <hr/>
                        <h3>Personal Meals</h3>
                        <ListGroup id="meals-col">
                            {userInfo.user.meals.length === 0 ? 
                            <p style={{color:"darkgrey", textAlign:"center"}}>No meals selected..</p> :
                            userInfo.user.meals.map((each, id) => (
                                <Row id="row_layout" key={id} >
                                    <ListGroupItem 
                                        xs="10"
                                        style={{backgroundColor:"lightgrey"}} 
                                        id="meals" 
                                        tag="button" 
                                        onClick={()=>this.onMealClick(each)}> 
                                            <span>{each.name}</span>
                                    </ListGroupItem>
                                    <ListGroupItem id="mealsx" xs="2" tag="button" onClick={()=>this.removeMeal(each)} >
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </ListGroupItem>
                                </Row>
                                ))}
                        </ListGroup>
                        {showMeal && <Meal toggleModal={this.toggleMealModal} fromProfile={true} userInfo={userInfo} info={mealInfo} isOpen={showMeal}/>}
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
