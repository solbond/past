/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppImport } from './routes/_app'
import { Route as AppIndexImport } from './routes/_app/index'
import { Route as AppTestIndexImport } from './routes/_app/test/index'
import { Route as AppTestCrudImport } from './routes/_app/test/crud'

// Create/Update Routes

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRoute,
} as any)

const AppTestIndexRoute = AppTestIndexImport.update({
  id: '/test/',
  path: '/test/',
  getParentRoute: () => AppRoute,
} as any)

const AppTestCrudRoute = AppTestCrudImport.update({
  id: '/test/crud',
  path: '/test/crud',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/test/crud': {
      id: '/_app/test/crud'
      path: '/test/crud'
      fullPath: '/test/crud'
      preLoaderRoute: typeof AppTestCrudImport
      parentRoute: typeof AppImport
    }
    '/_app/test/': {
      id: '/_app/test/'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof AppTestIndexImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppIndexRoute: typeof AppIndexRoute
  AppTestCrudRoute: typeof AppTestCrudRoute
  AppTestIndexRoute: typeof AppTestIndexRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppIndexRoute: AppIndexRoute,
  AppTestCrudRoute: AppTestCrudRoute,
  AppTestIndexRoute: AppTestIndexRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AppRouteWithChildren
  '/': typeof AppIndexRoute
  '/test/crud': typeof AppTestCrudRoute
  '/test': typeof AppTestIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof AppIndexRoute
  '/test/crud': typeof AppTestCrudRoute
  '/test': typeof AppTestIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteWithChildren
  '/_app/': typeof AppIndexRoute
  '/_app/test/crud': typeof AppTestCrudRoute
  '/_app/test/': typeof AppTestIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/' | '/test/crud' | '/test'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/test/crud' | '/test'
  id: '__root__' | '/_app' | '/_app/' | '/_app/test/crud' | '/_app/test/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/",
        "/_app/test/crud",
        "/_app/test/"
      ]
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    },
    "/_app/test/crud": {
      "filePath": "_app/test/crud.tsx",
      "parent": "/_app"
    },
    "/_app/test/": {
      "filePath": "_app/test/index.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
