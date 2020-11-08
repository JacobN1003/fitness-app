import React, { Component } from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap'
import '../css/exercise.css'
import axios from 'axios'

export default class Exercise extends Component {
    constructor(props){
        super(props)
        this.state ={
            isOpen: this.props.isOpen,
            added: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.formatDescription = this.formatDescription.bind(this)
        this.addExercise = this.addExercise.bind(this)
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

    addExercise = () =>{
        let {info, userInfo} = this.props
        axios.put('add_workout', {"username": userInfo.user.username, "exercise": info})
            .then(response => {
                this.props.updateUser(response.data.data.value)
            })
            this.setState({added: true})
    }

    render() {
        const {info, fromProfile} = this.props
        let {added} = this.state
        return (
            <div id="exercise">
                <Modal toggle={this.toggleModal} isOpen={this.state.isOpen} >
                    <ModalHeader toggle={this.toggleModal} charCode="x">{info.name}</ModalHeader>
                    <ModalBody id="modal_body">
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
                    {!fromProfile && 
                        <ModalFooter>
                            <Button 
                            disabled={added}
                            color={added ? "success" : "primary"} 
                            onClick={this.addExercise} >
                                {added ? "Personal Workouts Updated!":"Add To Your Workouts"}
                            </Button>
                        </ModalFooter>}
                </Modal>
            </div>
        )
    }
}
