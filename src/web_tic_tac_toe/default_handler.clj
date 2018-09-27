(ns web-tic-tac-toe.default-handler
  (:gen-class))

(import Handler HttpStatusCode MessageHeader)

(defn- build-response
  [directory]
  (.. (Response$Builder. HttpStatusCode/OK)
      (setHeader (MessageHeader/CONTENT_TYPE) "text/html")
      (messageBody (.readFile directory "/index.html"))
      (build)))

(defn- generate-response 
  [request directory]
  (build-response directory))

(defn reify-handler 
  [directory]
  (reify Handler 
    (generateResponse [this request] (generate-response request directory))))