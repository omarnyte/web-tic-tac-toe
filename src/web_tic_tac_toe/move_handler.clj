(ns web-tic-tac-toe.move-handler
  (:gen-class)
  (:require [cheshire.core :as cheshire]
            [web-tic-tac-toe.game-state :as game-state]))

(import Handler MessageHeader Response)

(def get-keywords-back true)

(defn- build-bad-request-response
  [e]
  (.. (Response$Builder. HttpStatusCode/BAD_REQUEST)
      (messageBody (.getMessage e))
      (build)))

(defn- build-message-body
  [game-state]
  (let [updated-board (game-state/make-move game-state)]
  (cheshire/generate-string {
    :board updated-board
    :gameOverState (game-state/update-game-over-state updated-board)
    :players (game-state/update-players-state (get game-state :players))
  })))

(defn- build-response-with-updated-game-state
  [game-state]
  (.. (Response$Builder. HttpStatusCode/OK)
      (setHeader (MessageHeader/CONTENT_TYPE) "application/json")
      (messageBody (build-message-body game-state))
      (build)))

(defn- generate-response
  [request]
  (let [body (.getBody request)
        request-body-json (cheshire/parse-string body get-keywords-back)]
      (try (build-response-with-updated-game-state request-body-json)
           (catch BadRequestException e (build-bad-request-response e)))))

(defn reify-handler 
  []
  (reify Handler 
    (generateResponse [this request] (generate-response request))))
