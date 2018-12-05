import React, {Component} from 'react'; 
import DashboardView from '../DashboardView/DashboardView';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {connect} from 'react-redux'; 

const mapStateToProps = state => ({
    user: state.user,
  });
class HomeView extends Component {
    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
      }
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('/login');
        } 
      }
    render(){
        return(
            <div>
                <DashboardView history={this.props.history}/>
            </div>
        ); 
    }
}
export default connect(mapStateToProps)(HomeView); 