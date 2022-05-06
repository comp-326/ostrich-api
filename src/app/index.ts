import express from 'express';
import setup from '@ostrich-app/setup';

const app = express();
setup({ app });

export default app;
