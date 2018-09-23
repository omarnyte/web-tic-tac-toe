(ns web-tic-tac-toe.new-game-handler-test
  (:require [clojure.test :refer :all]
            [cheshire.core :as cheshire]
            [web-tic-tac-toe.new-game-handler :refer :all]))

(import Request)

(def new-game-handler (reify-handler))

(def empty-board (vector))
(defn- create-message-body
  [gameType]
  (cheshire/generate-string {
    :gameType gameType
  }))

(defn- build-request
  [gameType]
  (.. (Request$Builder.)
      (body (create-message-body gameType))
      (build)))
               
(deftest generate-response-for-human-v-human 
  (let [request (build-request "human-v-human")
        response (.generateResponse new-game-handler request)
        status-code (.getStatusCode response)
        message-body (.getMessageBody response)
        response-body-json (cheshire/parse-string (String. message-body))
        board (get response-body-json "board")
        xPlayer (get response-body-json "X")
        oPlayer (get response-body-json "O")]
    (testing "it returns a Response with status code 200")
      (is (= 200 status-code))
    (testing "it returns a Response containing an empty board")
        (is (= (vec (repeat 9 nil)) board))
    (testing "it returns a Response containing two human players")
        (is (and (= "human" xPlayer)
                 (= "human" oPlayer)))))
