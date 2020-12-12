import React, { Component } from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, ListGroup, ListGroupItem, Input, Row, Container} from 'reactstrap'
import axios from 'axios'

export default class Ingredient extends Component {
    constructor(props){
        super(props)
        this.state = {
           isOpen: this.props.isOpen,
           added: false,
           newMealName: "",
           openMeals: false,
           openNewMeal: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.addMeal = this.addMeal.bind(this)
        this.addFood = this.addFood.bind(this)
        this.toggleNewMealModal = this.toggleNewMealModal.bind(this)
        this.toggleMeals = this.toggleMeals.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) =>{
        let name = e.target.name 
        let value = e.target.value
        this.setState({[name]: value})
    }

    toggleNewMealModal = () =>{
        this.setState({openNewMeal: !this.state.openNewMeal})
    }

    toggleMeals = () =>{
        this.setState({openMeals: !this.state.openMeals})
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    addMeal = () =>{
        let {userInfo} = this.props
        let {newMealName} = this.state
        axios.put('create_meal', {"username": userInfo.user.username, "meal": newMealName})
            .then(response => {
                this.props.updateUser(response.data.data.value)
            })
        this.setState({added: true, openNewMeal: false})
    }

    addFood = (meal) =>{
        let {info, userInfo} = this.props
        axios.put('add_food', {"username": userInfo.user.username, "meal": meal, "food": info})
            .then(response => {
                this.props.updateUser(response.data.data.value)
            })
        this.setState({added: true, openMeals: false})
    }

    render() {
        let {info, fromProfile, userInfo, isLoggedIn} = this.props
        let {added, openMeals, openNewMeal} = this.state
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
                    {!fromProfile && isLoggedIn && userInfo.user.username !== undefined &&
                    <ModalFooter>
                        <Button 
                            disabled={added}
                            color={added ? "success" : "primary"} 
                            onClick={this.toggleMeals}>
                                {added ? "Personal Meals Updated!":"Add To Your Meals"}
                        </Button>
                    </ModalFooter>}
                </Modal>

                <Modal isOpen={openMeals}>
                    <ModalHeader>{userInfo.user.username + "'s Personal Meals"}</ModalHeader>
                    <ModalBody style={{height:"400px", backgroundColor:"black"}}>
                        <h3 style={{textAlign:"center"}}>Add to..</h3>
                        <Container>
                            <ListGroup id="exercise-col">
                                {userInfo.user.meals.length === 0 ? 
                                <div>
                                    <p style={{color:"darkgrey", textAlign:"center"}}>You Don't Have Any Personal Meals..</p>
                                </div>
                                :
                                userInfo.user.meals.map((meal, id) => (
                                    <Row key={id} >
                                        <ListGroupItem 
                                            style={{backgroundColor:"rgb(45, 45, 45)", color:"white", width:"100%"}}
                                            tag="button" 
                                            onClick={()=>this.addFood(meal.name)}> 
                                                {meal.name}
                                        </ListGroupItem>
                                    </Row>
                                ))}
                            </ListGroup>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleNewMealModal}>Create A New Meal</Button>
                        <Button onClick={this.toggleMeals} >Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={openNewMeal}>
                    <ModalHeader>Create A Personal Meal</ModalHeader>
                    <ModalBody style={{height:'100px'}}>
                        <Input name="newMealName" onChange={this.handleChange} placeholder="name your meal.."/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addMeal}>Create</Button>
                        <Button onClick={this.toggleNewMealModal} >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
