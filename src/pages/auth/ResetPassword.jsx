import React, { useState, useEffect } from 'react';
import Layout from '../../containers/Layout'
import { Link, Navigate } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { reset_password } from '../../redux/actions/auth'
import { MyTextInput } from '../../components/inputs/MyInputs';

const ResetPassword = ({
    loading,
    reset_password
}) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [requestSent, setRequestSent] = useState(false);

    if (requestSent && !loading)
        return <Navigate to='/' />;

    return (
        <Layout>
            <>
                <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset password</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Did you remember your password?{' '}
                            <Link to="/login" className="font-medium text-yellow-700 hover:text-yellow-600">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <Formik
                                initialValues={{
                                    email: '',
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string()
                                        .email('Please enter a valid email.')
                                        .required('Required.'),
                                })}
                                onSubmit={({ email }, { setSubmitting, resetForm }) => {
                                    reset_password(email);
                                    window.scrollTo(0, 0);
                                    setRequestSent(true);
                                    setSubmitting(false);
                                    resetForm();
                                }}
                            >
                                <Form className="space-y-4">
                                    <div>
                                        <MyTextInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="jane@mail.com"
                                        />
                                    </div>
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
                                            Reset Password
                                        </button>
                                    }

                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading

})

export default connect(mapStateToProps, {
    reset_password,
})(ResetPassword)
