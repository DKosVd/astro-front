import { APIContext } from 'astro';

export async function get({params}: APIContext) {
    return new Response(JSON.stringify({id: 1}), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}