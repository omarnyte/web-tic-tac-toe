(ns web-tic-tac-toe.default-handler
  (:gen-class))

(import Handler HttpStatusCode)

(defn- build-response
  []
  (.. (Response$Builder. HttpStatusCode/OK)
      (messageBody "Hello, world!")
      (build)))

(defn- generate-response 
  [request]
  (build-response))

(defn reify-handler 
  []
  (reify Handler 
    (generateResponse [this request] (generate-response request))))