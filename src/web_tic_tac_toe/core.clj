(ns web-tic-tac-toe.core
  (:require [web-tic-tac-toe.default-handler :as default-handler]
            [web-tic-tac-toe.move-handler :as move-handler]
            [web-tic-tac-toe.new-game-handler :as new-game-handler]
            [web-tic-tac-toe.middleware :as middleware])
  (:gen-class))

(import (java.io File)
        (com.omarnyte Directory Router Server)
        (com.omarnyte.logger Logger)
        (com.omarnyte.middleware Middleware))

(def env-port (System/getenv "PORT"))
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
        (.put "/api/new-game" (new-game-handler/reify-handler))
        (.put "/api/move" (move-handler/reify-handler))))

(defn set-up-router 
  []
  (Router. (default-handler/reify-handler (get-directory))
           (get-routes) 
           (get-directory)))

(defn- create-log-directory
  [logger-path]
  (let [log-diretory (File. logger-path)]
    (.mkdirs log-diretory)))

(defn set-up-logger-middleware
  []
  (let [logger (Logger. logger-path "yyyymmddhhmmss")]
    (create-log-directory logger-path)
    (.createLogFile logger)
    logger))

(defn- get-port-from-env
  [env-port]
  (try (Integer/parseInt env-port)
       (catch NumberFormatException e nil)))

(defn configure-server
  []
  (Server. (or (get-port-from-env env-port) default-port) 
           (set-up-router) 
           (set-up-logger-middleware)))

(defn -main
  []
  (.. (configure-server)
      (start)))
