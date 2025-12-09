const subreddits = ["SaaS"];

const accessToken = process.env.REDDIT_ACCESS_TOKEN;

async function subredditsRoutes(fastify, options) {

    fastify.get("/retrieve-data", async function handler(request, reply) {
        try {

            for (const subreddit of subreddits) {
                const res = await fetch(`https://oauth.reddit.com/r/${subreddit}/about.json`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "User-Agent": "postonreddit",
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

export default subredditsRoutes;