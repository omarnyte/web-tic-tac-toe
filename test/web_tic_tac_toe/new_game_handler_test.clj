(ns web-tic-tac-toe.new-game-handler-test
  (:require [clojure.test :refer :all]
            [cheshire.core :as cheshire]
            [web-tic-tac-toe.new-game-handler :refer :all]))

(import Request)

(def new-game-handler (reify-handler))

(def ai "ai")
(def board-length 9)
(def human "human")
(def oMark "O")
(def xMark "X")

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
        xPlayer (get response-body-json xMark)
        oPlayer (get response-body-json oMark)]
    (testing "it returns a Response with status code 200")
      (is (= 200 status-code))
    (testing "it returns a Response containing an empty board")
        (is (= (vec (repeat board-length nil)) board))
    (testing "it returns a Response containing two human players")
        (is (and (= human xPlayer)
                 (= human oPlayer)))))

(deftest generate-response-for-human-v-ai 
  (let [request (build-request "human-v-ai")
        response (.generateResponse new-game-handler request)
        status-code (.getStatusCode response)
        message-body (.getMessageBody response)
        response-body-json (cheshire/parse-string (String. message-body))
        board (get response-body-json "board")
        xPlayer (get response-body-json xMark)
        oPlayer (get response-body-json oMark)]
    (testing "it returns a Response with status code 200")
      (is (= 200 status-code))
    (testing "it returns a Response containing an empty board")
        (is (= (vec (repeat board-length nil)) board))
    (testing "it returns a Response containing a human and AI player")
        (is (and (= human xPlayer)
                  (= ai oPlayer)))))
              
(deftest generate-response-for-ai-v-ai 
  (let [request (build-request "ai-v-ai")
        response (.generateResponse new-game-handler request)
        status-code (.getStatusCode response)
        message-body (.getMessageBody response)
        response-body-json (cheshire/parse-string (String. message-body))
        board (get response-body-json "board")
        xPlayer (get response-body-json xMark)
        oPlayer (get response-body-json oMark)]
    (testing "it returns a Response with status code 200")
      (is (= 200 status-code))
    (testing "it returns a Response containing an empty board")
        (is (= (vec (repeat board-length nil)) board))
    (testing "it returns a Response containing a human and AI player")
        (is (and (= ai xPlayer)
                  (= ai oPlayer)))))
                