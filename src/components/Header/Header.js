import React, {Component} from 'react'; 
import {connect} from 'react-redux'; 
const mapStateToProps = state => ({
    user: state.user,
  });

class Header extends Component {
    render(){        
        return(
            <header className="App-header">
            <h2 className="App-title">When's My Beep?</h2>
            </header>
        );
    }
}
export default connect(mapStateToProps)(Header); 