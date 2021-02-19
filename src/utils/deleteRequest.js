async function deleteRequest(path = "") {
	const response = await fetch(path, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("token") ?? "",
		}
	});
	const data = await response.json();
	return data;
}

export default deleteRequest;
