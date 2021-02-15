async function getRequest(path = "") {
	const response = await fetch(path, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": localStorage.getItem("token") ?? "",
		},
	});
	const data = await response.json();
	return data;
}

export default getRequest;
