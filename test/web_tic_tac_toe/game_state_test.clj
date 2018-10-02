(ns web-tic-tac-toe.game-state-test
  (:require [clojure.test :refer :all]
            [tic-tac-clojure.sample-boards :as sample-boards]
            [web-tic-tac-toe.game-state :refer :all]))

(import (com.omarnyte.exception BadRequestException))
          
(def no-idx-game-state 
  {:board ["X" nil nil nil nil nil nil nil nil]
   :players {:currentPlayerMark "O"
             :O "human"
             :X "human"}})

(defn create-game-state-with-idx
  [idx]
  {:board ["X" nil nil nil nil nil nil nil nil]
   :players {:currentPlayerMark "O"
             :O "human"
             :X "human"}
  :selectedIdx idx})

(defn create-players-state-with-current-player
  [current-player-mark]
  {:currentPlayerMark current-player-mark
   :X "human"
   :O "human"})

      
(deftest make-move-for-invalid-input
  (testing "it throws BadRequestException when game-state does not include selectedIdx")
    (is (thrown? BadRequestException (make-move no-idx-game-state)))
  (testing "it throws BadRequestException when game-state includes space that has already been selected")
    (is (thrown? BadRequestException 
                 (make-move (create-game-state-with-idx "0"))))
  (testing "it throws BadRequestException when game-state includes number that is outside of board range")
    (is (thrown? BadRequestException 
                 (make-move (create-game-state-with-idx "-1"))))
    (is (thrown? BadRequestException 
                 (make-move (create-game-state-with-idx "100")))))

(deftest make-move-for-valid-human-input
  (testing "it returns the updated board")
    (is (= ["X" "O" nil nil nil nil nil nil nil] 
           (make-move (create-game-state-with-idx "1")))))

(deftest update-game-over-state-for-game-in-progress
  (let [game-over-state (update-game-over-state sample-boards/one-mark-board)]
    (testing "it sets isOver to false")
      (is (= false (get game-over-state :isOver)))
    (testing "it sets isTie to false")
      (is (= false (get game-over-state :isTie)))
    (testing "it sets winner to nil")
      (is (= nil (get game-over-state :winner)))))

(deftest update-game-over-state-for-x-victory
  (let [game-over-state (update-game-over-state sample-boards/x-victory-board)]
    (testing "it sets isOver to true")
      (is (= true (get game-over-state :isOver)))
    (testing "it sets isTie to false")
      (is (= false (get game-over-state :isTie)))
    (testing "it sets winner to X")
      (is (= "X" (get game-over-state :winner)))))

(deftest update-game-over-state-for-x-victory
  (let [game-over-state (update-game-over-state sample-boards/o-victory-board)]
    (testing "it sets isOver to true")
      (is (= true (get game-over-state :isOver)))
    (testing "it sets isTie to false")
      (is (= false (get game-over-state :isTie)))
    (testing "it sets winner to O")
      (is (= "O" (get game-over-state :winner)))))

(deftest update-game-over-state-for-tied-game
  (let [game-over-state (update-game-over-state sample-boards/tied-board)]
    (testing "it sets isOver to true")
      (is (= true (get game-over-state :isOver)))
    (testing "it sets isTie to true")
      (is (= true (get game-over-state :isTie)))
    (testing "it sets winner to nil")
      (is (= nil (get game-over-state :winner)))))

(deftest update-players-state-test
  (testing "it sets the currentPlayerMark to O when currentPlayerMark is X")
    (let [original-players-state (create-players-state-with-current-player "X")
          updated-players-state (update-players-state original-players-state)]
      (is (= "O" (get updated-players-state :currentPlayerMark))))
  (testing "it sets the currentPlayerMark to X when currentPlayerMark is O")
    (let [original-players-state (create-players-state-with-current-player "O")
          updated-players-state (update-players-state original-players-state)]  
    (is (= "X" (get updated-players-state :currentPlayerMark)))))
