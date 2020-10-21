import React, { Component } from 'react'
import {Modal, ModalHeader, Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Collapse } from 'reactstrap'
import axios from 'axios'

export default class NewUserForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            re_password: "",
            email: "",
            showError: false,
            error: "",
            showForm: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) =>{
        let name = e.target.name 
        let value = e.target.value
        this.setState({[name]: value, showError: false})
    }

    onSubmit = () =>{
        let {username, password, re_password, email} = this.state
        try{
            axios.post("/add_user", {"username": username, "password": password, "re_password": re_password, "email": email})
            .then(response => {
                if(response.data.message === "ok"){
                    this.setState({username: "", password: "", re_password: "", email: "", showForm: false})
                }
                else{
                    this.setState({showError: true, error: response.data.message})
                    return
                }
            })
        }
        catch(err){ console.log(err) }
    }

    render() {
        let {newUserModal, openNewUserModal} = this.props
        let {showError, error, showForm} = this.state
        
        return (
            <div>
                 <Modal isOpen={newUserModal} id="login-modal-container">
                    <ModalHeader style={{backgroundColor:"#343a40", color:'white'}}>New User</ModalHeader>
                    <ModalBody style={{backgroundColor:"rgb(24, 24, 24)", color:'white', width: '400px'}}> 
                        <Collapse isOpen={showForm}>
                            <Form>
                                <FormGroup >
                                    <Label>UserName</Label>
                                    <Input  type="text" name="username" onChange={this.handleChange}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input type="password" name="password" onChange={this.handleChange}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Re-Enter Password</Label>
                                    <Input type="password" name="re_password" onChange={this.handleChange}></Input>
                                </FormGroup>
                                <FormGroup >
                                    <Label>Email</Label>
                                    <Input  type="email" name="email" onChange={this.handleChange}></Input>
                                </FormGroup>
                            </Form>
                            <Collapse isOpen={showError}>
                                <p style={{color:"red", textAlign:"center"}}>{error}</p>
                            </Collapse>
                        </Collapse>
                        <Collapse isOpen={!showForm}>
                            <p style={{textAlign:"center", fontSize:"20px"}}>Success!</p>
                            <p style={{textAlign:"center", fontSize:"20px"}}>please attempt to login</p>
                        </Collapse>
                    </ModalBody>
                    <ModalFooter style={{backgroundColor:"#343a40", color:'white'}}> 
                        {showForm && <Button color="primary" onClick={this.onSubmit} >Submit</Button>}
                        <Button color={showForm ? "secondary" : "success"} onClick={openNewUserModal}>
                            {showForm ? "Cancel" : "Okay"}
                        </Button>
                    </ModalFooter>

                </Modal>
            </div>
        )
    }
}
