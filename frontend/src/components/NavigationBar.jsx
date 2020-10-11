import React, { Component } from 'react'
import { Tooltip, Navbar, NavbarText, NavbarBrand, Button, Modal, ModalHeader, 
    ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import '../css/navigationbar.css'

export default class NavigationBar extends Component {
    constructor(){
        super()
        this.state ={
            loginModal: false,
            tooltipOpen: false
        }
        this.openLoginModal = this.openLoginModal.bind(this)
        this.toggleToolTip = this.toggleToolTip.bind(this)
    }

    openLoginModal = () => {
        this.setState({loginModal: !this.state.loginModal})
    }

    toggleToolTip = () => {
        this.setState({tooltipOpen: !this.state.tooltipOpen})
    }

    render() {
        const { loginModal, tooltipOpen } = this.state
        return (
            <div>
                <Navbar color="dark" dark>
                    <NavbarBrand className="mr-auto" id="tooltip">FitnessApp</NavbarBrand>
                    <Tooltip placement="bottom" isOpen={tooltipOpen} target="tooltip" toggle={this.toggleToolTip}>
                        Data used with WGER Workout Manager
                    </Tooltip>
                    <NavbarText className="mr-auto">
                    </NavbarText>
                    <Button color="primary" className="mr-2" onClick={this.openLoginModal}>Login</Button>
                </Navbar>

                <Modal isOpen={loginModal} id="login-modal-container">
                    <ModalHeader style={{backgroundColor:"#343a40", color:'white'}}>Login</ModalHeader>
                    <ModalBody style={{backgroundColor:"rgb(24, 24, 24)", color:'white'}}> 
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
                                <Button id="register-btn" color="secondary" size="sm" onClick={this.openLoginModal} >Register</Button>
                                <Button id="forgotpw-btn" color="secondary" size="sm" onClick={this.openLoginModal}>Forgot Password?</Button>
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
