import React, { Component } from 'react'
import {Modal, ModalHeader, Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

export default class NewUserForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            re_password: "",
            email: ""
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) =>{
        let name = e.target.name 
        let value = e.target.value
        this.setState({[name]: value})
    }

    onSubmit = () =>{
        
    }

    render() {
        let {newUserModal, openNewUserModal} = this.props
        //console.log(this.state)
        return (
            <div>
                 <Modal isOpen={newUserModal} id="login-modal-container">
                    <ModalHeader style={{backgroundColor:"#343a40", color:'white'}}>New User</ModalHeader>
                    <ModalBody style={{backgroundColor:"rgb(24, 24, 24)", color:'white', width: '400px'}}> 
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
                    </ModalBody>
                    <ModalFooter style={{backgroundColor:"#343a40", color:'white'}}> 
                        <Button color="primary" onClick={openNewUserModal} >Submit</Button>
                        <Button color="secondary" onClick={openNewUserModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
