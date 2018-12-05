import React, { Component } from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, Button, NativeSelect, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import RowComponent from '../RowComponent/RowComponent';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
});
class DashboardView extends Component {
    constructor() {
        super();
        this.state = {
            room: 20,
            name: '',
            medList: [],
            defaultDate: '',
        }
    }
    componentDidMount = () => {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getMedLists();
    }
    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        }
    }
    getMedLists = () => {
        console.log('in get medlist')
        axios({
            method: 'GET',
            url: `/medlist`
        }).then((response) => {
            console.log(response.data);
            this.setState({
                medList: response.data
            })

        }).catch((error) => {
            console.log('Error', error);
        });
    }
    handleInputChange = (event, property) => {
        console.log(event.target.value);
        this.setState({
            [property]: event.target.value
        });
    }
    logout = () => {
        this.props.dispatch(triggerLogout());
    }
    postMedication = () => {
        axios({
            method: 'POST',
            url: '/medlist',
            data: { name: this.state.name, room_id: this.state.room, expiration_time: 'N/A' }
        }).then((response) => {
            this.getMedLists();
            this.setState({
                name: '',
                room: 20,
            })
        }).catch((error) => {
            console.log('Error posting your lists, please try again', error);
            alert('Error posting your lists to the server. Please try again');
        });
    }
    render() {
        return (
            <div>
                <Button color="secondary" variant="contained" className="float-right" onClick={this.logout}>Log Out</Button>
                <div className="flex-box">
                    <label>Room # (required): </label>
                    <NativeSelect
                        value={this.state.room}
                        label="Room Number"
                        onChange={(event) => this.handleInputChange(event, 'room')}
                        inputProps={{
                            name: 'room',
                            id: 'select-menu'
                        }}>
                        <option value={20}>20</option>
                        <option value={21}>21</option>
                        <option value={22}>22</option>
                        <option value={23}>23</option>
                        <option value={24}>24</option>
                        <option value={25}>25</option>
                        <option value={28}>28</option>
                        <option value={29}>29</option>
                        <option value={30}>30</option>
                        <option value={31}>31</option>
                        <option value={32}>32</option>
                        <option value={33}>33</option>
                        <option value={34}>34</option>
                        <option value={35}>35</option>
                        <option value={36}>36</option>
                        <option value={37}>37</option>
                        <option value={38}>38</option>
                        <option value={39}>39</option>
                        <option value={41}>41</option>
                        <option value={42}>42</option>
                        <option value={43}>43</option>
                        <option value={44}>44</option>
                        <option value={45}>45</option>
                        <option value={46}>46</option>
                    </NativeSelect>
                    </div>
                    <div className="flex-box">
                    <label>Drug Name (required): </label>
                    <TextField
                        value={this.state.name}
                        id="med-input"
                        onChange={(event) => this.handleInputChange(event, 'name')}
                        required />
                        <Button variant="contained" className="submit-btn" color="primary" onClick={this.postMedication}>Submit</Button>
                </div>
                
                <Paper>
                    <Table id="table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Room Number</TableCell>
                                <TableCell>Medication Name</TableCell>
                                <TableCell>Time Until Next Beep</TableCell>
                                <TableCell>Expiration</TableCell>
                                <TableCell>Start</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.medList.map((med, i) => {
                                return (
                                    <RowComponent getMedLists={this.getMedLists} key={i} med={med} />
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default connect(mapStateToProps)(DashboardView); 