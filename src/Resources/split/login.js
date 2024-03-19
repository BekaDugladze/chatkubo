import React, {Component} from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            logErr: null
        }
    }
    handleEmail(i){
        const email = i.target.value
        this.setState({email: email});
    }
    handlePass(i){
        const pass = i.target.value
        this.setState({pass: pass});
    }
    
    async logIn(e) {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:1000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    pass: this.state.pass
                })
            })
            if(!response.ok){
                this.setState({logErr: 'Error'});
            }
            window.location.href = '/chat'
        }
        catch(e){
            this.setState({logErr: e.message})
        }
    }
    render() {
        return(
            <>
                <form name='login' className='login'>
                    <input type='text' placeholder='email' name='email' value={this.state.email} onChange={(i) => this.handleEmail(i)} required/>
                    <input type='password' placeholder='password' name='password' value={this.state.pass} onChange={(i) => this.handlePass(i)} required/>
                    {this.state.logErr && (
                        <p>{this.state.logErr}</p>
                    )}
                    <button className="normBut" onClick={(e) => this.logIn(e)}>Log In</button>
                </form>
            </>
    )}
}

export default Login