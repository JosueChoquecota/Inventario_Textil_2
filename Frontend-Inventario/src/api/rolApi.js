const API_URL = 'http://localhost:8081/api/v1/roles';

export const getRoles = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Error ${response.status}: ${await response.text()}`);
    return response.json();
};
