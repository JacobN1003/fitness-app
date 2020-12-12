import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem} from 'reactstrap'
import Ingredient from './Ingredient.jsx'

export default class Meal extends Component {
    constructor(props){
        super(props)
        this.state={
            ingredientInfo: {},
            showIngredient: false,
            fat: 0,
            protein: 0,
            carbs: 0
        }
        this.onIngredientClick = this.onIngredientClick.bind(this)
        this.getTotals = this.getTotals.bind(this)
    }

    componentDidMount(){
        this.getTotals()
    }

    onIngredientClick = (ingredient) =>{
        this.setState({showIngredient: !this.state.showIngredient, ingredientInfo: ingredient})
    }

    getTotals = () =>{
        let fat = 0
        let carbs = 0
        let protein = 0
        this.props.info.ingredients.map((ingredient, id)=>( 
            fat += parseFloat(ingredient.fat),
            carbs = carbs + parseFloat(ingredient.carbohydrates),
            protein = protein + parseFloat(ingredient.protein)
            ))
        this.setState({fat: fat.toFixed(1), carbs: carbs.toFixed(1), protein: protein.toFixed(1)})
    }

    render() {
        let {info, isOpen, userInfo, toggleModal} = this.props
        let {ingredientInfo, showIngredient, fat, carbs, protein} = this.state
        
        return (
            <div>
                <Modal toggle={this.props.toggleModal} isOpen={isOpen}>
                    <ModalHeader toggle={toggleModal} charCode="x">{info.name}</ModalHeader>
                    <ModalBody style={{width:'400px'}}>
                        <h4>Meal Nutrition</h4>
                        <p>Total Fat: {fat}g</p>
                        <p>Total Carbs: {carbs}g</p>
                        <p>Total Protein: {protein}g</p>
                        <hr/>
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
