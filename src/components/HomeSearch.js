import  React, {Component} from 'react'
import { Redirect } from 'react-router'



class HomeSearch extends Component{

    constructor(props){
        super(props)

        this.state = {
            city: '',
            redirect: false
        }

    }

    handleCity = (event)=>{
        this.setState({city: event.target.value})
    }

    handleSubmit = (event)=>{
      event.preventDefault() 
      this.setState({redirect: true})
     
    }

    render(){

    if(this.state.redirect){
        return(
            <Redirect to={`/result/${this.state.city}`} />
        )
    } else{

        return(
        
            <div className="container">
             
            <div className="col-sm-11 text-center">
                <img src={process.env.PUBLIC_URL + '/img/logo.png'} />
              </div>


                <div className="row align-items-center wrap-search">
                    <div className="col-sm-12 text-center">
                    
                    <form onSubmit={this.handleSubmit} action="">
                            <div className="input-group ">
                                <input onChange={this.handleCity} type="text" className="form-control"  placeholder="Digite o nome da cidade Ex: Salvador" ></input>
                                <div className="input-group-append">
                                    <button  className="btn btn-info" type="submit" id="button-addon2">Buscar</button>
                                </div>
                             </div>
                     </form>
        
                    </div>
                </div>
            </div> 
        )
    }  



    }



}

export default  HomeSearch;