import config from '../../configs/spider.config';
import moment from 'moment';
import { writFile } from './log-to-file/use-csv/writFile';

function Logger(logConfig = config) {
	this.setTime = true;

	if (logConfig.logToFile) {
		if (logConfig.logToFile.enable) {
			this.logToFile = true;
			this.errorFile = logConfig.logToFile.errorFile;
			this.successFile = logConfig.logToFile.successFile;
			this.infoFile = logConfig.logToFile.infoFile;
		}
		if (logConfig.logToConsole) {
			if (logConfig.logToConsole.enable) {
				this.logToConsole = true;
			}
		}
	}
	this.formatMessage = function(type, message) {};
	this.LoggerInfo = function(message) {
		const msg = `info,${moment().format('YYYY-MM-DD HH:mm:ss')},${message}\n`;
		if (this.logToConsole) {
			console.log(msg);
		}
		if (this.logToFile) {
			writFile(this.infoFile, msg);
		}
	}.bind(this);
	this.LoggerSuccess = function(message) {
		const msg = `success,${moment().format('YYYY-MM-DD HH:mm:ss')},${message}\n`;
		if (this.logToConsole) {
			console.log(msg);
		}
		if (this.logToFile) {
			writFile(this.successFile, msg);
		}
	}.bind(this);
	this.LoggerError = function(message) {
		const msg = `error,${moment().format('YYYY-MM-DD HH:mm:ss')},${message}\n`;
		if (this.logToConsole) {
			console.log(msg);
		}
		if (this.logToFile) {
			writFile(this.errorFile, msg);
		}
	}.bind(this);
}
export default new Logger();
