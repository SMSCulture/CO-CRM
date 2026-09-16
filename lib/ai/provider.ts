export async function reviewedAiDraft<T>(task: string, input: unknown): Promise<T> {
 const endpoint=process.env.AI_DRAFT_ENDPOINT;
 const key=process.env.AI_DRAFT_KEY;
 if(!endpoint||!key) throw new Error('AI drafting is not configured');
 const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${key}`},body:JSON.stringify({task,input}),cache:'no-store'});
 if(!response.ok) throw new Error('AI provider request failed');
 return response.json() as Promise<T>;
}
