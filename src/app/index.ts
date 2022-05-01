import express from 'express';
import setup from '@ostrich-setup';

const app = express();
setup({ app });

export default app;
