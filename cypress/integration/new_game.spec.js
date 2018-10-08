describe('TTT new game', function() {
  beforeEach(function() {
    cy.visit('http://localhost:8888/')
  });

  context('no new game selected', function() {
    it('does not mark the board when clicking on space', function() {
      cy.get('[data-idx=0]').then(($firstSpace) => {
        expect($firstSpace.text()).to.eq('');
      });
    });
  });

  context('new human-v-human game selected', function() {
    beforeEach(function() {
      cy.get('#human-v-human').click();
    });

    it('marks X as the first mark', function() {
      cy.get('[data-idx=0]').then(($firstSpace) => {
        $firstSpace.click()
                    .should('have.text', 'X');
        // expect($firstSpace.text()).to.eq('X');
      });    
    });
  });

});
