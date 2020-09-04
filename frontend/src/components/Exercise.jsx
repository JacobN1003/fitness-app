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
        this.formatDescription = this.formatDescription.bind(this)
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    formatDescription = (data) => {
        let newdata = data.slice(3,-4)
        for(let i = 0; i < 2; i++) newdata = newdata.replace('<p>', '')
        for(let i = 0; i < 2; i++) newdata = newdata.replace('</p>', '')
        for(let i = 0; i < 2; i++) newdata = newdata.replace('<em>', '')
        for(let i = 0; i < 2; i++) newdata = newdata.replace('</em>', '')
        return newdata
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
                        {this.formatDescription(info.description)}
                        <hr/>
                        <p>Muscles:</p> 
                        {info.muscles.map((muscle,id) => (
                            <ul key={id}> {muscle.name} </ul>
                        ))}
                        {info.muscles_secondary.map((muscle,id) => (
                            <ul key={id}> {muscle.name} </ul>
                        ))}
                        <hr/>
                        <p>Equipment:</p>
                        {info.equipment.map((equipment,id) => (
                            <ul key={id}> {equipment.name} </ul>
                        ))}
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button onClick={this.toggleModal}>More Info</Button>
                    </ModalFooter> */}
                </Modal>
            </div>
        )
    }
}
