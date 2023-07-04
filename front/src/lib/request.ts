
interface requsetType {
    method: 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'update' | 'UPDATE';
    url: string;
    body?: object
}

const request = async ({ method, url, body }: requsetType) => {
    const response = await fetch(url, {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    return response.json();
}

export default request