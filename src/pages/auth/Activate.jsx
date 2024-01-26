import React from 'react'
import Layout from '../../containers/Layout'
import { useParams } from 'react-router'
import { useState } from 'react'
import { connect } from 'react-redux'
import { activate } from '../../redux/actions/auth'
import { Navigate } from 'react-router'

const Activate = ({
  activate,
  loading
}) => {
  const params = useParams()
  const [activated, setActivated] = useState(false);

  const activate_account = () => {
    const uid = params.uid
    const token = params.token
    activate(uid, token);
    setActivated(true);
  }

  if (activated && !loading)
    return <Navigate to='/' />;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-16 py-12 ">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Successful registration
        </h1>
        <h2 className="mt-3 mb-6 text-center text-gray-900 w-10/12 mx-auto">
          Thank you for registering as a new user. To activate your account, press the button below.
        </h2>
        {loading ?
          <button
            disabled
            className="block mt-2 m-auto px-8 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Loading...
          </button> :
          <>

            <button
              onClick={activate_account}

              className="block mt-2 m-auto px-8 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 "
            >
              Activate account
            </button>
          </>
        }
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  activate
})(Activate)