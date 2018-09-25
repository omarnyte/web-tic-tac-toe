(ns web-tic-tac-toe.move-handler
  (:gen-class)
  (:require [cheshire.core :as cheshire]
            [tic-tac-clojure.board :as board]
            [tic-tac-clojure.gameplay :as gameplay]
            [tic-tac-clojure.player :as player]))

(import Handler Response)
          
(def oMark "O")
(def xMark "X")

(defn- make-human-move
  [request-json]
  (board/mark-board (get request-json "board")
                    (read-string (get request-json "selectedIdx"))
                    (get request-json "currentPlayerMark")))

(defn- make-ai-move 
  [request-json]
  (let [current-player-mark (get request-json "currentPlayerMark")
        ai-player (player/create-proto-player current-player-mark "ai")
        board (get request-json "board")]
    (player/take-turn ai-player board)))

(defn- make-move 
  [request-json]
  (let [current-player-mark (get request-json "currentPlayerMark")
        is-human (= (get request-json current-player-mark) "human")]
    (if is-human (make-human-move request-json) 
                 (make-ai-move request-json))))

(defn- get-opp-mark
[marker]
(if (= xMark marker) oMark xMark))

(defn- create-message-body
  [request]
  (let [request-json (cheshire/parse-string (.getBody request))]
    (cheshire/generate-string {
      :board (make-move request-json)
      :currentPlayerMark (get-opp-mark (get request-json "currentPlayerMark"))
      :X (get request-json xMark)
      :O (get request-json oMark)
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
