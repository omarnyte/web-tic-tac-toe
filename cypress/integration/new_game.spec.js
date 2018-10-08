describe('new TTT game', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  context('no new game selected', function() {
    it('does not mark the board when clicking on space', function() {
      cy.get('[data-idx=0]')
        .click()
        .should('have.text', '')
        .and('not.have.class', 'marked');
    });
  });

  context('new human-v-human game selected', function() {
    beforeEach(function() {
      cy.get('#human-v-human').click();
    });

    it('marks X as the first mark', function() {
      cy.get('[data-idx=0]')
        .click()
        .should('have.text', 'X');
    });
  
    it('marks O as the second mark', function() {
      cy.get('[data-idx=0]').click();
      cy.get('[data-idx=1]')
        .click()
        .should('have.text', 'O')
        .and('have.class', 'marked'); 
    })
  });

  context('new computer-v-human game selected', function() {
    beforeEach(function() {
      cy.get('#ai-v-human').click();
    })

    it('does not mark board with human mark before AI moves', function() {
      cy.get('[data-idx=1]')
        .click()
        .should('not.have.text', 'O')
    });
    
    it('makes AI move first', function() {
      let numOfXMarks = 0;  

      cy.wait(5000);
      cy.get('.space')
        .each($space => {
          if ($space.text() === 'X') numOfXMarks += 1;
        }).then(() => {
          expect(numOfXMarks).to.eq(1);
        });
    });
  });

  context('new human-v-computer game selected', function() {
    beforeEach(function() {
      cy.get('#human-v-ai').click();
    });

    it('marks human move first', function() {
      cy.get('[data-idx=0]')
        .click()
        .should('have.text', 'X')
        .and('have.class', 'marked');
    });

    it('marks AI move after human move', function() {
      let numOfOMarks = 0;
      
      cy.get('[data-idx=0]').click();
      cy.wait(5000);
      cy.get('.space')
        .each($space => {
          if ($space.text() === 'O') numOfOMarks += 1;
        }).then(() => {
          expect(numOfOMarks).to.eq(1);
        });
    });
  });

});
