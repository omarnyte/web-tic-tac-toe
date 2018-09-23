(ns web-tic-tac-toe.move-handler-test
  (:require [cheshire.core :as cheshire]
            [clojure.test :refer :all]
            [web-tic-tac-toe.move-handler :refer :all]))

(def move-handler (reify-handler))

(def message-body (cheshire/generate-string {
  :board [nil nil nil nil nil nil nil nil nil]
  :currentPlayerMark "X"
  :selectedIdx 0
}))

(def human-v-human-request
  (.. (Request$Builder.)
      (body message-body)
      (build)))

(deftest generate-response-for-human-move 
  (let [response (.generateResponse move-handler human-v-human-request)
        status-code (.getStatusCode response)
        message-body (.getMessageBody response)
        response-body-json (cheshire/parse-string (String. message-body))]
    (testing "it returns a Response with status code 200")
      (is (= 200 status-code))
    (testing "it returns a Response containing the updated board")
        (is (= ["X" nil nil nil nil nil nil nil nil]
                (get response-body-json "board")))))
