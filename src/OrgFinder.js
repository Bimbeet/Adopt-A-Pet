import React from 'react';
import axios from 'axios';

class OrgFinder extends React.Component {
    constructor() {
        super()
        this.state = {
            called: false,
            failed: false,
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
                    currentOrg: trueOrgs[0],
                    called: true,
                    failed: false
                })
            })
            .catch(() => {
                this.setState({ failed: true })
            })
    }
    submit = (e) => {
        e.preventDefault()
        this.callAxios()
    }
    handleChange = (e) => {
        this.setState({ location: e.target.value })
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
    getImage = () => {
        if (this.state.currentOrg.photos.length !== 0) {
            return <img src={this.state.currentOrg.photos[0].medium} alt='' />
        }
    }
    // getOrgs(){

    // }
    render() {
        console.log(this.state.currentOrg)
        console.log(this.state.allOrgs)
        console.log(this.state.currentOrg.photos)
        let organization = this.state.currentOrg
        // let orgAddress = organization.address
        return (
            <div>
                {(!this.state.called) ?
                    <div className='orgFind'>
                        <h1>Find an Adoption Organization near you!</h1>
                        <p>Input your City, State; latitude, longitude; or postal code here</p>
                        <form onSubmit={this.submit}>
                            <label>
                                Location:
                                <input type='text' value={this.state.location} onChange={this.handleChange} />
                            </label>
                            <input type='submit' value='Submit' />
                        </form>
                        {(this.state.failed) ? <h2>Error in location, try again!</h2> : ''}
                    </div>
                    :
                    <div className='orgDisplay'>
                        <button className='orgSwitch' onClick={this.prevOrg}>Previous</button>
                        <button className='orgSwitch' onClick={this.nextOrg}>Next</button>
                        <h1>{organization.name}</h1>
                        <h2>{organization.address.city}, {organization.address.state}</h2>
                        <a href={organization.url} target="_blank">Check Petfinder listings!</a>{' '}
                        {(organization.website) ? <a href={organization.website} target="_blank">Visit their site!</a> : ''}
                        {(organization.photos) ? <div>{this.getImage()}</div> : ''}
                        {(organization.mission_statement) ? <p>{organization.mission_statement}</p> : ''}
                        {(organization.adoption.policy) ? <p>{organization.adoption.policy}</p> : ''}
                        {(organization.email) ? <h2>Email: {organization.email}</h2> : ''}
                        {(organization.phone) ? <h2>Phone #: {organization.phone}</h2> : ''}
                    </div>}
            </div>
        )
    }
}


export default OrgFinder