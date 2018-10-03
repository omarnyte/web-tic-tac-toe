(ns web-tic-tac-toe.move-handler-test
  (:require [cheshire.core :as cheshire]
            [clojure.test :refer :all]
            [tic-tac-clojure.sample-boards :as sample-boards]
            [web-tic-tac-toe.move-handler :refer :all]))
     
(def board [nil nil nil nil nil nil nil nil nil])
          
(def move-handler (reify-handler))
          
(def gameOverState {:isOver false 
                    :isTie false 
                    :winner nil})

(def players {:currentPlayerMark "X"
              :O "human"
              :X "human"})

(def body-missing-board (cheshire/generate-string 
  {:players players
   :gameOverState gameOverState}))

(def body-missing-players (cheshire/generate-string 
  {:board board
   :gameOverState gameOverState}))

(def body-missing-game-over-state (cheshire/generate-string 
  {:board board
   :players players}))

(def body-with-selected-idx (cheshire/generate-string 
  {:board board
   :gameOverState gameOverState
   :players players
   :selectedIdx "0"}))

(defn build-request-with-body
  [body]
  (.. (Request$Builder.)
      (body body)
      (build)))

(defn build-body-with-board-and-idx 
  [board idx]
  (cheshire/generate-string 
  {:board board
   :gameOverState gameOverState
   :players players
   :selectedIdx idx}))

(deftest generate-response-for-request-missing-keys
  (testing "it returns status code 400 for Request missing board")
    (let [request (build-request-with-body body-missing-board)
          response (.generateResponse move-handler request)
          status-code (.getStatusCode response)]
      (is (= 400 status-code)))
  (testing "it returns status code 400 for Request missing gameOverState")
    (let [request (build-request-with-body body-missing-game-over-state)
          response (.generateResponse move-handler request)
          status-code (.getStatusCode response)]
      (is (= 400 status-code)))
  (testing "it returns status code 400 for Request missing players")
    (let [request (build-request-with-body body-missing-players)
          response (.generateResponse move-handler request)
          status-code (.getStatusCode response)]
      (is (= 400 status-code))))

(deftest generate-response-for-non-winning-move
  (let [request (build-request-with-body body-with-selected-idx)
        response (.generateResponse move-handler request)
        status-code (.getStatusCode response)
        message-body (.getMessageBody response)
        game-state (cheshire/parse-string (String. message-body) 
                                                   get-keywords-back)
        players-state (get game-state :players)]
    (testing "it returns status code 200")
      (is (= 200 status-code))
    (testing "it updates the board with the selected move")
      (is (= ["X" nil nil nil nil nil nil nil nil]
             (get game-state :board)))
    (testing "it switches currentPlayerMark to O")
      (is (= "O" (get players-state :currentPlayerMark)))))

(deftest generate-response-for-winning-move
  (let [body (build-body-with-board-and-idx sample-boards/near-x-victory-board 
                                            "0")
        request (build-request-with-body body)
        response (.generateResponse move-handler request)
        status-code (.getStatusCode response)
        message-body (.getMessageBody response)
        game-state (cheshire/parse-string (String. message-body) 
                                                   get-keywords-back)
        players-state (get game-state :players)]
    (testing "it returns status code 200")
      (is (= 200 status-code))
    (testing "it updates the board with the selected move")
      (is (= sample-boards/x-victory-board (get game-state :board)))
    (testing "it switches currentPlayerMark to O")
      (is (= "O" (get players-state :currentPlayerMark)))))