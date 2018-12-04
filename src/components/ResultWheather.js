import React, {Component} from 'react'
import './../App.css'
import axios from 'axios'
import Condition from '../helpers/TranslateCondition'
import { Link } from "react-router-dom";

class ResultWheather extends Component{

    constructor(props) {
        super(props);
        this.state = {
            city : '',
            region:'',
            temp:'',
            wind:'',
            pressure: '',
            humidity:''
        };
      }

    componentDidMount(){

        const city =   this.props.match.params.city
        
        const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.
        forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.
        places(1)%20where%20text%3D%22{${city}}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`

         axios.get(url).then( result=>{ 
         
       
            this.setState({
                city: result.data.query.results.channel.location.city,
                region: result.data.query.results.channel.location.region,
                temp: this.fahrenheitToCelsius (result.data.query.results.channel.item.condition.temp),
                wind: this.convertMph(result.data.query.results.channel.wind.speed) ,
                pressure:result.data.query.results.channel.atmosphere.pressure,
                humidity: result.data.query.results.channel.atmosphere.humidity,
                tomorrow : this.fahrenheitToCelsius(result.data.query.results.channel.item.forecast[1].high),
                aftertomorrow:  this.fahrenheitToCelsius(result.data.query.results.channel.item.forecast[2].high),
                condition: Condition(result.data.query.results.channel.item.condition.code)
             });
             
        })
     
        
    }

    checkTem = ()=>{
        // <15ºC azul
        //>35 tons de vermelho
    }

    fahrenheitToCelsius =  (temp)=>{
        const tempCelsius = (temp-32)/ 1.8000
        return tempCelsius.toFixed(0)
    }

    convertMph= (mph) =>{
        const speedKm = mph/1.151;
        return speedKm.toFixed(0)
    }

   


    render(){

    
        return(
            <div className="container"> 
                <div className="col-md-7 mx-auto ">
                    <div className="box-wheather">
                    
                    <Link title="Realizar Nova Pesquisa" className="link-home" to="/"><i class="fas fa-home fa-2x"></i> </Link>
                
                        <div className="city"> 
                            <h1>
                            {`${this.state.city} - ${this.state.region}`}
                            </h1>
                        </div>

                        <div className="today"> 

                        <div className="col-md-12">
                            <div className="row">
                                    
                                        <div className="col-md-6"> 
                                            <span className="icon" data-icon="B"></span>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="info">
                                                <h2> HOJE</h2>
                                                <h2> {this.state.temp}ºC</h2>
                                            </div>

                                            <div className="info">
                                                <h3> {this.state.condition}</h3>
                                                <ul> 
                                                    <li> Vento: {this.state.wind} Km/h</li>
                                                    <li> Humidade:  {this.state.humidity} </li>
                                                    <li> Pressao: {this.state.pressure}hPA </li>
                                                </ul>
                                           </div>
                                     </div>
                                

                            </div>

                            </div>
                        </div>

                    </div>

                <div className="box-tomorrow"> 
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col info">
                                    <h2> AMANHÃ</h2>
                                    <h2> {this.state.tomorrow}ºC</h2>
                            </div>
                        </div>
                    </div>
                </div>
                 
                <div className="box-tomorrow-after"> 
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col info">
                                    <h2> DEPOIS DE AMANHÃ</h2>
                                    <h2>{this.state.aftertomorrow } ºC</h2>
                            </div>
                        </div>
                    </div>
                </div>
               


 

                </div>
            </div>
        )
    }
}

export default ResultWheather