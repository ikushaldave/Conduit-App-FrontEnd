async function postRequest (path="", postContent = {}) {
  	const response = await fetch(path, {
		method: "POST",
		headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token") ?? ""
		},
		body: JSON.stringify(postContent),
	});
  const data = await response.json();
  return data;
}

export default postRequest;