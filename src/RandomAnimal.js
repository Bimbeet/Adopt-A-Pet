import React from 'react';
import axios from 'axios';

class RandomAnimal extends React.Component {
    constructor() {
        super()
        this.state = {
            newAnimalArr: [],
            image: '',
            randomLog: 30,
            randomAnimal: '',
            gotAnimal: false,
        }
    }
      componentDidMount() {
        this.callAxios()
      }
    // componentDidMount() {
    //     this.authentication()
    // }
    // authentication() {
    //     axios({
    //         method: 'post',
    //         url: 'https://api.petfinder.com/v2/oauth2/token',
    //         data: "grant_type=client_credentials&client_id=lWSjPsZx1WhEQdoWOU9N2luD4gfXlBjySDbKD9qEK3cyjoJfAP&client_secret=TvYHcRREzNh60sZCpcpl2f0HsKgAJ59kUivd1KIt"
    //     })
    //         .then(response => {
    //             this.setState({ token: response.data.access_token })
    //             if (this.state.token) { this.callAxios() }
    //         })
    // }
    callAxios() {
        axios({
            method: 'get',
            url: 'https://api.petfinder.com/v2/animals',
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            }

        })
            .then(response => {
                return response.data.animals.filter(animal => animal.status === "adoptable")
            })
            .then(midArr => {
                this.setState({
                    newAnimalArr: midArr
                })
            })
            .then(res => {
                this.allOutput()
            })
    }
    allOutput() {
        console.log(this.state.newAnimalArr)
        if (this.state.newAnimalArr.length !== 0) {
            let randomGen = Math.floor(Math.random() * this.state.newAnimalArr.length)
            this.setState({ randomLog: randomGen }, () => {
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
        }
        if (this.state.randomAnimal.photos[0]) {
            this.setState({ image: this.state.randomAnimal.photos[0].medium })
        } else {
            this.setState({ image: '' })
        }
    }
    newAnimal = () => {
        this.setState({
            gotAnimal: false
        }, this.allOutput())
    }
    render() {
        console.log(this.state)
        let animal = this.state.randomAnimal
        return (
            <div>
                {((this.state.newAnimalArr.length !== 0) && (this.state.randomAnimal)) ?
                    <div className='pet'>
                        <h1>{animal.name}</h1>
                        <h2>{animal.gender} {animal.species}</h2>
                        <h2>{animal.colors.primary} {animal.age} {animal.breeds.primary}</h2>
                        <img src={animal.photos.length !== 0 ? animal.photos[0].medium : ''} alt='No Picture Available' />
                        <h2>{animal.contact.address.city}, {animal.contact.address.state}</h2>
                        <a href={animal.url}>Interested? Learn more here!</a>
                        <div className='info'>
                            <h3>House Trained: {(animal.attributes.house_trained) ? 'Yes' : 'No'}</h3>
                            <h3>Needs shots: {(animal.attributes.shots_current) ? 'No' : 'Yes'}</h3>
                            <h3>Spayed/Neutered: {(animal.attributes.spayed_neutered) ? 'Yes' : 'No'}</h3>
                            <h3>Special Needs: {(animal.attributes.special_needs) ? 'Yes' : 'No'}</h3>
                            {(animal.attributes.declawed !== null) ? <h3>Declawed: {(animal.attributes.declawed) ? 'Yes' : 'No'}</h3> : ''}
                        </div>
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