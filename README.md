# Web Tic Tac Toe
This web version of Tic Tac Toe is served on a [custom HTTP Server](https://github.com/omarnyte/http-server). Players can choose one of four game types against, including against an unbeatable computer. 

## Dependencies 
* [Clojure](https://clojure.org/guides/getting_started) 1.8.0 
* [Java](http://www.oracle.com/technetwork/java/javase/downloads/jre10-downloads-4417026.html) 10.0.1 
* [Leiningen](https://leiningen.org) 2.8.1 

## Starting the Game
1. To start the Server on default port 8888, run the following commands from the root directory: 

    ```
    npm install
    lein run
    ```
2. Navigate to http://localhost:8888
3. Selecte a game type from one of the four buttons. Note that clicking these buttons during a game that has already started will rest the game. 

## Contributing
1. Fork the repository.
2. Create a feature branch using Git.
3. Please write your feature in the relevant directory. 
    
    * For backend contributions, please write your feature in the ```src``` directory.
    * For frontend contributions, please write your feature in the ```public``` directory and run .
4. For backend features, please write a unit test (covering every new public method) in the ```test``` directory. 
5. Run `lein test` to ensure that the application successfully builds and passes all tests. 
6. Create a pull request. 
