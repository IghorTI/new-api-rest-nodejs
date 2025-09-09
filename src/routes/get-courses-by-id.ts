import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {eq} from 'drizzle-orm'
import { db } from '../database/client.ts';
import { courses } from '../database/schema.ts';
import z from 'zod';

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {

    server.get('/courses/:id', {
        schema: {
            tags: ['courses'],
            summary: 'Get course by id',
            description: 'Essa rota retorna um curso específico cadastrado no banco de dados.',
            params: z.object({
                id: z.uuid()
            }),
            response: {
                200: z.object({
                    course: z.object({
                        id: z.uuid(),
                        title: z.string(),
                        description: z.string().nullable()
                    })
                }),
                404: z.null().describe('Curso não encontrado.')
            },
        },
    }, async (request, reply) => {

            const courseId = request.params.id;

            const result = await db
                .select()
                .from(courses)
                .where(eq(courses.id, courseId))

            if (result.length > 0) {
                return {
                    course: result[0]
                }
            }

            return reply.status(404).send();
        })

}


