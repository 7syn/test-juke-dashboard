import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../../../../components/renderField'
import { renderFileField } from '../../../../components/renderFileField'
import { renderSelectField } from '../../../../components/renderSelectField'
import instance from '../../../../utils/api';

const validate = (values) => {
	return {}
}

class EmployeeForm extends Component {
	state = {
		cities: [],
	}
	componentDidMount() {
		instance.get('cities')
			.then((res) => {
				this.setState({
					cities: res?.data?.data
				})
			})
	}

	componentWillReceiveProps = (nextProps) => {
		const { employee } = nextProps
		if (employee.id !== this.props.employee.id) {
			this.props.initialize(employee)
		}
	}

	render() {
		const { handleSubmit } = this.props
		return (
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-lg-4">
						<div className="form-group">
							<Field name="first_name"
								placeholder="First Name"
								label="First Name"
								type="input"
								component={renderField} />
							<span style={{ color: "red" }}>{this.props.errors?.first_name}</span>
						</div>
						<div className="form-group">
							<Field name="last_name"
								placeholder="Last Name"
								label="Last Name"
								type="input"
								component={renderField} />
							<span style={{ color: "red" }}>{this.props.errors?.last_name}</span>
						</div>
						<div className="form-group">
							<Field name="date_of_birth"
								placeholder="Date of Birth"
								label="Date of Birth"
								type="date"
								component={renderField} />
							<span style={{ color: "red" }}>{this.props.errors?.date_of_birth}</span>
						</div>
						<div className="form-group">
							<Field name="phone_number"
								placeholder="Phone Number"
								label="Phone Number"
								type="input"
								component={renderField} />
							<span style={{ color: "red" }}>{this.props.errors?.phone_number}</span>
						</div>
						<div className="form-group">
							<Field name="email"
								placeholder="Email"
								label="Email"
								type="input"
								component={renderField} />
							<span style={{ color: "red" }}>{this.props.errors?.email}</span>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="form-group">
							<Field name="ktp_number"
								placeholder="KTP Number"
								label="KTP Number"
								type="input"
								component={renderField} />
							<span style={{ color: "red" }}>{this.props.errors?.ktp_number}</span>
						</div>
						<div className="form-group">
							<Field
								onChange={(e) => {
									if (e?.target?.value)
										instance.get('cities?province_id=' + e?.target?.value)
											.then((res) => {
												this.setState({
													cities: res?.data?.data
												})
											})
								}}
								name="province_address"
								label="Province"
								component={renderSelectField}>
								<option value="">Select</option>
								{this.props.provinces?.map((item, key) =>
									<option value={item.id} key={key}>{item.name}</option>
								)}
							</Field>
							<span style={{ color: "red" }}>{this.props.errors?.province_address}</span>
						</div>
						<div className="form-group">
							<Field
								name="city_address"
								label="City"
								component={renderSelectField}>
								<option value="">Select</option>
								{this.state.cities?.map((item, key) =>
									<option value={item.id} key={key}>{item.name}</option>
								)}
							</Field>
							<span style={{ color: "red" }}>{this.props.errors?.city_address}</span>
						</div>
						<div className="form-group">
							<Field name="street_address"
								placeholder="Street"
								label="Street"
								type="input"
								component={renderField} />
							<span style={{ color: "red" }}>{this.props.errors?.street_address}</span>
						</div>
						<div className="form-group">
							<Field name="zip_code"
								placeholder="Zip Code"
								label="Zip Code"
								type="input"
								component={renderField} />
							<span style={{ color: "red" }}>{this.props.errors?.zip_code}</span>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="form-group">
							<Field
								name="current_position"
								label="Current Position"
								component={renderSelectField}>
								<option value="">Select</option>
								{this.props.positions?.map((item, key) =>
									<option value={item.id} key={key}>{item.name}</option>
								)}
							</Field>
							<span style={{ color: "red" }}>{this.props.errors?.current_position}</span>
						</div>
						<div className="form-group">
							<Field
								name="bank_account"
								label="Bank Account"
								component={renderSelectField}>
								<option value="">Select</option>
								{this.props.accountBanks?.map((item, key) =>
									<option value={item.id} key={key}>{item.name}</option>
								)}
							</Field>
							<span style={{ color: "red" }}>{this.props.errors?.bank_account}</span>
						</div>
						<div className="form-group">
							<Field name="bank_account_number"
								placeholder="Bank Account Number"
								label="Bank Account Number"
								type="input"
								component={renderField} />
							<span style={{ color: "red" }}>{this.props.errors?.bank_account_number}</span>
						</div>
						<div className="form-group">
							{this.props.employee.ktp_file ?
								<img
									src={`${this.props.employee.ktp_file_url}`}
									alt={this.props.employee.ktp_file}
									className="img img-rounded"
									style={{ width: '200px' }} />
								: ''
							}
							<Field name="ktp_file"
								placeholder="Employee Image"
								label="Image"
								type="file"
								component={renderFileField} />
							<span style={{ color: "red" }}>{this.props.errors?.ktp_file}</span>
						</div>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-lg-12 mx-auto">
						<input type="submit" value={this.props.employee.id ? "UPDATE" : "CREATE"} className="btn btn-block btn-primary" />
					</div>
				</div>
			</form>
		)
	}
}

export default reduxForm({ form: 'employee', validate })(EmployeeForm)