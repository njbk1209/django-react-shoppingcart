import React, { useState } from 'react';
import Layout from '../../containers/Layout'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput, MyCheckbox } from '../../components/inputs/MyInputs';

import { connect } from 'react-redux'
import { signup } from '../../redux/actions/auth'

const Signup = ({
    signup,
    loading
}) => {

    const [showHidePassword, changeShowHidePassword] = useState(false);

    return (
        <Layout>
            <>
                <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <Link to="/login" className="font-medium text-yellow-700 hover:text-yellow-700">
                                Login
                            </Link>
                            {' '}if you already have one
                        </p>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            first_name: '',
                            last_name: '',
                            password: '',
                            re_password: '',
                            acceptedTerms: false, // added for our checkbox
                        }}
                        validationSchema={Yup.object({
                            first_name: Yup.string()
                                .max(15, 'Must contain 15 characters or less.')
                                .min(1, 'It must contain at least one character.')
                                .required('Required.'),
                            last_name: Yup.string()
                                .max(15, 'Must contain 15 characters or less.')
                                .min(1, 'It must contain at least one character.')
                                .required('Required.'),
                            email: Yup.string()
                                .email('Please enter a valid email.')
                                .required('Required.'),
                            password: Yup.string()
                                .required('Required.')
                                .matches(
                                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                                    "It must contain at least 8 characters, including one or more uppercase letters, lowercase letters, numbers, and at least one special character."
                                ),
                            re_password: Yup.string()
                                .required('Required.')
                                .oneOf([Yup.ref('password'), null], 'Password does not matches.'),
                            acceptedTerms: Yup.boolean()
                                .required('Required.')
                                .oneOf([true], 'You must accept the terms and conditions.'),
                        })}
                        onSubmit={({ first_name, last_name, email, password, re_password }, { setSubmitting, resetForm }) => {
                            signup(first_name, last_name, email, password, re_password);
                            setSubmitting(false);
                            resetForm();
                        }}
                    >
                        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <Form className="space-y-4">
                                    <div className="mt-1">
                                        <MyTextInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="jane@mail.com"
                                        />
                                    </div>

                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='mt-1'>
                                            <MyTextInput
                                                label="First Name"
                                                name="first_name"
                                                type="text"
                                                placeholder="Jane"
                                            />
                                        </div>

                                        <div className='mt-1'>
                                            <MyTextInput
                                                label="Last Name"
                                                name="last_name"
                                                type="text"
                                                placeholder="Doew"
                                            />
                                        </div>
                                    </div>


                                    <div className="mt-1">
                                        <MyTextInput
                                            label="Password"
                                            name="password"
                                            type={showHidePassword ? 'text' : 'password'}
                                            placeholder="Password"
                                        />
                                    </div>

                                    <div className="mt-1">
                                        <MyTextInput
                                            label="Re-password"
                                            name="re_password"
                                            type={showHidePassword ? 'text' : 'password'}
                                            placeholder="Re-password"
                                        />
                                    </div>

                                    <div className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-yellow-700 focus:ring-yellow-700 mr-2"
                                            onChange={() => changeShowHidePassword(!showHidePassword)}
                                        />
                                        Show password
                                    </div>

                                    <MyCheckbox name="acceptedTerms">
                                        I accept the terms and conditions
                                    </MyCheckbox>

                                    <div>
                                        <div>
                                            {loading ?
                                                <button
                                                    type="submit"
                                                    className="w-full mt-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300">
                                                    Loading...
                                                </button>
                                                :
                                                <button
                                                    type="submit"
                                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                                                >
                                                    Register
                                                </button>
                                            }
                                        </div>
                                        
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Formik>
                </div>
            </>
        </Layout>
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading,
})

export default connect(mapStateToProps, {
    signup
})(Signup)