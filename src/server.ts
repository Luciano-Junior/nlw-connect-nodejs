import {fastify} from 'fastify';
import {fastifyCors} from '@fastify/cors'
import {validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod'
import {fastifySwagger} from '@fastify/swagger'
import {fastifySwaggerUi} from '@fastify/swagger-ui'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';
import { env } from './env';

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler) // Adicionado para validação de dados
app.setSerializerCompiler(serializerCompiler)// adicionado para preparar os dados antes de mandar para o front

app.register(fastifyCors)// adcionado para configurações de CORS da aplicação

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'NLW Connect',
            version: '0.0.1',
            description: 'Testing the Fastify swagger API',
        },
        servers: [
            {
              url: 'http://localhost:3333',
              description: 'Development server'
            }
          ],
    },
    transform: jsonSchemaTransform
})// adcionado para criar documentação com swagger

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(subscribeToEventRoute)

app.listen({port: env.PORT}).then(()=>{
    console.log("HTTP server running!")
})