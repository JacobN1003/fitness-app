import React, { Component } from 'react'
import { Tooltip, Navbar, NavbarBrand, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import '../css/navigationbar.css'
import LoginForm from './LoginForm.jsx'
import NewUserForm from './NewUserForm.jsx'
import ForgotPasswordForm from './ForgotPasswordForm.jsx'
import LogoutForm from './LogoutForm.jsx'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faUserCircle} from '@fortawesome/free-solid-svg-icons'

export default class NavigationBar extends Component {
    constructor(props){
        super(props)
        this.state ={
            loginModal: false,
            newUserModal: false,
            forgotPasswordModal: false,
            tooltipOpen: false,
            userInfo: {},
            isLoggedIn: false,
            showLogout: false
        }
        this.openLoginModal = this.openLoginModal.bind(this)
        this.openNewUserModal = this.openNewUserModal.bind(this)
        this.openForgotPasswordModal = this.openForgotPasswordModal.bind(this)
        this.toggleToolTip = this.toggleToolTip.bind(this)
        this.setUserInfo = this.setUserInfo.bind(this)
        this.userLogout = this.userLogout.bind(this)
        this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
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
        this.setState({userInfo: user, isLoggedIn: true})
        this.props.onUserLogin(user, this.state.isLoggedIn)
    }

    userLogout = () =>{
        this.props.userLogout()
        this.setState({showLogout: !this.state.showLogout})
    }
    
    toggleLogoutModal = () =>{
        this.setState({showLogout: !this.state.showLogout})
    }

    render() {
        const { loginModal, newUserModal, forgotPasswordModal, tooltipOpen, showLogout} = this.state
        const {isLoggedIn, userInfo} = this.props
       //console.log(userInfo)
        return (
            <div>
                <Navbar color="dark" dark>
                    <NavbarBrand className="mr-auto" id="tooltip">The Training Room</NavbarBrand>
                    <Tooltip placement="bottom" isOpen={tooltipOpen} target="tooltip" toggle={this.toggleToolTip}>
                        Data used with WGER Workout Manager
                    </Tooltip>
                    {!isLoggedIn && <Button color="primary" className="mr-2" onClick={this.openLoginModal}> Login </Button>}
                    {isLoggedIn && 
                        <UncontrolledDropdown >
                            <DropdownToggle color="success"> 
                               {userInfo.user.username}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.props.toggleUserProfile}> Profile </DropdownItem>
                                <DropdownItem onClick={this.userLogout} > Logout </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>}
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
                <LogoutForm 
                    toggle={this.toggleLogoutModal}
                    showLogout={showLogout}
                    />
                
            </div>
        )
    }
}
