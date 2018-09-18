(ns web-tic-tac-toe.default-handler-test
  (:require [clojure.test :refer :all]
            [web-tic-tac-toe.default-handler :refer :all]))

(import Handler HttpStatusCode Request Response)

(def sample-request
     (.. (Request$Builder.)
         (build)))

(def handler reify-handler)
    
(def response-from-handler
  (.generateResponse (handler) sample-request))

(deftest generate-response-test 
  (testing "it builds a Response with status code 200")
    (is (= HttpStatusCode/OK 
           (.getStatusCode response-from-handler)))
  (testing "it builds a Response with message body 'Hello, world!")
    (is (= "Hello, world!"
        (String. (.getMessageBody response-from-handler)))))
