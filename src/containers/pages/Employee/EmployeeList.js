import React from 'react'
import Table from '../../../components/Table'
import { Link } from 'react-router-dom'

export default function EmployeeList({ employees, onClick }) {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				disableFilters: true,
				accessor: (data) => {
					return data?.first_name + ' ' + (data?.last_name || '')
				}
			},
			{
				Header: 'Phone',
				disableFilters: true,
				accessor: 'phone_number'
			},
			{
				Header: 'Date of Birth',
				disableFilters: true,
				accessor: 'date_of_birth'
			},
			{
				Header: 'Current Position',
				disableFilters: true,
				accessor: 'current_position'
			},
			{
				Header: 'KTP File',
				disableFilters: true,
				accessor: 'ktp_file',
				Cell: ({ row }) => (
					<div>
						<a target={'_blank'} href={`http://localhost:8000/ktp_file/${row.original.ktp_file}`} className="btn btn-sm btn-primary">View</a>&nbsp;
					</div>
				)
			},
			{
				Header: 'Action',
				disableFilters: true,
				Cell: ({ row }) => (
					<div>
						<Link to={`/employees/${row.original.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>&nbsp;
						<button onClick={() => onClick(row)} className="btn btn-sm btn-danger">Delete</button>
					</div>
				)
			}
		],
		[onClick]
	)

	return (
		<React.Fragment>
			<Table columns={columns} data={employees} />
		</React.Fragment>
	)
}