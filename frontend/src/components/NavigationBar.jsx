import React, { Component } from 'react'
import { Tooltip, Navbar, NavbarText, NavbarBrand, Button} from 'reactstrap'
import '../css/navigationbar.css'
import LoginForm from './LoginForm.jsx'
import NewUserForm from './NewUserForm.jsx'
import ForgotPasswordForm from './ForgotPasswordForm.jsx'

export default class NavigationBar extends Component {
    constructor(){
        super()
        this.state ={
            loginModal: false,
            newUserModal: false,
            forgotPasswordModal: false,
            tooltipOpen: false
        }
        this.openLoginModal = this.openLoginModal.bind(this)
        this.openNewUserModal = this.openNewUserModal.bind(this)
        this.openForgotPasswordModal = this.openForgotPasswordModal.bind(this)
        this.toggleToolTip = this.toggleToolTip.bind(this)
    }

    openLoginModal = () => {
        this.setState({loginModal: !this.state.loginModal})
    }

    openNewUserModal = () =>{
        this.setState({newUserModal: !this.state.newUserModal})
        this.openLoginModal()
    }

    openForgotPasswordModal = () =>{
        this.setState({forgotPasswordModal: !this.state.forgotPasswordModal})
        this.openLoginModal()
    }

    toggleToolTip = () => {
        this.setState({tooltipOpen: !this.state.tooltipOpen})
    }

    render() {
        const { loginModal, newUserModal, forgotPasswordModal, tooltipOpen } = this.state
       
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

                <LoginForm 
                    loginModal={loginModal} 
                    openLoginModal={this.openLoginModal}
                    openNewUserModal={this.openNewUserModal}
                    />
                <NewUserForm 
                    newUserModal={newUserModal} 
                    openNewUserModal={this.openNewUserModal}
                    />
                <ForgotPasswordForm 
                    forgotPasswordModal={forgotPasswordModal} 
                    openForgotPasswordModal={this.openForgotPasswordModal}
                    />
            </div>
        )
    }
}
