import instance from '../utils/api';

export const getEmployeesAPI = (data) => (dispatch) => {
	const promise = new Promise((resolve, reject) => {
		instance.get('employees', data)
			.then((res) => {
				dispatch({ type: 'GET_EMPLOYEES', value: res?.data?.data })
				console.log(res);
				resolve(res)
			}, (err) => {
				reject(err)
			})
	})

	return promise;
}

export const storeEmployeesAPI = (data) => (dispatch) => {
	const promise = new Promise((resolve, reject) => {
		console.log('data', data);
		const formData = new FormData()
		formData.append('ktp_file', data?.ktp_file); 
		formData.append('first_name', data?.first_name || '');
		formData.append('last_name', data?.last_name || '');
		formData.append('phone_number', data?.phone_number || '');
		formData.append('ktp_number', data?.ktp_number || '');
		
		formData.append('date_of_birth', data?.date_of_birth || '');
		formData.append('email', data?.email || '');
		formData.append('province_address', data?.province_address || '');
		formData.append('city_address', data?.city_address || '');
		formData.append('street_address', data?.street_address || '');
		formData.append('zip_code', data?.zip_code || '');
		formData.append('current_position', data?.current_position || '');
		formData.append('bank_account', data?.bank_account || '');
		formData.append('bank_account_number', data?.bank_account_number || '');
		formData.append('ktp_file', data?.ktp_file || '');

		instance.post('employees', formData, {
			headers: {
				'Content-Type': 'mutlipart/form-data'
			}
		})
			.then((res) => {
				dispatch({ type: 'STORE_EMPLOYEE', value: data })
				console.log(res);
				resolve(res)
			}, (err) => {
				reject(err)
			})
	})

	return promise;
}

export const selectEmployeeAPI = (id) => (dispatch) => {
	const promise = new Promise((resolve, reject) => {
		instance.get(`employees/${id}`)
			.then((res) => {
				dispatch({ type: 'EDIT_EMPLOYEE', value: res?.data?.data })
				console.log(res);
				resolve(res)
			}, (err) => {
				reject(err)
			})
	})

	return promise;
}

export const updateEmployeesAPI = (data, id) => (dispatch) => {
	const promise = new Promise((resolve, reject) => {

		const formData = new FormData()
		formData.append('ktp_file', data?.ktp_file); 
		formData.append('first_name', data?.first_name || '');
		formData.append('last_name', data?.last_name || '');
		formData.append('phone_number', data?.phone_number || '');
		formData.append('ktp_number', data?.ktp_number || '');
		
		formData.append('date_of_birth', data?.date_of_birth || '');
		formData.append('email', data?.email || '');
		formData.append('province_address', data?.province_address || '');
		formData.append('city_address', data?.city_address || '');
		formData.append('street_address', data?.street_address || '');
		formData.append('zip_code', data?.zip_code || '');
		formData.append('current_position', data?.current_position || '');
		formData.append('bank_account', data?.bank_account || '');
		formData.append('bank_account_number', data?.bank_account_number || '');
		formData.append('ktp_file', data?.ktp_file || '');

		formData.append('_method', 'PUT');

		instance.post(`employees/${id}`, formData, {
			headers: {
				'Content-Type': 'mutlipart/form-data'
			}
		})
			.then((res) => {
				dispatch({ type: 'UPDATE_EMPLOYEE', value: data, id: id })
				console.log(res);
				resolve(res)
			}, (err) => {
				reject(err)
			})
	})

	return promise;
}

export const deleteEmployeesAPI = (id) => (dispatch) => {
	dispatch({ type: 'DELETE_EMPLOYEE', value: id })

	const promise = new Promise((resolve, reject) => {
		instance.post(`employees/${id}`, { _method: 'DELETE' })
			.then((res) => {
				console.log(res);
				resolve(res)
			}, (err) => {
				reject(err)
			})
	})

	return promise;
}