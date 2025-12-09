import Fastify from 'fastify';
import subredditsRoutes from './routes/subreddits.mjs';

const fastify = Fastify({
    logger: {
        level: "debug"
    },
    requestIdLogLabel: "rid"
});

fastify.register(subredditsRoutes);

try {
    await fastify.listen({ port: 3000 });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}


