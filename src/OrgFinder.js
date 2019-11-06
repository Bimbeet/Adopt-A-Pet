import React from 'react';
import axios from 'axios';

class OrgFinder extends React.Component {
    constructor() {
        super()
        this.state = {
            called: false,
            location: ''
        }
    }
    callAxios() {
        axios({
            method: 'get',
            url: 'https://api.petfinder.com/v2/organizations',
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            },
            params: {
                'location': this.state.location
            }
        })
            .then(response => {
                console.log(response.data.organizations)

            })
    }
    submit(e) {
        e.preventDefault()
        this.setState({ called: true })
    }
    handleChange(e) {
        this.setState({ location: e.target.value})
    }
    render() {
        return (
            <div>
                {(!this.state.called) ?
                    <div>
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
                        <h1>Hey</h1>
                    </div>}
            </div>
        )
    }
}


export default OrgFinder