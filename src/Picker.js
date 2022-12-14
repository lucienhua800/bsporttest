import React, { Component} from 'react'
import Calendar from 'react-calendar'
import Popup from './Popup'

// function toutPopup(){
//   const [isOpen, setIsOpen] = useState(false);
//     const togglePopup = () => {
//       setIsOpen(!isOpen);
//       }
//       return <div>
//     
//   </div>
// }
export default class Picker extends Component {
  
  
  state = {
    isOpen : false,
    texte : "",
    formatedDate : String("YYYY-MM-DD"),
    defaultDate : new Date(2019,5,18), 
    resultatBrut : [],
    longueurState : 0,
  }

  togglePopup = () => {
    this.setState({isOpen : !this.state.isOpen})
    } 

  writeText = x => {
    let coach = x['coach']
    let level = x['level']
    let establishment = x['establishment']
    this.setState({texte : "Nom du coach : "+coach +" , niveau : "+level+" , établissement : "+establishment})
    }
    
  onChange = date => {  
    this.setState({texte : ""})  
    let jour = (date.getDate());
    let mois = (date.getMonth())+1;
    let an = (date.getFullYear());
    let dateComplete = an+"-"+mois+"-"+jour;
    let fetched = fetch("https://api.staging.bsport.io/api/v1/offer?company=6&max_date="+dateComplete+"&min_date="+dateComplete, {headers: {accept: "application/json", authorization: "f18688960a8942c83d238b04e88389ac126bf55c"}})
     .then(r => r.json())
     .then(r => {
      let longueur = (r.results).length
      this.setState({longueurState : longueur})
      // console.log(r.results)
      this.setState({resultatBrut : r.results})
    })
    this.setState({
      formatedDate : dateComplete,
    })
  }

  render() {
    // console.log(this.state.longueurState)
    return (
      <div style={{boxShadow: "5px 5px 25px"}}>
        <Calendar 
        onChange={this.onChange}
        defaultValue={this.state.defaultDate}
        />
      {/* <p>Date choisie : {this.state.date1.toLocaleDateString()}</p> */}
      <p>{this.state.formatedDate}</p>
      <div>Nombre de résultats : {this.state.longueurState}</div>
      <div>{this.state.resultatBrut.map(x => 
        <div>          
          <button 
          id = {(x['id'].toString())} 
          onClick = {() =>this.writeText(x)}>
          Coach: {x['coach']}, Niveau: {x['level']}, Etablissement :{x['establishment']}           
          </button>  
                   
      </div>)}
        <div>
          <input type="button" value="Click to Open Popup" onClick={this.togglePopup}/>
          </div>
    {this.state.isOpen && <Popup content={<>
        <button>Bouton inactif</button>
      </>}
      handleClose={this.togglePopup}
    />}
      {this.state.texte}
      </div>      </div>
    )
  }
}
