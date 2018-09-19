(ns web-tic-tac-toe.core
  (:require [web-tic-tac-toe.default-handler :as default-handler]
            [web-tic-tac-toe.middleware :as middleware])
  (:gen-class))

(import Directory Router Server)

(def default-port 8888)
(def path (str (System/getProperty "user.dir") "/public"))

(defn get-directory
  []
  (Directory. path))

(defn get-routes
  []
  (doto (java.util.HashMap.)
        (.put "/" (default-handler/reify-handler (get-directory)))))

(defn set-up-router 
  []
  (Router. (default-handler/reify-handler (get-directory))
           (get-routes) 
           (get-directory)))

(defn configure-server
  []
  (Server. default-port 
           (set-up-router) 
           (middleware/extend-middleware)))

(defn -main
  []
  (.. (configure-server)
      (start)))
