import React, { Component } from 'react'
import {Container, Button, Input, ListGroup, ListGroupItem, InputGroup} from 'reactstrap'
import '../css/nutrition.css'
import Ingredient from './Ingredient.jsx'

export default class Nutrition extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchResults: [],
            searchWord: "",
            searchHeader: "",
            ingredientInfo: {},
            showIngredient: false
        }
        this.showInfo = this.showInfo.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleInput = (input) => {
        this.setState({ searchWord: input.target.value })
    }

    onSearch = (word) => {
        let word_lower = word.toLowerCase()
        let {ingredients} = this.props
        let results = []
        ingredients.forEach((ingredient) => {
            let reduced = ingredient.name.toLowerCase().split(',')[0]
            if(reduced.includes(word_lower)){
                results.push(ingredient)
            }
        })
        this.setState({searchResults: results, searchHeader: "No Results.."})
        
    }

    showInfo = (ingredient) => {
        this.setState({ingredientInfo: ingredient, showIngredient: !this.state.showIngredient})
    }

    handleKeyPress = (e) =>{
        if(e.charCode === 13){
            this.onSearch(this.state.searchWord)
        } 
    }

    render() {
        let {searchResults, searchWord, searchHeader, showIngredient, ingredientInfo} = this.state
        let {toggleNutrition, userInfo, updateUser, isLoggedIn} = this.props
        return (
            <Container id="nutrition-container">
                <InputGroup>
                    <Button color="info" size="sm" style={{borderRadius:'10px', marginRight: '10px'}} onClick={toggleNutrition}>&lt;-</Button>
                    <Input placeholder="Search food.." onChange={this.handleInput} onKeyPress={this.handleKeyPress}/>
                    <Button id="search-btn" onClick={()=>this.onSearch(searchWord)} >Search</Button>
                </InputGroup>
                <ListGroup id="exercise-col">
                    {searchResults.length === 0 ?
                        <h1 style={{paddingTop:'25px'}}>{searchHeader}</h1>
                        :
                        searchResults.map((result, id) => (
                        <ListGroupItem 
                            key={id} 
                            id="each-exercise-div" 
                            tag="button" 
                            onClick={()=>this.showInfo(result)}> 
                            {result.name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
                {showIngredient && 
                    <Ingredient 
                        updateUser={updateUser} 
                        fromProfile={false} 
                        userInfo={userInfo} 
                        info={ingredientInfo} 
                        isOpen={showIngredient}
                        isLoggedIn={isLoggedIn}/>}
            </Container>
        )
    }
}
