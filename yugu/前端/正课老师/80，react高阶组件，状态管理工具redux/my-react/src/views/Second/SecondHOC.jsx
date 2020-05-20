
import React from "react";


function SecondHOC(WrappedComponent){
    return class extends React.Component{

        render(){
            return <WrappedComponent 
                {...this.props}
                {...this.state}
                numChange={this.numChange}
                numMinus={this.numMinus}
                numIncrease={this.numIncrease}
            ></WrappedComponent>
        }


        constructor(props){
            super(props);

            this.state = {
                num:99
            }

            // this.numChange = this.numChange.bind(this);
            // this.numMinus = this.numMinus.bind(this);
            // this.numIncrease = this.numIncrease.bind(this);

            this.bindAll([
                "numChange",
                "numMinus",
                "numIncrease"
            ]);
        }

        numChange(e){
            this.setState({
                num:e.target.value*1
            });
        }

        numMinus(){
            this.setState({
                num:this.state.num-1
            });
        }

        numIncrease(){
            this.setState({
                num:this.state.num+1
            });
        }

    }
}

export default SecondHOC;