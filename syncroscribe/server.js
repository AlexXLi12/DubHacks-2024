const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "./build")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./build", "index.html"));
});
app.post("/proxy", async (req, res) => {
	const config = require("./src/config.json");
	const cloudflare_api_key = config.cloudflare_api_key;
	const auth_string = "Bearer " + cloudflare_api_key;
	const cloudflare_model_url = config.cloudflare_model_url;
	const response = await fetch(cloudflare_model_url, {
		credentials: "omit",
		method: "POST",
		headers: {
			Authorization: auth_string,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(req.body),
	});
	const data = await new Response(response.body).text();
	res.send(data);
});

async function processReadableStream(stream) {
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	let completeData = ""; // To hold all incoming data as a string

	try {
		while (true) {
			const { done, value } = await reader.read(); // Read a chunk from the stream
			if (done) break; // Exit loop if no more data

			// Decode the chunk
			const decodedChunk = decoder.decode(value, { stream: true });
			// Split the decoded chunk into lines
			const lines = decodedChunk.split("\n");

			// Process each line
			for (const line of lines) {
				// Ignore empty lines
				if (line.trim() === "") continue;

				// Check for the [DONE] marker
				if (line === "[DONE]") {
					return completeData; // Return the accumulated string when done
				}

				// Check if the line starts with "data: "
				if (line.startsWith("data: ")) {
					try {
						const jsonString = line.slice(6); // Extract the JSON part
						const jsonObject = JSON.parse(jsonString); // Parse JSON
						completeData += jsonObject.response; // Accumulate the response
					} catch (error) {
						console.error("Error parsing JSON:", error);
					}
				}
			}
		}
	} catch (error) {
		console.error("Error reading stream:", error);
	} finally {
		reader.releaseLock(); // Always release the reader lock
	}

	return completeData; // Return the complete accumulated string
}

app.listen(3000, () => console.log("Server running on port 3000"));
