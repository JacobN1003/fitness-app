import React, { Component } from 'react'
import { Spinner } from 'reactstrap'
import axios from 'axios'
import '../css/home.css'
import HomeCards from './HomeCards.jsx'
import Exercises from './Exercises.jsx'
import Equipment from './Equipment.jsx'

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
            equipment: []
        }
        this.getExercises = this.getExercises.bind(this)
        this.getEquipment = this.getEquipment.bind(this)
        this.toggleExercises = this.toggleExercises.bind(this)
        this.toggleEquipment = this.toggleEquipment.bind(this)
    }

    componentDidMount(){
        this.getExercises()
        this.getEquipment()
    }

    getExercises = () => {
        axios.get("/exercises").then( response => {
            this.setState({exercises: response.data.data, isLoading: false})
        })
        return true
    }

    getEquipment = () => {
        axios.get("/equipment").then( response => {
            this.setState({equipment: response.data.data, isLoading: false})
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

    render() {
        const { showCards, showExercises, showEquipment, exercises, equipment, isLoading } = this.state
        console.log(this.state)
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
                        toggleEquipment={this.toggleEquipment} />
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
                </div>}
            </div>
        )
    }
}
