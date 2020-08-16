import React, { Component } from 'react'
import {Container, Row, Col, CardDeck, Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardSubtitle, Button, Spinner } from 'reactstrap'
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
            muscles: []
        }
        this.getExercises = this.getExercises.bind(this)
    }

    componentDidMount(){
        axios.get("/exercises").then( response => {
            this.setState({exercises: response.data.data, isLoading: false})
        })
    }

    getExercises = () => {
        this.setState({ showCards: !this.state.showCards, showExercises: true }) 
    }

    render() {
        const { showCards, showExercises, exercises, isLoading } = this.state
        console.log(exercises)
        return (
            <div id="home-container">
                {isLoading ? 
                <div id="spinner"> 
                    <Spinner style={{height:'100px', width:'100px'}} color="dark"/> 
                    <br/>
                    <p>Loading...</p>
                </div> :
                <div>
                    {showCards &&  <HomeCards getExercises={this.getExercises} />}
                    {showExercises &&  <Exercises exercises={exercises} />}
                </div>}
            </div>
        )
    }
}
