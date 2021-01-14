const callApi = async (url) => {
	const resp = await fetch(url);
	return await resp.json();
};

const formatDate = (date) => new Date(date).toLocaleDateString();

export { callApi, formatDate };
