import Layout from '../../containers/Layout'
import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { reset_password_confirm } from '../../redux/actions/auth'
import { Navigate, useParams } from 'react-router'
import { MyTextInput } from '../../components/inputs/MyInputs';

import React from 'react'

const ResetPasswordConfirm = ({
    reset_password_confirm,
    loading
}) => {

    const params = useParams()
    const [showHidePassword, changeShowHidePassword] = useState(false);

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
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new password</h2>
                    </div>
                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <Formik
                                initialValues={{
                                    password: '',
                                    re_password: ''
                                }}
                                validationSchema={Yup.object({
                                    password: Yup.string()
                                        .required('Required.')
                                        .matches(
                                            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                                            "It must contain at least 8 characters, including one or more uppercase letters, lowercase letters, numbers, and at least one special character."
                                        ),
                                    re_password: Yup.string()
                                        .required('Required.')
                                        .oneOf([Yup.ref('password'), null], 'Password does not matches.')
                                })}
                                onSubmit={({ password, re_password }, { setSubmitting, resetForm }) => {
                                    const uid = params.uid
                                    const token = params.token

                                    reset_password_confirm(uid, token, password, re_password)
                                    setRequestSent(true)
                                    window.scrollTo(0, 0);
                                    setSubmitting(false);
                                    resetForm();
                                }}
                            >
                                <Form className="space-y-4">
                                    <div>
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
                                            className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-700 mr-2"
                                            onChange={() => changeShowHidePassword(!showHidePassword)}
                                        />
                                        Show password
                                    </div>
                                    {loading ?
                                        <button
                                            type="submit"
                                            disabled
                                            className="w-full mt-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
                                        >
                                            Loading...
                                        </button>
                                        :
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-700 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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
    reset_password_confirm
})(ResetPasswordConfirm)