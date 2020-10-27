import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, 
    Collapse, InputGroup, ListGroup, ListGroupItem } from 'reactstrap'
import '../css/userprofile.css'

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
        }
        this.toggleChangeUsername = this.toggleChangeUsername.bind(this)
        this.toggleChangeEmail = this.toggleChangeEmail.bind(this)
        this.toggleChangePassword = this.toggleChangePassword.bind(this)
        this.submitNewUsername = this.submitNewUsername.bind(this)
        this.submitNewEmail = this.submitNewEmail.bind(this)
        this.submitNewPassword = this.submitNewPassword.bind(this)
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

    render() {
        let {showUserProfile, userInfo}=this.props
        let {showChangeUsername, showChangeEmail, showChangePassword}=this.state
        return (
            <Modal backdrop={true} isOpen={showUserProfile}>
                <ModalHeader charCode="x">
                    {userInfo.user.username}'s Profile
                </ModalHeader>
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
                                <ListGroupItem key={id} id="workouts" tag="button"> 
                                    {each}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        <br/>
                        <Label>Personal Meals</Label>
                        <ListGroup id="meals-col">
                            {userInfo.user.meals.map((each, id) => (
                                    <ListGroupItem key={id} id="meals" tag="button"> 
                                        {each}
                                    </ListGroupItem>
                                ))}
                        </ListGroup>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
