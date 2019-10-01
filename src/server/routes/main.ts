import { Router } from "express";
import * as userRoutes from './user';

const MainRouter: any = Router();

// mounting the routes on their specific endpoints
MainRouter.use('/user', userRoutes);
/**
 * Exporting router object.
 */
module.exports =  MainRouter;