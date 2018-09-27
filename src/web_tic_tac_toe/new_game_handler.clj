(ns web-tic-tac-toe.new-game-handler
  (:gen-class)
  (:require [cheshire.core :as cheshire]
            [tic-tac-clojure.board :as board]
            [tic-tac-clojure.gameplay :as gameplay]))

(import Handler Response)

(def human-v-human 1)
(def human-v-ai 2)
(def ai-v-ai 3)

(defn create-message-body
  []
  (let [board-length 9]
    (cheshire/generate-string {:board (board/generate-empty-board board-length)})))

(defn generate-response
  [request]
  (.. (Response$Builder. HttpStatusCode/OK)
      (setHeader (MessageHeader/CONTENT_TYPE) "application/json")
      (messageBody (create-message-body))
      (build)))

(defn reify-handler 
  []
  (reify Handler 
    (generateResponse [this request] (generate-response request))))