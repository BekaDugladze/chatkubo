import React, {Component} from "react";
import '../../.env'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            pass: '',
            repass: '',
            passErr: null,
            regErr: null,
            but: false
        }
    }
    handleName(e){
        const name = e.target.value
        this.setState({name: name});
    }
    handleEmail(i){
        const email = i.target.value
        this.setState({email: email});
    }
    handlePass(i){
        const pass = i.target.value
        this.setState({pass: pass});
    }
    handleRePass(i){
        const rePass = i.target.value
        this.setState({repass: rePass});
    }
    passCheck(){
        if(this.state.pass === this.state.repass){
            this.setState({passErr: null, but: true});
        }
        else{
            this.setState({passErr: 'Password mismatch', but: false});
        }
    }
    async handleSubmit(e) {
        e.preventDefault();
        this.passCheck();
        try{
            if(this.state.but){
            const register = await fetch(`http://localhost:1000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    pass: this.state.pass
                })
            })
            if(!register.ok){
                this.setState({regErr: 'User using this email address already registered'})
            }
            else{
                window.location.href = '/chat'
            }
        }
        }
        catch(e){
            this.setState({regErr: e})
            console.log(e)
        }
      }
    render(){
        return(
            <>
            <form name='login' className='login'>
                <input type='text' placeholder='name, last name' name='name' value={this.state.name} onChange={(e) => this.handleName(e)} required />
                <input type='text' placeholder='email' name='email' value={this.state.email} onChange={(i) => this.handleEmail(i)} required/>
                <input type='password' placeholder='password' name='password'  value={this.state.pass} onChange={(i) => this.handlePass(i)} required/>
                <input type='password' placeholder='Repeat password' name='password'  value={this.state.repass} onChange={(i) => this.handleRePass(i)} required/>
                {this.state.passErr && (
                    <p>{this.state.passErr}</p>
                )}
                <button className="normBut" onClick={(e) => this.handleSubmit(e)}>Register</button>
            </form>
            {this.state.regErr && (
                <p>{this.state.regErr}</p>
            )}
            </>
        )}
}

export default Register