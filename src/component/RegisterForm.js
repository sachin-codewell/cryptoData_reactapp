import React from 'react'
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import coin from './images/coin.png'
import { RegisterURL } from './config';
import { json } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {

    let validateschema = Yup.object().shape({
        firstname: Yup.string()
            .min(3, "First Name is too short")
            .max(15, 'First name is too long')
            .required('First name is required'),
        lastname: Yup.string()
            .min(3, 'Lat name is too short')
            .max(15, 'Last name is too long')
            .required('Last name is required'),
        email: Yup.string()
            .email("Invalid Email")
            .required('Email  is required'),
        phone: Yup.string()
            .min(10, 'Phone is less than 10 digits')
            .max(10, 'Phone is long than 10 digits')
            .required('Phone is required'),
        password: Yup.string()
            .required('Password  is required')
            .min(6, 'Password is too short'),
        confirmpassword: Yup.string()
            .required('Confirm Password is required')
            .test('confirmpassword', 'Password and Confirm Password Should be Same', function (cpass) {
                return (this.parent.password == cpass);
            })

    })

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            confirmpassword: ''

        },
        validationSchema: validateschema,
        onSubmit: (values, { resetForm }) => {

            const data = axios.post(RegisterURL, values)
                .then(() => {
                    toast.success('User Register Successfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    });

                }).catch(() => {
                    toast.error('Email Already Exist ', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    });

                })
            resetForm();

        }



    })





    return (
        <div className='container'>
            <div className='row d-flex' style={{ justifyContent: "space-between" }} >
                <div style={{ marginTop: '55px' }} className='col-md-4'>
                    <div className='text-center' style={{ backgroundColor: 'gold', height: "45px" }}>
                        <h2 style={{ "color": 'black' }}>Sign Up</h2>
                    </div>

                    <form
                        className='my-4'
                        onSubmit={formik.handleSubmit}>
                        <div >
                            <input
                                className="form-control my-2"
                                type="text"
                                name='firstname'
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="First Name"
                            />
                            {formik.errors.firstname && formik.touched.firstname ? <span className='text-danger'>{formik.errors.firstname}</span> : null}
                        </div>
                        <div>
                            <input
                                className="form-control my-2"
                                type="text"
                                name='lastname'
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Last Name"
                            />
                            {formik.errors.lastname && formik.touched.lastname ? <span className='text-danger'>{formik.errors.lastname}</span> : null}
                        </div>
                        <div>
                            <input
                                className="form-control my-2"
                                type="email"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Email"
                            />
                            {formik.errors.email && formik.touched.email ? <span className='text-danger'>{formik.errors.email}</span> : null}
                        </div>
                        <div>
                            <input
                                className="form-control my-2"
                                type="text"
                                name='phone'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Phone Number"
                            />
                            {formik.errors.phone && formik.touched.phone ? <span className='text-danger'>{formik.errors.phone}</span> : null}
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
                        <div>
                            <input
                                className="form-control my-2"
                                type="password"
                                name='confirmpassword'
                                value={formik.values.confirmpassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Confirm Password" 
                                autoComplete="off"
                                />
                            {formik.errors.confirmpassword && formik.touched.confirmpassword ? <span className='text-danger'>{formik.errors.confirmpassword}</span> : null}
                        </div>
                        <div className="my-3 text-center">
                            <button type="submit" className="btn btn-warning">  Register</button>

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
