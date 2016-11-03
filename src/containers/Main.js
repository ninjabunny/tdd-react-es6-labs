import React from 'react';
import {Link} from 'react-router';

class Main extends React.Component {
    render(){
        return(
            <div>
                <ul className = "nav nav-pills">
                    <li role="presentation" className="active"><Link to="/">Home</Link></li>
                    <li role="presentation" className="active"><Link to="about">About Us</Link></li>
                </ul>
                <div>
                    {React.cloneElement(this.props.children, this.props)}
                </div>
            </div>
        );
    }
}

export default Main;