// Read Chat data from JSON file
function loadJSON(callback, jsonAddress) {
  let xobj = new XMLHttpRequest()

  xobj.overrideMimeType('application/json')
  xobj.open('GET', jsonAddress, true)
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText)
    }
  }

  xobj.send(null)
}

export const readDataFromJson = new Promise((resolve) => {
  loadJSON(function (response) {
    resolve(JSON.parse(response))
  }, 'http://localhost:1234/data.json')
})
