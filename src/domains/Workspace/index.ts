import { Router } from 'express';
import api from './api';

const workspaceRouter = Router();
export default function workspaceDomain(app: Router) {
	app.use('/workspaces', workspaceRouter);
	// Get all workspaces
	api.makeQueryAllWorkspaceApiCall(workspaceRouter);
	// Create workspace
	api.makeQueryNewWorkspaceApiCall(workspaceRouter);
	// Update workspace logo
	api.makeQueryUpdateLogoWorkspaceApiCall(workspaceRouter);
	// Update workspace
	api.makeQueryUpdateWorkspaceApiCall(workspaceRouter);
	// Get user workspaces
	api.makeQueryUserWorkspaceApiCall(workspaceRouter);
	return app;
}