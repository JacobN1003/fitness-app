import React, { Component } from 'react'
import {Modal} from 'reactstrap'
import '../css/exercise.css'

export default class Exercise extends Component {
    constructor(props){
        super(props)
        this.state ={
        }
    }
    render() {
        const {info} = this.props
        console.log(info)
        return (
            <div id="exercise-container">
                <Modal>
                    {info.name}
                </Modal>
            </div>
        )
    }
}
