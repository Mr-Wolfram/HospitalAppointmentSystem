import React, {Component} from 'react';
import cookie from 'react-cookies'
import './index.css'

class Header extends Component {
    handleLoginOut = () => {
        cookie.remove('username', { path: '/' })
        cookie.remove('loginSuccess', { path: '/' })
        window.location.href = '/'
    }
    render () {
        const username = cookie.load('username')
        return (
            <div className="myHeader">
                <div id="webTitle" onClick={() => {window.location.href = username !== undefined ? '/index' : '/login'}}>
                    
                </div>
            </div>
        );
    }
}

export default Header;
