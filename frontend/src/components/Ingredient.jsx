import React, { Component } from 'react'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'

export default class Ingredient extends Component {
    constructor(props){
        super(props)
        this.state = {
           isOpen: this.props.isOpen
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        let {info} = this.props
        return (
            <div>
                <Modal toggle={this.toggleModal} isOpen={this.state.isOpen} >
                    <ModalHeader toggle={this.toggleModal} charCode="x">{info.name}</ModalHeader>
                    <ModalBody id="modal_body">
                        <h2>Nutrition Facts</h2>
                        <p>Total Fat {' ' + info.fat.substring(0, info.fat.length - 2) + 'g'} </p>
                        <p>{' '}Saturated Fat{' ' + info.fat_saturated.substring(0, info.fat_saturated.length - 2) + 'g'}</p>
                        <p>Sodium{' ' + info.sodium.substring(0, info.sodium.length - 2) + 'g'}</p>
                        <p>Total Carbohydrates{' ' + info.carbohydrates.substring(0, info.carbohydrates.length - 2) + 'g'}</p>
                        <p>{' '}Dietary Fiber{' ' + info.fibres.substring(0, info.fibres.length - 2) + 'g'}</p>
                        <p>Protein{' '+ info.protein.substring(0, info.protein.length - 2) + ' g'}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
