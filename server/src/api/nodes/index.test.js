import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Nodes } from '.'

const app = () => express(routes)

let nodes

beforeEach(async () => {
  nodes = await Nodes.create({})
})

test('POST /nodes 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ name: 'test', parentId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.parentId).toEqual('test')
})

test('GET /nodes 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /nodes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${nodes.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(nodes.id)
})

test('GET /nodes/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /nodes/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${nodes.id}`)
    .send({ name: 'test', parentId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(nodes.id)
  expect(body.name).toEqual('test')
  expect(body.parentId).toEqual('test')
})

test('PUT /nodes/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ name: 'test', parentId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /nodes/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${nodes.id}`)
  expect(status).toBe(204)
})

test('DELETE /nodes/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
