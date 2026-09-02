export interface AwesomeGetResponse {
    reply: string;
}

export async function awesomeGet(): Promise<AwesomeGetResponse> {
    const response = await fetch("/api/awesome-endpoint");

    return (await response.json()) as AwesomeGetResponse;
}
