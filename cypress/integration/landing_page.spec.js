describe('landing page functionality', function() {
  
  context('visiting the root page', function() {
    beforeEach(function() {
      cy.visit('/');
    });

    it('contains "Web Tic Tac Toe" in the title', function() {
      cy.title().should('equal', 'Web Tic Tac Toe');
    });
  });

});
