import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

export default class EachEquipment extends Component {
    constructor(props){
        super(props)
        this.state ={

        }
        this.getDescription = this.getDescription.bind(this)
    }

    getDescription = (name) =>{
        if(name === "Barbell"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                        A <b>Barbell</b> is a piece of exercise equipment used in weight training, bodybuilding, weightlifting and powerlifting, 
                        consisting of a long bar, usually with weights attached at each end. Barbells range in length from 4 ft to above 8 ft, 
                        although bars longer than 7.2ft are used primarily by powerlifters and are not commonplace. The central portion of the bar 
                        varies in diameter from 0.98 in to 1.96 in, and is often engraved with a knurled crosshatch pattern to help lifters maintain 
                        a solid grip. Weight plates slide onto the outer portions of the bar to increase or decrease the desired total weight. Collars 
                        are used to prevent plates from moving outward unevenly so that the lifter does not experience uneven force.
                    </p>
                    <p> 
                        The barbell is the longer version of the dumbbell that is used for free weight training and competitive sports, such as powerlifting, 
                        Olympic weight lifting, and CrossFit. Many exercises can be done using the barbell, such as bicep curl, bench press, Olympic 
                        weightlifting, overhead press, deadlift, and squat. Standard barbells are usually an estimated weight of 44 lbs.
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                        &emsp;Squats
                    </p>
                    <p>
                        &emsp;Deadlifts
                    </p>
                    <p>
                        &emsp;Bench Press
                    </p>
                    <p>
                        &emsp;Shoulder Press
                    </p>
                    <p>
                        &emsp;Bent Over Rowing
                    </p>
                </div>
            )
        }
        if(name === "Bench"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                        A weight training <b>Bench</b> is a piece of equipment that has a resemblance to a normal (e.g. park) bench, but is designed for 
                        use in weight training. Weight training benches may be of various designs: fixed horizontal, fixed inclined, fixed in a folded 
                        position, with one adjustable portion, with two or more adjustable portions, with racks to hold bars, etc. In the limit, the 
                        definition of a bench blurs into that of combinations that mix a bench and associated equipment. Benches are manufactured by many 
                        different vendors, in an array of qualities, features, and prices.
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                        &emsp;Bench Press
                    </p>
                    <p>
                        &emsp;Chest Fly
                    </p>
                    <p>
                        &emsp;Triceps Extensions
                    </p>
                </div>
            )
        }
        if(name === "Dumbbell"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                        The <b>Dumbbell</b>, a type of free weight, is a piece of equipment used in weight training. It can be used individually or in pairs, 
                        with one in each hand.
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                    &emsp;Bicep Curls
                    </p>
                    <p>
                    &emsp;Triceps Extensions
                    </p>
                    <p>
                    &emsp;Chest Press
                    </p>
                    <p>
                    &emsp;Shoulder Press
                    </p>
                    <p>
                    &emsp;One Hand Bent Over Rowing
                    </p>
                </div>
            )
        }
        if(name === "Gym mat"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                        A <b>Gym mat</b> is usually a piece of foam (covered in leather) ranging from 1.5-28 inches thick, covered in a vinyl or plastic lining. 
                        The foam ranges in density from relatively firm to very soft.
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                    &emsp;Crunches
                    </p>
                    <p>
                    &emsp;Leg Raises
                    </p>
                    <p>
                    &emsp;Sit Ups
                    </p>
                    <p>
                    &emsp;Abdominal Planks
                    </p>
                </div>
            )
        }
        if(name === "Incline bench"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                        The <b>Incline bench</b> is a variation from the original gym bench. Instead of the bench being perpedicular to the floor, it is inclined to 45 degrees. Adjustable
                        versions exist ranging from 0 to 90 degress for differnt types of desired exercises. 
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                    &emsp;Incline Bench Press
                    </p>
                    <p>
                    &emsp;Incline Chest Fly
                    </p>
                    <p>
                    &emsp;Shoulder Press
                    </p>
                    <p>
                    &emsp;Triceps Extensions
                    </p>
                </div>
            )
        }
        if(name === "Kettlebell"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                        The <b>Kettlebell</b> is a cast iron or cast steel ball with a handle attached to the top (resembling a cannonball with a handle).
                        It is used to perform many types of exercises, including ballistic exercises that combine cardiovascular, strength and flexibility 
                        training. They are also the primary equipment used in the weight lifting sport of kettlebell lifting.
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                    &emsp;Kettlebell Swing
                    </p>
                    <p>
                    &emsp;Sumo Squat
                    </p>
                    <p>
                    &emsp;Goblet Squat
                    </p>
                    <p>
                    &emsp;Leg Lunges
                    </p>
                </div>
            )
        }
        if(name === "none (bodyweight exercise)"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                       <b>None</b>, meaning there is no equipment used for an exercise and the only force used is your own body weight. 
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                    &emsp;Body Weight Squats
                    </p>
                    <p>
                    &emsp;Push Ups
                    </p>
                    <p>
                    &emsp;Sit Ups
                    </p>
                    <p>
                    &emsp;Burpees
                    </p>
                </div>
            )
        }
        if(name === "Pull-up bar"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                        A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands and 
                        pulls up. As this happens, the elbows flex and the shoulders adduct and extend to bring the elbows to the torso. The <b>Pull-up bar</b>
                        is the bar used for a pull-up. There are variations of grips for a pull-up bar inluding; wide-grip, neutral parallel grip, and a 
                        type of rock climbing grip.
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                    &emsp;Pull-ups
                    </p>
                    <p>
                    &emsp;Chin-ups
                    </p>
                    <p>
                    &emsp;Hanging Leg Raises
                    </p>
                </div>
            )
        }
        if(name === "Swiss Ball"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                        A <b>Swiss Balls</b>, also known as a yoga ball, is a ball constructed of soft elastic with a diameter of approximately 
                        14 to 34 inches and filled with air. The air pressure is changed by removing a valve stem and either filling with air or letting the 
                        ball deflate. It is most often used in physical therapy, athletic training and exercise. It can also be used for weight training.
                        The ball is also known by a number of different names, including balance ball, birth ball, 
                        body ball, fitness ball, gym ball, gymnastic ball, physio ball, pilates ball, naval mine, Pezzi ball, stability ball, 
                        Swedish ball, or therapy ball.
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                    &emsp;Crunches
                    </p>
                    <p>
                    &emsp;Leg Raises
                    </p>
                    <p>
                    &emsp;Stability Exercises
                    </p>
                </div>
            )
        }
        if(name === "SZ-Bar"){
            return (
                <div>
                    <p>Description:</p>
                    <p>
                        Originally known as a Dymeck curling bar after its inventor Lewis G. Dymeck, the <b>SZ-Bar</b> is a variant of the 
                        barbell that is often used for biceps curls, upright rows, and lying triceps extensions. The curved profile of the bar in 
                        the grip region allows the user's wrists and forearms to take a more neutral, less supinated position. This reduces the risk 
                        of repetitive stress injury in these exercises. However, when performing the biceps curl, using an EZ curl bar prevents 
                        full contraction of the biceps which can only occur with the wrist fully supinated and thus may prove a less effective exercise.
                    </p>
                    <hr/>
                    <p>Exercise Examples:</p>
                    <p>
                    &emsp;Bent Over Rowing
                    </p>
                    <p>
                    &emsp;Bicep Curls
                    </p>
                    <p>
                    &emsp;Triceps Extensions
                    </p>
                </div>
            )
        }
        else return "nothing found"
    }

    render() {
        let {showInfo, equipInfo, toggle} = this.props
        return (
            <Modal isOpen={showInfo} style={{width:"400px"}}>
                <ModalHeader toggle={toggle} charCode="x">{equipInfo.name}</ModalHeader>
                <ModalBody>
                    {this.getDescription(equipInfo.name)}
                </ModalBody>
            </Modal>
        )
    }
}
