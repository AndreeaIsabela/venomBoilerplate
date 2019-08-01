import { Router } from "express";

import * as user from './user';

const MainRouter: any = Router();

// mounting the routes on their specific endpoints
MainRouter.use('/user', user);

/**
 * Exporting router object.
 */
export default MainRouter;