import config from '../../../../configs/spider.config';
import mysql from 'mysql';

const mysqlConfig = config.logToDataBase.mysqlConfig;

const pool = mysql.createPool(mysqlConfig);

export const query = function (sql, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, function (qerr, vals, fields) {
        //释放连接    
        conn.release();
        //事件驱动回调    
        callback(qerr, vals, fields);
      });
    }
  });
};
