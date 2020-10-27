import React, { Component } from 'react'
import NavigationBar from './NavigationBar'
import Home from './Home'

export default class MainPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            showUserProfile: false,
            showUserWorkouts: false,
            showUserMealPlans: false,
            showUserLogout: false,
            userInfo: {},
            isLoggedIn: false
        }
        this.toggleUserMealPlans = this.toggleUserMealPlans.bind(this)
        this.toggleUserProfile = this.toggleUserProfile.bind(this)
        this.toggleUserWorkouts = this.toggleUserWorkouts.bind(this)
        this.toggleUserlogout = this.toggleUserlogout.bind(this)
        this.onUserLogin = this.onUserLogin.bind(this)
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

    toggleUserlogout = () =>{
        this.setState({showUserLogout: !this.state.showUserLogout})
    }

    onUserLogin = (user, isLoggedIn) =>{
        this.setState({userInfo: user, isLoggedIn: isLoggedIn})
    }

    render() {
        let {showUserProfile, showUserWorkouts, showUserMealPlans, showUserLogout, userInfo, isLoggedIn} = this.state
        console.log(userInfo, isLoggedIn)
        return (
            <div>
                <NavigationBar 
                    toggleUserMealPlans = {this.toggleUserMealPlans}
                    toggleUserProfile={this.toggleUserProfile}
                    toggleUserWorkouts={this.toggleUserWorkouts}
                    toggleUserLogout={this.toggleUserlogout}
                    onUserLogin={this.onUserLogin}
                />
                <Home 
                    showUserProfile={showUserProfile} 
                    showUserWorkouts={showUserWorkouts} 
                    showUserMealPlans={showUserMealPlans} 
                    showUserLogout={showUserLogout}
                    userInfo={userInfo}
                    isLoggedIn={isLoggedIn}
                />
            </div>
        )
    }
}
