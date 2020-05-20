import React from "react";

// [
//     {url:"/data.json",dataname:"restList"},

// ]

function withFetchData(WrappedComponent,url){
    return class extends React.Component{
        render(){
            return (
                <WrappedComponent 
                    {...this.props}
                    // 高阶组件出了传递上层接收的数据，还可以将本组件中的数据传递给目标组件。
                    data={this.state.data}
                ></WrappedComponent>
            )
        }
    
        constructor(props){
            super(props);

            this.state = {
                data:null
            }
        }

        componentDidMount(){
            this.http.get(url)
            .then(res=>{
                this.setState({
                    data:res.data
                })
            });
        }
    }

}



export default withFetchData;