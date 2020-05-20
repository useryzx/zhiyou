import React from 'react'

function withFetchData(WrappedComponent,url) {
    return class extends React.Component {
        render(){
            return(
                <WrappedComponent
                //高阶组件除了传递上层数据，还可以将本组件数据传递给目标组件
                {...this.props} data={this.state.data}></WrappedComponent>
            )
        }
        constructor(props){
            super(props);
            this.state={
                data:undefined
            }
        }
        componentDidMount(){
            this.http.get(url)
            .then(res=>{
                this.setState({
                    data:res.data
                })
            })
        }
    }
}
export default withFetchData;
