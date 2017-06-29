import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Nodes, { schema } from './model'

const router = new Router()
const { name, parentId } = schema.tree

/**
 * @api {post} /nodes Create nodes
 * @apiName CreateNodes
 * @apiGroup Nodes
 * @apiParam name Nodes's name.
 * @apiParam parentId Nodes's parentId.
 * @apiSuccess {Object} nodes Nodes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Nodes not found.
 */
router.post('/',
  body({ name, parentId }),
  create)

/**
 * @api {get} /nodes Retrieve nodes
 * @apiName RetrieveNodes
 * @apiGroup Nodes
 * @apiUse listParams
 * @apiSuccess {Object[]} nodes List of nodes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /nodes/:id Retrieve nodes
 * @apiName RetrieveNodes
 * @apiGroup Nodes
 * @apiSuccess {Object} nodes Nodes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Nodes not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /nodes/:id Update nodes
 * @apiName UpdateNodes
 * @apiGroup Nodes
 * @apiParam name Nodes's name.
 * @apiParam parentId Nodes's parentId.
 * @apiSuccess {Object} nodes Nodes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Nodes not found.
 */
router.put('/:id',
  body({ name, parentId }),
  update)

/**
 * @api {delete} /nodes/:id Delete nodes
 * @apiName DeleteNodes
 * @apiGroup Nodes
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Nodes not found.
 */
router.delete('/:id',
  destroy)

export default router
