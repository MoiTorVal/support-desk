import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        // Redirect when logged in
        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset);
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                    <p>Login in to get support</p>
                </h1>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            className='form-control'
                            value={email}
                            onChange={onChange}
                            placeholder='Enter Email'
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            className='form-control'
                            value={password}
                            onChange={onChange}
                            placeholder='Enter Password'
                        />
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
