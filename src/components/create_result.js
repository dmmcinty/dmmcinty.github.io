import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createResult } from '../actions';

class CreateResult extends Component {
	render() {
		return(
			<div>
				<button className="btn btn-primary" onClick={() => this.props.createResult(this.props.logs)}>
					Get Result
				</button>
				<textarea value={this.props.result}>
					{this.props.result}
				</textarea>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		logs: state.logs,
		result: state.result
	}
}

export default connect(mapStateToProps, { createResult })(CreateResult)