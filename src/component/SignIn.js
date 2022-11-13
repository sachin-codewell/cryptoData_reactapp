import React, { useContext, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import coin from './images/coin.png'
import { LoginURL, ProfileURL } from './config';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { CryptoContext } from './Context';


export default function SignIn() {

    const navigate = useNavigate();
    const { user, setUser } = useContext(CryptoContext);



    //     //fetch user info
    function fetchUserData() {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            fetch(ProfileURL, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                })
        }
        catch (error) {
            console.error(error.response.data);
        }


    }

    //end of fetch function

    let validateschema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid Email")
            .required('Email  is required'),
        password: Yup.string()
            .required('Password  is required'),


    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''


        },
        validationSchema: validateschema,
        onSubmit: async (values, { resetForm }) => {
            await fetch(LoginURL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",

                },
                body: JSON.stringify(values)
            }).then(response => {
                const status = response.status;
                console.log(status)
                response.json().then(body => {
                    if (status == 200) {
                        localStorage.setItem('token', (body.token));
                        fetchUserData()
                        toast('Login Successfully', {
                            position: "top-center",
                            autoClose: 1500,
                            type: "success",
                            theme: "colored",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        navigate('/')
                    }
                    resetForm();
                    

                })

                if (status == 404) {
                    toast.error('Wrong Email or Password ', {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    });

                }
                //End Of then
            })
            //End of Onsubmit
        }




    })




    return (
        <div className='container'>
            <div className='row d-flex' style={{ justifyContent: "space-between" }}>
                <div style={{ marginTop: '130px' }} className='col-md-4 '>
                    <div className='text-center' style={{ backgroundColor: 'gold', height: "45px" }}>
                        <h2 style={{ "color": 'black' }}>Sign In</h2>
                    </div>

                    <form
                        className='my-4'
                        onSubmit={formik.handleSubmit}>
                        <div>
                            <input
                                className="form-control my-2"
                                type="email"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Email"
                                autoComplete="off"
                            />
                            {formik.errors.email && formik.touched.email ? <span className='text-danger'>{formik.errors.email}</span> : null}
                        </div>
                        <div>
                            <input
                                className="form-control my-2"
                                type="password"
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Password"
                                autoComplete="off"
                            />
                            {formik.errors.password && formik.touched.password ? <span className='text-danger'>{formik.errors.password}</span> : null}
                        </div>

                        <div className="my-3 text-center">
                            <button type="submit" className="btn btn-warning">Login</button>

                        </div>


                    </form>
                </div>
                <div className='col-md-4' style={{ marginTop: '60px' }}>
                    <div>
                        <img style={{ width: '25vw', minHeight: '250px', minWidth: '250px' }} src={coin} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

