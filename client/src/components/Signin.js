import React, {useState} from 'react';
import {Box, TextField, Button} from '@mui/material'
import '../pages/Profiles/SignInSignUp.css';
import {useNavigate} from 'react-router-dom';

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === 'ok') {
                    localStorage.setItem('isLoggedIn', true)
                    localStorage.setItem('user', JSON.stringify(data.user))
                    props.handleCurrentUser(data.user)
                    props.handleIsLoggedIn(true)
                    return navigate('/'), {state: {isLoggedIn: true}};

                } else {
                    setIsUnauthorized(true)
                    setTimeout(() => setIsUnauthorized(false), 1500)
                }


            })
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <Box className='signInBox'>
            <h2>Sign In</h2>
            {isUnauthorized ?
                <div className="container">
                    <div className="circle-border"></div>
                    <div className="circle">
                        <div className="error"></div>
                        <span>unauthorized</span>
                    </div>
                </div> : <form onSubmit={(event) => handleSubmit(event)}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label='Email'
                        type='email'
                        className='signInField'
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label='Password'
                        type='password'
                        className='signInField'
                    />
                    <Button type='submit' variant='contained' color='primary' className='signInButton'>
                        Sign In
                    </Button>
                </form>
            }
        </Box>
    );
}

export default Signin;
