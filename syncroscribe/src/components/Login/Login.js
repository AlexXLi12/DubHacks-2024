// src/Login.js

import React, { useState } from "react";

const Login = ({ onLogin}) => {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Replace this with your actual authentication logic
		if (username === "" || password === "") {
			setError("Please fill in all fields");
		} else if (username === "admin" || password === "admin") {
			onLogin(username);
		}		
		else {
			console.log("Username:", username);
			console.log("Password:", password);
			setError("");
		}
	};

	return (
		<div className="component">
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">User ID</label>
					<input
						type="username"
						id="username"
						value={username}
						onChange={(e) => setUserName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Sign in</button>
			</form>
		</div>
	);
};

export default Login;
