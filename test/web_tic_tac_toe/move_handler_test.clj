(ns web-tic-tac-toe.move-handler-test
  (:require [cheshire.core :as cheshire]
            [clojure.test :refer :all]
            [web-tic-tac-toe.move-handler :refer :all]))

(def move-handler (reify-handler))

(def ai "ai")
(def human "human")
(def oMark "O")
(def xMark "X")

(def invalid-idx-message-body (cheshire/generate-string {
  :board [nil nil nil nil nil nil nil nil nil]
  :currentPlayerMark xMark
  :O human
  :selectedIdx "100"
  :X human
}))

(def human-v-human-message-body (cheshire/generate-string {
  :board [nil nil nil nil nil nil nil nil nil]
  :currentPlayerMark xMark
  :O human
  :selectedIdx "0"
  :X human
}))

(def human-v-ai-message-body (cheshire/generate-string {
  :board [xMark nil oMark 
          xMark nil xMark 
          oMark nil xMark]
  :currentPlayerMark oMark
  :O ai
  :X human
}))

(defn build-request-with-body
  [body]
  (.. (Request$Builder.)
      (body body)
      (build)))

(deftest generate-response-for-invalid-board-idx
  (let [request (build-request-with-body invalid-idx-message-body)
        response (.generateResponse move-handler request)
        status-code (.getStatusCode response)]
    (testing "it returns a Response with status code 400")
      (is (= 400 status-code))))

(deftest generate-response-for-human-move 
  (let [request (build-request-with-body human-v-human-message-body)
        response (.generateResponse move-handler request)
        status-code (.getStatusCode response)
        message-body (.getMessageBody response)
        response-body-json (cheshire/parse-string (String. message-body))]
    (testing "it returns a Response with status code 200")
      (is (= 200 status-code))
    (testing "it returns a Response containing the updated board")
        (is (= [xMark nil nil nil nil nil nil nil nil]
                (get response-body-json "board")))))

(deftest generate-response-for-ai-move 
  (let [request (build-request-with-body human-v-ai-message-body)
        response (.generateResponse move-handler request)
        status-code (.getStatusCode response)
        message-body (.getMessageBody response)
        response-body-json (cheshire/parse-string (String. message-body))]
    (testing "it returns a Response with status code 200")
      (is (= 200 status-code))
    (testing "it returns a Response containing the updated board after AI move")
        (is (= [xMark nil oMark 
                xMark oMark xMark 
                oMark nil xMark]
                (get response-body-json "board")))))
