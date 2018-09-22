(ns web-tic-tac-toe.middleware
  (:gen-class))

(import Middleware)

(defn- apply-middleware
  [response]
  response)

(defn extend-middleware
  []
  (proxy [Middleware] []
    (applyMiddleware [response] (apply-middleware response))))
