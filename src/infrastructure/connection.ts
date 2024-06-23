import mysql from 'mysql2/promise'

export async function connectMySQL() {
	return await mysql.createConnection({
		host: 'localhost',
		port: 4406,
		database: 'reversi',
		user: 'reversi',
		password: 'password'
	});
}