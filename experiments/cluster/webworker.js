onmessage = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          postMessage({
              status: 200,
              text: xhr.responseText
          })
        } else {
          postMessage({
              status: xhr.status
          })
        }
      }
    }
    xhr.send()
}