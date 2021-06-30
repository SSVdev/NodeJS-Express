
const User = require('../models/users.model');
const people = require('../assets/people.json');
const fs = require('fs');
const filename = 'chao.txt';
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


class UserController {
	get(req, res) {
		db.connectDB()
			.then((connection) => {
				connection.query(
					'SELECT * FROM user_login',
					function (err, data, fields) {
						db.closeDB(connection);
						return res.status(200).json(data);
					}
				);
			})
			.catch((error) => {
				console.log('Db not connected successfully', error);
				return res
					.status(200)
					.json({ result: `Không thể kết nối Database` });
			});
	}

	post(req, res) {
		const username = req.body.username;
		const password = req.body.password;
		let encryptedPassword = '';

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                encryptedPassword = hash;
                console.log('data', hash);

                db.connectDB()
				.then((connection) => {
					connection.query(
						`INSERT INTO user_login(username, password, email, phone, confirm_code) VALUES('${username}', '${encryptedPassword}', '','','')`,
						function (err, data, fields) {
							db.closeDB(connection);
							return res
								.status(200)
								.json({ result: `Thành công` });
						}
					);
				})
				.catch((error) => {
					console.log('Db not connected successfully', error);
					return res
						.status(200)
						.json({ result: `Không thể kết nối Database` });
				});                
            });
        });
	}

	// login(req, res) {
	// 	const username = req.body.username;
	// 	const password = req.body.password;

	// 	db.connectDB()
	// 		.then((connection) => {
	// 			connection.query(
	// 				`SELECT * FROM user_login WHERE username='${username}' LIMIT 1`,
	// 				function (err, data, fields) {
	// 					//console.log('data:', data[0].password);
    //                     console.log('data', data);
    //                     //console.log('user enter:', username);
    //                     //console.log('user enter:', password);
	// 					db.closeDB(connection);

	// 					bcrypt.compare(
	// 						password,
	// 						data[0].password,
	// 						function (err, result) {
	// 							if (result) {
	// 								return res
	// 									.status(200)
	// 									.json('Login thành công');
	// 							} else {
	// 								return res
	// 									.status(200)
	// 									.json('Login thất bại');
	// 							}
	// 						}
	// 					);
	// 				}
	// 			);
	// 		})
	// 		.catch((error) => {
	// 			console.log('Db not connected successfully', error);
	// 			return res
	// 				.status(200)
	// 				.json({ result: `Không thể kết nối Database` });
	// 		});
	// }
	
	async login(req, res) {
		const username = req.body.username;
		const password = req.body.password;
		db.connectDB()
			.then((connection) => {
				connection.query(
					`SELECT * FROM user_login WHERE username='${username}' LIMIT 1`,
					async function (err, data, fields) {
						console.log('password = ' + password);
						console.log('data', data[0].password);
						db.closeDB(connection);
						const kiemtraPwd = await bcrypt.compare(
							password,
							data[0].password
						);
						if (kiemtraPwd) {
							const payload = {username:username, password:password};
							const token = generateJWT(payload);
							return res.status(200).json({Result:'Login Thành công, vé của bạn', token: token});
						}
						else {
							return res.status(200).json('Login thất bại');
						}
					}
				);
			})
			.catch((error) => {
				console.log('Db not connected successfully', error);
				return res
					.status(200)
					.json({ result: `Không thể kết nối Database` });
			});
	}

	async async_await(req, res) {
		let allData = 'Chưa có data';
		const promise1 = await db.testPromise('#1', 2000).then((data) => {
			allData = data;
		});
		console.log('allData', allData);
		return res.status(200).json(allData);
	}	

	generateSecretKey(req, res) {
		const key = require('crypto').randomBytes(256).toString('hex');
		console.log('Key:', key);
		return res.status(200).json(key);
	}

	async fakeLogin(req, res) {
		const payload = {username:'Hao Nguyen', ID:'10', Role:'Admin'};
		const token = generateJWT(payload);
		return res.status(200).json(token);
	}
	
	Test(req, res) {
		const test = User.createCrud();
		return res.status(200).json(test);
	}
}

function generateJWT(payload) {
	return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '120s'});
}


module.exports = new UserController();