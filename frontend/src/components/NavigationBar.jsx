import React, { Component } from 'react'
import { Tooltip, Navbar, NavbarText, NavbarBrand, Button} from 'reactstrap'
import '../css/navigationbar.css'
import LoginForm from './LoginForm.jsx'
import NewUserForm from './NewUserForm.jsx'
import ForgotPasswordForm from './ForgotPasswordForm.jsx'

export default class NavigationBar extends Component {
    constructor(props){
        super(props)
        this.state ={
            loginModal: false,
            newUserModal: false,
            forgotPasswordModal: false,
            tooltipOpen: false,
            userInfo: {}
        }
        this.openLoginModal = this.openLoginModal.bind(this)
        this.openNewUserModal = this.openNewUserModal.bind(this)
        this.openForgotPasswordModal = this.openForgotPasswordModal.bind(this)
        this.toggleToolTip = this.toggleToolTip.bind(this)
        this.setUserInfo = this.setUserInfo.bind(this)
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

    setUserInfo = (user) => {
        this.setState({userInfo: user})
    }

    render() {
        const { loginModal, newUserModal, forgotPasswordModal, tooltipOpen, userInfo } = this.state
       console.log(userInfo)
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
                    setUserInfo={this.setUserInfo}
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
