(defproject web-tic-tac-toe "0.1.0-SNAPSHOT"
  :description "A online Tic Tac Toe game written in Clojure and served from a custom Java HTTP Server."
  :url "https://github.com/omarnyte/Web-Tic-Tac-Toe"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[cheshire "5.8.0"]
                 [com.omarnyte/http-server "1.0-SNAPSHOT"]
                 [org.clojure/clojure "1.8.0"]
                 [org.clojure/math.numeric-tower "0.0.4"]]
  :main ^:skip-aot web-tic-tac-toe.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
