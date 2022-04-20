import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getEmployeesAPI, deleteEmployeesAPI } from '../../../actions/employee'
import EmployeeList from './EmployeeList'

class EmployeeListPage extends Component {

	componentDidMount() {
		this.props.getEmployees()
	}

	handleDelete = (data) => {
		this.props.deleteEmployees(data.original.id)
	}

	render() {

		const loading = (
			<div className="row mt-3">
				<p>Loading...</p>
			</div>
		)

		const Table = (
			<EmployeeList employees={this.props.employees} onClick={this.handleDelete} />
		)

		return (
			<Fragment>
				<div className="container mt-5">

					<Link to="/employees/create" className="btn btn-primary">Create</Link>
					<div className="clearfix"></div>

					{this.props.employees.length > 0 ? Table : loading}

				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
	employees: state.employee.employees
})

const mapDispatchToProps = (dispatch) => ({
	getEmployees: () => dispatch(getEmployeesAPI()),
	deleteEmployees: (id) => dispatch(deleteEmployeesAPI(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListPage);