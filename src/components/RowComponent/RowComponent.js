import React, {Component} from 'react'; 
import {TableCell, TableRow, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import axios from 'axios'; 
import moment from 'moment'; 

class RowComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
          countDownDate: 1,
          open: false, 
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0, 
          warning: "none", 
          defaultDate: '', 
          expiration_time: this.props.med.expiration_time, 
          expired: "false"
        }
    }
    calculateTime = () => { 
        // Get todays date and time
    let now = new Date().getTime();
    // Find the distance between now and the count down date
        let distance = this.state.countDownDate - now;
       if (distance > 0){
// Time calculations for hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.setState({
        ...this.state,
        days: days,
        hours: hours, 
        minutes: minutes,
        seconds: seconds
    });
   if (distance <= 500){
        this.stopTimer(); 
    }
    else if (distance < 300000){
        this.setState({
            ...this.state,
            warning: "warning"
        })
    } else if (distance > 300000){
        this.setState({
            ...this.state,
            warning: "none"
        })
    }
       } else {
           this.stopTimer(); 
       }
    }
    componentDidMount(){
        this.getTimerData();
    }
    deleteMed = () => {
        axios({
            method: 'DELETE', 
            url: `/medlist?id=${this.props.med.id}`
        }).then((response) => {
            this.props.getMedLists();
        }).catch((error) => {
            console.log('Error deleting medication', error);
        });
    }
    //gets any ongoing countdowns from database for data persistence between login and logout
    getTimerData = () => {
        console.log('in get timer data', this.props.med.id);
        axios({
            method: 'GET', 
            url: `/medlist/countdown?id=${this.props.med.id}`
        }).then((response) => {
            console.log(response)
            let now = new Date().getTime();
            this.timer = setInterval(this.calculateTime, 1000);
            this.setState({
                    ...this.state,
                    countDownDate: parseInt(response.data[0].time_end, 10),
                    expiration_time: response.data[0].expiration_time
            });
             if (response.data[0].time_end - now <= 0){
                console.log('in stopTimer');
                clearInterval(this.timer);
             }
        }).catch((error) => {
            console.log('Error getting current data', error);
        })
    }
    handleChangeStart = () => {
        console.log('start clicked'); 
        let dateNow = new Date();  
        let formattedDate = moment(dateNow).format('YYYY-MM-DDTHH:mm:ss');
        this.setState({
            ...this.state,
            open: true, 
            warning: "none",
            defaultDate: formattedDate,
            expiration_time: formattedDate,
            expired: "false"
        });
    }
    handleClose = () => {
        this.setState({
            ...this.state,
            open: false
        }); 
    this.updateDatabase();
    } 
    stopTimer = () => {
        console.log('in stopTimer');
        clearInterval(this.timer);
        let now = new Date().getTime();
        axios({
            method: 'PUT', 
            url: '/medlist',
            data: {time_end: 0, id: this.props.med.id, expired: true, expiration_time: this.state.expiration_time}
        }).then((response) => {
            this.setState({
                ...this.state,
                hours: 0, 
                minutes: 0, 
                seconds: 0, 
                expired: "true",
            }); 
            this.props.getMedLists(); 
        }).catch((error) => {
            console.log('Error posting countdown time to server', error); 
        });
    }
     updateDatabase = () => {  
         console.log('in update database for med:', this.props.med.id, 'new time:', this.state.countDownDate)
    //sends the end time to the database 
        axios({
            method: 'PUT', 
            url: '/medlist',
            data: {time_end: this.state.countDownDate, id: this.props.med.id, expired: false, expiration_time: this.state.expiration_time}
        }).then((response) => {
            this.getTimerData(); 
        }).catch((error) => {
            console.log('Error posting countdown time to server', error); 
        })
    }
    // Set the date we're counting down to, then turn it into milliseconds and set it to state. 
    handleInputChange = (event) => {
        let endDate = event.target.value; 
        let countDownDate = new Date(endDate).getTime();
        this.setState({
            countDownDate: countDownDate,
            expiration_time: endDate
        });
    }
   render(){
           return (
            <TableRow className={this.state.warning}>
                <TableCell className={this.state.expired}>{this.props.med.room_id}</TableCell>
                <TableCell className={this.state.expired}>{this.props.med.name}</TableCell>
                <TableCell className={this.state.expired}>{this.state.hours} h {this.state.minutes} m {this.state.seconds} s</TableCell>
                {this.state.expiration_time > 0 && <TableCell className={this.state.expired}>{moment(this.state.expiration_time).format('LTS')}</TableCell>}
                {/* when start is clicked, modal pops up to ask when the med should end */}
                <TableCell className={this.state.expired}><Button variant="contained" color="primary" onClick={this.handleChangeStart}>Start</Button></TableCell>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Set End Time</DialogTitle>
                    <DialogContent>
                        <TextField 
                         id="datetime-local"
                         type="datetime-local"
                         defaultValue={this.state.defaultDate}
                         onChange={this.handleInputChange}/>
                    </DialogContent>
                    <DialogActions><Button variant="contained" color="primary" onClick={this.handleClose}>Submit</Button></DialogActions>
                </Dialog>
                <TableCell className={this.state.expired}><Button variant="contained" color="secondary" onClick={this.deleteMed}>Delete</Button></TableCell>
            </TableRow>
           );
       }
}
export default RowComponent; 