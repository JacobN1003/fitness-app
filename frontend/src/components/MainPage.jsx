import React, { Component } from 'react'
import NavigationBar from './NavigationBar'
import Home from './Home'
import axios from 'axios'

export default class MainPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            showUserProfile: false,
            showUserWorkouts: false,
            showUserMealPlans: false,
            showUserLogout: false,
            userInfo: {
                'user': {
                    'name': "",
                    'workouts':[],
                    'meals': []
                }},
            isLoggedIn: false
        }
        this.toggleUserMealPlans = this.toggleUserMealPlans.bind(this)
        this.toggleUserProfile = this.toggleUserProfile.bind(this)
        this.toggleUserWorkouts = this.toggleUserWorkouts.bind(this)
        this.userlogout = this.userlogout.bind(this)
        this.onUserLogin = this.onUserLogin.bind(this)
        this.getUser = this.getUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount(){
       this.getUser()
    }

    getUser = () =>{
        let username = localStorage.getItem('username')
        if(username){
                try{
                    axios.post("/getuser", {"username": username})
                    .then(response => {
                        if(response.data.message === "ok") this.setState({userInfo: response.data.data, isLoggedIn: true})
                        else console.log(response.data.message)
                    })
                }
                catch(err){ console.log(err) }
        }
    }

    updateUser = (user) =>{
        this.setState({userInfo: {'user': user}})
    }

    toggleUserProfile = () =>{
        this.setState({showUserProfile: !this.state.showUserProfile})
    }

    toggleUserWorkouts = () =>{
        this.setState({showUserWorkouts: !this.state.showUserWorkouts})
    }

    toggleUserMealPlans = () =>{
        this.setState({showUserMealPlans: !this.state.showUserMealPlans})
    }

    userlogout = () =>{
        this.setState({userInfo:{'user': {
            'name': "",
            'workouts':[],
            'meals': []
        }}, isLoggedIn: false})
        localStorage.removeItem('username')
        try{axios.get("/logout").then(response => {console.log(response.data.message)})}
        catch(err){ console.log(err) }
    }

    onUserLogin = (user, isLoggedIn) =>{
        this.setState({userInfo: user, isLoggedIn: isLoggedIn})
        localStorage.setItem('username', user.user.username)
    }


    render() {
        let {showUserProfile, showUserWorkouts, showUserMealPlans, showUserLogout, userInfo, isLoggedIn} = this.state
        //console.log(userInfo, isLoggedIn)
        return (
            <div>
                <NavigationBar 
                    toggleUserMealPlans = {this.toggleUserMealPlans}
                    toggleUserProfile={this.toggleUserProfile}
                    toggleUserWorkouts={this.toggleUserWorkouts}
                    userLogout={this.userlogout}
                    onUserLogin={this.onUserLogin}
                    isLoggedIn={isLoggedIn}
                    userInfo={userInfo}
                />
                <Home 
                    toggleUserProfile={this.toggleUserProfile}
                    showUserProfile={showUserProfile} 
                    showUserWorkouts={showUserWorkouts} 
                    showUserMealPlans={showUserMealPlans} 
                    showUserLogout={showUserLogout}
                    userInfo={userInfo}
                    isLoggedIn={isLoggedIn}
                    updateUser={this.updateUser}
                />
            </div>
        )
    }
}
