import React from 'react'
import axios from 'axios'
import './style.css'

class UserForm extends React.Component
{
    constructor()
    {
        super()
        this.state={
            name:'',
            email:'',
            number:'',
            job:'',
            experience:'',
            Skills:''
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            phone:this.state.number,
            skills:this.state.Skills,
            jobTitle:this.state.job,
            experience:this.state.experience
        }
        //console.log(formData)

        axios.post('http://dct-application-form.herokuapp.com/users/application-form',formData)
        .then(response=>{
            console.log(response.data)
            
               alert('your application has been submitted')
                this.setState({
                    name:'',
                    email:'',
                    number:'',
                    job:'',
                    experience:'',
                    Skills:''        
                })
            //console.log('response',response.data)
        })
        .catch(err=>{
            console.log('error',err)
        })
    }
    render()
    {
        return (
            <div className="fluid-container div1">
               <h1 className="text-center">Student Application Form</h1>
                <p className="text-center">Fill out the form carefully for Registration</p>
                        <div className="container">
                            <form onSubmit={this.handleSubmit}>
                                 <div className="container form-group">
                                    <label htmlFor='Name'>Full Name</label>
                                    <input  className="form-control alert-primary"
                                        required
                                        type='text'
                                        id='Name'
                                        name='name'
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        placeholder="Manish Kumar"
                                    />
                                 </div>

                                <div className="container form-group">
                                    <label htmlFor='email'>Email Address</label>
                                    <input className="form-control alert-primary"
                                        required
                                        type='text'
                                        id='email'
                                        name='email'
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        placeholder='example@email.com'
                                />
                                </div>

                                <div className="container row form-group">
                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor='number'>Contact Number</label>
                                        <input className="form-control alert-primary"
                                            required
                                            type='text'
                                            id='number'
                                            name='number'
                                            //maxlength="10"
                                            value={this.state.number}
                                            onChange={this.handleChange}
                                            placeholder='+91 9128400410'
                                        />
                                    </div>

                                    <div className="col-sm-12 col-md-6">
                                        <label htmlFor='aFJob'>Applying For Job</label>
                                        <select value={this.state.job} name='job' onChange={this.handleChange} className="form-control alert-primary">
                                            <option>----Select----</option>
                                            <option value='Front-End Developer'>Front-End Developer</option>
                                            <option value="Node.js Developer">Node.js Developer</option>
                                            <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
                                            <option value='FULL Stack Developer'>FULL Stack Developer</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="container form-group">
                                    <label htmlFor='experience'>Experience</label>
                                    <input className="form-control alert-primary"
                                        required
                                        type='text'
                                        id='experience'
                                        name='experience'
                                        value={this.state.experience}
                                        onChange={this.handleChange}
                                        placeholder='Experience (2 years)'
                                    />
                                </div>

                                <div className="container form-group">
                                    <label htmlFor='Skills'>Technical Skills</label>
                                    <textarea className="form-control alert-primary"
                                        required
                                        id='Skills'
                                        name='Skills'
                                        value={this.state.Skills}
                                        onChange={this.handleChange}
                                        placeholder='Technical Skills'
                                    />
                                </div>

                                <input type='submit' value='Send Application' className="form-control alert-danger"/>

                            </form>
                        </div>
            </div>
        )
    }
}
export default UserForm


