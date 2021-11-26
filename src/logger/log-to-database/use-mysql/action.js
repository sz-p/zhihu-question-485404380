import { query } from './connect';

export const setSuccess = () => {
	return new Promise((resolve, reject) => {
		const sql = ``;
		query(sql, (error, results, fields) => {
			if (results) {
				resolve(results);
			} else {
				resolve(0);
			}
		});
	});
};

export const setError = () => {
	return new Promise((resolve, reject) => {
		const sql = ``;
		query(sql, (error, results, fields) => {
			if (results) {
				resolve(results);
			} else {
				resolve(0);
			}
		});
	});
};

export const setData = () => {
	return new Promise((resolve, reject) => {
		const sql = ``;
		query(sql, (error, results, fields) => {
			if (results) {
				resolve(results);
			} else {
				resolve(0);
			}
		});
	});
};
