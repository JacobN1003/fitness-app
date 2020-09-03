import React, { Component } from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap'
import '../css/exercise.css'

export default class Exercise extends Component {
    constructor(props){
        super(props)
        this.state ={
            isOpen: this.props.isOpen
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {info} = this.props
        console.log(info)
        return (
            <div id="exercise">
                <Modal toggle={this.toggleModal} isOpen={this.state.isOpen} >
                    <ModalHeader toggle={this.toggleModal} charCode="x">{info.name}</ModalHeader>
                    <ModalBody>
                        <p>Description:</p>
                        {info.description.slice(3, -4)}
                        <hr/>
                        <p>Muscles:</p> 
                        {info.muscles.map(muscle => (
                            <ul> {muscle.name} </ul>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggleModal}>More Info</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
