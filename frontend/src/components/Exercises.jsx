import React, { Component } from 'react'

export default class Exercises extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        const {exercises} = this.props
        return (
            <div>
                {<div>
                    {exercises.map((exercise, id) => (
                        <p key={id}>{exercise.name}</p>
                    ))}
                </div>}
            </div>
        )
    }
}
