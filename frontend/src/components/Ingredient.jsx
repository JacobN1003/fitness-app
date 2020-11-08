import React, { Component } from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap'
import axios from 'axios'

export default class Ingredient extends Component {
    constructor(props){
        super(props)
        this.state = {
           isOpen: this.props.isOpen,
           added: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.addFood = this.addFood.bind(this)
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    addFood = () =>{
        let {info, userInfo} = this.props
        axios.put('add_food', {"username": userInfo.user.username, "food": info})
            .then(response => {
                this.props.updateUser(response.data.data.value)
            })
        this.setState({added: true})
    }

    render() {
        let {info, fromProfile} = this.props
        let {added} = this.state
        return (
            <div>
                <Modal toggle={this.toggleModal} isOpen={this.state.isOpen} style={{width: '400px'}}>
                    <ModalHeader toggle={this.toggleModal} charCode="x">{info.name}</ModalHeader>
                    <ModalBody id="modal_body" style={{backgroundColor:"rgb(24, 24, 24)", color:'white'}}>
                        <h2>Nutrition Facts</h2>
                        <p>Total Fat {' ' + info.fat.substring(0, info.fat.length - 2) + 'g'} </p>
                        <p>{' '}Saturated Fat{' ' + info.fat_saturated.substring(0, info.fat_saturated.length - 2) + 'g'}</p>
                        <p>Sodium{' ' + info.sodium.substring(0, info.sodium.length - 2) + 'g'}</p>
                        <p>Total Carbohydrates{' ' + info.carbohydrates.substring(0, info.carbohydrates.length - 2) + 'g'}</p>
                        <p>{' '}Dietary Fiber{' ' + info.fibres.substring(0, info.fibres.length - 2) + 'g'}</p>
                        <p>Protein{' '+ info.protein.substring(0, info.protein.length - 2) + ' g'}</p>
                    </ModalBody>
                    {!fromProfile && <ModalFooter>
                        <Button 
                            disabled={added}
                            color={added ? "success" : "primary"} 
                            onClick={this.addFood}>
                                {added ? "Personal Meals Updated!":"Add To Your Meals"}
                        </Button>
                    </ModalFooter>}
                </Modal>
            </div>
        )
    }
}
