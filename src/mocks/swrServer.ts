// src/mocks/server.js
import { setupServer } from 'msw/node'
import { swrHandlers } from './handlers'

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...swrHandlers)
