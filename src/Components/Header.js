import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/apps/weather_hooks/" className="item">
                Get Weather - React with Hooks
            </Link>
            <div className="right menu">
                <Link to="/apps/weather_hooks/" className="item">Home</Link>
            </div>
        </div>
    )
};

export default Header;