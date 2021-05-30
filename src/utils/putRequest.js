async function putRequest(path = "", putContent = {}) {
	console.log(putContent);
	const response = await fetch(path, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("token") ?? "",
		},
		body: JSON.stringify(putContent),
	});
	const data = await response.json();
	return data;
}

export default putRequest;
