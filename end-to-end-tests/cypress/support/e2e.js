// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err) => {
  // monaco-editor sometimes throws errors when reloading
  // and we don't want to fail the test so we return false
  if (err.message.includes("Failed to execute 'importScripts' on 'WorkerGlobalScope'")) {
    return false
  }

  if (err.message.includes("Cannot read properties of null (reading 'getText')")) {
    return false
  }
  
  // TODO: Find a fix where we don't need to avoid this exception
  // https://github.com/EasyDynamics/oscal-editor-deployment/issues/121
  if (err.message.includes("ResizeObserver loop")) {
    return false
  }
})
