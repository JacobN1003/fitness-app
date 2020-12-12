import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, 
    Collapse, InputGroup, ListGroup, ListGroupItem, Row} from 'reactstrap'
import Exercise from './Exercise.jsx'

export default class Workout extends Component {
    constructor(props){
        super(props)
        this.state={
            exerciseInfo: {},
            showExercise: false,

        }
        this.onExerciseClick = this.onExerciseClick.bind(this)
    }

    onExerciseClick = (exercise) =>{
        this.setState({showExercise: !this.state.showExercise, exerciseInfo: exercise})
    }

    render() {
        let {workoutInfo, isOpen, userInfo, toggleModal} = this.props
        let {exerciseInfo, showExercise} = this.state
        
        return (
            <div>
                <Modal toggle={this.props.toggleModal} isOpen={isOpen}>
                    <ModalHeader toggle={toggleModal} charCode="x">{workoutInfo.name}</ModalHeader>
                    <ModalBody style={{width:'400px'}}>
                        <h4>Routine</h4>
                        <p>example</p>
                        <p>example</p>
                        <p>example</p>
                        <hr/>
                        <ListGroup>
                            {workoutInfo.exercises.map((exercise, id)=>(
                                <ListGroupItem
                                    key={id} 
                                    tag="button" 
                                    onClick={()=>this.onExerciseClick(exercise)}>
                                    {exercise.name}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        
                    </ModalBody>
                </Modal>

               {showExercise && <Exercise userInfo={userInfo} fromProfile={true} info={exerciseInfo} isOpen={showExercise}/>}
            </div>
        )
    }
}
