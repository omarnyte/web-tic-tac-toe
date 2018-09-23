(ns web-tic-tac-toe.new-game-handler
  (:gen-class)
  (:require [cheshire.core :as cheshire]
            [tic-tac-clojure.board :as board]))

(import Handler Response)

(def human-v-human 1)
(def human-v-ai 2)
(def ai-v-ai 3)

(defn- set-first-player
  [gameType]
  (case gameType
        "human-v-human" "human"
        "human-v-ai" "human"))

(defn- set-second-player
  [gameType]
  (case gameType
        "human-v-human" "human"
        "human-v-ai" "ai"))

(defn- create-message-body
  [request]
  (let [board-length 9
        request-json (cheshire/parse-string (.getBody request))]
    (cheshire/generate-string {
      :board (board/generate-empty-board board-length)
      :currentPlayerMark "X"
      :X  (set-first-player (get request-json "gameType"))
      :O  (set-second-player (get request-json "gameType"))
    })))
  
(defn- generate-response
  [request]
  (.. (Response$Builder. HttpStatusCode/OK)
      (setHeader (MessageHeader/CONTENT_TYPE) "application/json")
      (messageBody (create-message-body request))
      (build)))

(defn reify-handler 
  []
  (reify Handler 
    (generateResponse [this request] (generate-response request))))