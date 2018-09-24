(ns web-tic-tac-toe.move-handler-test
  (:require [cheshire.core :as cheshire]
            [clojure.test :refer :all]
            [web-tic-tac-toe.move-handler :refer :all]))

(def move-handler (reify-handler))

(def ai "ai")
(def human "human")
(def oMark "O")
(def xMark "X")

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

(def human-v-human-request
  (.. (Request$Builder.)
      (body human-v-human-message-body)
      (build)))

(def human-v-ai-request
  (.. (Request$Builder.)
      (body human-v-ai-message-body)
      (build)))

(deftest generate-response-for-human-move 
  (let [response (.generateResponse move-handler human-v-human-request)
        status-code (.getStatusCode response)
        message-body (.getMessageBody response)
        response-body-json (cheshire/parse-string (String. message-body))]
    (testing "it returns a Response with status code 200")
      (is (= 200 status-code))
    (testing "it returns a Response containing the updated board")
        (is (= [xMark nil nil nil nil nil nil nil nil]
                (get response-body-json "board")))))

(deftest generate-response-for-ai-move 
  (let [response (.generateResponse move-handler human-v-ai-request)
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
