// Funzione per configurare il token dei permessi di Reddit
async function getAppAccessToken() {
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const res = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "client_credentials"
        })
    });

    const data = await res.json();
    return data.access_token;
}

// Lista delle subreddits da analizzare
const subreddits = ["SaaS"];

export default async function apiRoutes(fastify, options) {

    // Endpoint per caricare i dati interessati delle varie subreddits
    fastify.get("/retrieve-data", async function handler(request, reply) {
        try {
            const token = getAppAccessToken();
            for (const subreddit of subreddits) {
                const res = await fetch(`https://oauth.reddit.com/r/${subreddit}/about.json`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "User-Agent": "sub_tracker",
                        "Content-Type": "application/json",
                    }
                });
                console.log(res);
            }
            return { status: "ok" };
        } catch (err) {
            console.error("Errore nel recupero dati subreddit", err);
            reply.code(500).send({ error: "Errore" });
        }
    });

}

/* 
* Impossibilità di aggiungere una nuova app/script all'interno della piattaforma https://www.reddit.com/prefs/apps  
* quindi impossibilità di recuperare il REDDIT_CLIENT_ID e il REDDIT_CLIENT_SECRET
*/