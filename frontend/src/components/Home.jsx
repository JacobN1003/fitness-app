import React, { Component } from 'react'
import { Spinner } from 'reactstrap'
import axios from 'axios'
import '../css/home.css'
import HomeCards from './HomeCards.jsx'
import Exercises from './Exercises.jsx'

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
        }
        this.getExercises = this.getExercises.bind(this)
        this.toggleExercises = this.toggleExercises.bind(this)
    }

    componentDidMount(){
        this.getExercises()
    }

    getExercises = () => {
        axios.get("/exercises").then( response => {
            this.setState({exercises: response.data.data, isLoading: false})
        })
        return true
    }

    

    toggleExercises = () => {
        this.setState({ showCards: !this.state.showCards, showExercises: !this.state.showExercises}) 
    }

    render() {
        const { showCards, showExercises, exercises, exerciseimages, isLoading } = this.state
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
                        toggleExercises={this.toggleExercises} />
                    }
                    {showExercises &&  
                        <Exercises 
                            toggleExercises={this.toggleExercises} 
                            exercises={exercises} 
                            images={exerciseimages}/>
                    }
                </div>}
            </div>
        )
    }
}
