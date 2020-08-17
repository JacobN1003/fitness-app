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
            absImages: [],
            bicepsImages: [],
            tricepsImages: [],
            chestImages: [],
            backImages: [],
            shoulderImages: [],
            legImages: [],
            calfImages: []
        }
        this.getExercises = this.getExercises.bind(this)
        this.getAndSortImages = this.getAndSortImages.bind(this)
        this.toggleExercises = this.toggleExercises.bind(this)
    }

    componentDidMount(){
        this.getExercises()
        this.getAndSortImages()
    }

    getExercises = () => {
        axios.get("/exercises").then( response => {
            this.setState({exercises: response.data.data, isLoading: false})
        })
        return true
    }

    getAndSortImages = () => {
        axios.get("/exerciseimages").then( response => {
            let abs = [], biceps = [], triceps = [], chest = [], back = [], shoulder = [], leg = [], calf = []
            let absID = [56,34,125,176,4,32,91,93]
            let bicepsID = [46,86,134,138,193,242,231,3,24,26,74,81,129]
            let tricepsID = [25, 45, 84,232,38,88,29,82]
            let chestID = [68,83,172,195,192,15,77,18,73,16,61,30,97,98,100,122,163,71,41,17,73,4,32,91,93]
            let backID = [8,151,137,150,50,116,62,36,181,76,106,59,109,110,11,9,37,143,161,244]
            let shoulderID = [119,123,152,148,53,241,266,20,47,119,123,152,148,53,241,266,20,47]
            let legID = [113,130,191,111,7,5,55,6,54,39,177,72,133,22,118,117,154,113,117,118,22,133]
            let calfID = [13]

            response.data.data.map(each => {
                if(absID.includes(each.id)) abs.push(each)
                if(bicepsID.includes(each.id)) biceps.push(each)
                if(tricepsID.includes(each.id)) triceps.push(each)
                if(chestID.includes(each.id)) chest.push(each)
                if(backID.includes(each.id)) back.push(each)
                if(shoulderID.includes(each.id)) shoulder.push(each)
                if(legID.includes(each.id)) leg.push(each)
                if(calfID.includes(each.id)) calf.push(each)
            })

            this.setState({ exerciseimages: response.data.data, isLoading: false, absImages: abs,
                bicepsImages: biceps, tricepsImages: triceps, chestImages: chest, backImages: back,
                shoulderImages: shoulder, legImages: leg, calfImages: calf
            })
        })
        return true
    }

    toggleExercises = () => {
        this.setState({ showCards: !this.state.showCards, showExercises: !this.state.showExercises}) 
    }

    render() {
        const { showCards, showExercises, exercises, exerciseimages, isLoading } = this.state
        //console.log(this.state)
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
