import React from 'react';
import axios from 'axios';

class OrgFinder extends React.Component {
    constructor() {
        super()
        this.state = {
            called: false,
            location: '',
            allOrgs: [],
            currentOrg: {},
            orgIndex: 0
        }
        // this.handleChange = this.handleChange.bind(this)
        // this.submit = this.submit.bind(this)
    }
    callAxios() {
        axios({
            method: 'get',
            url: 'https://api.petfinder.com/v2/organizations',
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            },
            params: {
                'location': this.state.location,
                'limit': 100
            }
        })
            .then(response => {
                console.log(response.data.organizations)
                return response.data.organizations.filter(org => !!org.name)
            })
            .then(trueOrgs => {
                this.setState({
                    allOrgs: trueOrgs,
                    currentOrg: trueOrgs[0]
                })
            })
    }
    submit = (e) => {
        e.preventDefault()
        this.setState({ called: true })
        this.callAxios()
    }
    handleChange = (e) => {
        this.setState({ location: e.target.value})
    }
    nextOrg = () => {
        (this.state.orgIndex < this.state.allOrgs.length - 1) ? 
        this.setState({
            orgIndex: this.state.orgIndex += 1,
            currentOrg: this.state.allOrgs[this.state.orgIndex]
        }) : 
        this.setState({ 
            orgIndex: 0,
            currentOrg: this.state.allOrgs[this.state.orgIndex]
        })
            
    }
    prevOrg = () => {
        (this.state.orgIndex === 0) ? 
        this.setState({ 
            orgIndex: (this.state.allOrgs.length - 1),
            currentOrg: this.state.allOrgs[this.state.orgIndex]
        }) : 
            this.setState({
            orgIndex: this.state.orgIndex -= 1,
            currentOrg: this.state.allOrgs[this.state.orgIndex]
        })
    }

    // getOrgs(){

    // }
    render() {
        console.log(this.state.currentOrg)
        console.log(this.state.allOrgs)
        console.log(this.state.allOrgs.length - 1)
        console.log(this.state.orgIndex)
        let organization = this.state.currentOrg
        // let orgAddress = organization.address
        return (
            <div>
                {(!this.state.called) ?
                    <div>
                        <h1>Find an Adoption Organization near you!</h1>
                        <p>Input your City, State; latitude,longitude; or postal code here</p>
                        <form onSubmit={this.submit}>
                            <label>
                                Location:
                                <input type='text' value={this.state.location} onChange={this.handleChange}/>
                            </label>
                            <input type='submit' value='Submit'/>
                        </form>
                    </div>
                    :
                    <div>
                        <button className='orgSwitch' onClick={this.prevOrg}>Previous</button>
                        <button className='orgSwitch' onClick={this.nextOrg}>Next</button>
                        <h1>{organization.name}</h1>
                        {/* <h2>{orgAddress.city}, {orgAddress.state}</h2> */}
                        <a href={organization.url} >Check Petfinder listings!</a>{' '}
                        {(organization.website) ? <a href={organization.website}>Visit their site!</a> : ''}
                        {/* {(organization.photos.length !== 0) ? <img src={organization.photos[0].medium} alt=''/> : ''} */}
                        <h2>Email: {organization.email}</h2>
                        <h2>Phone #: {organization.phone}</h2>
                    </div>}
            </div>
        )
    }
}


export default OrgFinder