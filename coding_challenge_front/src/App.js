import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { List } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import Select from '@material-ui/core/Select';
import BasicTable from './table'
const useStyles = makeStyles({
 
  root: {
    formControl: {
      margin: 1,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: 2,
    },
    '& > *': {
      margin: '1',
      width: '25ch',
    },
    minWidth: 275,
    margin:'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const mouse_ws = new WebSocket("ws://127.0.0.1:8000/ws/deposit/1/")
export default function OutlinedCard() {
  const [loading,setLoading] = useState(false) 
  mouse_ws.onopen = () => {
    mouse_ws.send(JSON.stringify({ 'user_id': 1, 'amount': 30.3, 'currency': 'ETH' ,'action':'get'}))
    setLoading(true);}
  const [deposits,setDeposits] = useState([]) 
  mouse_ws.onmessage = (evt) => {
    var received_msg = JSON.parse(evt.data);
    console.log(received_msg,'gshsghsghsghsgh')
    setDeposits(received_msg.deposits);
    // console.log(deposits);
    // evt.target.value
    // console.log(document.getElementById('select').innerHTML) 
  }
  ;
  var tab_data = [];
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/get-deposit/1/').then((response)=>{
      tab_data = response.data;
      // setLoading(true);
      // console.log(deposits);
    });
    if (loading){
console.log('starrrrrrttttttt');
      setTimeout(
    mouse_ws.send(JSON.stringify({ 'user_id': 1, 'amount': 30.3, 'currency': 'ETH' ,'action':'get'})),9000)

  }  //   tab_data = deposits.map((item)=>{
  //     return (
  //   <Typography variant="h5" key={item.id} component="h2">
  //   {item.amount} <b>::</b> nev
  // </Typography>)
    // });
  },[])
  const classes = useStyles();
  const [amount,setAmount] = useState() 
  const [currentCurrency,setCurrentCurrency] = useState() 
  const [currency,setCurrency] = useState(['ETH','BTC','USD'])
  const post_deposit= ()=>{
    var data = new FormData();
    data.append('amount', amount );
    data.append('currency', currentCurrency);
    data.append('user_id', 1);
    
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/deposit/',
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });}


  const handleChangeS = (evt)=>{
    setCurrentCurrency(evt.target.value);
  }
  if (loading){

    setTimeout(
      mouse_ws.send(JSON.stringify({ 'user_id': 1, 'amount': 30.3, 'currency': 'ETH' ,'action':'get'})),20000)
  }
  
  const handleChangeA = (evt)=>{
    setAmount(evt.target.value);
    mouse_ws.send(JSON.stringify({ 'user_id': 1, 'amount': 30.3, 'currency': 'ETH' ,'action':'get'}));
    console.log(amount);
  }

// if (loading)
// {mouse_ws.send(JSON.stringify({ 'user_id': 1, 'amount': 30.3, 'currency': 'ETH' ,'action':'get'}))
//}


const i=0
  let cur =deposits.length>0&& deposits.map((item)=>{
    // currency = deposits[0]['currency']
    return (
  <Typography variant="h5" key={item} component="h2">
  {item.amount} <b>::</b> nev
</Typography>)
})
  // const [btc,setEth] = useState(123)
  // const [eth,setEth] = useState(123)
  const bull = <span className={classes.bullet}>•</span>;
   // mouse_ws.test();
  return (
    console.log(deposits,"GAGAG"),
    <div className={classes.root}>
 {/* <Typography variant="h5" component="h2">
    {deposits[0]['currency']} <b>::</b> nev
  </Typography> */}
  
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {deposits.length>0&&deposits.map(val=>{console.log(val);
    return<Typography key = {val.id}>{val.currency} : {val.amount}</Typography>})}
      </CardContent>
     <form className={classes.root} noValidate autoComplete="off">
     <FormControl required className={classes.formControl}>
      {/* <CardActions> */}
     <TextField className={classes.root} onKeyUp={handleChangeA} id="standard-basic" label="Buy" />
      {/* </CardActions> */}
        <Select
          labelId="demo-simple-select-required-label"
          id="select"
          value={currentCurrency}
          onChange={handleChangeS}
          // className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem id = 'etc' value={"ETH"}>ETH</MenuItem>
          <MenuItem id = 'btc' value={"BTC"}>BTC</MenuItem>
          <MenuItem id = 'usd' value={"USD"}>USD</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
    <Button onClick={post_deposit} className={classes.root}>BUY</Button>
      </FormControl>

   </form>
    </Card>
    {/* {loading &&
    <BasicTable setLoading={setLoading} deposits={deposits}/>
    } */}
    </div>
 );
}