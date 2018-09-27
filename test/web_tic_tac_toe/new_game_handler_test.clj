(ns web-tic-tac-toe.new-game-handler-test
  (:require [clojure.test :refer :all]
            [cheshire.core :as cheshire]
            [web-tic-tac-toe.new-game-handler :refer :all]))

(import Request)

(def request-for-human-v-human
  (.. (Request$Builder.)
      (build)))

(def new-game-handler (reify-handler))
    
(def response-from-handler
     (.generateResponse new-game-handler 
                        request-for-human-v-human))
               
(deftest generate-response-test 
  (let [status-code (.getStatusCode response-from-handler)
        message-body (.getMessageBody response-from-handler)]
    (testing "it returns a Response with status code 200")
      (is (= 200 status-code))
    (testing "it returns a Response containing an empty board")
        (is (= [nil nil nil nil nil nil nil nil nil]
               (get (cheshire/parse-string (String. message-body))
                    "board")))))
