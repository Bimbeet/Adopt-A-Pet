import React from 'react';
import axios from 'axios';

class RandomAnimal extends React.Component {
    constructor() {
        super()
        this.state = {
            failed: false,
            newAnimalArr: [],
            image: '',
            randomLog: -1,
            randomAnimal: '',
            gotAnimal: false,
            location: '',
            age: '',
            gender: '',
            type: ''
        }
    }
    componentDidMount() {
        this.callAxios()
    }
    callAxios() {
        axios({
            method: 'get',
            url: 'https://api.petfinder.com/v2/animals',
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            },
            params: {
                'limit': 100,
                ...(this.state.location ? { 'location': this.state.location } : {}),
                ...(this.state.age ? { 'age': this.state.age } : {}),
                ...(this.state.gender ? { 'gender': this.state.gender } : {}),
                ...(this.state.type ? { 'type': this.state.type } : {})
            }

        })
            .then(response => {
                return response.data.animals.filter(animal => animal.status === "adoptable")
            })
            .then(midArr => {
                this.setState({
                    newAnimalArr: midArr,
                    failed: false
                })
            })
            .then(res => {
                this.allOutput()
            })
            .catch(() => {
                this.setState({ failed: true })
            })
    }
    allOutput() {
        console.log(this.state.newAnimalArr)
        if (this.state.newAnimalArr.length !== 0) {
            let randomGen = Math.floor(Math.random() * this.state.newAnimalArr.length)
            this.setState({ randomLog: randomGen }, () => {
                if ((this.state.randomLog !== -1) && (!this.state.gotAnimal)) {
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
    submit = (e) => {
        e.preventDefault()
        this.callAxios()
    }
    changeLocation = (e) => {
        this.setState({ location: e.target.value })
    }
    changeAge = (e) => {
        this.setState({ age: e.target.value })
    }
    changeGender = (e) => {
        this.setState({ gender: e.target.value })
    }
    changeType = (e) => {
        this.setState({ type: e.target.value })
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
                        <a href={animal.url} target="_blank" rel="noopener noreferrer">Interested? Learn more here!</a>
                        <div className='info'>
                            <h3>House Trained: {(animal.attributes.house_trained) ? 'Yes' : 'No'}</h3>
                            <h3>Needs shots: {(animal.attributes.shots_current) ? 'No' : 'Yes'}</h3>
                            <h3>Spayed/Neutered: {(animal.attributes.spayed_neutered) ? 'Yes' : 'No'}</h3>
                            <h3>Special Needs: {(animal.attributes.special_needs) ? 'Yes' : 'No'}</h3>
                            {(animal.attributes.declawed !== null) ? <h3>Declawed: {(animal.attributes.declawed) ? 'Yes' : 'No'}</h3> : ''}
                        </div>
                        <button onClick={this.newAnimal}>New Animal</button>
                        <form className='animalSearch' onSubmit={this.submit}>
                            <h2>Search Filters</h2>
                            {(this.state.failed) ? <h4>Error, try again!</h4> : ''}
                            <p>Input your City, State; latitude, longitude; or postal code</p>
                            <label>
                                Location:
                                <input type='text' value={this.state.location} onChange={this.changeLocation} />
                            </label>
                            <input type='submit' value='Submit' />
                            <p>This accepts quite a few different inputs, but is specific. Try dog / cat if your input fails.</p>
                            <label>
                                Type:
                                <input type='text' value={this.state.type} onChange={this.changeType} />
                            </label>
                            <input type='submit' value='Submit' />
                            <p>Input baby, young, adult, or senior (accepts multiple)</p>
                            <label>
                                Age:
                                <input type='text' value={this.state.age} onChange={this.changeAge} />
                            </label>
                            <input type='submit' value='Submit' />
                            <p>Input male or female</p>
                            <label>
                                Gender:
                                <input type='text' value={this.state.gender} onChange={this.changeGender} />
                            </label>
                            <input type='submit' value='Submit' />
                        </form>
                    </div>
                    :
                    (!this.state.failed) ?
                        <div>
                            <h2>Loading...</h2>
                            <p>If this takes more than a minute, try refreshing the page</p>
                        </div> :
                        <h4>Error, try again!</h4>
                }
            </div>
        )
    }
}
export default RandomAnimal