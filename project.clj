(defproject web-tic-tac-toe "0.1.0-SNAPSHOT"
  :description "A online Tic Tac Toe game written in Clojure and served from a custom Java HTTP Server."
  :url "https://github.com/omarnyte/Web-Tic-Tac-Toe"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[info.cukes/cucumber-java "1.2.4"]
                 [info.cukes/cucumber-junit "1.2.4"]
                 [junit/junit "4.12"]
                 [org.json/json "20180813"]
                 [org.clojure/clojure "1.8.0"]
                 [org.clojure/math.numeric-tower "0.0.4"]]
  :main ^:skip-aot web-tic-tac-toe.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}}
  :java-source-paths ["http-server"])
