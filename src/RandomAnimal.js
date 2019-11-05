import React from 'react';
import axios from 'axios';

class RandomAnimal extends React.Component {
    constructor() {
        super()
        this.state = {
            token: '',
            newAnimalArr: [],
            // image: [],
            randomLog: 30,
            randomAnimal: '',
            gotAnimal: false,
        }
    }
    componentDidMount() {
        this.authentication()
    }
    authentication() {
        axios({
            method: 'post',
            url: 'https://api.petfinder.com/v2/oauth2/token',
            data: "grant_type=client_credentials&client_id=lWSjPsZx1WhEQdoWOU9N2luD4gfXlBjySDbKD9qEK3cyjoJfAP&client_secret=TvYHcRREzNh60sZCpcpl2f0HsKgAJ59kUivd1KIt"
        })
            .then(response => {
                this.setState({ token: response.data.access_token })
                if (this.state.token) { this.callAxios() }
            })
    }
    callAxios() {
        axios({
            method: 'get',
            url: 'https://api.petfinder.com/v2/animals',
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }

        })
            .then(response => {
                // let animalArr = response.data.animals
                // let midArr = animalArr.filter(animal => animal.status === "adoptable")
                // return midArr
                return response.data.animals.filter(animal => animal.status === "adoptable")
            })
            .then(midArr => {
                console.log(midArr)
                this.setState({
                    newAnimalArr: midArr
                })
            })
            .then(res => {
                console.log(this.state)
                this.allOutput()
            })
    }
    allOutput() {
        console.log(this.state.newAnimalArr)
        if (this.state.newAnimalArr.length !== 0) {
            let randomGen = Math.floor(Math.random() * this.state.newAnimalArr.length)
            this.setState({ randomLog: randomGen }, () => {
                console.log(this.state.randomLog)
                if ((this.state.randomLog !== 30) && (!this.state.gotAnimal)) {
                    let copiedArr = this.state.newAnimalArr.slice()
                    copiedArr.splice(this.state.randomLog, 1)

                    this.setState((state, props) => ({
                        randomAnimal: state.newAnimalArr[state.randomLog],
                        gotAnimal: true,
                        newAnimalArr: copiedArr
                    }))

                }
            })
            console.log(this.state.randomAnimal)

        }


        // if (this.state.randomAnimal.photos) {
        //     const images = this.state.randomAnimal.photos.map((photo) => {
        //         return photo.medium
        //     })
        //     this.setState({ image: images[0] }, () => { images.shift() })
            
        //     // Add functionality to change images
        // } else {
        //     this.setState({ image: [] })
        // }
    }
    newAnimal = () => {
        this.setState({
            gotAnimal: false,
        }, this.allOutput())
    }
    render() {
        console.log(this.state)
        return (
            <div>
                {((this.state.newAnimalArr.length !== 0) && (this.state.randomAnimal)) ?
                    <div>
                        <h1>{this.state.randomAnimal.name}</h1>
                        <h2>{this.state.randomAnimal.gender} {this.state.randomAnimal.species}</h2>
                        <h2>{this.state.randomAnimal.colors.primary} {this.state.randomAnimal.age} {this.state.randomAnimal.breeds.primary}</h2>
                        {(this.state.randomAnimal.photos) ? <img src={this.state.randomAnimal.photos[0].medium} alt='No pictures listed'/> : 'No Photo Available'}
                        <h3>{this.state.randomAnimal.contact.address.city} {this.state.randomAnimal.contact.address.state}</h3>
                        <a href={this.state.randomAnimal.url}>Interested? Learn more here!</a>
                        <h3>House Trained: {(this.state.randomAnimal.attributes.house_trained) ? 'Yes' : 'No'}</h3>
                        <h3>Needs shots: {(this.state.randomAnimal.attributes.shots_current) ? 'No' : 'Yes'}</h3>
                        <h3>Spayed/Neutered: {(this.state.randomAnimal.attributes.spayed_neutered) ? 'Yes' : 'No'}</h3>
                        <h3>Special Needs: {(this.state.randomAnimal.attributes.special_needs) ? 'Yes' : 'No'}</h3>
                        {(this.state.randomAnimal.attributes.declawed !== null) ? <h3>Declawed: {(this.state.randomAnimal.attributes.declawed) ? 'Yes' : 'No'}</h3> : ''}
                        <button onClick={this.newAnimal}>New Animal</button>
                    </div>
                    :
                    <div>
                        <h2>Loading...</h2>
                        <p>If this takes more than a minute, try refreshing the page</p>
                    </div>}
            </div>
        )
    }
}
export default RandomAnimal