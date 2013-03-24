
function index(request, response) {
  response.render('index', {request: request})
}

module.exports = {
  index: index,
}






