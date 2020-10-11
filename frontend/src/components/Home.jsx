import React, { Component } from 'react'
import { Spinner } from 'reactstrap'
import axios from 'axios'
import '../css/home.css'
import HomeCards from './HomeCards.jsx'
import Exercises from './Exercises.jsx'
import Equipment from './Equipment.jsx'
import Nutrition from './Nutrition.jsx'

export default class Home extends Component {
    constructor(){
        super()
        this.state = {
            isLoading: true,
            showCards: true,
            showExercises: false,
            showEquipment: false,
            showNutrition: false,
            exercises: [],
            equipment: [],
            ingredients: []
        }
        this.getExercises = this.getExercises.bind(this)
        this.getEquipment = this.getEquipment.bind(this)
        this.toggleExercises = this.toggleExercises.bind(this)
        this.toggleEquipment = this.toggleEquipment.bind(this)
        this.toggleNutrition = this.toggleNutrition.bind(this)
    }

    componentDidMount(){
        this.getExercises()
        this.getEquipment()
        this.getIngredients() 
    }

    getExercises = () => {
        axios.get("/exercises").then( response => {
            this.setState({exercises: response.data.data})
        })
        return true
    }

    getEquipment = () => {
        axios.get("/equipment").then( response => {
            this.setState({equipment: response.data.data})
        })
        return true
    }

    getIngredients = () => {
        axios.get("/ingredients").then( response => {
            this.setState({ingredients: response.data.data, isLoading: false})
        })
        return true
    }

    toggleExercises = () => {
        this.setState({ 
            showCards: !this.state.showCards, 
            showExercises: !this.state.showExercises,
            }) 
    }

    toggleEquipment = () => {
        this.setState({ 
            showCards: !this.state.showCards, 
            showEquipment: !this.state.showEquipment,
           })
    }

    toggleNutrition = () => {
        this.setState({ 
            showCards: !this.state.showCards, 
            showNutrition: !this.state.showNutrition,
            }) 
        }

    render() {
        const { showCards, showExercises, showEquipment, showNutrition, exercises, equipment, ingredients, isLoading } = this.state
        console.log(this.state)
        console.log(localStorage)
        return (
            <div id="home-container">
                {isLoading ? 
                <div id="spinner"> 
                    <Spinner style={{height:'100px', width:'100px'}} color="dark"/> 
                    <br/>
                    <p>Loading...</p>
                </div> :
                <div>
                    {showCards &&  
                        <HomeCards 
                        toggleExercises={this.toggleExercises}
                        toggleEquipment={this.toggleEquipment}
                        toggleNutrition={this.toggleNutrition} />
                    }
                    {showExercises &&  
                        <Exercises 
                            toggleExercises={this.toggleExercises} 
                            exercises={exercises}/>
                    }
                    {showEquipment &&
                        <Equipment
                        toggleEquipment={this.toggleEquipment}
                        equipment={equipment}/>
                    }
                    {showNutrition &&
                        <Nutrition
                            toggleNutrition={this.toggleNutrition}
                            ingredients={ingredients}
                        />}
                </div>}
            </div>
        )
    }
}
