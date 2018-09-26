(ns web-tic-tac-toe.game-state
  (:gen-class)
  (:require [tic-tac-clojure.ai :as ai]
            [tic-tac-clojure.board :as board]
            [tic-tac-clojure.game-logic :as game-logic]
            [tic-tac-clojure.player :as player]))

(import BadRequestException)

(def missingSelectedIdxMessage "Index selection is required")
(def invalidSelectedIdxMessage "Index selection is invalid")

(defn- validate-selected-idx 
  [idx]
  (if (nil? idx) 
      (throw (BadRequestException. missingSelectedIdxMessage))
      (Integer/parseInt idx)))

(defn- make-human-move
  [board selected-idx mark]
  (if (game-logic/valid-move? board selected-idx) 
    (board/mark-board board selected-idx mark)
    (throw (BadRequestException. invalidSelectedIdxMessage))))

(defn- make-ai-move
  [board mark]
  (let [best-idx (ai/choose-best-space board mark)]
    (board/mark-board board best-idx mark)))

(defn make-move
  [game-state]
  (let [board (get game-state :board)
        selected-idx (validate-selected-idx (get game-state :selectedIdx))
        current-player-mark (get game-state :currentPlayerMark)
        is-human? (= (get game-state (keyword current-player-mark)) "human")]
    (if is-human?
        (make-human-move board selected-idx current-player-mark)
        (make-ai-move board current-player-mark)))) 

(defn update-game-over-state 
  [board]
  {:isOver (game-logic/game-over? board)
   :isTie (game-logic/tie? board)
   :winner (game-logic/winner? board)})

(defn- get-opp-mark
  [marker]
  (if (= "X" marker) "O" "X"))

(defn update-players-state
  [players-state]
  (let [current-player-mark (get players-state :currentPlayerMark)]
    (assoc players-state 
           :currentPlayerMark 
           (get-opp-mark current-player-mark))))
