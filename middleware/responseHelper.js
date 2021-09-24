let jsonResponse = (res, status, data, message, code, httpCode = 200) => {
	return res.status(code).json({
		success: status,
		data: data,
		message: message,
	});
};


module.exports = {
	jsonResponse,
};
