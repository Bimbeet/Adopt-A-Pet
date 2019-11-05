import React from 'react';
import axios from 'axios';

class RandomAnimal extends React.Component {
    constructor(props) {
        super()
        this.state = {
            newAnimalArr: [],
            image: [],
            randomLog: 30,
            randomAnimal: '',
            gotAnimal: false
        }
    }
    componentDidMount() {
        this.callAxios()
    }
    callAxios() {
        // axios({
        //     method: 'post',
        //     url: 'https://api.petfinder.com/v2/oauth2/token',
        //     data: "grant_type=client_credentials&client_id=lWSjPsZx1WhEQdoWOU9N2luD4gfXlBjySDbKD9qEK3cyjoJfAP&client_secret=TvYHcRREzNh60sZCpcpl2f0HsKgAJ59kUivd1KIt"
        //   })
        //   .then(response => {
        //     console.log(response.data)
        //   })
        axios({
            method: 'get',
            url: 'https://api.petfinder.com/v2/animals',
            headers: {
                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQwOTNlYmQ4NzY2MDc5MWNiOGMyMzY3MDY4OTBjZGVjYWQ3YTlmYmFhYzZjOTQzNTcxZjE0OTE5NTc4YmYxZDMzNTRjYTQxNGIwZjk0MTM4In0.eyJhdWQiOiJsV1NqUHNaeDFXaEVRZG9XT1U5TjJsdUQ0Z2ZYbEJqeVNEYktEOXFFSzNjeWpvSmZBUCIsImp0aSI6ImQwOTNlYmQ4NzY2MDc5MWNiOGMyMzY3MDY4OTBjZGVjYWQ3YTlmYmFhYzZjOTQzNTcxZjE0OTE5NTc4YmYxZDMzNTRjYTQxNGIwZjk0MTM4IiwiaWF0IjoxNTcyOTY1ODg0LCJuYmYiOjE1NzI5NjU4ODQsImV4cCI6MTU3Mjk2OTQ4NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.l8QxLLQqAHtbpoKG1Fa0vZIaxKC9eND-1cU63rQV71Td2eoFqiJ7tHtdDgj0JF5AmH5IGohyz5T4_lu-_kg2EHy2VXMKYGr17MaT_VEG2nV6fXAvLIqQy-92hxh0itjy2gwlmlvxtporCl66b2oUgSo4EdhoZK6sYllq-3RXOSzdX2iX7X28b72VGnhcVbBOxHYPhQtG7mBM7OrzBj__Sje309TVM_hZEtIP7sKETM_MHFJhFiqJ4ersScMSqIJ3pG7e3XpGhVImpWriX9T19BsFS4vbGOXz4sNDlv6PadjRKBmsehqO8pDIltTSPBsxihhOuMIItVOVh2gee2TX3g"
            }

        })
            .then(response => {
                let animalArr = response.data.animals
                let midArr = animalArr.filter(animal => animal.status === "adoptable")
                return midArr
            })
            .then(midArr => {
                console.log(midArr)
                this.setState({
                    newAnimalArr: midArr
                })
                console.log(this.state.newAnimalArr)
                if (this.state.newAnimalArr.length !== 0) {
                    let randomGen = Math.floor(Math.random() * this.state.newAnimalArr.length)
                    this.setState({
                        randomLog: randomGen
                    })
                    if ((this.state.randomLog !== 30) && (this.state.gotAnimal === false)) {
                        this.setState({
                            randomAnimal: this.state.newAnimalArr[this.state.randomLog],
                            gotAnimal: true
                        })
                    }
                    console.log(this.state.randomAnimal)
                    this.imageOutput()
                }
            })
    }
    imageOutput() {
        if (this.state.randomAnimal.photos) {
            const images = this.state.randomAnimal.photos.map((photo, i) => {
                return <img key={i} src={photo.medium} alt='' />
            })
            this.setState({
                image: images
            })
        }
    }
    newAnimal = () => {
        this.setState({
            image: []
        })
    }
    render() {
        // let randomLog = (this.state.newAnimalArr.length !== 0) ? Math.floor(Math.random() * this.state.newAnimalArr.length) : 0
        // let display = (this.state.newAnimalArr !== 0) ? 'randomAnimal.name' : 'none'
        return (
            <div>
                {((this.state.newAnimalArr.length !== 0) && (this.state.randomAnimal)) ?
                    <div>
                        <h1>{this.state.randomAnimal.name}</h1>
                        <h2>{this.state.randomAnimal.gender} {this.state.randomAnimal.breeds.primary}</h2>
                        <div className='allImages'>{this.state.image}</div>

                        {/* <button onClick={this.newAnimal}>New Animal</button> */}
                    </div>
                    : 'Loading...'}
            </div>
        )
    }
}
export default RandomAnimal