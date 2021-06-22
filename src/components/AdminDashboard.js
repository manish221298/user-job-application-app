import React from 'react'
import moment from 'moment'
import axios from 'axios'
//import UserDetails from './UserDetails'
import Popup from "reactjs-popup";
import './style.css'

class AdminDashboard extends React.Component
{
    constructor()
    {
        super()
        this.state={
            candidates:[],
            displayCandidate: [],
            jobTitle:['Front-End Developer','Node.js Developer','MEAN Stack Developer','FULL Stack Developer'],
            selectedJob:'Front-End Developer',
            status: true
        }
    }
    componentDidMount()
    {
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            console.log(response.data)
            const candidates=response.data
            const displayCandidate = response.data
            this.setState({candidates, displayCandidate})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    changeTitle=(title)=>{
        this.setState({selectedJob:title})
    }
    // handleViewDetail=(id)=>{
    //     axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
    //     .then((response)=>{
    //         const candidate=response.data
    //         console.log('display data',candidate)
    //         alert(`${candidate.name}- ${candidate.email}- ${candidate.phone}`)
    //     })
    // }
    handleStatus=(id,status)=>{
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, {status})
        .then((response)=>{
            console.log(response.data)
            const candidates=response.data
            alert(`candidate has been ${candidates.status}`)
            this.setState(prevState=>({
                candidates:prevState.candidates.map(candidate=>{
                    if(candidate._id===candidates._id)
                    {
                        return {...candidates}
                    }
                    else{
                        return {...candidate}
                    }
                })
            }))
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // handleClose = () => {
    //     this.setState((prevState) => {
    //         return {
    //             status: !prevState.status
    //         }
    //     })
    // }

    // showDetails = () => {
    //     this.setState({
    //             status: true
    //     })
    // }

    filter = e => {
        const name = e.target.value
        //console.log(name)
        console.log(this.state.displayCandidate);
        this.state.displayCandidate.map(can => console.log(typeof(can.name)));
        this.setState({
            name,
            candidates: this.state.displayCandidate.filter(candidate =>{
                if(typeof(candidate.name) === 'string') {
                    return candidate.name.toUpperCase().includes(name.toUpperCase());
                }
                return false;    
            }
            
          )
        });
      };

    render()
    {
        return(
            <div>

                <h1 className="text-center text-secondary">Admin Dashboard</h1>
            <div className="container title">
                {
                    this.state.jobTitle.map((title,i)=>{
                        return <button className="btn btn-success ml-5 pl-5" key={i} onClick={()=>{
                            this.changeTitle(title)
                        }}>{title}</button>
                    })
                }
            </div>
                <h2 className="text-center text-secondary">{this.state.selectedJob}</h2>
                <p className="text-center ">List of candidates applied for {this.state.selectedJob}</p>

                <div className="container form-group">
                    <input className="search form-control alert-success"
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Search by name"
                    onChange={this.filter}
                    />
                </div>

                <table border='2' className="table table-striped table-border table-hover table-primary mt-5 ">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.candidates.filter(candidate => candidate.jobTitle === this.state.selectedJob).map((candidate,i)=>{
                                return (
                                    <tr key={i}>
                                        <td>{candidate.name}</td>
                                        <td>{candidate.skills}</td>
                                        <td>{candidate.experience}</td>
                                        <td>{moment(candidate.createdAt).format("MM/DD/YYYY")}</td>
                                        {/* <UserDetails user={candidate} /> */}
                                        <td className="ml-5 pl-5">
                                            {/* <button onClick={()=>{
                                            this.handleViewDetail(candidate._id)
                                            }}>View Details</button> */}
                                                { 
                                                    <Popup trigger={<button className="btn btn-secondary" onClick={this.showDetails}>ViewDetails</button>} position="right center">
                                                        { this.state.status && <div className="popup">
                                                            <h4 className="text-center"><b>{candidate.name} Profile</b></h4>  <hr className=""/>
                                                            <h5><b>Contact Number: </b> {candidate.phone} </h5>
                                                            <h5><b>Email:</b>  {candidate.email} </h5>
                                                            <h5> <b>Skills: </b> {candidate.skills}</h5>
                                                            <h5> <b>Experience:</b> {candidate.experience} </h5>
                                                            <h5><b>Status: {candidate.status} </b></h5>
                                                            {/* <button onClick={this.handleClose}>close</button> */}
                                                        </div>}
                                                    </Popup>
                                                    }
                                        </td>
                                        <td>
                                            {candidate.status==='applied'?(
                                            <div>
                                                <button className="btn btn-secondary ml-2" onClick={()=>{
                                                    this.handleStatus(candidate._id,'shortlisted')
                                                }}>shortlist</button>
                                                <button className="btn btn-secondary ml-2" onClick={()=>{
                                                    this.handleStatus(candidate._id,'rejected')
                                                }}>reject</button>
                                            </div>
                                        ):(
                                            <button className="btn btn-secondary" >{candidate.status}</button>
                                        )}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminDashboard
