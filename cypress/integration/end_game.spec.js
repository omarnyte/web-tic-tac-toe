describe('end of game', function() {
  // fetch polyfill, as per https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/polyfill-fetch-from-tests-spec.js
  let polyfill;
  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'
    cy.request(polyfillUrl)
    .then((response) => {
      polyfill = response.body
    })
  });
  
  beforeEach(function () {
    cy.visit('/', {
      onBeforeLoad (win) {
        delete win.fetch
        win.eval(polyfill)
        win.fetch = win.unfetch
      },
    })
  });

  context('human v. human game', function() {
    before(function() {
      const nearXVictoryState = {
        "board": ["X","X",null,"O","O",null,null,null,null],
        "gameOverState":{
          "isOver":false,
          "isTie":false,
          "winner":null
        },
        "players": {
          "currentPlayerMark":"X",
          "X":"human",
          "O":"human"
        }
      };
 
      cy.server()
      cy.route('POST', '**/api/new-game', nearXVictoryState)
    });
    
    it('announces X as the winner', function() {
      expect(true).to.be.true;
      cy.get('#human-v-human').click();
      cy.get('[data-idx=2]')
        .click()
        .then(() => {
          cy.get('.display-div')
            .should('have.text', 'X wins!');
        });
    });
  });

  context('computer v. human game', function() {
    beforeEach(function() {
      const nearOVictoryState = {
        "board": ["X","X",null,"O","O",null,null,null,null],
        "gameOverState":{
          "isOver":false,
          "isTie":false,
          "winner":null
        },
        "players": {
          "currentPlayerMark":"X",
          "X":"ai",
          "O":"human"
        }
      };
      
      cy.server();
      cy.route('POST', '**/api/new-game', nearOVictoryState);

      cy.get('#ai-v-human').click()
    });

    it('selects the winning move during AI\'s turn', function() {
      cy.clock();
      cy.tick(3000);
      cy.get('[data-idx=2]')
        .should('have.text', 'X');
    });

    it('announces X as the winner', function() {
      cy.clock();
      cy.tick(3000);
      cy.get('.display-div')
        .should('have.text', 'X wins!'); 
    });
  });

  context('human v. computer game', function() {
    beforeEach(function() {
      const nearOVictoryState = {
        "board": ["O","O",null,"X","X",null,null,null,null],
        "gameOverState":{
          "isOver":false,
          "isTie":false,
          "winner":null
        },
        "players": {
          "currentPlayerMark":"O",
          "X":"human",
          "O":"ai"
        }
      };
      
      cy.server();
      cy.route('POST', '**/api/new-game', nearOVictoryState);

      cy.get('#human-v-ai').click()
    });

    it('selects the winning move during AI\'s turn', function() {
      cy.clock();
      cy.tick(3000);
      cy.get('[data-idx=2]')
        .should('have.text', 'O');
    });

    it('announces O as the winner', function() {
      cy.clock();
      cy.tick(3000);
      cy.get('.display-div')
        .should('have.text', 'O wins!'); 
    });
  });

  context('computer v. computer game', function() {
    beforeEach(function() {
      const nearOVictoryState = {
        "board": ["O","O",null,"X","X",null,null,null,null],
        "gameOverState":{
          "isOver":false,
          "isTie":false,
          "winner":null
        },
        "players": {
          "currentPlayerMark":"O",
          "X":"ai",
          "O":"ai"
        }
      };
      
      cy.server();
      cy.route('POST', '**/api/new-game', nearOVictoryState);

      cy.get('#human-v-ai').click()
    });

    it('selects the winning move during AI\'s turn', function() {
      cy.clock();
      cy.tick(3000);
      cy.get('[data-idx=2]')
        .should('have.text', 'O');
    });

    it('announces O as the winner', function() {
      cy.clock();
      cy.tick(3000);
      cy.get('.display-div')
        .should('have.text', 'O wins!'); 
    });
  });

});
