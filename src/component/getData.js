import React, { Component } from 'react';
import requestData from "../sever/api";
import { Icon } from 'antd-mobile';

function getData(method, Com) {
	return class DataComponent extends Component {
		state = {
			data: '',
			loading: true
		};
		isMount = true;
		async componentDidMount(){
			await requestData[method]().then(data=>{
				this.isMount && this.setState(
					{
						data,
						loading: false
					}
				)
			})
		}
		componentWillUnmount(){
			this.isMount = false;
		}
		render(){
			return (
				this.state.loading?
					<Icon
						type="loading"
						size='lg'
						style={{
							marginTop: '35vh',
							marginLeft: '3.7rem',
							height: '.5rem',
							width: '.5rem'
						}}
					/>:
					<Com
						data={this.state.data}
						{...this.props}
					/>
			)
		}
	}
}

export default getData;