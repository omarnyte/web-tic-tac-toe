(ns web-tic-tac-toe.core
  (:require [web-tic-tac-toe.default-handler])
  (:gen-class))

; (import Router Middleware Server)

; (defn get-default-handler
;   []
;   default-handler)

; (defn get-routes
;   []
;   (doto (new java.util.HashMap)))

; (defn get-directory
;   []
;   (doto (new java.util.HashMap)))

; (defn setUpRouter 
;   []
;   (Router. (get-default-handler) (get-routes) (get-directory)))

; (defn startServer
;   []
;   (Server. 5000 (setUpRouter) (setUpMiddlewareChain))))

; (defn -main
;   []
;   startServer)

(defn -main
  []
  (println "Hello, web!"))