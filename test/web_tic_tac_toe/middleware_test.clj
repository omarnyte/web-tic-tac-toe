(ns web-tic-tac-toe.middleware-test
  (:require [clojure.test :refer :all]
            [web-tic-tac-toe.middleware :refer :all]))

(import (com.omarnyte.middleware Middleware) 
        (com.omarnyte.response HttpStatusCode Response$Builder))

(def message-body "Hello, world!")

(def pre-middleware-response
     (.. (Response$Builder. HttpStatusCode/OK)
         (messageBody "Hello, world!")
         (build)))

(def middleware extend-middleware)

(def post-middleware-response 
     (.applyMiddleware (middleware) pre-middleware-response))

(deftest apply-middleware-test 
  (testing "it does not alter the status code")
    (is (= HttpStatusCode/OK
           (.getStatusCode post-middleware-response)))
  (testing "it does not alter the message body")
    (is (= message-body
           (String. (.getMessageBody post-middleware-response)))))
                