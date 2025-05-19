import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';
import questions from '../fixtures/questions.json';

describe('Tech Quiz Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', { body: questions }).as('loadQuestions');
    mount(<Quiz />);
  });

  it('shows the start button initially', () => {
    cy.contains('Start Quiz').should('exist');
  });

  it('starts the quiz and shows the first question and answers', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@loadQuestions');

    cy.contains(questions[0].question).should('exist');
    questions[0].answers.forEach((a) => {
      cy.contains(a.text).should('exist');
    });
  });

  it('moves to the second question after answering the first', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@loadQuestions');

    cy.get('button').contains('1').click();
    cy.get('h2').should('have.text', questions[1].question);
  });

  it('shows final score after all questions answered', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@loadQuestions');

    cy.get('button').contains('1').click();
    cy.get('button').contains('1').click();

    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score:').should('exist');
  });

  it('allows restarting the quiz after finishing', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@loadQuestions');

    cy.get('button').contains('1').click();
    cy.get('button').contains('1').click();

    cy.contains('Take New Quiz').click();
    cy.wait('@loadQuestions');

    cy.contains(questions[0].question).should('exist');
  });
});