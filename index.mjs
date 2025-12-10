import Fastify from 'fastify';
import apiRoutes from './routes/api.mjs';

const fastify = Fastify({
    logger: {
        level: "debug"
    },
    requestIdLogLabel: "rid"
});

fastify.register(apiRoutes, { prefix: "/api" });

try {
    await fastify.listen({ port: 3000 });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}


