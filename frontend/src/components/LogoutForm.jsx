import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

export default class LogoutForm extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }

    render() {
        let {toggle, showLogout} = this.props
        return (
            <Modal isOpen={showLogout} toggle={toggle}>
                <ModalHeader>Goodbye!</ModalHeader>
                <ModalBody style={{backgroundColor:"rgb(24, 24, 24)", color:'white', width: '400px'}}>
                    <p>You have successfully logged out!</p>
                    <br/>
                    <br/>
                    <Button style={{width:"150px"}} color="success" className="float-right" onClick={toggle}>Okay!</Button>
                </ModalBody>
            </Modal>
        )
    }
}
