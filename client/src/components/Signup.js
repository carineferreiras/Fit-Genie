import React, {useState} from 'react';
import {Box, TextField, Button} from '@mui/material';
import '../pages/Profiles/SignInSignUp.css';
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "user":
                        {
                            "firstname": firstName,
                            "lastname": lastName,
                            "email": email,
                            "password": password,
                            "password_confirmation": password,
                            "is_admin": "false"
                        },
                }
            ),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('user', JSON.stringify(data))
                props.handleCurrentUser(data)
                props.handleIsLoggedIn(true)
                return navigate('/'),{state:{isLoggedIn:true}};
            })
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <Box className='signUpBox'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    label='First Name'
                    className='signUpField'
                />
                <TextField
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    label='Last Name'
                    className='signUpField'
                />
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label='Email'
                    type='email'
                    className='signUpField'
                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label='Password'
                    type='password'
                    className='signUpField'
                />
                <TextField
                    value={passwordConfirmation}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label='Confirm Password'
                    type='password'
                    className='signUpField'
                />
                <Button type='submit' variant='contained' color='primary' className='signUpButton'>
                    Sign Up
                </Button>
            </form>
        </Box>
    );
}

export default Signup;