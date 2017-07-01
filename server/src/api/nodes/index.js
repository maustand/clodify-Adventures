import { Router } from 'express';
import { middleware as query } from 'querymen';
import bodymen from "bodymen";
import { index, update } from './controller';

const router = new Router();
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
// router.post('/',
//   body({ name, parentId }),
//   create);

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
  index);


/**
 * @api {put} /nodes/ Update nodes
 * @apiName UpdateNodes
 * @apiGroup Nodes
 * @apiParam name Nodes's name.
 * @apiParam parentId Nodes's parentId.
 * @apiSuccess {Object} nodes Nodes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Nodes not found.
 */
router.put('/',
	bodymen.middleware({
		id: {
			type: Number
		  },
		  name: {
		    type: String
		  },
		  action: {
		    type: String
		  }
	}), update);

export default router;