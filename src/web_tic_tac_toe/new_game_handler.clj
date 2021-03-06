(ns web-tic-tac-toe.new-game-handler
  (:gen-class)
  (:require [cheshire.core :as cheshire]
            [clojure.string :as str]
            [tic-tac-clojure.board :as board]))

(import (com.omarnyte.handler Handler)
        (com.omarnyte.http MessageHeader) 
        (com.omarnyte.response HttpStatusCode Response Response$Builder))

(def first-player-mark "X")
(def game-type-separator #"\-v\-")
(def initialGameOverState {:isOver false 
                    :isTie false 
                    :winner nil})
(def oIndex 1)
(def xIndex 0)

(defn- set-player 
  [gameType, idx]
  (nth (str/split gameType game-type-separator) idx))
                                                            
(defn- set-initial-players-state
  [game-type]
  {:currentPlayerMark first-player-mark
   :X (set-player game-type xIndex)
   :O (set-player game-type oIndex)})
                                                            
(defn- create-message-body
  [request]
  (let [board-length 9
        request-json (cheshire/parse-string (.getBody request))
        game-type (get request-json "gameType")]
    (cheshire/generate-string {
      :board (board/generate-empty-board board-length)
      :gameOverState initialGameOverState
      :players (set-initial-players-state game-type)})))

(defn- build-new-game-response
  [request]
  (.. (Response$Builder. HttpStatusCode/OK)
      (setHeader (MessageHeader/CONTENT_TYPE) "application/json")
      (messageBody (create-message-body request))
      (build)))

(defn- build-bad-request-response
  []
  (.. (Response$Builder. HttpStatusCode/BAD_REQUEST)
      (build)))
    
(defn- generate-response
  [request]
  (try (build-new-game-response request)
       (catch NullPointerException e (build-bad-request-response))
       (catch IndexOutOfBoundsException e (build-bad-request-response))))

(defn reify-handler 
  []
  (reify Handler 
    (generateResponse [this request] (generate-response request))))