(defproject web-tic-tac-toe "0.1.0-SNAPSHOT"

  ; Metadata
  :description "A online Tic Tac Toe game written in Clojure and served from a custom Java HTTP Server."
  :url "https://github.com/omarnyte/Web-Tic-Tac-Toe"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :min-lein-version "2.7.1" 
  
  ; Dependencies
  :dependencies [[cheshire "5.8.0"]
                 [com.omarnyte/http-server "1.0-SNAPSHOT"]
                 [org.clojure/clojure "1.8.0"]
                 [org.clojure/math.numeric-tower "0.0.4"]]
  
  ; Plugins 
  :plugins [[lein-heroku "0.5.3"]]
  :heroku {:app-name "toe-tac-tic"
           :jdk-version "10"
           :include-files ["target/uberjar/web-tic-tac-toe.jar"]
           :process-types {"web" "target/uberjar/web-tic-tac-toe-standalone.jar"}}

  ; Profiles  
  :profiles {:uberjar {:aot :all}}
 
  ; Entry Point 
  :main web-tic-tac-toe.core

  ; Running Project Code 
  :aot [web-tic-tac-toe.core]

  ;Filesystem Paths
  :target-path "target/%s"

  ; Jar Output
  :jar-name "web-tic-tac-toe.jar"
  :uberjar-name "web-tic-tac-toe-standalone.jar")
