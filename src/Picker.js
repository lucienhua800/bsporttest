import React, { Component } from 'react'
import Calendar from 'react-calendar';

export default class Picker extends Component {
  
  state = {
    formatedDate : String("YYYY-MM-DD"),
    defaultDate : new Date(2019,5,18), 
    resultatBrut : String(""),
    longueurState : 10,
  }

  onClick = date => {
    
    let jour = (date.getDate());
    let mois = (date.getMonth())+1;
    let an = (date.getFullYear());
    let dateComplete = an+"-"+mois+"-"+jour;
    let fetched = fetch("https://api.staging.bsport.io/api/v1/offer?company=6&max_date="+dateComplete+"&min_date="+dateComplete, {headers: {accept: "application/json", authorization: "f18688960a8942c83d238b04e88389ac126bf55c"}})
     .then(r => r.json())
     .then(r => this.setState({longueurState : (r.results).length}))
     .then(r =>console.log(this.state.longueurState))
    
    //  .then(r =>Object.entries(r))
      // .then(r => console.log(r.results[0].activity))
    // fetched.then(r => this.setState({resultatBrut : r}))
    // fetched.then(r =>{resultat = (Object.entries(r))})
    // console.log(this.state.resultatBrut)
 
    this.setState({
      formatedDate : dateComplete,
      // resultatBrut : resultat
    })
  }

  render() {
    return (
      <div style={{boxShadow: "5px 5px 25px"}}>
        <Calendar 
        onChange={this.onClick}
        defaultValue={this.state.defaultDate}
        />
      {/* <p>Date choisie : {this.state.date1.toLocaleDateString()}</p> */}
      <p>{this.state.formatedDate}</p>
      <div>Nombre de résultats : {this.state.longueurState}</div>
      </div>
    )
  }
}
