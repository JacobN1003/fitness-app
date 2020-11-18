import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, 
    Collapse, InputGroup, ListGroup, ListGroupItem, Row} from 'reactstrap'
import Ingredient from './Ingredient.jsx'

export default class Meal extends Component {
    constructor(props){
        super(props)
        this.state={
            ingredientInfo: {},
            showIngredient: false,

        }
        this.onIngredientClick = this.onIngredientClick.bind(this)
    }

    onIngredientClick = (ingredient) =>{
        this.setState({showIngredient: !this.state.showIngredient, ingredientInfo: ingredient})
    }

    render() {
        let {info, isOpen, userInfo} = this.props
        let {ingredientInfo, showIngredient} = this.state
        return (
            <div>
                <Modal toggle={this.props.toggleModal} isOpen={isOpen}>
                    <ModalHeader>{info.name}</ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {info.ingredients.map((ingredient, id)=>(
                                <ListGroupItem
                                    key={id} 
                                    tag="button" 
                                    onClick={()=>this.onIngredientClick(ingredient)}>
                                    {ingredient.name}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </ModalBody>
                </Modal>

               {showIngredient && <Ingredient userInfo={userInfo} fromProfile={true} info={ingredientInfo} isOpen={showIngredient}/>}
            </div>
        )
    }
}
