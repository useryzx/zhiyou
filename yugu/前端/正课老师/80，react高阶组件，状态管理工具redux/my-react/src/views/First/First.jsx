
import React from "react";
import "./First.css";


// MVVM(model-view-view-model)

// MVC(model-view-controller)

class First extends React.Component{
    render(){
        return (
            <div>
                <p>{this.state.num}</p>
                <input 
                    type="text" 
                    value={this.state.num} 
                    onChange={this.numChange}
                />
                <button onClick={e=>{
                    this.setState({
                        num:this.state.num-1
                    })
                }}>-</button>
                <button onClick={e=>{
                    this.setState({
                        num:this.state.num+1
                    })
                }}>+</button>
            </div>
        )
    }

    constructor(props){
        super(props);

        this.state = {
            num:99
        }

        this.numChange = this.numChange.bind(this);
    }

    numChange(e){
        this.setState({
            num:e.target.value*1
        });
    }


}

export default First;
