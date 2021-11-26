import paths from './paths';
export default {
	useHeader: false,
	logToDataBase: {
		enable: false,
		useMysql: false,
		mysqlConfig: {
			host: '',
			user: '',
			password: '',
			database: ''
		}
	},
	logToFile: {
		enable: true,
		useCsv: true,
    errorFile: paths.errorFile_CSV,
    successFile: paths.successFile_CSV,
    infoFile: paths.infoFile_CSV,
	},
	logToConsole: {
		enable: true
	}
};
