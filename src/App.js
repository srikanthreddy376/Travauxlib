import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      counter: 0    
    };

  }
  componentDidMount() {
    this.fetchData();
  }

  IncCounter = () => {
    
    this.setState({ counter: this.state.counter + 1 });
    
  };

  DecCounter = () => {
      
    this.setState({ counter: this.state.counter - 1 });
     
  }

  fetchData = () => {
    fetch(
      "https://api.travauxlib.com/api/devis-pro/JKusHl8Ba8MABIjdCtLZOe2lxxnUfX"
    )
      .then(response => response.json())
      .catch(error => console.error("Error:", error))

      .then(response => this.setState({ data: response }));
  };

  render() {
    let count = this.state.counter;
    let sections =
    this.state.back? this.state.back : 
    
  this.state.data.sections 
        ? this.state.data.sections.map(section => (
            <div key={count} className="card-group">
              <div className="card p-2">
             <h5 className="card-header  text-warning">
             { (count<=8 && count>=0)&& section.lots[count].label ? section.lots[count].label:"clique sur Next"} 
             </h5>
            
              { (count<=8 &&count>=0) && section.lots[count].lignes
                ? section.lots[count].lignes.map((ligne, key) => (
                    <div key={key} >
                      <div className="card-text ">
                       <strong className="text-success"> designation :</strong> {ligne.designation}
                       <div className="card-text">
                       <strong className="text-primary">description</strong> :  {ligne.description ? ligne.description : "N/A"}
                         </div> 
                         <div className="card-text">
                        <strong className="text-success">Total prix: </strong>
                        {parseFloat(ligne.prixHT) + parseFloat(ligne.prixTTC)} Euro 
                        </div>
                        {ligne.locationsDetails.locations?(ligne.locationsDetails.locations.map((loc,key)=>
                              <div key={key} className="card-text">
                            <strong className="text-primary">location:</strong>   {loc.uuid ? loc.uuid : "N/A"}
                              </div>
                        )):"Not Available"
                        }
                         </div>
                       
                         <hr/>
                      </div>
                      
                  
                      
                  ))
                : null}
            </div>
         </div>
          ))
        : null;
    

    return (
      <div className="container pt-3">
        <h1 className= "text-success text-center">Bienvenue sur l'application de test Travauxlib</h1>
        <button className="btn btn-light m-2"  onClick={this.DecCounter}>previous job</button>
        <button className="btn btn-light m-2"  onClick={this.IncCounter}>Next job</button>
        {sections ? sections : "Loading....."}
     </div>
    );
  }
}
