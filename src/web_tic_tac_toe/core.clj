(ns web-tic-tac-toe.core
  (:require [web-tic-tac-toe.default-handler :as default-handler]
            [web-tic-tac-toe.new-game-handler :as new-game-handler]
            [web-tic-tac-toe.middleware :as middleware])
  (:gen-class))

(import Directory Middleware Router Server)

(def default-port 8888)
(def path (str (System/getProperty "user.dir") "/public"))
(def logger-path (str (System/getProperty "user.dir") "/logs"))

(defn get-directory
  []
  (Directory. path))

(defn get-routes
  []
  (doto (java.util.HashMap.)
        (.put "/" (default-handler/reify-handler (get-directory)))
        (.put "/api/new-game" (new-game-handler/reify-handler))))

(defn set-up-router 
  []
  (Router. (default-handler/reify-handler (get-directory))
           (get-routes) 
           (get-directory)))

(defn set-up-logger-middleware
  []
  (let [logger (Logger. logger-path "yyyymmddhhmmss")]
    (.createLogFile logger)
    logger))
          
(defn configure-server
  []
  (Server. default-port 
           (set-up-router) 
           (set-up-logger-middleware)))

(defn -main
  []
  (.. (configure-server)
      (start)))
