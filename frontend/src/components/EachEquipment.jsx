import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

export default class EachEquipment extends Component {
    constructor(props){
        super(props)
        this.state ={

        }
        this.getDescription = this.getDescription.bind(this)
    }

    getDescription = (name) =>{
        if(name === "Barbell") return "This is a description about the barbell"
        if(name === "Bench") return "This is a description about the barbell"
        if(name === "Dumbbell") return "This is a description about the barbell"
        if(name === "Gym mat") return "This is a description about the barbell"
        if(name === "Incline bench") return "This is a description about the barbell"
        if(name === "Kettlebell") return "This is a description about the barbell"
        if(name === "none (bodyweight exercise)") return "This is a description about the barbell"
        if(name === "Pull-up bar") return "This is a description about the barbell"
        if(name === "Swiss Ball") return "This is a description about the barbell"
        if(name === "SZ-Bar") return "This is a description about the barbell"
        else return "nothing found"
    }

    render() {
        let {showInfo, equipInfo, toggle} = this.props
        return (
            <Modal isOpen={showInfo} style={{width:"400px"}}>
                <ModalHeader toggle={toggle} charCode="x">{equipInfo.name}</ModalHeader>
                <ModalBody>
                    <p>{this.getDescription(equipInfo.name)}</p>
                </ModalBody>
            </Modal>
        )
    }
}
