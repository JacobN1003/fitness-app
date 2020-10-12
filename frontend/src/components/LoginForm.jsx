import React, { Component } from 'react'
import {Modal, ModalHeader, Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

export default class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render() {
        let {loginModal, openLoginModal, openNewUserModal} = this.props
        return (
            <div>
                <Modal isOpen={loginModal} id="login-modal-container">
                    <ModalHeader style={{backgroundColor:"#343a40", color:'white'}}>Login</ModalHeader>
                    <ModalBody style={{backgroundColor:"rgb(24, 24, 24)", color:'white', width: '400px'}}> 
                        <Form>
                            <FormGroup >
                                <Label>Email</Label>
                                <Input  type="email" name="email"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" name="password"></Input>
                            </FormGroup>
                            <div id="register-forgotpw-btncontainer">
                                <Button id="register-btn" color="secondary" size="sm" onClick={openNewUserModal} >New User?</Button>
                                <Button id="forgotpw-btn" color="secondary" size="sm" onClick={openLoginModal}>Forgot Password?</Button>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter style={{backgroundColor:"#343a40", color:'white'}}> 
                        <Button color="primary" onClick={openLoginModal} >Login</Button>
                        <Button color="secondary" onClick={openLoginModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
