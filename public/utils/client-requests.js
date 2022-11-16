export async function request(url, content) {
    let method;

    const requestObject = { method }

    if (!content) {
        requestObject.method = "GET"
    } else {
        requestObject.method = "POST"

        if (typeof content === "string") {
            requestObject.headers = { "Content-Type": "application/text" }
            requestObject.body = content
        } else {
            const json = JSON.stringify(content)

            requestObject.headers = { "Content-Type": "application/json" }
            requestObject.body = json
        }
    }

    const response = await fetch(url, requestObject)
    const data = await response.text()

    try {
        const json = JSON.parse(data)

        if (json) {
            return json
        }
    } catch (err) { }

    return data
}
