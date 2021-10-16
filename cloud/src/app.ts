/**
 * Allows routing for single page applications
 * Docs: https://help.back4app.com/hc/en-us/articles/360031634031-Routing-Single-Page-Application-
 */

import express from 'express'
import path from 'path'

const app = express()
const unRoutedPaths = [
    'apps',
    'batch',
    'requestPasswordReset',
    'files',
    'login',
    'logout',
    'user',
    'users',
    'Roles',
    'parse',
    'schemas',
    'functions',
    'classes',
    'aggregate',
    'cloud_code',
    'config',
    'hooks',
    'push_audiences',
    'installations',
    'push',
    'sessions',
    'events',
    'jobs',
    'export_progress',
    'export_data'
]

app.use((req, res, next) => {
    const pathParts = req.path.split('/').filter((p) => p !== '');
    if (req.path.indexOf('.') > 0 || unRoutedPaths.includes(pathParts[0])) {
        next();
    } else {
        res.sendFile(path.join(`${__dirname}/public/index.html`));
    }
});