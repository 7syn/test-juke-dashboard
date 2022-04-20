import React, { Component } from 'react'
import { connect } from 'react-redux';
import { storeEmployeesAPI, selectEmployeeAPI, updateEmployeesAPI } from '../../../../actions/employee';
import EmployeeForm from './EmployeeForm';
import instance from '../../../../utils/api';

class EmployeeFormPage extends Component {
	state = {
		errors: {},
		accountBanks: [],
		provinces: [],
		positions: []
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		if (id) {
			this.props.selectEmployee(id)
		}
		//  else {
		// 	this.props.createEmployees();
		// }

		instance.get('bank-accounts')
			.then((res) => {
				this.setState({
					accountBanks: res?.data?.data
				})
			})
		instance.get('provinces')
			.then((res) => {
				this.setState({
					provinces: res?.data?.data
				})
			})
		instance.get('positions')
			.then((res) => {
				this.setState({
					positions: res?.data?.data
				})
			})
	}

	submit = (data) => {
		const { id } = this.props.match.params;
		console.log(data);
		this.setState({
			errors: {}
		})
		if (id) {
			data._method = "PUT"
			console.log(data)
			this.props.updateEmployees(data, id)
				.then((res) => {
					console.log(res)
					this.props.history.push('/employees');
				}, (err) => {
					this.setState({
						errors: err.response.data
					})
					console.log(err.response)
				})
		} else {
			this.props.storeEmployees(data)
				.then((res) => {
					console.log(res)
					this.props.history.push('/employees');
				}, (err) => {
					this.setState({
						errors: err.response.data
					})
					console.log(err.response)
				})
		}
	}

	render() {
		const { submit } = this;

		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-10 mx-auto">
						<h2>Employee Form</h2>
						<EmployeeForm
							employee={this.props.employee}
							accountBanks={this.state.accountBanks}
							provinces={this.state.provinces}
							positions={this.state.positions}
							errors={this.state.errors}
							onSubmit={submit} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	employee: state.employee.employee,
})

const mapDispatchToProps = (dispatch) => ({
	storeEmployees: (data) => dispatch(storeEmployeesAPI(data)),
	selectEmployee: (id) => dispatch(selectEmployeeAPI(id)),
	updateEmployees: (data, id) => dispatch(updateEmployeesAPI(data, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeFormPage)