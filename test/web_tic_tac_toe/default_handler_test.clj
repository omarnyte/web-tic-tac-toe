(ns web-tic-tac-toe.default-handler-test
  (:require [clojure.test :refer :all]
            [web-tic-tac-toe.default-handler :refer :all]))

(import (com.omarnyte Directory) 
        (com.omarnyte.http MessageHeader) 
        (com.omarnyte.request Request$Builder)
        (com.omarnyte.response HttpStatusCode))

(def sample-request
     (.. (Request$Builder.)
         (build)))

(def path (str (System/getProperty "user.dir") "/public"))

(defn get-directory
  []
  (Directory. path))
    
(def response-from-handler
  (.generateResponse (reify-handler (get-directory))
                     sample-request))

(deftest generate-response-test 
  (testing "it builds a Response with status code 200")
    (is (= HttpStatusCode/OK 
           (.getStatusCode response-from-handler)))
  (testing "it builds a Response with Content-Type text/html")
    (is (= "text/html"
           (.getHeader response-from-handler 
                       MessageHeader/CONTENT_TYPE))))
