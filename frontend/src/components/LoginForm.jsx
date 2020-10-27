import React, { Component } from 'react'
import {Modal, ModalHeader, Button, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Collapse} from 'reactstrap'
import axios from 'axios'

export default class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            showError: false,
            error: "",
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) =>{
        let name = e.target.name 
        let value = e.target.value
        this.setState({[name]: value, showError: false})
    }

    onSubmit = () => {
        let {username, password} = this.state
        try{
            axios.post("/login", {"username": username, "password": password})
            .then(response => {
                if(response.data.message === "ok"){
                    this.props.setUserInfo(response.data.data)
                    this.setState({username:"", password:""})
                    this.props.openLoginModal()
                }
                else{
                    this.setState({showError: true, error: response.data.message})
                    //console.log(response.data)
                }
            })
        }
        catch(err){ console.log(err) }
    }

    render() {
        let {loginModal, openLoginModal, openNewUserModal} = this.props
        let {error, showError} = this.state
        return (
            <div>
                <Modal isOpen={loginModal} id="login-modal-container">
                    <ModalHeader style={{backgroundColor:"#343a40", color:'white'}}>Login</ModalHeader>
                    <ModalBody style={{backgroundColor:"rgb(24, 24, 24)", color:'white', width: '400px'}}> 
                        <Form>
                            <FormGroup >
                                <Label>Username</Label>
                                <Input  type="text" name="username" onChange={this.handleChange}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" name="password" onChange={this.handleChange}></Input>
                            </FormGroup>
                            <Collapse isOpen={showError}>
                                <p style={{color:"red", textAlign:"center"}}>{error}</p>
                            </Collapse>
                            <div id="register-forgotpw-btncontainer">
                                <Button id="register-btn" color="secondary" size="sm" onClick={openNewUserModal} >New User?</Button>
                                <Button id="forgotpw-btn" color="secondary" size="sm" onClick={openLoginModal}>Forgot Password?</Button>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter style={{backgroundColor:"#343a40", color:'white'}}> 
                        <Button color="primary" onClick={this.onSubmit} >Login</Button>
                        <Button color="secondary" onClick={openLoginModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
