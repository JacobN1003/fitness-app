import React, { Component } from 'react'
import {Navbar, NavbarBrand, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import '../css/navigationbar.css'

export default class NavigationBar extends Component {
    constructor(){
        super()
        this.state ={
            loginModal: false,
        }
    }

    openLoginModal = () => {
        this.setState({loginModal: !this.state.loginModal})
    }

    render() {
        const { loginModal } = this.state
        return (
            <div>
                <Navbar color="dark" dark>
                    <NavbarBrand href="/" className="mr-auto">Fitness App</NavbarBrand>
                    <Button color="primary" className="mr-2" onClick={this.openLoginModal}>Login</Button>
                </Navbar>

                <Modal isOpen={loginModal} id="login-modal-container">
                    <ModalHeader style={{backgroundColor:"#343a40", color:'white'}}>Login</ModalHeader>
                    <ModalBody > 
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
                                <Button id="register-btn" color="info" size="sm" onClick={this.openLoginModal} >Register</Button>
                                <Button id="forgotpw-btn" color="info" size="sm" onClick={this.openLoginModal}>Forgot Password?</Button>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter style={{backgroundColor:"#343a40", color:'white'}}> 
                        <Button color="primary" onClick={this.openLoginModal} >Login</Button>
                        <Button color="secondary" onClick={this.openLoginModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
