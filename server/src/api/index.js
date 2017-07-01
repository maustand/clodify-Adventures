import { Router } from 'express';
import nodes from './nodes';

const router = new Router();

router.use('/nodes', nodes);

export default router;
