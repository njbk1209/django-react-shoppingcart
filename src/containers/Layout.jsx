import { useEffect } from 'react';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { connect } from 'react-redux';
import Navbar from '../components/navigations/Navbar'
import Footer from '../components/navigations/Footer';


const Layout = (props) => {

    useEffect(() => {
        props.refresh()
        props.check_authenticated()
        props.load_user()
    }, []);

    return(
        <>
            <Navbar/>
            {props.children}
            <Footer/>
        </>
    )
}

export default connect(null, {
    check_authenticated,
    load_user,
    refresh,
}) (Layout)